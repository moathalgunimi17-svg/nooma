import { c as createAstro, a as createComponent, r as renderComponent, e as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { q as getProduct, t as getCategory, v as colourPhotos, g as artAlt, i as art, w as getImage, p as products, h as href, r as routes, k as site, $ as $$Base, u as useT, d as $$Image, b as $$Icon, x as sizeById } from './Base_FD_NNjDc.mjs';
/* empty css                         */
/* empty css                          */
import { $ as $$Breadcrumbs } from './Breadcrumbs_B900l8Ag.mjs';
import { f as formatPrice, $ as $$ProductCard } from './ProductCard_CpG3rK1G.mjs';
import { $ as $$SizeTable } from './SizeTable_DQGYbZdx.mjs';
import { $ as $$Pending } from './Pending_Dt-CZR-L.mjs';

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$ProductView = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductView;
  const { locale, slug } = Astro2.props;
  const t = useT(locale);
  const p = getProduct(slug);
  const cat = getCategory(p.categoryId);
  const media = p.colourways.map((c) => {
    const photos = colourPhotos(c);
    return {
      colour: c,
      isArt: photos.length === 0,
      images: photos.length ? photos : [art[c.art]],
      alt: photos.length ? `${p.name[locale]} \u2014 ${c.name[locale]}` : artAlt[c.art][locale]
    };
  });
  const thumbs = await Promise.all(
    media.flatMap((m) => m.images.map(async (img) => ({ colour: m.colour.id, src: (await getImage({ src: img, width: 160, format: "webp" })).src })))
  );
  const related = [
    ...products.filter((x) => x.id !== p.id && x.categoryId === p.categoryId),
    ...products.filter((x) => x.id !== p.id && x.categoryId !== p.categoryId)
  ].slice(0, 4);
  const title = `${p.name[locale]} | ${t("meta.siteName")}`;
  const desc = `${p.summary[locale]} \u2014 ${p.description[locale]}`.slice(0, 158);
  const og = (await getImage({ src: media[0].images[0], width: 600, format: "jpg", background: "#FFF6F5" })).src;
  const crumbs = [
    { label: t("common.home"), href: href(locale) },
    ...cat ? [{ label: cat.name[locale], href: href(locale, routes.collection(cat.slug)) }] : [],
    { label: p.name[locale] }
  ];
  const productLd = !p.sample && p.price !== null ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name[locale],
    description: p.description[locale],
    image: new URL(og, Astro2.site ?? site.domain).href,
    brand: { "@type": "Brand", name: "Nooma" },
    offers: {
      "@type": "Offer",
      priceCurrency: site.commerce.currency,
      price: p.price.toFixed(3),
      url: new URL(href(locale, routes.product(p.slug)), Astro2.site ?? site.domain).href
    }
  } : void 0;
  const tint = cat?.tint ?? "lavender";
  const isSoldOut = (id) => p.stock ? !((p.stock[id] ?? 0) > 0) : false;
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "locale": locale, "path": routes.product(p.slug), "title": title, "description": desc, "ogImage": og, "jsonLd": productLd }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container pdp" data-pdp${addAttribute(p.id, "data-id")}${addAttribute(p.name[locale], "data-name")}> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": crumbs, "locale": locale })} <div class="pdp__grid"> <div class="pdp__gallery"${addAttribute(`--tint: var(--tint-${tint})`, "style")}> <div class="pdp__stage"> <span class="pdp__hole" aria-hidden="true"></span> ${media.map((m, i) => renderTemplate`<figure class="pdp__slide"${addAttribute(m.colour.id, "data-colour-slide")}${addAttribute(i !== 0, "hidden")}> ${renderComponent($$result2, "Image", $$Image, { "src": m.images[0], "alt": m.alt, "widths": [360, 560, 760], "sizes": "(max-width: 900px) 90vw, 560px", "loading": i === 0 ? "eager" : "lazy", "fetchpriority": i === 0 ? "high" : void 0 })} </figure>`)} ${media.some((m) => m.isArt) && renderTemplate`<p class="pdp__art-note">${renderComponent($$result2, "Icon", $$Icon, { "name": "info" })} ${t("product.illustration")} · ${t("product.photoSoon")}</p>`} </div> ${thumbs.length > 1 && renderTemplate`<div class="pdp__thumbs" role="group"${addAttribute(t("product.colour"), "aria-label")}> ${thumbs.map((th, i) => {
    const c = p.colourways.find((x) => x.id === th.colour);
    return renderTemplate`<button type="button" class="pdp__thumb"${addAttribute(th.colour, "data-thumb")}${addAttribute(i === 0 ? "true" : "false", "aria-pressed")}${addAttribute(`--sw: ${c.swatch}`, "style")}> <img${addAttribute(th.src, "src")} alt="" width="80" height="96" decoding="async"> <span class="visually-hidden">${c.name[locale]}</span> </button>`;
  })} </div>`} </div> <div class="pdp__info"> <div class="pdp__chips"> ${cat && renderTemplate`<a class="chip"${addAttribute(href(locale, routes.collection(cat.slug)), "href")}>${cat.name[locale]}</a>`} ${p.sample && renderTemplate`<span class="chip chip--sample">${t("product.sample")}</span>`} </div> <h1 class="pdp__title">${p.name[locale]}</h1> <p class="pdp__price"> ${p.price === null ? renderTemplate`<span class="muted">${t("product.priceTbc")}</span>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate`${p.compareAtPrice && renderTemplate`<s class="muted">${formatPrice(p.compareAtPrice, locale)}</s>`}<span>${formatPrice(p.price, locale)}</span> ` })}`} </p> <p class="pdp__summary">${p.summary[locale]}</p> ${p.sample && renderTemplate`<p class="pdp__sample-note">${renderComponent($$result2, "Icon", $$Icon, { "name": "info" })} ${t("product.sampleLong")}</p>`} <form class="pdp__form" data-pdp-form novalidate> <fieldset class="opt-group"${addAttribute(p.colourways.length < 2, "hidden")}> <legend>${t("product.colour")} <span data-colour-name>${p.colourways[0].name[locale]}</span></legend> <div class="swatches"> ${p.colourways.map((c, i) => renderTemplate`<label class="swatch"${addAttribute(`--sw: ${c.swatch}`, "style")}> <input type="radio" name="colour"${addAttribute(c.id, "value")}${addAttribute(i === 0, "checked")}${addAttribute(c.name[locale], "data-name")}> <span>${c.name[locale]}</span> </label>`)} </div> </fieldset> <fieldset class="opt-group" aria-describedby="pdp-size-error"> <legend> ${t("product.size")} <button type="button" class="pdp__guide-link" data-open="size-dialog" aria-haspopup="dialog">${renderComponent($$result2, "Icon", $$Icon, { "name": "ruler" })} ${t("product.sizeGuide")}</button> </legend> <div class="sizes" data-size-list> ${p.sizeIds.map((id) => {
    const out = isSoldOut(id);
    return renderTemplate`<label class="size-chip"> <input type="radio" name="size"${addAttribute(id, "value")}${addAttribute(out, "disabled")} required> <span>${sizeById.get(id).label[locale]}${out && renderTemplate`<small class="visually-hidden"> — ${t("product.outOfStock")}</small>`}</span> </label>`;
  })} </div> <p class="field-error" id="pdp-size-error" data-size-error aria-live="assertive"></p> </fieldset> <div class="pdp__buy"> <div class="stepper" role="group"${addAttribute(t("product.qty"), "aria-label")}> <button type="button" class="stepper__btn" data-qty-dec disabled>${renderComponent($$result2, "Icon", $$Icon, { "name": "minus" })}<span class="visually-hidden">${t("product.decrease")}</span></button> <input class="stepper__input" lang="en" dir="ltr" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" name="qty" value="1" min="1"${addAttribute(site.commerce.maxQtyPerLine, "max")}${addAttribute(t("product.qty"), "aria-label")} data-qty> <button type="button" class="stepper__btn" data-qty-inc>${renderComponent($$result2, "Icon", $$Icon, { "name": "plus" })}<span class="visually-hidden">${t("product.increase")}</span></button> </div> <button class="btn pdp__add" type="submit"${addAttribute(p.price === null, "disabled")} data-add> ${renderComponent($$result2, "Icon", $$Icon, { "name": "bag" })} <span class="btn__label">${t("product.add")}</span> </button> </div> <button class="btn btn--wa btn--block" type="button" data-wa-direct> ${renderComponent($$result2, "Icon", $$Icon, { "name": "whatsapp" })} ${t("product.orderWa")} </button> </form> <div class="pdp__acc"> <details open> <summary>${t("product.details")}${renderComponent($$result2, "Icon", $$Icon, { "name": "chevronDown" })}</summary> <div><p>${p.description[locale]}</p></div> </details> <details> <summary>${t("product.delivery")}${renderComponent($$result2, "Icon", $$Icon, { "name": "chevronDown" })}</summary> <div> <p>${t("product.deliveryText")}</p> <p> <a${addAttribute(href(locale, routes.shipping), "href")}>${t("policy.shipping")}</a> ·
