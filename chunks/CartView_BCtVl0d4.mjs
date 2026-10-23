import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { $ as $$Base, u as useT, h as href, j as $$CartPanel, r as routes } from './Base_FD_NNjDc.mjs';
/* empty css                         */
import { $ as $$Breadcrumbs } from './Breadcrumbs_B900l8Ag.mjs';

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$CartView = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CartView;
  const { locale } = Astro2.props;
  const t = useT(locale);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "locale": locale, "path": routes.cart, "title": `${t("cart.title")} | ${t("meta.siteName")}`, "description": t("cart.note"), "noindex": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container section--tight"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: t("common.home"), href: href(locale) }, { label: t("cart.title") }], "locale": locale })} <h1>${t("cart.title")}</h1> <div class="cart-page"> ${renderComponent($$result2, "CartPanel", $$CartPanel, { "locale": locale, "variant": "page" })} </div> </div> ` })}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/views/CartView.astro", void 0);

export { $$CartView as $ };
