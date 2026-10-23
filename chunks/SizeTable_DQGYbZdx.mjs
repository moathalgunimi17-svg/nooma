import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate, d as addAttribute } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { y as sizes, u as useT } from './Base_FD_NNjDc.mjs';
import { $ as $$Pending } from './Pending_Dt-CZR-L.mjs';

const sizing = {
  "2y": { height: null, chest: null, waist: null },
  "3y": { height: null, chest: null, waist: null },
  "4y": { height: null, chest: null, waist: null },
  "5y": { height: null, chest: null, waist: null },
  "6y": { height: null, chest: null, waist: null },
  "8y": { height: null, chest: null, waist: null }
};
const sizingConfirmed = Object.values(sizing).some((m) => m.height || m.chest || m.waist);

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$SizeTable = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SizeTable;
  const { locale, only } = Astro2.props;
  const t = useT(locale);
  const rows = sizes.filter((s) => !only || only.includes(s.id));
  const cell = (v) => v ?? t("size.tbc");
  return renderTemplate`${maybeRenderHead()}<div class="size-table"> ${!sizingConfirmed && renderTemplate`${renderComponent($$result, "Pending", $$Pending, { "locale": locale })}`} <div class="size-table__scroll" tabindex="0" role="region"${addAttribute(t("size.title"), "aria-label")}> <table> <thead> <tr> <th scope="col">${t("size.col.size")}</th> <th scope="col">${t("size.col.height")}</th> <th scope="col">${t("size.col.chest")}</th> <th scope="col">${t("size.col.waist")}</th> </tr> </thead> <tbody> ${rows.map((s) => {
    const m = sizing[s.id];
    return renderTemplate`<tr> <th scope="row">${s.label[locale]}</th> <td${addAttribute({ tbc: !m?.height }, "class:list")}>${cell(m?.height ?? null)}</td> <td${addAttribute({ tbc: !m?.chest }, "class:list")}>${cell(m?.chest ?? null)}</td> <td${addAttribute({ tbc: !m?.waist }, "class:list")}>${cell(m?.waist ?? null)}</td> </tr>`;
  })} </tbody> </table> </div> </div>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/SizeTable.astro", void 0);

export { $$SizeTable as $ };
