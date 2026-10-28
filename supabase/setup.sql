-- ─────────────────────────────────────────────────────────────────────────
--  Nooma | نُومة — admin database
--
--  Run once in Supabase → SQL Editor → New query → paste → Run.
--  Safe to run again: it only creates what is missing and replaces functions
--  and policies with the current version. It never deletes products or orders.
--
--  Who can do what (row-level security):
--   • Anyone (the public site, "anon"): read ACTIVE products and their colours,
--     and place an order through place_order() — nothing else.
--   • Admins (users listed in public.admins): everything below.
--  The service-role key is never used by the website or the admin page.
-- ─────────────────────────────────────────────────────────────────────────

-- ── Admins ────────────────────────────────────────────────────────────────
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.admins enable row level security;
drop policy if exists "admins see themselves" on public.admins;
create policy "admins see themselves" on public.admins for select to authenticated using (user_id = auth.uid());

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.admins where user_id = auth.uid()) $$;
revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at = now(); return new; end $$;

-- ── Products ──────────────────────────────────────────────────────────────
-- category_id and size_ids use the ids in src/data/taxonomy.ts.
create table if not exists public.products (
  id text primary key default ('p-' || substr(md5(random()::text || clock_timestamp()::text), 1, 10)),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(slug) <= 80),
  name_ar text not null check (length(name_ar) between 1 and 120),
  name_en text not null default '' check (length(name_en) <= 120),
  summary_ar text not null default '' check (length(summary_ar) <= 200),
  summary_en text not null default '' check (length(summary_en) <= 200),
  description_ar text not null default '' check (length(description_ar) <= 3000),
  description_en text not null default '' check (length(description_en) <= 3000),
  category_id text not null,
  price numeric(10, 3) check (price is null or price >= 0),
  compare_at_price numeric(10, 3) check (compare_at_price is null or compare_at_price >= 0),
  size_ids text[] not null default '{}',
  stock jsonb,
  featured boolean not null default false,
  sample boolean not null default false,
  active boolean not null default true,
  sort integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();

create table if not exists public.colourways (
  product_id text not null references public.products (id) on delete cascade on update cascade,
  id text not null check (id ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and length(id) <= 40),
  name_ar text not null check (length(name_ar) between 1 and 60),
  name_en text not null default '' check (length(name_en) <= 60),
  swatch text not null default '#d0d5e6' check (swatch ~ '^#[0-9a-fA-F]{6}$'),
  photos text[] not null default '{}',
  art text not null default 'kid-reading',
  sort integer not null default 0,
  primary key (product_id, id)
);

-- Nooma's product list (src/data/products.ts): the product code, and a price per size
-- when sizes cost different amounts ({"100": 4.7, "130": 5.7}). A single-colour product
-- has no colour name.
alter table public.products add column if not exists code text;
alter table public.products add column if not exists size_prices jsonb;
alter table public.colourways drop constraint if exists colourways_name_ar_check;
alter table public.colourways add constraint colourways_name_ar_check check (length(name_ar) <= 60);

alter table public.products enable row level security;
alter table public.colourways enable row level security;

drop policy if exists "read active products" on public.products;
create policy "read active products" on public.products for select to anon, authenticated
  using (active or public.is_admin());
drop policy if exists "admins write products" on public.products;
create policy "admins write products" on public.products for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read colours of active products" on public.colourways;
create policy "read colours of active products" on public.colourways for select to anon, authenticated
  using (public.is_admin() or exists (select 1 from public.products p where p.id = product_id and p.active));
drop policy if exists "admins write colours" on public.colourways;
create policy "admins write colours" on public.colourways for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

-- ── Orders ────────────────────────────────────────────────────────────────
create table if not exists public.orders (
  id bigint generated by default as identity (start with 1001) primary key,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'preparing', 'shipped', 'delivered', 'cancelled')),
  locale text not null default 'ar' check (locale in ('ar', 'en')),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  customer_area text not null,
  customer_address text,
  gift_note text,
  items jsonb not null,
  subtotal numeric(10, 3) not null,
  sample boolean not null default false,
  admin_note text check (admin_note is null or length(admin_note) <= 2000)
);
create index if not exists orders_created_at on public.orders (created_at desc);
create index if not exists orders_phone_recent on public.orders (customer_phone, created_at desc);
drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders for each row execute function public.touch_updated_at();

