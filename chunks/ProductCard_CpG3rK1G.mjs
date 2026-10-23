import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, r as renderComponent, b as renderTemplate, F as Fragment } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { t as getCategory, h as href, r as routes, v as colourPhotos, z as coverImage, d as $$Image, b as $$Icon, u as useT } from './Base_FD_NNjDc.mjs';

const formatters = /* @__PURE__ */ new Map();
function formatPrice(amount, locale, currency = "OMR") {
  const key = `${locale}:${currency}`;
  let f = formatters.get(key);
  if (!f) {
    f = new Intl.NumberFormat(locale === "ar" ? "ar-OM-u-nu-latn" : "en-OM", {
      style: "currency",
      currency,
      minimumFractionDigits: 3,
      maximumFractionDigits: 3
    });
    formatters.set(key, f);
  }
  return f.format(amount);
}

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$ProductCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ProductCard;
  const { product: p, locale, index = 0, eager = false } = Astro2.props;
  const t = useT(locale);
  const cat = getCategory(p.categoryId);
  const first = p.colourways[0];
  const url = href(locale, routes.product(p.slug));
  const tint = cat?.tint ?? "lavender";
  const hasPhoto = colourPhotos(first).length > 0;
  return renderTemplate`${maybeRenderHead()}<article class="pcard" data-product-card${addAttribute(p.id, "data-id")}${addAttribute(p.categoryId, "data-category")}${addAttribute(p.sizeIds.join(" "), "data-sizes")}${addAttribute(p.colourways.map((c) => c.id).join(" "), "data-colours")}${addAttribute(p.price ?? "", "data-price")}${addAttribute(p.featured ? "1" : "0", "data-featured")}${addAttribute(index, "data-order")}${addAttribute(p.name[locale], "data-name")}${addAttribute(`--tint: var(--tint-${tint}); --i: ${index % 4}`, "style")} data-reveal> <a class="pcard__media"${addAttribute(url, "href")} tabindex="-1" aria-hidden="true"> <span class="pcard__hole"></span> ${renderComponent($$result, "Image", $$Image, { "class": "pcard__img", "src": coverImage(first), "alt": "", "widths": [240, 360, 480], "sizes": "(max-width: 640px) 46vw, (max-width: 1100px) 30vw, 260px", "loading": eager ? "eager" : "lazy" })} ${!hasPhoto && renderTemplate`<span class="chip chip--art pcard__art-label">${t("product.illustration")}</span>`} </a> <div class="pcard__body"> ${p.sample && renderTemplate`<span class="chip chip--sample pcard__sample">${t("product.sample")}</span>`} <h3 class="pcard__name"><a${addAttribute(url, "href")}>${p.name[locale]}</a></h3> <p class="pcard__summary">${p.summary[locale]}</p> <div class="pcard__foot"> <p class="pcard__price"> ${p.price === null ? renderTemplate`<span class="muted">${t("product.priceTbc")}</span>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${p.compareAtPrice && renderTemplate`<s class="muted">${formatPrice(p.compareAtPrice, locale)}</s>`}<span>${formatPrice(p.price, locale)}</span> ` })}`} </p> <ul role="list" class="pcard__swatches"${addAttribute(t("product.colour"), "aria-label")}> ${p.colourways.map((c) => renderTemplate`<li${addAttribute(`--sw: ${c.swatch}`, "style")}${addAttribute(c.name[locale], "title")}><span class="visually-hidden">${c.name[locale]}</span></li>`)} </ul> </div> <button class="btn btn--soft btn--sm pcard__add" type="button"${addAttribute(p.id, "data-quick-add")}${addAttribute(p.price === null, "disabled")}> ${renderComponent($$result, "Icon", $$Icon, { "name": "bag" })} ${t("product.quickAdd")} </button> </div> </article>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/ProductCard.astro", void 0);

export { $$ProductCard as $, formatPrice as f };
