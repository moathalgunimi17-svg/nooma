import { c as createAstro, a as createComponent, b as renderTemplate, u as unescapeHTML, d as addAttribute, m as maybeRenderHead } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import 'clsx';
import { u as useT } from './Base_FD_NNjDc.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$Breadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Breadcrumbs;
  const { items, locale } = Astro2.props;
  const t = useT(locale);
  const ld = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.label,
      ...it.href ? { item: new URL(it.href, Astro2.site ?? "https://nooma.om").href } : {}
    }))
  };
  return renderTemplate(_a || (_a = __template(["", '<nav class="crumbs"', '> <ol role="list"> ', ' </ol> </nav> <script type="application/ld+json">', "<\/script>"])), maybeRenderHead(), addAttribute(t("a11y.breadcrumb"), "aria-label"), items.map((it, i) => renderTemplate`<li> ${it.href ? renderTemplate`<a${addAttribute(it.href, "href")}>${it.label}</a>` : renderTemplate`<span aria-current="page">${it.label}</span>`} ${i < items.length - 1 && renderTemplate`<span class="crumbs__sep" aria-hidden="true">/</span>`} </li>`), unescapeHTML(JSON.stringify(ld)));
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/Breadcrumbs.astro", void 0);

export { $$Breadcrumbs as $ };