-- Nobody inserts directly: the public site goes through place_order().
alter table public.orders enable row level security;
drop policy if exists "admins read orders" on public.orders;
create policy "admins read orders" on public.orders for select to authenticated using (public.is_admin());
drop policy if exists "admins update orders" on public.orders;
create policy "admins update orders" on public.orders for update to authenticated
  using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins delete orders" on public.orders;
create policy "admins delete orders" on public.orders for delete to authenticated using (public.is_admin());

/*
  place_order(payload) — the only way the public site writes anything.
  payload = {
    locale: 'ar' | 'en',
    giftNote?: string,
    customer: { name, phone, email?, area, address? },
    lines: [{ productId, colourId, sizeId, qty }]
  }
  Prices are read from the products table (the size's own price when set), never from the browser.
  Returns { id, subtotal }.
*/
create or replace function public.place_order(payload jsonb) returns jsonb
language plpgsql security definer set search_path = public
as $$
declare
  c jsonb := coalesce(payload -> 'customer', '{}'::jsonb);
  v_name text := btrim(coalesce(c ->> 'name', ''));
  v_phone text := btrim(coalesce(c ->> 'phone', ''));
  v_email text := nullif(btrim(coalesce(c ->> 'email', '')), '');
  v_area text := btrim(coalesce(c ->> 'area', ''));
  v_address text := left(nullif(btrim(coalesce(c ->> 'address', '')), ''), 200);
  v_gift text := left(nullif(btrim(coalesce(payload ->> 'giftNote', '')), ''), 240);
  v_locale text := case when payload ->> 'locale' = 'en' then 'en' else 'ar' end;
  v_line jsonb;
  v_items jsonb := '[]'::jsonb;
  v_subtotal numeric(10, 3) := 0;
  v_sample boolean := false;
  v_qty integer;
  v_total numeric(10, 3);
  v_price numeric(10, 3);
  p public.products%rowtype;
  cw public.colourways%rowtype;
  v_id bigint;
