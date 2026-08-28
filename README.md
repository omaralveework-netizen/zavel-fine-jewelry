# ZAVEL Fine Jewelry

A luxury jewelry storefront + admin portal built with React, Tailwind CSS,
and Supabase. Emerald-and-gold brand system, category-filterable catalog,
cart + checkout flow, and a password-protected `/admin` route with full
product CRUD.

## Stack

- **Frontend:** React 18 + Vite, React Router, Tailwind CSS, Lucide icons
- **Backend:** Supabase (Postgres + Auth + Storage)
- **Hosting:** Netlify

## Project structure

```
src/
  components/     storefront UI (Header, Hero, ProductCard, CartDrawer, ...)
  admin/          Admin Portal UI (Login, Dashboard, ProductForm, ProductTable)
  pages/          Landing.jsx (storefront) and Admin.jsx (route gate)
  context/        CartContext (localStorage cart), AuthContext (Supabase session)
  hooks/          useProducts.js — fetches the catalog, falls back to seed data
  data/           seedProducts.js — local sample catalog used before Supabase is wired up
  lib/            supabaseClient.js — reads env vars, exports the client
supabase/
  schema.sql      table, RLS policies, storage bucket, seed inserts
public/assets/images/   the 10 product photos + logo, shipped with the app
netlify.toml      SPA redirect rules + build config
.env.example      the two env vars you need
```

## 1. Run it locally

```bash
npm install
cp .env.example .env   # then fill in your Supabase values (step 2)
npm run dev
```

Without Supabase configured, the storefront still renders using the local
sample catalog in `src/data/seedProducts.js` — so you can preview the design
immediately. The Admin Portal will show a "not connected" notice until you
add your keys.

## 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Go to **Project Settings → API** and copy the **Project URL** and
   **anon public** key.
3. Put them in `.env` (locally) — see `.env.example` for the exact variable
   names.
4. Go to **SQL Editor → New query**, paste the contents of
   `supabase/schema.sql`, and run it. This creates:
   - the `products` table
   - Row Level Security policies (public read, authenticated-only write)
   - a public `product-images` storage bucket (for the Admin Portal's file
     upload option)
   - the 10 starter products, pointing at the images already bundled in
     `public/assets/images/`
5. Create your admin login: **Authentication → Users → Add user**, set an
   email + password. There is no public sign-up screen in this app on
   purpose — admins are provisioned by you, from the Supabase dashboard.

## 3. Deploy to Netlify

1. Push this project to a Git repo and connect it in Netlify, **or** drag-and-drop
   the built `dist/` folder onto Netlify.
2. Build command: `npm run build` — publish directory: `dist`
   (`netlify.toml` already sets both, plus the SPA redirect so `/admin`
   doesn't 404 on refresh).
3. In **Site configuration → Environment variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Trigger a deploy (env vars are baked in at *build* time — a redeploy is
   required after adding or changing them).

## Using the Admin Portal

Visit `/admin`, sign in with the user you created in step 2.5 above.

- **Add Product** — opens a form for name, category, price, description,
  and an image (paste a URL, or upload a file — uploads go to the
  `product-images` Storage bucket and the public URL is filled in for you).
- **Inventory table** — search by name, filter by category, edit or delete
  any row. Deleting asks for confirmation first.
- Changes save straight to the `products` table and the storefront reflects
  them immediately (no rebuild needed — it's a live database read).

## Extending this

- **Payments:** `src/components/CheckoutModal.jsx` currently just collects
  contact details and shows a confirmation — swap `handleSubmit` for your
  payment processor of choice (Stripe, SSLCommerz, etc.).
- **Orders table:** if you want to persist orders, add an `orders` table to
  `supabase/schema.sql` following the same pattern as `products`, then
  insert into it from `CheckoutModal.jsx`.
- **More categories:** the `category` column has a `check` constraint
  limited to `Rings` / `Earrings` — update the constraint in Postgres and
  the `<select>` in `ProductForm.jsx` together if you add a third.
