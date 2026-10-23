import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { $ as $$Base, u as useT, h as href, d as $$Image, g as artAlt, i as art, k as site, b as $$Icon, r as routes } from './Base_FD_NNjDc.mjs';
/* empty css                         */
/* empty css                          */
/* empty css                         */
import { $ as $$Breadcrumbs } from './Breadcrumbs_B900l8Ag.mjs';
import { $ as $$SizeTable } from './SizeTable_DQGYbZdx.mjs';

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$SizeGuideView = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SizeGuideView;
  const { locale } = Astro2.props;
  const t = useT(locale);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "locale": locale, "path": routes.sizeGuide, "title": `${t("size.title")} | ${t("meta.siteName")}`, "description": t("size.desc") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container page"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: t("common.home"), href: href(locale) }, { label: t("size.title") }], "locale": locale })} <header class="page__head"> <div> <h1>${t("size.title")}</h1> <p class="page__lead">${t("size.intro")}</p> </div> ${renderComponent($$result2, "Image", $$Image, { "class": "page__art", "src": art["kid-brushing"], "alt": artAlt["kid-brushing"][locale], "width": 180, "densities": [1, 2], "loading": "eager" })} </header> <div class="page__split"> <section aria-labelledby="table-title"> <h2 id="table-title" class="visually-hidden">${t("size.title")}</h2> ${renderComponent($$result2, "SizeTable", $$SizeTable, { "locale": locale })} </section> <aside class="page__card"> <h2>${t("size.how")}</h2> <ol class="measure" role="list"> <li><span>1</span>${t("size.how.1")}</li> <li><span>2</span>${t("size.how.2")}</li> <li><span>3</span>${t("size.how.3")}</li> </ol> <div class="page__help"> <h3>${t("size.help")}</h3> <p>${t("size.helpText")}</p> <a class="btn btn--wa"${addAttribute(site.contact.whatsappLink, "href")} target="_blank" rel="noopener">${renderComponent($$result2, "Icon", $$Icon, { "name": "whatsapp" })} ${t("contact.wa")}</a> </div> </aside> </div> </div> ` })}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/views/SizeGuideView.astro", void 0);

export { $$SizeGuideView as $ };