begin
  v_name := regexp_replace(v_name, '\s+', ' ', 'g');
  v_area := regexp_replace(v_area, '\s+', ' ', 'g');
  if length(v_name) < 2 or length(v_name) > 80 then
    raise exception 'invalid_name' using errcode = '22023';
  end if;
  -- Arabic-Indic / Persian digits → ASCII; spaces, dashes and brackets dropped. No country code is added.
  v_phone := regexp_replace(translate(v_phone, '٠١٢٣٤٥٦٧٨٩۰۱۲۳۴۵۶۷۸۹', '01234567890123456789'), '[[:space:]().-]', '', 'g');
  if v_phone !~ '^\+?[0-9]{8,15}$' then
    raise exception 'invalid_phone' using errcode = '22023';
  end if;
  if v_email is not null and (length(v_email) > 120 or v_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$') then
    raise exception 'invalid_email' using errcode = '22023';
  end if;
  if length(v_area) < 2 or length(v_area) > 80 then
    raise exception 'invalid_area' using errcode = '22023';
  end if;
  if jsonb_typeof(payload -> 'lines') is distinct from 'array'
     or jsonb_array_length(payload -> 'lines') not between 1 and 30 then
    raise exception 'invalid_lines' using errcode = '22023';
  end if;
  -- Flood guard: at most 5 orders per phone number in 10 minutes.
  if (select count(*) from public.orders o
      where o.customer_phone = v_phone and o.created_at > now() - interval '10 minutes') >= 5 then
    raise exception 'too_many_orders' using errcode = '22023';
  end if;

  for v_line in select value from jsonb_array_elements(payload -> 'lines') loop
    v_qty := case when (v_line ->> 'qty') ~ '^[0-9]{1,3}$' then (v_line ->> 'qty')::integer end;
    if v_qty is null or v_qty < 1 or v_qty > 10 then
      raise exception 'invalid_qty' using errcode = '22023';
    end if;
    select * into p from public.products where id = v_line ->> 'productId' and active;
    if not found or p.price is null then
      raise exception 'product_unavailable' using errcode = '22023';
    end if;
    if not ((v_line ->> 'sizeId') = any (p.size_ids)) then
      raise exception 'size_unavailable' using errcode = '22023';
    end if;
    v_price := coalesce((p.size_prices ->> (v_line ->> 'sizeId'))::numeric, p.price);
    select * into cw from public.colourways where product_id = p.id and id = v_line ->> 'colourId';
    if not found then
      raise exception 'colour_unavailable' using errcode = '22023';
    end if;
    v_total := round(v_price * v_qty, 3);
    v_subtotal := v_subtotal + v_total;
    v_sample := v_sample or p.sample;
    v_items := v_items || jsonb_build_array(jsonb_build_object(
      'productId', p.id, 'code', p.code, 'slug', p.slug, 'nameAr', p.name_ar, 'nameEn', p.name_en,
      'colourId', cw.id, 'colourAr', cw.name_ar, 'colourEn', cw.name_en,
      'sizeId', v_line ->> 'sizeId', 'qty', v_qty, 'unitPrice', v_price, 'lineTotal', v_total));
  end loop;

  insert into public.orders (locale, customer_name, customer_phone, customer_email, customer_area,
                             customer_address, gift_note, items, subtotal, sample)
  values (v_locale, v_name, v_phone, v_email, v_area, v_address, v_gift, v_items, v_subtotal, v_sample)
  returning id into v_id;
  return jsonb_build_object('id', v_id, 'subtotal', v_subtotal);
end
$$;
revoke all on function public.place_order(jsonb) from public;
grant execute on function public.place_order(jsonb) to anon, authenticated;

-- New orders appear in the admin without refreshing.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (select 1 from pg_publication_tables
                     where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'orders') then
    alter publication supabase_realtime add table public.orders;
  end if;
end
$$;

-- ── Product photos (Storage) ──────────────────────────────────────────────
-- Public bucket: anyone can view a photo by its URL; only admins can upload or delete.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('product-photos', 'product-photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp', 'image/avif'])
on conflict (id) do update set public = true, file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Storage needs a select policy too: uploads read the new row back, and deletes find it first.
drop policy if exists "admins list product photos" on storage.objects;
create policy "admins list product photos" on storage.objects for select to authenticated
  using (bucket_id = 'product-photos' and public.is_admin());
drop policy if exists "admins upload product photos" on storage.objects;
create policy "admins upload product photos" on storage.objects for insert to authenticated
  with check (bucket_id = 'product-photos' and public.is_admin());
drop policy if exists "admins change product photos" on storage.objects;
create policy "admins change product photos" on storage.objects for update to authenticated
  using (bucket_id = 'product-photos' and public.is_admin());
drop policy if exists "admins delete product photos" on storage.objects;
create policy "admins delete product photos" on storage.objects for delete to authenticated
  using (bucket_id = 'product-photos' and public.is_admin());

-- ── Starting products ─────────────────────────────────────────────────────
-- The five SAMPLE products from the preview site (flagged sample = true), so the
-- shop isn't empty on day one. Edit or delete them from the admin.
insert into public.products (id, slug, name_ar, name_en, summary_ar, summary_en, description_ar, description_en, category_id, price, size_ids, featured, sample, sort)
values ('p-cloud-dreams', 'cloud-dreams', 'بيجامة غيوم الأحلام', 'Cloud Dreams pajamas', 'غيوم بيضاء على لافندر هادئ', 'White clouds on calm lavender',
  'طقم بقميص بأزرار وبنطال طويل، تزيّنه غيوم صغيرة على لون لافندر هادئ. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
  'A button-up top and long trousers scattered with small clouds on calm lavender. This listing is sample data until Nooma adds the real details.',
  'boys', 11.5, array['2y', '3y', '4y', '5y', '6y', '8y']::text[], true, true, 0)
