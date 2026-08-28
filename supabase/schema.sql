-- ============================================================================
-- ZAVEL FINE JEWELRY — Supabase schema
-- Run this once in your Supabase project's SQL Editor
-- (Project -> SQL Editor -> New query -> paste -> Run)
-- ============================================================================

-- 1. Extension needed for gen_random_uuid()
create extension if not exists "pgcrypto";

-- 2. Products table
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('Rings', 'Earrings')),
  price decimal(10, 2) not null check (price >= 0),
  description text not null default '',
  image_url text not null,
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- 3. Row Level Security
-- The storefront (anon key) may only READ. Only authenticated admins may
-- write. Create your admin user from Authentication -> Users -> Add user;
-- there is no public sign-up flow in this app.
alter table public.products enable row level security;

drop policy if exists "Public can read products" on public.products;
create policy "Public can read products"
  on public.products for select
  to anon, authenticated
  using (true);

drop policy if exists "Authenticated users can insert products" on public.products;
create policy "Authenticated users can insert products"
  on public.products for insert
  to authenticated
  with check (true);

drop policy if exists "Authenticated users can update products" on public.products;
create policy "Authenticated users can update products"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

drop policy if exists "Authenticated users can delete products" on public.products;
create policy "Authenticated users can delete products"
  on public.products for delete
  to authenticated
  using (true);

-- 4. Storage bucket for admin-uploaded product photos (optional — the admin
--    form also accepts a plain image URL, so this bucket is only needed if
--    you want to upload files directly from the Admin Portal).
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view product images" on storage.objects;
create policy "Public can view product images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'product-images');

drop policy if exists "Authenticated users can upload product images" on storage.objects;
create policy "Authenticated users can upload product images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

drop policy if exists "Authenticated users can delete product images" on storage.objects;
create policy "Authenticated users can delete product images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');

-- 5. Seed data
-- image_url points at /assets/images/... which ships inside this app's
-- public/ folder, so these work immediately once deployed — no separate
-- image hosting required. Replace with Supabase Storage URLs any time by
-- editing the product from the Admin Portal.
insert into public.products (name, category, price, description, image_url, is_featured)
values
  ('Silver Bow Ring', 'Rings', 165.00,
   'A sterling silver ribbon bow, cast in a soft satin polish and set on a slim tapered band. Delicate enough for everyday, sculptural enough to notice.',
   '/assets/images/bow-silver-ring.jpg', true),

  ('Curved Wave Ring', 'Rings', 140.00,
   'An organic, wave-contoured band that catches the light along every curve. Polished sterling silver, comfortable for daily wear.',
   '/assets/images/curved-wave-ring.jpg', false),

  ('Double Layer Wave Ring', 'Rings', 175.00,
   'Twin parallel waves run side by side around the band, creating an open, architectural silhouette in mirror-polished silver.',
   '/assets/images/double-layer-wave-ring.jpg', false),

  ('Intertwined Twist Ring', 'Rings', 155.00,
   'A hand-textured, woven silver band inspired by braided cord — a tactile, one-of-a-kind finish on every piece.',
   '/assets/images/intertwined-twist-ring.jpg', false),

  ('Freshwater Pearl Ring', 'Rings', 210.00,
   'Five inline freshwater pearls set along a fine textured silver band, finished with a warm mother-of-pearl accent.',
   '/assets/images/freshwater-pearl-ring.jpg', true),

  ('Pink Heart Gem Ring', 'Rings', 240.00,
   'Heart-cut pink gemstones alternate with micro-pavé accents around a polished silver eternity band.',
   '/assets/images/pink-heart-gem-ring.jpg', true),

  ('Multi-Band Beaded Ring', 'Rings', 190.00,
   'Multiple slim beaded bands coil together into a single statement ring — stacked, sculptural, entirely in silver.',
   '/assets/images/multiband-beaded-ring.jpg', false),

  ('Enamel Bow Earrings', 'Earrings', 130.00,
   'Pearl-finish enamel bows in gold vermeil, centered with a line of pavé stones. Soft, feminine, unmistakably ZAVEL.',
   '/assets/images/enamel-bow-earrings.jpg', true),

  ('Gold Sphere Studs', 'Earrings', 95.00,
   'Mirror-polished gold sphere studs — a modern staple that pairs with everything, worn on their own or stacked.',
   '/assets/images/gold-sphere-studs.jpg', false),

  ('Silver Sphere Studs', 'Earrings', 85.00,
   'The cool-tone companion to our Gold Sphere Studs — polished sterling silver spheres with a secure friction back.',
   '/assets/images/silver-sphere-studs.jpg', false)
on conflict do nothing;