<a${addAttribute(href(locale, routes.returns), "href")}>${t("policy.returns")}</a> </p> ${renderComponent($$result2, "Pending", $$Pending, { "locale": locale })} </div> </details> <details> <summary>${t("size.help")}${renderComponent($$result2, "Icon", $$Icon, { "name": "chevronDown" })}</summary> <div> <p>${t("size.helpText")}</p> <a class="link-arrow"${addAttribute(site.contact.whatsappLink, "href")} target="_blank" rel="noopener">${renderComponent($$result2, "Icon", $$Icon, { "name": "whatsapp" })} ${t("contact.wa")}</a> </div> </details> </div> </div> </div> </div> <div class="pdp-bar" data-pdp-bar hidden> <div class="container pdp-bar__inner"> <div class="pdp-bar__meta"> <strong>${p.name[locale]}</strong> <span>${p.price === null ? t("product.priceTbc") : formatPrice(p.price, locale)}</span> </div> <button class="btn btn--sm" type="button" data-bar-add${addAttribute(p.price === null, "disabled")}>${renderComponent($$result2, "Icon", $$Icon, { "name": "bag" })} ${t("product.add")}</button> </div> </div> <dialog class="sheet sheet--bottom size-dialog" id="size-dialog" aria-labelledby="size-dialog-title"> <div class="sheet__head"> <h2 id="size-dialog-title">${t("size.title")}</h2> <button class="icon-btn" type="button" data-close>${renderComponent($$result2, "Icon", $$Icon, { "name": "close" })}<span class="visually-hidden">${t("a11y.close")}</span></button> </div> <div class="sheet__body"> ${renderComponent($$result2, "SizeTable", $$SizeTable, { "locale": locale, "only": p.sizeIds })} <p class="muted size-dialog__help">${t("size.helpText")}</p> <a class="link-arrow"${addAttribute(href(locale, routes.sizeGuide), "href")}>${t("size.how")} ${renderComponent($$result2, "Icon", $$Icon, { "name": "arrow" })}</a> </div> </dialog> ${related.length > 0 && renderTemplate`<section class="section" aria-labelledby="related-title"> <div class="container"> <h2 id="related-title">${t("product.related")}</h2> <div class="pgrid"> ${related.map((r, i) => renderTemplate`${renderComponent($$result2, "ProductCard", $$ProductCard, { "product": r, "locale": locale, "index": i })}`)} </div> </div> </section>`}` })} ${renderScript($$result, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/views/ProductView.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/views/ProductView.astro", void 0);

export { $$ProductView as $ };
