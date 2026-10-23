import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { $ as $$Base, u as useT, h as href, a as $$Stars, d as $$Image, e as logoAr, f as logoEn, r as routes, b as $$Icon, g as artAlt, i as art, s as starNote } from './Base_FD_NNjDc.mjs';
/* empty css                         */
/* empty css                         */
import { $ as $$Breadcrumbs } from './Breadcrumbs_B900l8Ag.mjs';
import { $ as $$Pending } from './Pending_Dt-CZR-L.mjs';
import { s as sun } from './sun_ANq8fSUO.mjs';

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$AboutView = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AboutView;
  const { locale } = Astro2.props;
  const t = useT(locale);
  const palette = [
    { name: locale === "ar" ? "\u0639\u0627\u062C\u064A" : "Ivory", v: "var(--color-paper)" },
    { name: locale === "ar" ? "\u0644\u0627\u0641\u0646\u062F\u0631" : "Lavender", v: "var(--color-lavender)" },
    { name: locale === "ar" ? "\u0646\u064A\u0644\u064A" : "Indigo", v: "var(--color-indigo)" },
    { name: locale === "ar" ? "\u0648\u0631\u062F\u064A" : "Blush", v: "var(--color-blush)" },
    { name: locale === "ar" ? "\u0634\u0645\u0633\u064A" : "Butter", v: "var(--color-butter)" }
  ];
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "locale": locale, "path": routes.about, "title": `${t("about.title")} | ${t("meta.siteName")}`, "description": t("about.desc") }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container page"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: t("common.home"), href: href(locale) }, { label: t("about.title") }], "locale": locale })} <section class="about-hero wallpaper"> ${renderComponent($$result2, "Stars", $$Stars, { "count": 12, "seed": 5 })} <div class="about-hero__logos"> ${renderComponent($$result2, "Image", $$Image, { "src": logoAr, "alt": "\u0646\u064F\u0648\u0645\u0629", "width": 300, "densities": [1, 2], "loading": "eager" })} ${renderComponent($$result2, "Image", $$Image, { "src": logoEn, "alt": "Nooma", "width": 300, "densities": [1, 2], "loading": "eager" })} </div> </section> <div class="about"> <div class="about__copy prose"> <h1>${t("about.title")}</h1> <p class="page__lead">${t("about.lead")}</p> <p>${t("about.p1")}</p> <p>${t("about.p2")}</p> ${renderComponent($$result2, "Pending", $$Pending, { "locale": locale, "text": t("about.storyPending") })} <a class="btn"${addAttribute(href(locale, routes.shop), "href")}>${t("about.cta")} ${renderComponent($$result2, "Icon", $$Icon, { "name": "arrow", "class": "flip-rtl" })}</a> </div> <div class="about__art"> ${renderComponent($$result2, "Image", $$Image, { "class": "about__sun", "src": sun, "alt": "", "width": 200, "densities": [1, 2] })} ${renderComponent($$result2, "Image", $$Image, { "src": art["mirror-siblings"], "alt": artAlt["mirror-siblings"][locale], "width": 320, "densities": [1, 2] })} </div> </div> <section class="about-palette"${addAttribute(locale === "ar" ? "\u0623\u0644\u0648\u0627\u0646 \u0646\u064F\u0648\u0645\u0629" : "Nooma colours", "aria-label")}> <ul role="list"> ${palette.map((c, i) => renderTemplate`<li data-reveal${addAttribute(`--i:${i}; --c:${c.v}`, "style")}><span></span>${c.name}</li>`)} </ul> </section> <figure class="about-note" data-reveal="scale"> <img${addAttribute(starNote.src, "src")} width="360" height="345"${addAttribute(t("about.signature"), "alt")} loading="lazy"> </figure> </div> ` })}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/views/AboutView.astro", void 0);

export { $$AboutView as $ };
