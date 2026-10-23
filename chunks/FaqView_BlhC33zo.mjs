import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { $ as $$Base, u as useT, h as href, b as $$Icon, k as site, r as routes } from './Base_FD_NNjDc.mjs';
/* empty css                         */
/* empty css                         */
import { $ as $$Breadcrumbs } from './Breadcrumbs_B900l8Ag.mjs';
import { c as catStretch } from './cat-stretch_DB6wwrg6.mjs';

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$FaqView = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$FaqView;
  const { locale } = Astro2.props;
  const t = useT(locale);
  const qa = [1, 2, 3, 4, 5, 6].map((n) => ({ q: t(`faq.q${n}`), a: t(`faq.a${n}`) }));
  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } }))
  };
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "locale": locale, "path": routes.faq, "title": `${t("faq.title")} | ${t("meta.siteName")}`, "description": t("faq.desc"), "jsonLd": ld }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container page"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: t("common.home"), href: href(locale) }, { label: t("faq.title") }], "locale": locale })} <div class="faq"> <div> <h1>${t("faq.title")}</h1> <div class="faq__list"> ${qa.map((x, i) => renderTemplate`<details${addAttribute(i === 0, "open")} data-reveal${addAttribute(`--i:${i}`, "style")}> <summary>${x.q}<span class="faq__plus" aria-hidden="true">${renderComponent($$result2, "Icon", $$Icon, { "name": "plus" })}</span></summary> <p>${x.a}</p> </details>`)} </div> </div> <aside class="page__card page__card--tint faq__aside"> <img${addAttribute(catStretch.src, "src")} width="140" height="195" alt="" loading="lazy"> <h2>${t("contact.lead")}</h2> <a class="btn btn--wa btn--block"${addAttribute(site.contact.whatsappLink, "href")} target="_blank" rel="noopener">${renderComponent($$result2, "Icon", $$Icon, { "name": "whatsapp" })} ${t("contact.wa")}</a> <a class="link-arrow"${addAttribute(href(locale, routes.sizeGuide), "href")}>${t("nav.sizeGuide")} ${renderComponent($$result2, "Icon", $$Icon, { "name": "arrow" })}</a> </aside> </div> </div> ` })}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/views/FaqView.astro", void 0);

export { $$FaqView as $ };
