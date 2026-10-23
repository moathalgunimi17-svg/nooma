import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
import { $ as $$Base, u as useT, h as href, b as $$Icon, r as routes, k as site } from './Base_FD_NNjDc.mjs';
/* empty css                         */
/* empty css                         */
import { $ as $$Breadcrumbs } from './Breadcrumbs_B900l8Ag.mjs';
import { $ as $$Pending } from './Pending_Dt-CZR-L.mjs';

const policies = {
  shipping: {
    key: "shipping",
    known: [
      { ar: "نوصل لجميع دول العالم (كما ورد في حساب نُومة على إنستغرام).", en: "We deliver worldwide (as stated on Nooma’s Instagram)." },
      { ar: "تُرسل الطلبات عبر الواتساب، ويؤكد فريق نُومة رسوم التوصيل ومدته لكل طلب قبل اعتماده.", en: "Orders are sent on WhatsApp, and the Nooma team confirms delivery fees and timing for each order before it is accepted." },
      { ar: "لا يضيف الموقع أي رسوم توصيل تلقائياً.", en: "The website never adds a delivery fee automatically." }
    ],
    needs: [
      { ar: "رسوم التوصيل داخل عُمان وخارجها", en: "Delivery fees inside and outside Oman" },
      { ar: "مدة تجهيز الطلب ومدة التوصيل المتوقعة", en: "Order preparation time and expected delivery times" },
      { ar: "شركات الشحن المستخدمة وإمكانية تتبّع الشحنة", en: "Carriers used and whether tracking is available" },
      { ar: "أي حد أدنى للتوصيل المجاني (إن وُجد)", en: "Any free-delivery threshold (if offered)" }
    ]
  },
  returns: {
    key: "returns",
    known: [
      { ar: "لكل استفسار عن الاستبدال أو الإرجاع، تواصلي مع فريق نُومة عبر الواتساب.", en: "For any exchange or return question, contact the Nooma team on WhatsApp." }
    ],
    needs: [
      { ar: "هل يتوفر الاستبدال؟ وهل يتوفر الإرجاع واسترداد المبلغ؟", en: "Are exchanges offered? Are returns and refunds offered?" },
      { ar: "المدة المسموحة بعد الاستلام", en: "The allowed period after delivery" },
      { ar: "شروط المنتج (غير مستخدم، بالبطاقة والتغليف…)", en: "Item conditions (unworn, with tags and packaging…)" },
      { ar: "من يتحمّل رسوم الشحن عند الاستبدال أو الإرجاع", en: "Who pays shipping for exchanges or returns" },
      { ar: "طريقة ومدة استرداد المبلغ", en: "Refund method and timing" }
    ]
  },
  privacy: {
    key: "privacy",
    known: [
      { ar: "لا يحتاج الموقع إلى حساب أو تسجيل دخول.", en: "The website needs no account or sign-in." },
      { ar: "محتويات الحقيبة تُحفظ في متصفحك على جهازك فقط (التخزين المحلي)، ولا تُرسل إلى أي خادم.", en: "Your bag is stored only in your browser on your device (local storage) and is never sent to a server." },
      { ar: "لا يستخدم الموقع أدوات تحليل أو تتبّع أو إعلانات.", en: "The website uses no analytics, tracking or advertising tools." },
      { ar: "عند الضغط على الواتساب أو البريد أو إنستغرام تنتقلين إلى تلك الخدمة، وتطبق سياساتها. رسالة الطلب تحتوي فقط على القطع التي اخترتِها.", en: "When you tap WhatsApp, email or Instagram you move to that service and its policies apply. The order message contains only the items you chose." },
      { ar: "نموذج التواصل لا يرسل بياناتك إلى خادم؛ بل يفتح تطبيق البريد لديك.", en: "The contact form sends nothing to a server; it opens your own email app." }
    ],
    needs: [
      { ar: "الاسم القانوني للنشاط التجاري وبيانات التواصل لطلبات الخصوصية", en: "The business’s legal name and a contact for privacy requests" },
      { ar: "مدة الاحتفاظ ببيانات الطلبات المرسلة عبر الواتساب", en: "How long order details received on WhatsApp are kept" },
      { ar: "مراجعة قانونية للنص النهائي", en: "Legal review of the final text" }
    ]
  },
  terms: {
    key: "terms",
    known: [
      { ar: "إرسال رسالة الطلب عبر الواتساب لا يعني أن الطلب مؤكد أو مدفوع؛ يتأكد الطلب برد فريق نُومة.", en: "Sending the order message on WhatsApp does not mean the order is confirmed or paid; it is confirmed by the Nooma team’s reply." },
      { ar: "الأسعار معروضة بالريال العُماني.", en: "Prices are shown in Omani rials." }
    ],
    needs: [
      { ar: "الاسم القانوني للنشاط ورقم السجل التجاري (إن وُجد)", en: "The business’s legal name and commercial registration (if any)" },
      { ar: "طرق الدفع وشروطها", en: "Payment methods and terms" },
      { ar: "سياسة إلغاء الطلب", en: "Order cancellation policy" },
      { ar: "القانون المطبَّق وجهة حل النزاعات", en: "Governing law and dispute resolution" }
    ]
  }
};

const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$PolicyView = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$PolicyView;
  const { locale, doc } = Astro2.props;
  const t = useT(locale);
  const p = policies[doc];
  const title = t(`policy.${doc}`);
  const desc = t(`policy.${doc}Desc`);
  const others = ["shipping", "returns", "privacy", "terms"].filter((k) => k !== doc);
  return renderTemplate`${renderComponent($$result, "Base", $$Base, { "locale": locale, "path": routes[doc], "title": `${title} | ${t("meta.siteName")}`, "description": desc }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="container page"> ${renderComponent($$result2, "Breadcrumbs", $$Breadcrumbs, { "items": [{ label: t("common.home"), href: href(locale) }, { label: title }], "locale": locale })} <div class="policy"> <article class="prose"> <h1>${title}</h1> ${renderComponent($$result2, "Pending", $$Pending, { "locale": locale })} <h2>${t("policy.known")}</h2> <ul>${p.known.map((k) => renderTemplate`<li>${k[locale]}</li>`)}</ul> <h2>${t("policy.needs")}</h2> <ul class="policy__needs" role="list"> ${p.needs.map((n) => renderTemplate`<li>${renderComponent($$result2, "Icon", $$Icon, { "name": "info" })} ${n[locale]}</li>`)} </ul> </article> <aside class="page__card policy__aside"> <h2>${t("nav.help")}</h2> <ul role="list" class="policy__links"> ${others.map((k) => renderTemplate`<li><a${addAttribute(href(locale, routes[k]), "href")}>${t(`policy.${k}`)}</a></li>`)} <li><a${addAttribute(href(locale, routes.faq), "href")}>${t("faq.title")}</a></li> </ul> <a class="btn btn--wa btn--block"${addAttribute(site.contact.whatsappLink, "href")} target="_blank" rel="noopener">${renderComponent($$result2, "Icon", $$Icon, { "name": "whatsapp" })} ${t("contact.wa")}</a> </aside> </div> </div> ` })}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/views/PolicyView.astro", void 0);

export { $$PolicyView as $ };
