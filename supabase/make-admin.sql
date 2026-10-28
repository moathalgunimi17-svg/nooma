-- Gives a Supabase user access to the Nooma admin.
-- 1. Supabase → Authentication → Users → Add user → Create new user
--    (email + password, tick "Auto Confirm User").
-- 2. Put that email below, then run this in SQL Editor.
insert into public.admins (user_id)
select id from auth.users where email = lower('noomawholesale2026@gmail.com')
on conflict do nothing;

-- Check: should list the admin's email.
select u.email from public.admins a join auth.users u on u.id = a.user_id;
