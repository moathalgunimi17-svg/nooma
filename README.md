# Nooma | نُومة — storefront

A bilingual (Arabic first, English second) static storefront for Nooma's children's pajamas.
Customers browse the catalogue, fill a bag, and send the order to Nooma on WhatsApp.
The site takes no payments and stores no customer data on a server.

> **Products** are Nooma's own list in `src/data/products.ts` (16 pajamas, codes PJ001–PJ016, from
> "Nooma products.xlsx": model, sizes and selling price per size; cost and profit are never used).
> Photos are added later by code — see [Products and photos](#products-and-photos).

## Run it

Requires Node 18.20+ (Node 20 or 22 recommended).

```bash
npm install
```

```bash
npm run dev
```

Opens on http://127.0.0.1:5200/ (Arabic). English is at `/en/`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server on port 5200 |
| `npm run build` | Type-check (`astro check`), run the unit tests, then build to `dist/` |
| `npm run preview` | Serve the built `dist/` on port 5201 |
| `npm test` | Unit tests only (cart maths, order message, WhatsApp link, Arabic search) |
| `node tools/check-links.mjs` | After a build: checks every internal link and image in `dist/` |

**OneDrive note:** if the project sits in a OneDrive folder, Windows may drop `desktop.ini` files into `src/pages/`,
which Astro tries to treat as a page and crashes on. Delete them if the dev server reports an `ENOENT … desktop.ini` error:

```bash
find src -iname desktop.ini -delete
```

## Deploy

### Client preview (GitHub Pages)

Live at **https://moathalgunimi17-svg.github.io/nooma/**. Every page there carries `noindex`, because any host other
than nooma.om is treated as a preview. To publish your latest changes to it:

```bash
npm run deploy:preview
```

This builds with the `/nooma/` base, checks the links, and force-pushes `dist/` to the `gh-pages` branch. The source
lives on `main` at https://github.com/moathalgunimi17-svg/nooma.

### Production

The build is plain static files in `dist/`. Any static host works (Netlify, Cloudflare Pages, Vercel, GitHub Pages, cPanel hosting).

- **On its own domain** (e.g. nooma.om): build normally. `site` defaults to `https://nooma.om`.
- **Elsewhere**, set the address before building so canonical links, `hreflang` and the sitemap are correct:

```bash
SITE_URL=https://example.github.io BASE_PATH=/nooma/ npm run build
```

Update `public/robots.txt` if the domain changes (it points to `https://nooma.om/sitemap-index.xml`).
The `/cart/` page is excluded from the sitemap and marked `noindex`.

## Products and photos

- Each product has a code (PJ001…). Until its photo exists, the code is shown where the photo goes.
- **Photos:** save them in `src/assets/products/` named after the code: `PJ001.jpg`, then `PJ001-2.jpg` for more.
  Nothing else changes.
- **Sizes** are 90–170 (no ages). A size with no stock in the sheet is not listed. Each size can have its own
  price; cards show "from" the lowest one, and the product page, cart and order use the chosen size's price.
- **After editing `src/data/products.ts`:** run `npm run catalog:sql`, then paste `supabase/catalog.sql` into
  Supabase → SQL Editor → Run, so recorded orders use the same products and prices.

## How ordering works

1. The bag lives in the visitor's own browser (`localStorage`, key `nooma.cart.v1`). It holds only product id, colour,
   size and quantity. Prices are always looked up again from the catalogue, so an old bag can never show an old price.
2. "Order on WhatsApp" asks for the customer's name, phone and delivery area (required) and email and address
   (optional), then builds a
   message with every item, colour, size, quantity, the subtotal, a note that delivery is confirmed on WhatsApp, those
   delivery details and the optional gift note. The customer sends it from their own WhatsApp, so it reaches Nooma
   from their number. The details are kept in `sessionStorage` for the visit only and never sent to a server.
3. Then:
   - **`whatsappNumber` is set (current setting, `96896102882`):** `wa.me/<number>?text=<message>` opens with the
     order already typed.
   - **`whatsappNumber` is `null`:** the message is copied to the clipboard and Nooma's verified
     link `https://wa.me/message/44ZHUR56MI5GD1` opens. The customer pastes the message. If copying is blocked, the
     message is shown in a box to copy by hand.
4. The site never says an order has been placed or paid. It tells the customer that Nooma confirms the order on WhatsApp.

## Admin (orders + products)

Nooma's admin lives at **`/admin/`** (e.g. https://moathalgunimi17-svg.github.io/nooma/admin/). It is Arabic-only,
phone-friendly and never indexed. It needs a free [Supabase](https://supabase.com) project; until
`site.backend` is set in `src/config/site.ts`, the admin shows "not set up yet" and the shop keeps working from
`src/data/sample-products.ts` with WhatsApp-only orders.

**What it does**

- **Orders**: every confirmed order gets a number (#1001, #1002…) before WhatsApp opens. The admin lists them live
  (with a sound when a new one arrives), filters by status, searches, shows the customer and items, changes status
  (new → preparing → shipped → delivered / cancelled), keeps internal notes, and opens a WhatsApp chat or call.
  Prices are always taken from the database by `place_order()`, never from the browser.
- **Products** (only when `site.catalogSource` is `'admin'`; it is `'file'` now, so the tab is hidden and the shop
  reads `src/data/products.ts`): add, edit, hide, delete, photos.
- **Publish**: the site is static, so product changes go live when the owner taps **نشر الآن**. That calls the
  `publish` Supabase function, which starts `.github/workflows/publish.yml` to rebuild and redeploy (≈2 minutes).

**One-time setup**

1. Create a Supabase project. In **SQL Editor**, run `supabase/setup.sql` (tables, security rules, order function,
   photo bucket, the five sample products). It is safe to run again.
2. **Authentication → Users → Add user** (email + password, *Auto Confirm*). Put that email in
   `supabase/make-admin.sql` and run it. Then **Authentication → Sign In / Providers**: turn off "Allow new users to sign up".
3. **Project Settings → API**: copy the Project URL and the `anon` public key into `site.backend` in
   `src/config/site.ts`. Both are public by design; never put the `service_role` key anywhere in this repo.
4. Publishing from the admin:
   - Allow pushing the workflow file once: `gh auth refresh -h github.com -s workflow`, then commit and push
     `.github/workflows/publish.yml`.
   - GitHub → Settings → Developer settings → Fine-grained tokens: a token for **this repository only** with
     **Actions: Read and write**.
   - `npx supabase login`, then `npx supabase link --project-ref <ref>`,
     `npx supabase secrets set GH_TOKEN=<token> GH_REPO=moathalgunimi17-svg/nooma`,
     `npx supabase functions deploy publish --use-api`.

**Tests**: `tests/catalog.test.ts` covers the database → catalogue mapping. The SQL (security rules, order checks,
flood guard) was tested on PGlite with stand-ins for Supabase's `auth` and `storage` schemas.

## Where things live

| To change… | Edit |
| --- | --- |
| Contacts, WhatsApp number, announcement bar, shipping rule, sample flag | `src/config/site.ts` |
| Products, prices per size | `src/data/products.ts` (then `npm run catalog:sql`) |
| Collections, sizes | `src/data/taxonomy.ts` |
| Product photos | `src/assets/products/`, named by code (see the README there) |
| Size chart measurements | `src/data/sizing.ts` |
| Shipping / returns / privacy / terms wording | `src/data/policies.ts` |
| Every piece of interface text, Arabic and English | `src/i18n/ui.ts` |
| Colours, type, spacing, motion | `src/styles/tokens.css` |

All logos, characters, the cat, the sun, the star note and the stripe pattern come from Nooma's own packaging files
(bag, cards and wrapping paper, hang-tags) and are in `src/assets/brand/`.

## Before launch

1. ~~Replace the catalogue~~ — done: `src/data/products.ts`. PJ013 has no selling price yet (shows "price on request").
2. **Add photos** to `src/assets/products/`, named by code (`PJ001.jpg`).
3. ~~Set `sampleCatalog: false`~~ — done.
4. ~~Confirm the WhatsApp number~~ — done: `+968 96102882`, set in `src/config/site.ts`.
5. **Fill in what's marked "to be confirmed"**: size measurements, shipping fees and times, returns, payment methods,
   privacy contact. Each page shows exactly which answers are still missing.
6. **Approve the policies.** Each policy page lists what is known and what still needs an answer. Once Nooma has
   written and approved the final wording in `src/data/policies.ts`, remove the `<Pending>` draft notice in
   `src/views/PolicyView.astro`.

### Information still needed from Nooma

| Item | Used on |
| --- | --- |
| Real products, names, descriptions, prices, colours, sizes | Shop, product pages, cart |
| Product photos | Cards, product gallery, cart |
| Measurements per size (chest, length, inseam, height range) | Size guide, product size dialog |
| Delivery fees and times, inside Oman and abroad | Shipping page, cart note, FAQ |
| Returns and exchange policy | Returns page, FAQ |
| Payment methods (transfer, cash on delivery, links…) | FAQ, terms |
| Fabric composition and care instructions | Product details, FAQ |
| Legal/trading name and registration (if any) | Terms, privacy, footer |
| Brand story in Nooma's own words | About page |
| Who handles privacy requests | Privacy page |

## Privacy and security

- No analytics, pixels, cookies or third-party scripts. Fonts are self-hosted.
- The contact form doesn't send anything to a server. It opens the visitor's email app addressed to Nooma.
- Shop filters in the URL are only colour, size, collection, sort and search text. The only personal data in any URL is
  the delivery details the customer typed, inside the `wa.me` link their own device opens to send the order.
- Catalogue data embedded in pages is JSON-escaped; product text is rendered as text, never as HTML.
- No structured data is published for sample products, prices or reviews.
