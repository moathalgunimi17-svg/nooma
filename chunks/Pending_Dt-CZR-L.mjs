import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { b as $$Icon, u as useT } from './Base_FD_NNjDc.mjs';

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$Pending = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pending;
  const { locale, text } = Astro2.props;
  const t = useT(locale);
  return renderTemplate`${maybeRenderHead()}<div class="pending" role="note"> ${renderComponent($$result, "Icon", $$Icon, { "name": "info" })} <p><strong>${t("pending.label")}</strong>${text ?? t("pending.text")}</p> </div>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/Pending.astro", void 0);

export { $$Pending as $ };
