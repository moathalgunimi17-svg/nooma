# Nooma | نُومة — storefront

A bilingual (Arabic first, English second) static storefront for Nooma's children's pajamas.
Customers browse the catalogue, fill a bag, and send the order to Nooma on WhatsApp.
The site takes no payments and stores no customer data on a server.

> **The catalogue is sample data.** The products, prices and sizes in `src/data/catalog.ts` were made up so that
> the shop, the filters, the cart and the WhatsApp order could be built and tested. Every sample product shows a
> visible "sample" label until it is replaced. See [Before launch](#before-launch).

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

The build is plain static files in `dist/`. Any static host works (Netlify, Cloudflare Pages, Vercel, GitHub Pages, cPanel hosting).

- **On its own domain** (e.g. nooma.om): build normally. `site` defaults to `https://nooma.om`.
- **Elsewhere**, set the address before building so canonical links, `hreflang` and the sitemap are correct:

```bash
SITE_URL=https://example.github.io BASE_PATH=/nooma/ npm run build
```

Update `public/robots.txt` if the domain changes (it points to `https://nooma.om/sitemap-index.xml`).
The `/cart/` page is excluded from the sitemap and marked `noindex`.

## How ordering works

1. The bag lives in the visitor's own browser (`localStorage`, key `nooma.cart.v1`). It holds only product id, colour,
   size and quantity. Prices are always looked up again from the catalogue, so an old bag can never show an old price.
2. "Order on WhatsApp" builds a message with every item, colour, size, quantity, the subtotal, a note that delivery is
   confirmed on WhatsApp, and the optional gift note.
3. Then:
   - **`whatsappNumber` is `null` (current setting):** the message is copied to the clipboard and Nooma's verified
     link `https://wa.me/message/44ZHUR56MI5GD1` opens. The customer pastes the message. If copying is blocked, the
     message is shown in a box to copy by hand.
   - **`whatsappNumber` is set:** `wa.me/<number>?text=<message>` opens with the order already typed.
4. The site never says an order has been placed or paid. It tells the customer that Nooma confirms the order on WhatsApp.

## Where things live

| To change… | Edit |
| --- | --- |
| Contacts, WhatsApp number, announcement bar, shipping rule, sample flag | `src/config/site.ts` |
| Products, collections, sizes | `src/data/catalog.ts` |
| Product photos | `src/assets/products/` (see the README there) |
| Size chart measurements | `src/data/sizing.ts` |
| Shipping / returns / privacy / terms wording | `src/data/policies.ts` |
| Every piece of interface text, Arabic and English | `src/i18n/ui.ts` |
| Colours, type, spacing, motion | `src/styles/tokens.css` |

All logos, characters, the cat, the sun, the star note and the stripe pattern come from Nooma's own packaging files
(bag, cards and wrapping paper, hang-tags) and are in `src/assets/brand/`.

## Before launch

1. **Replace the catalogue.** Put Nooma's real products into `src/data/catalog.ts` (same shape as the sample entries),
   set `sample: false` on each, and set `price: null` for anything whose price isn't confirmed — it then shows
   "price on request" and can't be added to the bag.
2. **Add photos** to `src/assets/products/` and list the file names on each colourway's `photos`.
3. **Set `sampleCatalog: false`** in `src/config/site.ts`. This removes the sample notices.
4. **Confirm the WhatsApp number** in international form and set `whatsappNumber` (digits only). Until then the
   copy-and-paste flow is used. The number `96102882` was supplied without a country code, so none has been added.
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
| WhatsApp number in international form (is it +968 96102882?) | Prefilled WhatsApp orders |
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
- Nothing personal is put in URLs. Shop filters in the URL are only colour, size, collection, sort and search text.
- Catalogue data embedded in pages is JSON-escaped; product text is rendered as text, never as HTML.
- No structured data is published for sample products, prices or reviews.