on conflict (id) do nothing;
insert into public.colourways (product_id, id, name_ar, name_en, swatch, art, sort)
values ('p-cloud-dreams', 'lavender', 'لافندر', 'Lavender', '#C5CCF0', 'kid-camera', 0)
on conflict do nothing;
insert into public.products (id, slug, name_ar, name_en, summary_ar, summary_en, description_ar, description_en, category_id, price, size_ids, featured, sample, sort)
values ('p-little-hearts', 'little-hearts', 'بيجامة القلوب الصغيرة', 'Little Hearts pajamas', 'قلوب وردية على أرضية فاتحة', 'Pink hearts on a pale ground',
  'قلوب وردية صغيرة على أرضية فاتحة، مع رباط عند الخصر. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
  'Small pink hearts on a pale ground, with a tie at the waist. This listing is sample data until Nooma adds the real details.',
  'girls', 11.5, array['2y', '3y', '4y', '5y', '6y']::text[], true, true, 1)
on conflict (id) do nothing;
insert into public.colourways (product_id, id, name_ar, name_en, swatch, art, sort)
values ('p-little-hearts', 'blush', 'وردي', 'Blush', '#F7B9C0', 'kid-facemask', 0)
on conflict do nothing;
insert into public.products (id, slug, name_ar, name_en, summary_ar, summary_en, description_ar, description_en, category_id, price, size_ids, featured, sample, sort)
values ('p-classic-stripes', 'classic-stripes', 'بيجامة الخطوط الكلاسيكية', 'Classic Stripes pajamas', 'خطوط ناعمة بلونين', 'Soft stripes in two colours',
  'خطوط طولية ناعمة بقصّة كلاسيكية وجيب صغير على الصدر، بلونين للاختيار. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
  'Soft vertical stripes in a classic cut with a small chest pocket, in two colours. This listing is sample data until Nooma adds the real details.',
  'everyone', 12.5, array['2y', '3y', '4y', '5y', '6y', '8y']::text[], true, true, 2)
on conflict (id) do nothing;
insert into public.colourways (product_id, id, name_ar, name_en, swatch, art, sort)
values ('p-classic-stripes', 'pink', 'وردي', 'Pink', '#F4C3C8', 'kid-stretch', 0)
on conflict do nothing;
insert into public.colourways (product_id, id, name_ar, name_en, swatch, art, sort)
values ('p-classic-stripes', 'butter', 'أصفر زبدي', 'Butter', '#F7DC92', 'kid-reading', 1)
on conflict do nothing;
insert into public.products (id, slug, name_ar, name_en, summary_ar, summary_en, description_ar, description_en, category_id, price, size_ids, featured, sample, sort)
values ('p-blue-gingham', 'blue-gingham', 'بيجامة المربعات الزرقاء', 'Blue Gingham pajamas', 'مربعات زرقاء بلمسة خضراء', 'Blue checks with a hint of green',
  'مربعات زرقاء فاتحة بقصّة مستقيمة وأزرار أمامية. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
  'Pale blue checks in a straight cut with front buttons. This listing is sample data until Nooma adds the real details.',
  'boys', 10.5, array['3y', '4y', '5y', '6y', '8y']::text[], false, true, 3)
on conflict (id) do nothing;
insert into public.colourways (product_id, id, name_ar, name_en, swatch, art, sort)
values ('p-blue-gingham', 'blue', 'أزرق', 'Blue', '#BFD3F2', 'kid-brushing', 0)
on conflict do nothing;
insert into public.products (id, slug, name_ar, name_en, summary_ar, summary_en, description_ar, description_en, category_id, price, size_ids, featured, sample, sort)
values ('p-butter-bows', 'butter-bows', 'بيجامة الفيونكات', 'Butter Bows pajamas', 'فيونكات زرقاء على أصفر زبدي', 'Blue bows on butter yellow',
  'فيونكات صغيرة بلون أزرق هادئ على أرضية صفراء زبدية. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.',
  'Little bows in calm blue on a butter-yellow ground. This listing is sample data until Nooma adds the real details.',
  'everyone', 10.5, array['2y', '3y', '4y', '5y']::text[], true, true, 4)
on conflict (id) do nothing;
insert into public.colourways (product_id, id, name_ar, name_en, swatch, art, sort)
values ('p-butter-bows', 'butter', 'أصفر زبدي', 'Butter', '#F8E1A0', 'kid-baking', 0)
on conflict do nothing;
