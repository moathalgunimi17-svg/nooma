import { A as AstroError, E as ExpectedImage, L as LocalImageUsedWrongly, M as MissingImageDimension, U as UnsupportedImageFormat, I as IncompatibleDescriptorOptions, f as UnsupportedImageConversion, t as toStyleString, N as NoImageMetadata, g as FailedToFetchRemoteImageDimensions, R as RemoteImageNotAllowed, h as ExpectedImageOptions, i as ExpectedNotESMImage, j as InvalidImageService, c as createAstro, a as createComponent, k as ImageMissingAlt, m as maybeRenderHead, d as addAttribute, s as spreadAttributes, b as renderTemplate, l as ExperimentalFontsNotEnabled, n as FontFamilyNotFound, u as unescapeHTML, r as renderComponent, e as renderScript, o as renderSlot, p as renderHead, F as Fragment } from './astro/server_1CtveiNb.mjs';
import 'piccolore';
/* empty css                         */
import { joinPaths, isRemotePath } from '@astrojs/internal-helpers/path';
import { isRemoteAllowed } from '@astrojs/internal-helpers/remote';
import 'clsx';
import * as mime from 'mrmime';

const site = {
  name: { ar: "نُومة", en: "Nooma" },
  domain: "https://nooma.om",
  // VERIFIED (brief)
  contact: {
    // VERIFIED — use exactly as supplied.
    email: "noomawholesale2026@gmail.com",
    instagramHandle: "nooma.om",
    instagramUrl: "https://www.instagram.com/nooma.om/",
    // VERIFIED — the WhatsApp link shown in the Instagram bio.
    whatsappLink: "https://wa.me/message/44ZHUR56MI5GD1",
    // VERIFIED as supplied (local format). No country code has been confirmed,
    // so it is shown and dialled exactly as given.
    phoneDisplay: "96102882",
    phoneTel: "96102882",
    /**
     * International WhatsApp number, digits only (e.g. "968XXXXXXXX").
     * NOT CONFIRMED — leave null until Nooma confirms it.
     *  - null  → the order is copied to the clipboard and the verified
     *            wa.me/message link opens; the customer pastes it.
     *  - set   → wa.me/<number>?text=<order> opens with the order prefilled.
     */
    whatsappNumber: null
  },
  commerce: {
    currency: "OMR",
    maxQtyPerLine: 10
  },
  /**
   * Announcement bar. Keep to verified statements only.
   * Set enabled:false to hide it.
   */
  announcement: {
    enabled: true,
    ar: "نوصل لجميع دول العالم — والطلب سهل عبر الواتساب",
    en: "We deliver worldwide — ordering is easy on WhatsApp"
  },
  /**
   * True while the catalogue in src/data/catalog.ts is sample data.
   * Shows a visible "sample" notice on products and prices.
   * Set to false ONLY after real products, prices and sizes are in place.
   */
  sampleCatalog: true
};

const ar = {
  "meta.siteName": "نُومة | بيجامات أطفال",
  "meta.homeTitle": "نُومة | بيجامات أطفال ناعمة وأنيقة من عُمان",
  "meta.homeDesc": "نُومة متجر بيجامات أطفال ناعمة وأنيقة من عُمان. اختاري المقاس والنقشة وأرسلي طلبك بسهولة عبر الواتساب، ونوصل لجميع دول العالم.",
  "a11y.skip": "تخطَّ إلى المحتوى",
  "a11y.menu": "القائمة",
  "a11y.closeMenu": "إغلاق القائمة",
  "a11y.close": "إغلاق",
  "a11y.home": "نُومة — الصفحة الرئيسية",
  "a11y.cartCount": "عدد القطع في الحقيبة: {n}",
  "a11y.illustration": "رسم توضيحي من هوية نُومة",
  "a11y.breadcrumb": "مسار التصفح",
  "nav.shop": "المتجر",
  "nav.collections": "المجموعات",
  "nav.allProducts": "كل البيجامات",
  "nav.about": "عن نُومة",
  "nav.contact": "تواصلي معنا",
  "nav.help": "المساعدة",
  "nav.sizeGuide": "دليل المقاسات",
  "nav.search": "بحث",
  "nav.bag": "الحقيبة",
  "nav.lang": "English",
  "nav.langCode": "EN",
  "hero.kicker": "بيجامات أطفال · من عُمان",
  "hero.title": "أحلام صغيرة، وليالٍ مليئة بالراحة",
  "hero.text": "بيجامات أطفال ناعمة وأنيقة، ترافق صغيرك في أجمل لحظات اليوم.",
  "hero.cta": "اكتشفي البيجامات",
  "hero.cta2": "تسوّقي المجموعات",
  "hero.worldwide": "نوصل لجميع دول العالم",
  "hero.whatsapp": "الطلب عبر الواتساب",
  "hero.toNight": "حان وقت النوم",
  "hero.toDay": "صباح الخير",
  "hero.nightLine": "تصبحون على خير",
  "hero.dayLine": "صباح الضحكات",
  "marquee.1": "ناعمة",
  "marquee.2": "أنيقة",
  "marquee.3": "راحة في كل لحظة",
  "marquee.4": "من عُمان إلى العالم",
  "marquee.5": "أحلام سعيدة",
  "home.collectionsTitle": "اختاري عالم صغيرك",
  "home.collectionsText": "كل مجموعة بألوانها ونقشاتها الخاصة.",
  "home.featuredTitle": "بيجامات مختارة",
  "home.featuredText": "نقشات هادئة تشبه ليلة نوم مريحة.",
  "home.viewAll": "كل البيجامات",
  "home.storyTitle": "لكل لحظة… بيجامتها",
  "home.storyText": "من أول ضحكة في الصباح إلى آخر صفحة في قصة ما قبل النوم.",
  "home.story.1.t": "صباح بطيء",
  "home.story.1.d": "تمطّط، وابتسامة، ويوم جديد يبدأ بهدوء.",
  "home.story.2.t": "مطبخ صغير",
  "home.story.2.d": "وصفة أولى، وملعقة كبيرة، وفوضى لطيفة.",
  "home.story.3.t": "لقطة للذكرى",
  "home.story.3.d": "صور تُحفظ في الألبوم وفي القلب.",
  "home.story.4.t": "دلال المساء",
  "home.story.4.d": "ماسك أخضر وكوب دافئ قبل النوم.",
  "home.story.5.t": "فرشاة الأسنان",
  "home.story.5.d": "خطوة صغيرة في روتين كل ليلة.",
  "home.story.6.t": "قصة قبل النوم",
  "home.story.6.d": "صفحة أخيرة… ثم أحلام سعيدة.",
  "home.howTitle": "كيف تطلبين من نُومة؟",
  "home.how.1": "اختاري البيجامة والمقاس",
  "home.how.2": "أضيفيها إلى الحقيبة",
  "home.how.3": "أرسلي الطلب عبر الواتساب",
  "home.how.4": "يتواصل معك فريق نُومة لتأكيد الطلب والتوصيل",
  "home.serviceTitle": "قبل أن تطلبي",
  "home.service.shipping": "التوصيل",
  "home.service.shippingText": "نوصل لجميع دول العالم. تُؤكَّد الرسوم والمدة عند الطلب.",
  "home.service.sizes": "المقاسات",
  "home.service.sizesText": "محتارة في المقاس؟ راسلينا ونساعدك في الاختيار.",
  "home.service.returns": "الاستبدال والإرجاع",
  "home.service.returnsText": "اطّلعي على السياسة قبل الطلب.",
  "home.service.help": "المساعدة",
  "home.service.helpText": "فريقنا يرد على استفساراتك عبر الواتساب.",
  "home.igTitle": "تعالي نتعرّف أكثر",
  "home.igText": "تابعي نُومة على إنستغرام لتشاهدي الجديد أولاً.",
  "home.igCta": "تابعي ⁦@nooma.om⁩",
  "home.wholesale": "للطلبات بالجملة",
  "home.noteTitle": "رسالة صغيرة من نُومة",
  "product.sample": "منتج تجريبي",
  "product.sampleLong": "هذا منتج تجريبي لعرض شكل المتجر. المنتجات والأسعار الحقيقية تضيفها نُومة قبل الإطلاق.",
  "product.illustration": "رسم توضيحي",
  "product.photoSoon": "صور المنتج الحقيقية قريباً",
  "product.priceTbc": "السعر عند الطلب",
  "product.view": "عرض التفاصيل",
  "product.quickAdd": "اختيار المقاس",
  "product.colour": "اللون",
  "product.size": "المقاس",
  "product.chooseSize": "اختاري المقاس أولاً",
  "product.qty": "الكمية",
  "product.decrease": "إنقاص الكمية",
  "product.increase": "زيادة الكمية",
  "product.add": "أضيفي إلى الحقيبة",
  "product.added": "أُضيفت إلى الحقيبة",
  "product.orderWa": "اطلبي مباشرة عبر الواتساب",
  "product.sizeGuide": "دليل المقاسات",
  "product.details": "التفاصيل",
  "product.delivery": "التوصيل والاستبدال",
  "product.deliveryText": "نوصل لجميع دول العالم، وتُؤكَّد الرسوم والمدة معك عبر الواتساب.",
  "product.related": "قد يعجبك أيضاً",
  "product.outOfStock": "نفد",
  "product.lowStock": "آخر القطع",
  "product.inStock": "متوفر",
  "product.colours": "{n} ألوان",
  "shop.title": "كل البيجامات",
  "shop.desc": "تصفّحي بيجامات نُومة للأطفال، وصفّي حسب المجموعة والمقاس واللون.",
  "shop.filters": "التصفية",
  "shop.showFilters": "تصفية وترتيب",
  "shop.applyFilters": "عرض النتائج",
  "shop.collection": "المجموعة",
  "shop.allCollections": "الكل",
  "shop.size": "المقاس",
  "shop.colour": "اللون",
  "shop.sort": "الترتيب",
  "shop.sort.featured": "المختارة أولاً",
  "shop.sort.priceAsc": "السعر: من الأقل",
  "shop.sort.priceDesc": "السعر: من الأعلى",
  "shop.sort.name": "الاسم",
  "shop.count": "{n} منتجات",
  "shop.count1": "منتج واحد",
  "shop.count2": "منتجان",
  "shop.clear": "مسح التصفية",
  "shop.remove": "إزالة: {x}",
  "shop.searchLabel": "ابحثي في المتجر",
  "shop.emptyTitle": "لا توجد بيجامات بهذه الاختيارات",
  "shop.emptyText": "جرّبي إزالة بعض عوامل التصفية، أو راسلينا ونساعدك.",
  "search.title": "ابحثي في نُومة",
  "search.placeholder": "غيوم، قلوب، خطوط…",
  "search.hint": "اكتبي اسم النقشة أو اللون",
  "search.empty": "لم نجد نتائج لـ «{q}»",
  "search.results": "{n} نتائج",
  "cart.title": "حقيبتك",
  "cart.emptyTitle": "الحقيبة تنتظر أول بيجامة",
  "cart.emptyText": "القطة نائمة… ولكن البيجامات مستيقظة.",
  "cart.continue": "تابعي التسوّق",
  "cart.remove": "إزالة",
  "cart.removed": "أُزيلت {x} من الحقيبة",
  "cart.undo": "تراجع",
  "cart.subtotal": "المجموع الفرعي",
  "cart.shipping": "التوصيل",
  "cart.shippingTbc": "يُؤكَّد عبر الواتساب",
  "cart.total": "الإجمالي قبل التوصيل",
  "cart.checkout": "إرسال الطلب عبر الواتساب",
  "cart.viewBag": "عرض الحقيبة",
  "cart.gift": "إضافة بطاقة إهداء",
  "cart.giftLabel": "نص البطاقة (اختياري)",
  "cart.giftHint": "حتى 240 حرفاً. يؤكد الفريق التفاصيل معك.",
  "cart.note": "الطلب لا يُعتبر مؤكداً أو مدفوعاً حتى يرد عليك فريق نُومة.",
  "cart.items": "{n} قطع",
  "cart.updated": "تم تحديث الحقيبة",
  "order.title": "طلبك جاهز للإرسال",
  "order.text": "راجعي تفاصيل الطلب. سيفتح الواتساب لترسليه إلى فريق نُومة.",
  "order.textCopy": "نسخنا تفاصيل طلبك. عند فتح محادثة نُومة في الواتساب، الصقي الرسالة وأرسليها.",
  "order.open": "فتح الواتساب",
  "order.copy": "نسخ الرسالة",
  "order.copied": "تم النسخ",
  "order.copyFail": "لم نتمكن من النسخ تلقائياً — حدّدي النص وانسخيه.",
  "order.preview": "نص الرسالة",
  "order.after": "بعد الإرسال، يرد عليك الفريق لتأكيد التوفر والتوصيل وطريقة الدفع.",
  "order.msg.greeting": "مرحباً نُومة 🌙 أود طلب ما يلي:",
  "order.msg.size": "المقاس",
  "order.msg.colour": "اللون",
  "order.msg.qty": "الكمية",
  "order.msg.subtotal": "المجموع الفرعي",
  "order.msg.priceTbc": "السعر يُؤكَّد",
  "order.msg.shipping": "التوصيل: بانتظار تأكيدكم",
  "order.msg.gift": "بطاقة إهداء",
  "order.msg.sample": "(تنبيه: هذا طلب تجريبي من نسخة المعاينة)",
  "order.msg.closing": "شكراً لكم!",
  "order.single": "مرحباً نُومة 🌙 أود الاستفسار عن: {x}",
  "pending.label": "بانتظار تأكيد نُومة",
  "pending.text": "هذا القسم مسودة. تُضاف التفاصيل بعد تأكيدها من نُومة.",
  "size.title": "دليل المقاسات",
  "size.desc": "كيف تختارين مقاس بيجامة نُومة المناسب لطفلك، ومتى تتواصلين معنا للمساعدة.",
  "size.intro": "أفضل طريقة لاختيار المقاس: قيسي بيجامة تناسب طفلك الآن، وقارنيها بالجدول.",
  "size.how": "كيف تقيسين؟",
  "size.how.1": "الطول: من أعلى الرأس حتى الكعب، والطفل واقف دون حذاء.",
  "size.how.2": "الصدر: حول أعرض جزء من الصدر تحت الإبطين.",
  "size.how.3": "الخصر: حول الخصر الطبيعي دون شدّ الشريط.",
  "size.col.size": "المقاس",
  "size.col.height": "الطول (سم)",
  "size.col.chest": "الصدر (سم)",
  "size.col.waist": "الخصر (سم)",
  "size.tbc": "يُؤكَّد",
  "size.help": "محتارة بين مقاسين؟",
  "size.helpText": "أرسلي لنا عمر طفلك وطوله عبر الواتساب ونساعدك في الاختيار.",
  "about.title": "عن نُومة",
  "about.desc": "نُومة علامة بيجامات أطفال من عُمان، تصمم لحظات نوم هادئة وصباحات سعيدة.",
  "about.lead": "نُومة اسم يشبه اللحظة التي تسبق النوم: هدوء، ودفء، وابتسامة صغيرة.",
  "about.p1": "نصمم بيجامات أطفال ناعمة وأنيقة، لترافق صغيرك من ضحكة الصباح إلى قصة ما قبل النوم.",
  "about.p2": "هويتنا مرسومة باليد: خطوط لافندر متموجة، وشمس صغيرة تبتسم، ونجوم وردية — كأنها صفحة من كتاب قصص.",
  "about.storyPending": "قصة التأسيس والفريق تُضاف عندما تشاركها نُومة.",
  "about.cta": "تسوّقي البيجامات",
  "about.signature": "Stay cozy, sleep well, and dream sweet",
  "contact.title": "تواصلي معنا",
  "contact.desc": "تواصلي مع نُومة عبر الواتساب أو البريد الإلكتروني أو إنستغرام، وللطلبات بالجملة راسلينا بالبريد.",
  "contact.lead": "أسرع طريقة للوصول إلينا هي الواتساب.",
  "contact.wa": "واتساب",
  "contact.waText": "للطلبات والاستفسارات",
  "contact.phone": "الهاتف",
  "contact.email": "البريد الإلكتروني",
  "contact.emailText": "للاستفسارات والطلبات بالجملة",
  "contact.ig": "إنستغرام",
  "contact.wholesaleTitle": "الطلبات بالجملة",
  "contact.wholesaleText": "للمتاجر والطلبات الكبيرة، راسلينا على البريد وسيعود إليك الفريق بالتفاصيل.",
  "contact.formTitle": "أرسلي رسالة",
  "contact.formText": "يفتح هذا النموذج تطبيق البريد لديك مع رسالتك جاهزة — لا نخزّن أي بيانات.",
  "contact.name": "الاسم",
  "contact.topic": "نوع الاستفسار",
  "contact.topic.order": "استفسار عن طلب",
  "contact.topic.size": "مساعدة في المقاس",
  "contact.topic.wholesale": "طلب بالجملة",
  "contact.topic.other": "أخرى",
  "contact.message": "الرسالة",
  "contact.send": "فتح البريد وإرسال الرسالة",
  "contact.err.name": "اكتبي اسمك من فضلك.",
  "contact.err.message": "اكتبي رسالتك (10 أحرف على الأقل).",
  "contact.ok": "فتحنا تطبيق البريد لديك. إذا لم يظهر، راسلينا مباشرة على:",
  "faq.title": "الأسئلة الشائعة",
  "faq.desc": "إجابات عن الطلب عبر الواتساب والمقاسات والتوصيل في نُومة.",
  "faq.q1": "كيف أطلب من نُومة؟",
  "faq.a1": "أضيفي البيجامات إلى الحقيبة، ثم اضغطي «إرسال الطلب عبر الواتساب». تصلنا رسالة بتفاصيل طلبك، ويرد عليك الفريق لتأكيده.",
  "faq.q2": "هل يُعتبر الطلب مؤكداً بعد إرسال رسالة الواتساب؟",
  "faq.a2": "لا. الطلب يُؤكَّد عندما يرد عليك فريق نُومة بالتوفر وتفاصيل التوصيل والدفع.",
  "faq.q3": "هل توصلون خارج عُمان؟",
  "faq.a3": "نعم، نوصل لجميع دول العالم. تُؤكَّد الرسوم والمدة حسب بلدك عند الطلب.",
  "faq.q4": "كيف أختار المقاس المناسب؟",
  "faq.a4": "اطّلعي على دليل المقاسات، وإذا كنتِ محتارة أرسلي لنا عمر طفلك وطوله عبر الواتساب.",
  "faq.q5": "هل يمكنني الطلب بالجملة؟",
  "faq.a5": "نعم، راسلينا على البريد الإلكتروني وسيتواصل معك الفريق.",
  "faq.q6": "ما طرق الدفع المتاحة؟",
  "faq.a6": "يوضّح لك الفريق طرق الدفع المتاحة عند تأكيد الطلب عبر الواتساب.",
  "policy.shipping": "الشحن والتوصيل",
  "policy.shippingDesc": "معلومات التوصيل في نُومة: نوصل لجميع دول العالم، والتفاصيل تُؤكَّد عند الطلب.",
  "policy.returns": "الاستبدال والإرجاع",
  "policy.returnsDesc": "سياسة الاستبدال والإرجاع في متجر نُومة لبيجامات الأطفال.",
  "policy.privacy": "سياسة الخصوصية",
  "policy.privacyDesc": "كيف يتعامل موقع نُومة مع بياناتك: لا حسابات، ولا تتبّع، والحقيبة محفوظة على جهازك فقط.",
  "policy.terms": "الشروط والأحكام",
  "policy.termsDesc": "الشروط والأحكام الخاصة بالطلب من متجر نُومة.",
  "policy.updated": "آخر تحديث",
  "policy.known": "ما نعرفه الآن",
  "policy.needs": "ما ينتظر تأكيد نُومة",
  "footer.tagline": "بيجامات أطفال ناعمة وأنيقة — راحة ترافق صغيرك في كل لحظة.",
  "footer.shop": "تسوّقي",
  "footer.help": "المساعدة",
  "footer.brand": "نُومة",
  "footer.contact": "تواصل",
  "footer.policies": "السياسات",
  "footer.lang": "اللغة",
  "footer.night": "تصبحون على خير",
  "footer.rights": "جميع الحقوق محفوظة",
  "common.back": "رجوع",
  "common.home": "الرئيسية",
  "common.loading": "جارٍ التحميل…",
  "common.or": "أو",
  "common.sampleBanner": "نسخة معاينة: المنتجات والأسعار المعروضة تجريبية.",
  "404.title": "هذه الصفحة غفت قليلاً",
  "404.text": "لم نجد الصفحة التي تبحثين عنها. ربما انتقلت إلى سرير آخر.",
  "404.cta": "العودة إلى الرئيسية"
};
const en = {
  "meta.siteName": "Nooma | Children's pajamas",
  "meta.homeTitle": "Nooma | Soft, elegant children's pajamas from Oman",
  "meta.homeDesc": "Nooma makes soft, elegant children's pajamas in Oman. Pick a pattern and size, send your order on WhatsApp, and we deliver worldwide.",
  "a11y.skip": "Skip to content",
  "a11y.menu": "Menu",
  "a11y.closeMenu": "Close menu",
  "a11y.close": "Close",
  "a11y.home": "Nooma — home",
  "a11y.cartCount": "Items in your bag: {n}",
  "a11y.illustration": "Illustration from the Nooma brand artwork",
  "a11y.breadcrumb": "Breadcrumb",
  "nav.shop": "Shop",
  "nav.collections": "Collections",
  "nav.allProducts": "All pajamas",
  "nav.about": "About Nooma",
  "nav.contact": "Contact us",
  "nav.help": "Help",
  "nav.sizeGuide": "Size guide",
  "nav.search": "Search",
  "nav.bag": "Bag",
  "nav.lang": "العربية",
  "nav.langCode": "ع",
  "hero.kicker": "Children's pajamas · from Oman",
  "hero.title": "Little dreams, cosy nights",
  "hero.text": "Soft, elegant children's pajamas for your little one's favourite moments of the day.",
  "hero.cta": "Discover the pajamas",
  "hero.cta2": "Shop collections",
  "hero.worldwide": "We deliver worldwide",
  "hero.whatsapp": "Order on WhatsApp",
  "hero.toNight": "It's bedtime",
  "hero.toDay": "Good morning",
  "hero.nightLine": "Sleep tight",
  "hero.dayLine": "Morning giggles",
  "marquee.1": "Soft",
  "marquee.2": "Elegant",
  "marquee.3": "Comfort in every moment",
  "marquee.4": "From Oman to the world",
  "marquee.5": "Sweet dreams",
  "home.collectionsTitle": "Choose your little one's world",
  "home.collectionsText": "Each collection has its own colours and patterns.",
  "home.featuredTitle": "Chosen pajamas",
  "home.featuredText": "Quiet patterns that feel like a good night’s sleep.",
  "home.viewAll": "All pajamas",
  "home.storyTitle": "A pair for every moment",
  "home.storyText": "From the first giggle of the morning to the last page of the bedtime story.",
  "home.story.1.t": "A slow morning",
  "home.story.1.d": "A stretch, a smile, and a new day starting gently.",
  "home.story.2.t": "Little kitchen",
  "home.story.2.d": "A first recipe, a big spoon and a lovely mess.",
  "home.story.3.t": "Click for later",
  "home.story.3.d": "Pictures kept in the album, and in the heart.",
  "home.story.4.t": "Evening pampering",
  "home.story.4.d": "A green face mask and a warm cup before bed.",
  "home.story.5.t": "Brush, brush",
  "home.story.5.d": "A small step in every night’s routine.",
  "home.story.6.t": "Bedtime story",
  "home.story.6.d": "One last page… then sweet dreams.",
  "home.howTitle": "How ordering works",
  "home.how.1": "Choose the pajamas and size",
  "home.how.2": "Add them to your bag",
  "home.how.3": "Send the order on WhatsApp",
  "home.how.4": "The Nooma team replies to confirm your order and delivery",
  "home.serviceTitle": "Before you order",
  "home.service.shipping": "Delivery",
  "home.service.shippingText": "We deliver worldwide. Fees and timing are confirmed with your order.",
  "home.service.sizes": "Sizes",
  "home.service.sizesText": "Not sure about a size? Message us and we will help.",
  "home.service.returns": "Exchanges & returns",
  "home.service.returnsText": "Read the policy before you order.",
  "home.service.help": "Help",
  "home.service.helpText": "Our team answers your questions on WhatsApp.",
  "home.igTitle": "Come say hello",
  "home.igText": "Follow Nooma on Instagram to see new pieces first.",
  "home.igCta": "Follow @nooma.om",
  "home.wholesale": "Wholesale enquiries",
  "home.noteTitle": "A little note from Nooma",
  "product.sample": "Sample product",
  "product.sampleLong": "This is a sample product showing how the store works. Nooma adds its real products and prices before launch.",
  "product.illustration": "Illustration",
  "product.photoSoon": "Real product photos coming soon",
  "product.priceTbc": "Price on request",
  "product.view": "View details",
  "product.quickAdd": "Choose size",
  "product.colour": "Colour",
  "product.size": "Size",
  "product.chooseSize": "Please choose a size first",
  "product.qty": "Quantity",
  "product.decrease": "Decrease quantity",
  "product.increase": "Increase quantity",
  "product.add": "Add to bag",
  "product.added": "Added to your bag",
  "product.orderWa": "Order directly on WhatsApp",
  "product.sizeGuide": "Size guide",
  "product.details": "Details",
  "product.delivery": "Delivery & exchanges",
  "product.deliveryText": "We deliver worldwide; fees and timing are confirmed with you on WhatsApp.",
  "product.related": "You may also like",
  "product.outOfStock": "Sold out",
  "product.lowStock": "Last pieces",
  "product.inStock": "In stock",
  "product.colours": "{n} colours",
  "shop.title": "All pajamas",
  "shop.desc": "Browse Nooma's children's pajamas and filter by collection, size and colour.",
  "shop.filters": "Filters",
  "shop.showFilters": "Filter & sort",
  "shop.applyFilters": "Show results",
  "shop.collection": "Collection",
  "shop.allCollections": "All",
  "shop.size": "Size",
  "shop.colour": "Colour",
  "shop.sort": "Sort",
  "shop.sort.featured": "Featured first",
  "shop.sort.priceAsc": "Price: low to high",
  "shop.sort.priceDesc": "Price: high to low",
  "shop.sort.name": "Name",
  "shop.count": "{n} products",
  "shop.count1": "1 product",
  "shop.count2": "2 products",
  "shop.clear": "Clear filters",
  "shop.remove": "Remove: {x}",
  "shop.searchLabel": "Search the shop",
  "shop.emptyTitle": "No pajamas match these choices",
  "shop.emptyText": "Try removing a filter, or message us and we will help.",
  "search.title": "Search Nooma",
  "search.placeholder": "Clouds, hearts, stripes…",
  "search.hint": "Type a pattern or colour",
  "search.empty": "No results for “{q}”",
  "search.results": "{n} results",
  "cart.title": "Your bag",
  "cart.emptyTitle": "Your bag is waiting for its first pair",
  "cart.emptyText": "The cat is asleep… but the pajamas are wide awake.",
  "cart.continue": "Continue shopping",
  "cart.remove": "Remove",
  "cart.removed": "{x} removed from your bag",
  "cart.undo": "Undo",
  "cart.subtotal": "Subtotal",
  "cart.shipping": "Delivery",
  "cart.shippingTbc": "Confirmed on WhatsApp",
  "cart.total": "Total before delivery",
  "cart.checkout": "Send order on WhatsApp",
  "cart.viewBag": "View bag",
  "cart.gift": "Add a gift note",
  "cart.giftLabel": "Note text (optional)",
  "cart.giftHint": "Up to 240 characters. The team confirms the details with you.",
  "cart.note": "Your order is not confirmed or paid until the Nooma team replies.",
  "cart.items": "{n} items",
  "cart.updated": "Bag updated",
  "order.title": "Your order is ready to send",
  "order.text": "Check the details. WhatsApp will open so you can send them to the Nooma team.",
  "order.textCopy": "We've copied your order. When the Nooma chat opens in WhatsApp, paste the message and send it.",
  "order.open": "Open WhatsApp",
  "order.copy": "Copy message",
  "order.copied": "Copied",
  "order.copyFail": "We couldn't copy automatically — select the text and copy it.",
  "order.preview": "Message text",
  "order.after": "Once sent, the team replies to confirm availability, delivery and payment.",
  "order.msg.greeting": "Hello Nooma 🌙 I would like to order:",
  "order.msg.size": "Size",
  "order.msg.colour": "Colour",
  "order.msg.qty": "Qty",
  "order.msg.subtotal": "Subtotal",
  "order.msg.priceTbc": "price to confirm",
  "order.msg.shipping": "Delivery: awaiting your confirmation",
  "order.msg.gift": "Gift note",
  "order.msg.sample": "(Note: this is a test order from the preview site)",
  "order.msg.closing": "Thank you!",
  "order.single": "Hello Nooma 🌙 I would like to ask about: {x}",
  "pending.label": "Awaiting Nooma’s confirmation",
  "pending.text": "This section is a draft. Details are added once Nooma confirms them.",
  "size.title": "Size guide",
  "size.desc": "How to choose the right Nooma pajama size for your child, and when to ask us for help.",
  "size.intro": "The easiest way to choose: measure pajamas that fit your child now and compare them with the table.",
  "size.how": "How to measure",
  "size.how.1": "Height: from the top of the head to the heel, standing without shoes.",
  "size.how.2": "Chest: around the widest part of the chest, under the arms.",
  "size.how.3": "Waist: around the natural waist without pulling the tape tight.",
  "size.col.size": "Size",
  "size.col.height": "Height (cm)",
  "size.col.chest": "Chest (cm)",
  "size.col.waist": "Waist (cm)",
  "size.tbc": "TBC",
  "size.help": "Between two sizes?",
  "size.helpText": "Send us your child's age and height on WhatsApp and we will help you choose.",
  "about.title": "About Nooma",
  "about.desc": "Nooma is a children's pajama brand from Oman, designing calm bedtimes and happy mornings.",
  "about.lead": "Nooma — نُومة — sounds like the moment just before sleep: calm, warm, and a small smile.",
  "about.p1": "We design soft, elegant children's pajamas to keep your little one company from the morning giggle to the bedtime story.",
  "about.p2": "Our identity is drawn by hand: wavy lavender stripes, a smiling little sun and pink stars — like a page from a storybook.",
  "about.storyPending": "The founding story and team are added once Nooma shares them.",
  "about.cta": "Shop the pajamas",
  "about.signature": "Stay cozy, sleep well, and dream sweet",
  "contact.title": "Contact us",
  "contact.desc": "Reach Nooma on WhatsApp, email or Instagram. For wholesale enquiries, please email us.",
  "contact.lead": "WhatsApp is the fastest way to reach us.",
  "contact.wa": "WhatsApp",
  "contact.waText": "Orders and questions",
  "contact.phone": "Phone",
  "contact.email": "Email",
  "contact.emailText": "Questions and wholesale enquiries",
  "contact.ig": "Instagram",
  "contact.wholesaleTitle": "Wholesale",
  "contact.wholesaleText": "For shops and larger orders, email us and the team will get back to you with details.",
  "contact.formTitle": "Send a message",
  "contact.formText": "This form opens your email app with your message ready — we store no data.",
  "contact.name": "Name",
  "contact.topic": "Topic",
  "contact.topic.order": "Question about an order",
  "contact.topic.size": "Help with sizing",
  "contact.topic.wholesale": "Wholesale order",
  "contact.topic.other": "Something else",
  "contact.message": "Message",
  "contact.send": "Open email and send",
  "contact.err.name": "Please enter your name.",
  "contact.err.message": "Please write your message (at least 10 characters).",
  "contact.ok": "We've opened your email app. If nothing appeared, email us directly at:",
  "faq.title": "Frequently asked questions",
  "faq.desc": "Answers about ordering on WhatsApp, sizing and delivery at Nooma.",
  "faq.q1": "How do I order from Nooma?",
  "faq.a1": "Add pajamas to your bag, then tap “Send order on WhatsApp”. We receive a message with your order details and the team replies to confirm it.",
  "faq.q2": "Is my order confirmed once I send the WhatsApp message?",
  "faq.a2": "No. Your order is confirmed when the Nooma team replies with availability, delivery and payment details.",
  "faq.q3": "Do you deliver outside Oman?",
  "faq.a3": "Yes, we deliver worldwide. Fees and timing for your country are confirmed when you order.",
  "faq.q4": "How do I choose the right size?",
  "faq.a4": "Check the size guide, and if you're unsure send us your child's age and height on WhatsApp.",
  "faq.q5": "Can I order wholesale?",
  "faq.a5": "Yes — email us and the team will get in touch.",
  "faq.q6": "Which payment methods are available?",
  "faq.a6": "The team explains the available payment methods when confirming your order on WhatsApp.",
  "policy.shipping": "Shipping & delivery",
  "policy.shippingDesc": "Delivery at Nooma: we ship worldwide, with details confirmed when you order.",
  "policy.returns": "Exchanges & returns",
  "policy.returnsDesc": "The exchanges and returns policy for Nooma children's pajamas.",
  "policy.privacy": "Privacy policy",
  "policy.privacyDesc": "How the Nooma website handles your data: no accounts, no tracking, and your bag stays on your device.",
  "policy.terms": "Terms & conditions",
  "policy.termsDesc": "Terms and conditions for ordering from Nooma.",
  "policy.updated": "Last updated",
  "policy.known": "What we know now",
  "policy.needs": "Awaiting confirmation from Nooma",
  "footer.tagline": "Soft, elegant children's pajamas — comfort that keeps your little one company.",
  "footer.shop": "Shop",
  "footer.help": "Help",
  "footer.brand": "Nooma",
  "footer.contact": "Contact",
  "footer.policies": "Policies",
  "footer.lang": "Language",
  "footer.night": "Sleep tight",
  "footer.rights": "All rights reserved",
  "common.back": "Back",
  "common.home": "Home",
  "common.loading": "Loading…",
  "common.or": "or",
  "common.sampleBanner": "Preview: products and prices shown are samples.",
  "404.title": "This page dozed off",
  "404.text": "We couldn't find the page you were looking for. Maybe it moved to another bed.",
  "404.cta": "Back to home"
};
const dict = { ar, en };
function useT(locale) {
  const d = dict[locale];
  return (key, vars) => {
    let s = d[key];
    if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, String(v));
    return s;
  };
}
function countLabel(locale, n) {
  const t = useT(locale);
  if (n === 1) return t("shop.count1");
  if (n === 2) return t("shop.count2");
  if (locale === "ar" && n > 10) return `${n} منتجاً`;
  return t("shop.count", { n });
}

const BASE = "/C:/Program Files/Git/nooma/".replace(/\/?$/, "/");
function href(locale, path = "") {
  const clean = path.replace(/^\/+/, "");
  return BASE + (locale === "en" ? "en/" : "") + clean;
}
function stripLocale(pathname) {
  let p = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, "");
  if (p === "en" || p.startsWith("en/")) p = p.slice(2).replace(/^\//, "");
  return p;
}
function alternate(pathname, to) {
  const path = stripLocale(pathname);
  return href(to, path.startsWith("404") ? "" : path);
}
const routes = {
  home: "",
  shop: "shop/",
  collection: (slug) => `collections/${slug}/`,
  product: (slug) => `products/${slug}/`,
  cart: "cart/",
  sizeGuide: "size-guide/",
  about: "about/",
  contact: "contact/",
  faq: "faq/",
  shipping: "shipping/",
  returns: "returns/",
  privacy: "privacy/",
  terms: "terms/"
};

const VALID_SUPPORTED_FORMATS = [
  "jpeg",
  "jpg",
  "png",
  "tiff",
  "webp",
  "gif",
  "svg",
  "avif"
];
const DEFAULT_OUTPUT_FORMAT = "webp";
const DEFAULT_HASH_PROPS = [
  "src",
  "width",
  "height",
  "format",
  "quality",
  "fit",
  "position",
  "background"
];

const DEFAULT_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  960,
  // older horizontal phones
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  1920,
  // 1080p
  2048,
  // QXGA
  2560,
  // WQXGA
  3200,
  // QHD+
  3840,
  // 4K
  4480,
  // 4.5K
  5120,
  // 5K
  6016
  // 6K
];
const LIMITED_RESOLUTIONS = [
  640,
  // older and lower-end phones
  750,
  // iPhone 6-8
  828,
  // iPhone XR/11
  1080,
  // iPhone 6-8 Plus
  1280,
  // 720p
  1668,
  // Various iPads
  2048,
  // QXGA
  2560
  // WQXGA
];
const getWidths = ({
  width,
  layout,
  breakpoints = DEFAULT_RESOLUTIONS,
  originalWidth
}) => {
  const smallerThanOriginal = (w) => !originalWidth || w <= originalWidth;
  if (layout === "full-width") {
    return breakpoints.filter(smallerThanOriginal);
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  const maxSize = originalWidth ? Math.min(doubleWidth, originalWidth) : doubleWidth;
  if (layout === "fixed") {
    return originalWidth && width > originalWidth ? [originalWidth] : [width, maxSize];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      ...breakpoints
    ].filter((w) => w <= maxSize).sort((a, b) => a - b);
  }
  return [];
};
const getSizesAttribute = ({
  width,
  layout
}) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    // If screen is wider than the max size then image width is the max size,
    // otherwise it's the width of the screen
    case "constrained":
      return `(min-width: ${width}px) ${width}px, 100vw`;
    // Image is always the same width, whatever the size of the screen
    case "fixed":
      return `${width}px`;
    // Image is always the width of the screen
    case "full-width":
      return `100vw`;
    case "none":
    default:
      return void 0;
  }
};

function isESMImportedImage(src) {
  return typeof src === "object" || typeof src === "function" && "src" in src;
}
function isRemoteImage(src) {
  return typeof src === "string";
}
async function resolveSrc(src) {
  if (typeof src === "object" && "then" in src) {
    const resource = await src;
    return resource.default ?? resource;
  }
  return src;
}

function isLocalService(service) {
  if (!service) {
    return false;
  }
  return "transform" in service;
}
function parseQuality(quality) {
  let result = parseInt(quality);
  if (Number.isNaN(result)) {
    return quality;
  }
  return result;
}
const sortNumeric = (a, b) => a - b;
function verifyOptions(options) {
  if (!options.src || !isRemoteImage(options.src) && !isESMImportedImage(options.src)) {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        JSON.stringify(options.src),
        typeof options.src,
        JSON.stringify(options, (_, v) => v === void 0 ? null : v)
      )
    });
  }
  if (!isESMImportedImage(options.src)) {
    if (options.src.startsWith("/@fs/") || !isRemotePath(options.src) && !options.src.startsWith("/")) {
      throw new AstroError({
        ...LocalImageUsedWrongly,
        message: LocalImageUsedWrongly.message(options.src)
      });
    }
    let missingDimension;
    if (!options.width && !options.height) {
      missingDimension = "both";
    } else if (!options.width && options.height) {
      missingDimension = "width";
    } else if (options.width && !options.height) {
      missingDimension = "height";
    }
    if (missingDimension) {
      throw new AstroError({
        ...MissingImageDimension,
        message: MissingImageDimension.message(missingDimension, options.src)
      });
    }
  } else {
    if (!VALID_SUPPORTED_FORMATS.includes(options.src.format)) {
      throw new AstroError({
        ...UnsupportedImageFormat,
        message: UnsupportedImageFormat.message(
          options.src.format,
          options.src.src,
          VALID_SUPPORTED_FORMATS
        )
      });
    }
    if (options.widths && options.densities) {
      throw new AstroError(IncompatibleDescriptorOptions);
    }
    if (options.src.format === "svg" && options.format !== "svg" || options.src.format !== "svg" && options.format === "svg") {
      throw new AstroError(UnsupportedImageConversion);
    }
  }
}
const baseService = {
  validateOptions(options) {
    if (isESMImportedImage(options.src) && options.src.format === "svg") {
      options.format = "svg";
    }
    verifyOptions(options);
    if (!options.format) {
      options.format = DEFAULT_OUTPUT_FORMAT;
    }
    if (options.width) options.width = Math.round(options.width);
    if (options.height) options.height = Math.round(options.height);
    if (options.layout && options.width && options.height) {
      options.fit ??= "cover";
      delete options.layout;
    }
    if (options.fit === "none") {
      delete options.fit;
    }
    return options;
  },
  getHTMLAttributes(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const {
      src,
      width,
      height,
      format,
      quality,
      densities,
      widths,
      formats,
      layout,
      priority,
      fit,
      position,
      background,
      ...attributes
    } = options;
    return {
      ...attributes,
      width: targetWidth,
      height: targetHeight,
      loading: attributes.loading ?? "lazy",
      decoding: attributes.decoding ?? "async"
    };
  },
  getSrcSet(options) {
    const { targetWidth, targetHeight } = getTargetDimensions(options);
    const aspectRatio = targetWidth / targetHeight;
    const { widths, densities } = options;
    const targetFormat = options.format ?? DEFAULT_OUTPUT_FORMAT;
    let transformedWidths = (widths ?? []).sort(sortNumeric);
    let imageWidth = options.width;
    let maxWidth = Infinity;
    if (isESMImportedImage(options.src)) {
      imageWidth = options.src.width;
      maxWidth = imageWidth;
      if (transformedWidths.length > 0 && transformedWidths.at(-1) > maxWidth) {
        transformedWidths = transformedWidths.filter((width) => width <= maxWidth);
        transformedWidths.push(maxWidth);
      }
    }
    transformedWidths = Array.from(new Set(transformedWidths));
    const {
      width: transformWidth,
      height: transformHeight,
      ...transformWithoutDimensions
    } = options;
    let allWidths = [];
    if (densities) {
      const densityValues = densities.map((density) => {
        if (typeof density === "number") {
          return density;
        } else {
          return parseFloat(density);
        }
      });
      const densityWidths = densityValues.sort(sortNumeric).map((density) => Math.round(targetWidth * density));
      allWidths = densityWidths.map((width, index) => ({
        width,
        descriptor: `${densityValues[index]}x`
      }));
    } else if (transformedWidths.length > 0) {
      allWidths = transformedWidths.map((width) => ({
        width,
        descriptor: `${width}w`
      }));
    }
    return allWidths.map(({ width, descriptor }) => {
      const height = Math.round(width / aspectRatio);
      const transform = { ...transformWithoutDimensions, width, height };
      return {
        transform,
        descriptor,
        attributes: {
          type: `image/${targetFormat}`
        }
      };
    });
  },
  getURL(options, imageConfig) {
    const searchParams = new URLSearchParams();
    if (isESMImportedImage(options.src)) {
      searchParams.append("href", options.src.src);
    } else if (isRemoteAllowed(options.src, imageConfig)) {
      searchParams.append("href", options.src);
    } else {
      return options.src;
    }
    const params = {
      w: "width",
      h: "height",
      q: "quality",
      f: "format",
      fit: "fit",
      position: "position",
      background: "background"
    };
    Object.entries(params).forEach(([param, key]) => {
      options[key] && searchParams.append(param, options[key].toString());
    });
    const imageEndpoint = joinPaths("/C:/Program Files/Git/nooma/", imageConfig.endpoint.route);
    let url = `${imageEndpoint}?${searchParams}`;
    if (imageConfig.assetQueryParams) {
      const assetQueryString = imageConfig.assetQueryParams.toString();
      if (assetQueryString) {
        url += "&" + assetQueryString;
      }
    }
    return url;
  },
  parseURL(url) {
    const params = url.searchParams;
    if (!params.has("href")) {
      return void 0;
    }
    const transform = {
      src: params.get("href"),
      width: params.has("w") ? parseInt(params.get("w")) : void 0,
      height: params.has("h") ? parseInt(params.get("h")) : void 0,
      format: params.get("f"),
      quality: params.get("q"),
      fit: params.get("fit"),
      position: params.get("position") ?? void 0,
      background: params.get("background") ?? void 0
    };
    return transform;
  }
};
function getTargetDimensions(options) {
  let targetWidth = options.width;
  let targetHeight = options.height;
  if (isESMImportedImage(options.src)) {
    const aspectRatio = options.src.width / options.src.height;
    if (targetHeight && !targetWidth) {
      targetWidth = Math.round(targetHeight * aspectRatio);
    } else if (targetWidth && !targetHeight) {
      targetHeight = Math.round(targetWidth / aspectRatio);
    } else if (!targetWidth && !targetHeight) {
      targetWidth = options.src.width;
      targetHeight = options.src.height;
    }
  }
  return {
    targetWidth,
    targetHeight
  };
}

function isImageMetadata(src) {
  return src.fsPath && !("fsPath" in src);
}

const cssFitValues = ["fill", "contain", "cover", "scale-down"];
function addCSSVarsToStyle(vars, styles) {
  const cssVars = Object.entries(vars).filter(([_, value]) => value !== void 0 && value !== false).map(([key, value]) => `--${key}: ${value};`).join(" ");
  if (!styles) {
    return cssVars;
  }
  const style = typeof styles === "string" ? styles : toStyleString(styles);
  return `${cssVars} ${style}`;
}

const decoder = new TextDecoder();
const toUTF8String = (input, start = 0, end = input.length) => decoder.decode(input.slice(start, end));
const toHexString = (input, start = 0, end = input.length) => input.slice(start, end).reduce((memo, i) => memo + `0${i.toString(16)}`.slice(-2), "");
const getView = (input, offset) => new DataView(input.buffer, input.byteOffset + offset);
const readInt16LE = (input, offset = 0) => getView(input, offset).getInt16(0, true);
const readUInt16BE = (input, offset = 0) => getView(input, offset).getUint16(0, false);
const readUInt16LE = (input, offset = 0) => getView(input, offset).getUint16(0, true);
const readUInt24LE = (input, offset = 0) => {
  const view = getView(input, offset);
  return view.getUint16(0, true) + (view.getUint8(2) << 16);
};
const readInt32LE = (input, offset = 0) => getView(input, offset).getInt32(0, true);
const readUInt32BE = (input, offset = 0) => getView(input, offset).getUint32(0, false);
const readUInt32LE = (input, offset = 0) => getView(input, offset).getUint32(0, true);
const readUInt64 = (input, offset, isBigEndian) => getView(input, offset).getBigUint64(0, !isBigEndian);
const methods = {
  readUInt16BE,
  readUInt16LE,
  readUInt32BE,
  readUInt32LE
};
function readUInt(input, bits, offset = 0, isBigEndian = false) {
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = `readUInt${bits}${endian}`;
  return methods[methodName](input, offset);
}
function readBox(input, offset) {
  if (input.length - offset < 4) return;
  const boxSize = readUInt32BE(input, offset);
  if (input.length - offset < boxSize) return;
  return {
    name: toUTF8String(input, 4 + offset, 8 + offset),
    offset,
    size: boxSize
  };
}
function findBox(input, boxName, currentOffset) {
  while (currentOffset < input.length) {
    const box = readBox(input, currentOffset);
    if (!box) break;
    if (box.name === boxName) return box;
    currentOffset += box.size > 0 ? box.size : 8;
  }
}

const BMP = {
  validate: (input) => toUTF8String(input, 0, 2) === "BM",
  calculate: (input) => ({
    height: Math.abs(readInt32LE(input, 22)),
    width: readUInt32LE(input, 18)
  })
};

const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(input, offset) {
  const value = input[offset];
  return value === 0 ? 256 : value;
}
function getImageSize$1(input, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(input, offset + 1),
    width: getSizeFromOffset(input, offset)
  };
}
const ICO = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_ICON;
  },
  calculate(input) {
    const nbImages = readUInt16LE(input, 4);
    const imageSize = getImageSize$1(input, 0);
    if (nbImages === 1) return imageSize;
    const images = [];
    for (let imageIndex = 0; imageIndex < nbImages; imageIndex += 1) {
      images.push(getImageSize$1(input, imageIndex));
    }
    return {
      width: imageSize.width,
      height: imageSize.height,
      images
    };
  }
};

const TYPE_CURSOR = 2;
const CUR = {
  validate(input) {
    const reserved = readUInt16LE(input, 0);
    const imageCount = readUInt16LE(input, 4);
    if (reserved !== 0 || imageCount === 0) return false;
    const imageType = readUInt16LE(input, 2);
    return imageType === TYPE_CURSOR;
  },
  calculate: (input) => ICO.calculate(input)
};

const DDS = {
  validate: (input) => readUInt32LE(input, 0) === 542327876,
  calculate: (input) => ({
    height: readUInt32LE(input, 12),
    width: readUInt32LE(input, 16)
  })
};

const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate: (input) => gifRegexp.test(toUTF8String(input, 0, 6)),
  calculate: (input) => ({
    height: readUInt16LE(input, 8),
    width: readUInt16LE(input, 6)
  })
};

const brandMap = {
  avif: "avif",
  avis: "avif",
  // avif-sequence
  mif1: "heif",
  msf1: "heif",
  // heif-sequence
  heic: "heic",
  heix: "heic",
  hevc: "heic",
  // heic-sequence
  hevx: "heic"
  // heic-sequence
};
function detectType(input, start, end) {
  let hasAvif = false;
  let hasHeic = false;
  let hasHeif = false;
  for (let i = start; i <= end; i += 4) {
    const brand = toUTF8String(input, i, i + 4);
    if (brand === "avif" || brand === "avis") hasAvif = true;
    else if (brand === "heic" || brand === "heix" || brand === "hevc" || brand === "hevx") hasHeic = true;
    else if (brand === "mif1" || brand === "msf1") hasHeif = true;
  }
  if (hasAvif) return "avif";
  if (hasHeic) return "heic";
  if (hasHeif) return "heif";
}
const HEIF = {
  validate(input) {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "ftyp") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand in brandMap;
  },
  calculate(input) {
    const metaBox = findBox(input, "meta", 0);
    const iprpBox = metaBox && findBox(input, "iprp", metaBox.offset + 12);
    const ipcoBox = iprpBox && findBox(input, "ipco", iprpBox.offset + 8);
    if (!ipcoBox) {
      throw new TypeError("Invalid HEIF, no ipco box found");
    }
    const type = detectType(input, 8, metaBox.offset);
    const images = [];
    let currentOffset = ipcoBox.offset + 8;
    while (currentOffset < ipcoBox.offset + ipcoBox.size) {
      const ispeBox = findBox(input, "ispe", currentOffset);
      if (!ispeBox) break;
      const rawWidth = readUInt32BE(input, ispeBox.offset + 12);
      const rawHeight = readUInt32BE(input, ispeBox.offset + 16);
      const clapBox = findBox(input, "clap", currentOffset);
      let width = rawWidth;
      let height = rawHeight;
      if (clapBox && clapBox.offset < ipcoBox.offset + ipcoBox.size) {
        const cropRight = readUInt32BE(input, clapBox.offset + 12);
        width = rawWidth - cropRight;
      }
      images.push({ height, width });
      currentOffset = ispeBox.offset + ispeBox.size;
    }
    if (images.length === 0) {
      throw new TypeError("Invalid HEIF, no sizes found");
    }
    return {
      width: images[0].width,
      height: images[0].height,
      type,
      ...images.length > 1 ? { images } : {}
    };
  }
};

const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  // m => 16 x 16
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  // s => 16 x 16
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  // l => 32 x 32
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  // h => 48 x 48
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  // . => 64 x 64
  icp6: 64,
  ic12: 32,
  // t => 128 x 128
  it32: 128,
  t8mk: 128,
  ic07: 128,
  // . => 256 x 256
  ic08: 256,
  ic13: 256,
  // . => 512 x 512
  ic09: 512,
  ic14: 512,
  // . => 1024 x 1024
  ic10: 1024
};
function readImageHeader(input, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    toUTF8String(input, imageOffset, imageLengthOffset),
    readUInt32BE(input, imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate: (input) => toUTF8String(input, 0, 4) === "icns",
  calculate(input) {
    const inputLength = input.length;
    const fileLength = readUInt32BE(input, FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    const images = [];
    while (imageOffset < fileLength && imageOffset < inputLength) {
      const imageHeader = readImageHeader(input, imageOffset);
      const imageSize = getImageSize(imageHeader[0]);
      images.push(imageSize);
      imageOffset += imageHeader[1];
    }
    if (images.length === 0) {
      throw new TypeError("Invalid ICNS, no sizes found");
    }
    return {
      width: images[0].width,
      height: images[0].height,
      ...images.length > 1 ? { images } : {}
    };
  }
};

const J2C = {
  // TODO: this doesn't seem right. SIZ marker doesn't have to be right after the SOC
  validate: (input) => readUInt32BE(input, 0) === 4283432785,
  calculate: (input) => ({
    height: readUInt32BE(input, 12),
    width: readUInt32BE(input, 8)
  })
};

const JP2 = {
  validate(input) {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "jP  ") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand === "jp2 ";
  },
  calculate(input) {
    const jp2hBox = findBox(input, "jp2h", 0);
    const ihdrBox = jp2hBox && findBox(input, "ihdr", jp2hBox.offset + 8);
    if (ihdrBox) {
      return {
        height: readUInt32BE(input, ihdrBox.offset + 8),
        width: readUInt32BE(input, ihdrBox.offset + 12)
      };
    }
    throw new TypeError("Unsupported JPEG 2000 format");
  }
};

const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(input) {
  return toHexString(input, 2, 6) === EXIF_MARKER;
}
function extractSize(input, index) {
  return {
    height: readUInt16BE(input, index),
    width: readUInt16BE(input, index + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(input, index) {
  const exifBlock = input.slice(APP1_DATA_SIZE_BYTES, index);
  const byteAlign = toHexString(
    exifBlock,
    EXIF_HEADER_BYTES,
    EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES
  );
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateInput(input, index) {
  if (index > input.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
}
const JPG = {
  validate: (input) => toHexString(input, 0, 2) === "ffd8",
  calculate(_input) {
    let input = _input.slice(4);
    let orientation;
    let next;
    while (input.length) {
      const i = readUInt16BE(input, 0);
      validateInput(input, i);
      if (input[i] !== 255) {
        input = input.slice(1);
        continue;
      }
      if (isEXIF(input)) {
        orientation = validateExifBlock(input, i);
      }
      next = input[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(input, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      input = input.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};

class BitReader {
  constructor(input, endianness) {
    this.input = input;
    this.endianness = endianness;
  }
  // Skip the first 16 bits (2 bytes) of signature
  byteOffset = 2;
  bitOffset = 0;
  /** Reads a specified number of bits, and move the offset */
  getBits(length = 1) {
    let result = 0;
    let bitsRead = 0;
    while (bitsRead < length) {
      if (this.byteOffset >= this.input.length) {
        throw new Error("Reached end of input");
      }
      const currentByte = this.input[this.byteOffset];
      const bitsLeft = 8 - this.bitOffset;
      const bitsToRead = Math.min(length - bitsRead, bitsLeft);
      if (this.endianness === "little-endian") {
        const mask = (1 << bitsToRead) - 1;
        const bits = currentByte >> this.bitOffset & mask;
        result |= bits << bitsRead;
      } else {
        const mask = (1 << bitsToRead) - 1 << 8 - this.bitOffset - bitsToRead;
        const bits = (currentByte & mask) >> 8 - this.bitOffset - bitsToRead;
        result = result << bitsToRead | bits;
      }
      bitsRead += bitsToRead;
      this.bitOffset += bitsToRead;
      if (this.bitOffset === 8) {
        this.byteOffset++;
        this.bitOffset = 0;
      }
    }
    return result;
  }
}

function calculateImageDimension(reader, isSmallImage) {
  if (isSmallImage) {
    return 8 * (1 + reader.getBits(5));
  }
  const sizeClass = reader.getBits(2);
  const extraBits = [9, 13, 18, 30][sizeClass];
  return 1 + reader.getBits(extraBits);
}
function calculateImageWidth(reader, isSmallImage, widthMode, height) {
  if (isSmallImage && widthMode === 0) {
    return 8 * (1 + reader.getBits(5));
  }
  if (widthMode === 0) {
    return calculateImageDimension(reader, false);
  }
  const aspectRatios = [1, 1.2, 4 / 3, 1.5, 16 / 9, 5 / 4, 2];
  return Math.floor(height * aspectRatios[widthMode - 1]);
}
const JXLStream = {
  validate: (input) => {
    return toHexString(input, 0, 2) === "ff0a";
  },
  calculate(input) {
    const reader = new BitReader(input, "little-endian");
    const isSmallImage = reader.getBits(1) === 1;
    const height = calculateImageDimension(reader, isSmallImage);
    const widthMode = reader.getBits(3);
    const width = calculateImageWidth(reader, isSmallImage, widthMode, height);
    return { width, height };
  }
};

function extractCodestream(input) {
  const jxlcBox = findBox(input, "jxlc", 0);
  if (jxlcBox) {
    return input.slice(jxlcBox.offset + 8, jxlcBox.offset + jxlcBox.size);
  }
  const partialStreams = extractPartialStreams(input);
  if (partialStreams.length > 0) {
    return concatenateCodestreams(partialStreams);
  }
  return void 0;
}
function extractPartialStreams(input) {
  const partialStreams = [];
  let offset = 0;
  while (offset < input.length) {
    const jxlpBox = findBox(input, "jxlp", offset);
    if (!jxlpBox) break;
    partialStreams.push(
      input.slice(jxlpBox.offset + 12, jxlpBox.offset + jxlpBox.size)
    );
    offset = jxlpBox.offset + jxlpBox.size;
  }
  return partialStreams;
}
function concatenateCodestreams(partialCodestreams) {
  const totalLength = partialCodestreams.reduce(
    (acc, curr) => acc + curr.length,
    0
  );
  const codestream = new Uint8Array(totalLength);
  let position = 0;
  for (const partial of partialCodestreams) {
    codestream.set(partial, position);
    position += partial.length;
  }
  return codestream;
}
const JXL = {
  validate: (input) => {
    const boxType = toUTF8String(input, 4, 8);
    if (boxType !== "JXL ") return false;
    const ftypBox = findBox(input, "ftyp", 0);
    if (!ftypBox) return false;
    const brand = toUTF8String(input, ftypBox.offset + 8, ftypBox.offset + 12);
    return brand === "jxl ";
  },
  calculate(input) {
    const codestream = extractCodestream(input);
    if (codestream) return JXLStream.calculate(codestream);
    throw new Error("No codestream found in JXL container");
  }
};

const KTX = {
  validate: (input) => {
    const signature = toUTF8String(input, 1, 7);
    return ["KTX 11", "KTX 20"].includes(signature);
  },
  calculate: (input) => {
    const type = input[5] === 49 ? "ktx" : "ktx2";
    const offset = type === "ktx" ? 36 : 20;
    return {
      height: readUInt32LE(input, offset + 4),
      width: readUInt32LE(input, offset),
      type
    };
  }
};

const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(input) {
    if (pngSignature === toUTF8String(input, 1, 8)) {
      let chunkName = toUTF8String(input, 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = toUTF8String(input, 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(input) {
    if (toUTF8String(input, 12, 16) === pngFriedChunkName) {
      return {
        height: readUInt32BE(input, 36),
        width: readUInt32BE(input, 32)
      };
    }
    return {
      height: readUInt32BE(input, 20),
      width: readUInt32BE(input, 16)
    };
  }
};

const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: Number.parseInt(dimensions[1], 10),
        width: Number.parseInt(dimensions[0], 10)
      };
    }
    throw new TypeError("Invalid PNM");
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = Number.parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    }
    throw new TypeError("Invalid PAM");
  }
};
const PNM = {
  validate: (input) => toUTF8String(input, 0, 2) in PNMTypes,
  calculate(input) {
    const signature = toUTF8String(input, 0, 2);
    const type = PNMTypes[signature];
    const lines = toUTF8String(input, 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};

const PSD = {
  validate: (input) => toUTF8String(input, 0, 4) === "8BPS",
  calculate: (input) => ({
    height: readUInt32BE(input, 14),
    width: readUInt32BE(input, 18)
  })
};

const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/i,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  in: 96,
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72,
  px: 1
};
const unitsReg = new RegExp(
  `^([0-9.]+(?:e\\d+)?)(${Object.keys(units).join("|")})?$`
);
function parseLength(len) {
  const m = unitsReg.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(Number(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = extractorRegExps.width.exec(root);
  const height = extractorRegExps.height.exec(root);
  const viewbox = extractorRegExps.viewbox.exec(root);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  // Scan only the first kilo-byte to speed up the check on larger files
  validate: (input) => svgReg.test(toUTF8String(input, 0, 1e3)),
  calculate(input) {
    const root = extractorRegExps.root.exec(toUTF8String(input));
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};

const TGA = {
  validate(input) {
    return readUInt16LE(input, 0) === 0 && readUInt16LE(input, 4) === 0;
  },
  calculate(input) {
    return {
      height: readUInt16LE(input, 14),
      width: readUInt16LE(input, 12)
    };
  }
};

const CONSTANTS = {
  TAG: {
    WIDTH: 256,
    HEIGHT: 257,
    COMPRESSION: 259
  },
  TYPE: {
    SHORT: 3,
    LONG: 4,
    LONG8: 16
  },
  ENTRY_SIZE: {
    STANDARD: 12,
    BIG: 20
  },
  COUNT_SIZE: {
    STANDARD: 2,
    BIG: 8
  }
};
function readIFD(input, { isBigEndian, isBigTiff }) {
  const ifdOffset = isBigTiff ? Number(readUInt64(input, 8, isBigEndian)) : readUInt(input, 32, 4, isBigEndian);
  const entryCountSize = isBigTiff ? CONSTANTS.COUNT_SIZE.BIG : CONSTANTS.COUNT_SIZE.STANDARD;
  return input.slice(ifdOffset + entryCountSize);
}
function readTagValue(input, type, offset, isBigEndian) {
  switch (type) {
    case CONSTANTS.TYPE.SHORT:
      return readUInt(input, 16, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG:
      return readUInt(input, 32, offset, isBigEndian);
    case CONSTANTS.TYPE.LONG8: {
      const value = Number(readUInt64(input, offset, isBigEndian));
      if (value > Number.MAX_SAFE_INTEGER) {
        throw new TypeError("Value too large");
      }
      return value;
    }
    default:
      return 0;
  }
}
function nextTag(input, isBigTiff) {
  const entrySize = isBigTiff ? CONSTANTS.ENTRY_SIZE.BIG : CONSTANTS.ENTRY_SIZE.STANDARD;
  if (input.length > entrySize) {
    return input.slice(entrySize);
  }
}
function extractTags(input, { isBigEndian, isBigTiff }) {
  const tags = {};
  let temp = input;
  while (temp?.length) {
    const code = readUInt(temp, 16, 0, isBigEndian);
    const type = readUInt(temp, 16, 2, isBigEndian);
    const length = isBigTiff ? Number(readUInt64(temp, 4, isBigEndian)) : readUInt(temp, 32, 4, isBigEndian);
    if (code === 0) break;
    if (length === 1 && (type === CONSTANTS.TYPE.SHORT || type === CONSTANTS.TYPE.LONG || isBigTiff && type === CONSTANTS.TYPE.LONG8)) {
      const valueOffset = isBigTiff ? 12 : 8;
      tags[code] = readTagValue(temp, type, valueOffset, isBigEndian);
    }
    temp = nextTag(temp, isBigTiff);
  }
  return tags;
}
function determineFormat(input) {
  const signature = toUTF8String(input, 0, 2);
  const version = readUInt(input, 16, 2, signature === "MM");
  return {
    isBigEndian: signature === "MM",
    isBigTiff: version === 43
  };
}
function validateBigTIFFHeader(input, isBigEndian) {
  const byteSize = readUInt(input, 16, 4, isBigEndian);
  const reserved = readUInt(input, 16, 6, isBigEndian);
  if (byteSize !== 8 || reserved !== 0) {
    throw new TypeError("Invalid BigTIFF header");
  }
}
const signatures = /* @__PURE__ */ new Set([
  "49492a00",
  // Little Endian
  "4d4d002a",
  // Big Endian
  "49492b00",
  // BigTIFF Little Endian
  "4d4d002b"
  // BigTIFF Big Endian
]);
const TIFF = {
  validate: (input) => {
    const signature = toHexString(input, 0, 4);
    return signatures.has(signature);
  },
  calculate(input) {
    const format = determineFormat(input);
    if (format.isBigTiff) {
      validateBigTIFFHeader(input, format.isBigEndian);
    }
    const ifdBuffer = readIFD(input, format);
    const tags = extractTags(ifdBuffer, format);
    const info = {
      height: tags[CONSTANTS.TAG.HEIGHT],
      width: tags[CONSTANTS.TAG.WIDTH],
      type: format.isBigTiff ? "bigtiff" : "tiff"
    };
    if (tags[CONSTANTS.TAG.COMPRESSION]) {
      info.compression = tags[CONSTANTS.TAG.COMPRESSION];
    }
    if (!info.width || !info.height) {
      throw new TypeError("Invalid Tiff. Missing tags");
    }
    return info;
  }
};

function calculateExtended(input) {
  return {
    height: 1 + readUInt24LE(input, 7),
    width: 1 + readUInt24LE(input, 4)
  };
}
function calculateLossless(input) {
  return {
    height: 1 + ((input[4] & 15) << 10 | input[3] << 2 | (input[2] & 192) >> 6),
    width: 1 + ((input[2] & 63) << 8 | input[1])
  };
}
function calculateLossy(input) {
  return {
    height: readInt16LE(input, 8) & 16383,
    width: readInt16LE(input, 6) & 16383
  };
}
const WEBP = {
  validate(input) {
    const riffHeader = "RIFF" === toUTF8String(input, 0, 4);
    const webpHeader = "WEBP" === toUTF8String(input, 8, 12);
    const vp8Header = "VP8" === toUTF8String(input, 12, 15);
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(_input) {
    const chunkHeader = toUTF8String(_input, 12, 16);
    const input = _input.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = input[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(input);
      }
      throw new TypeError("Invalid WebP");
    }
    if (chunkHeader === "VP8 " && input[0] !== 47) {
      return calculateLossy(input);
    }
    const signature = toHexString(input, 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(input);
    }
    throw new TypeError("Invalid WebP");
  }
};

const typeHandlers = /* @__PURE__ */ new Map([
  ["bmp", BMP],
  ["cur", CUR],
  ["dds", DDS],
  ["gif", GIF],
  ["heif", HEIF],
  ["icns", ICNS],
  ["ico", ICO],
  ["j2c", J2C],
  ["jp2", JP2],
  ["jpg", JPG],
  ["jxl", JXL],
  ["jxl-stream", JXLStream],
  ["ktx", KTX],
  ["png", PNG],
  ["pnm", PNM],
  ["psd", PSD],
  ["svg", SVG],
  ["tga", TGA],
  ["tiff", TIFF],
  ["webp", WEBP]
]);
const types = Array.from(typeHandlers.keys());

const firstBytes = /* @__PURE__ */ new Map([
  [0, "heif"],
  [56, "psd"],
  [66, "bmp"],
  [68, "dds"],
  [71, "gif"],
  [73, "tiff"],
  [77, "tiff"],
  [82, "webp"],
  [105, "icns"],
  [137, "png"],
  [255, "jpg"]
]);
function detector(input) {
  const byte = input[0];
  const type = firstBytes.get(byte);
  if (type && typeHandlers.get(type).validate(input)) {
    return type;
  }
  return types.find((imageType) => typeHandlers.get(imageType).validate(input));
}

function lookup(input) {
  const type = detector(input);
  if (typeof type !== "undefined") {
    const size = typeHandlers.get(type).calculate(input);
    if (size !== void 0) {
      size.type = size.type ?? type;
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type);
}

async function imageMetadata(data, src) {
  let result;
  try {
    result = lookup(data);
  } catch {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  if (!result.height || !result.width || !result.type) {
    throw new AstroError({
      ...NoImageMetadata,
      message: NoImageMetadata.message(src)
    });
  }
  const { width, height, type, orientation } = result;
  const isPortrait = (orientation || 0) >= 5;
  return {
    width: isPortrait ? height : width,
    height: isPortrait ? width : height,
    format: type,
    orientation
  };
}

async function inferRemoteSize(url, imageConfig) {
  if (!URL.canParse(url)) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const allowlistConfig = imageConfig ? {
    domains: imageConfig.domains ?? [],
    remotePatterns: imageConfig.remotePatterns ?? []
  } : void 0;
  if (!allowlistConfig) {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      throw new AstroError({
        ...FailedToFetchRemoteImageDimensions,
        message: FailedToFetchRemoteImageDimensions.message(url)
      });
    }
  }
  if (allowlistConfig && !isRemoteAllowed(url, allowlistConfig)) {
    throw new AstroError({
      ...RemoteImageNotAllowed,
      message: RemoteImageNotAllowed.message(url)
    });
  }
  const response = await fetch(url, { redirect: "manual" });
  if (response.status >= 300 && response.status < 400) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  if (!response.body || !response.ok) {
    throw new AstroError({
      ...FailedToFetchRemoteImageDimensions,
      message: FailedToFetchRemoteImageDimensions.message(url)
    });
  }
  const reader = response.body.getReader();
  let done, value;
  let accumulatedChunks = new Uint8Array();
  while (!done) {
    const readResult = await reader.read();
    done = readResult.done;
    if (done) break;
    if (readResult.value) {
      value = readResult.value;
      let tmp = new Uint8Array(accumulatedChunks.length + value.length);
      tmp.set(accumulatedChunks, 0);
      tmp.set(value, accumulatedChunks.length);
      accumulatedChunks = tmp;
      try {
        const dimensions = await imageMetadata(accumulatedChunks, url);
        if (dimensions) {
          await reader.cancel();
          return dimensions;
        }
      } catch {
      }
    }
  }
  throw new AstroError({
    ...NoImageMetadata,
    message: NoImageMetadata.message(url)
  });
}

const PLACEHOLDER_BASE = "astro://placeholder";
function createPlaceholderURL(pathOrUrl) {
  return new URL(pathOrUrl, PLACEHOLDER_BASE);
}
function stringifyPlaceholderURL(url) {
  return url.href.replace(PLACEHOLDER_BASE, "");
}

async function getConfiguredImageService() {
  if (!globalThis?.astroAsset?.imageService) {
    const { default: service } = await import(
      // @ts-expect-error
      './sharp_zaEext4d.mjs'
    ).catch((e) => {
      const error = new AstroError(InvalidImageService);
      error.cause = e;
      throw error;
    });
    if (!globalThis.astroAsset) globalThis.astroAsset = {};
    globalThis.astroAsset.imageService = service;
    return service;
  }
  return globalThis.astroAsset.imageService;
}
async function getImage$1(options, imageConfig) {
  if (!options || typeof options !== "object") {
    throw new AstroError({
      ...ExpectedImageOptions,
      message: ExpectedImageOptions.message(JSON.stringify(options))
    });
  }
  if (typeof options.src === "undefined") {
    throw new AstroError({
      ...ExpectedImage,
      message: ExpectedImage.message(
        options.src,
        "undefined",
        JSON.stringify(options)
      )
    });
  }
  if (isImageMetadata(options)) {
    throw new AstroError(ExpectedNotESMImage);
  }
  const service = await getConfiguredImageService();
  const resolvedOptions = {
    ...options,
    src: await resolveSrc(options.src)
  };
  let originalWidth;
  let originalHeight;
  if (options.inferSize) {
    delete resolvedOptions.inferSize;
    if (isRemoteImage(resolvedOptions.src) && isRemotePath(resolvedOptions.src)) {
      if (!isRemoteAllowed(resolvedOptions.src, imageConfig)) {
        throw new AstroError({
          ...RemoteImageNotAllowed,
          message: RemoteImageNotAllowed.message(resolvedOptions.src)
        });
      }
      const result = await inferRemoteSize(resolvedOptions.src, imageConfig);
      resolvedOptions.width ??= result.width;
      resolvedOptions.height ??= result.height;
      originalWidth = result.width;
      originalHeight = result.height;
    }
  }
  const originalFilePath = isESMImportedImage(resolvedOptions.src) ? resolvedOptions.src.fsPath : void 0;
  const clonedSrc = isESMImportedImage(resolvedOptions.src) ? (
    // @ts-expect-error - clone is a private, hidden prop
    resolvedOptions.src.clone ?? resolvedOptions.src
  ) : resolvedOptions.src;
  if (isESMImportedImage(clonedSrc)) {
    originalWidth = clonedSrc.width;
    originalHeight = clonedSrc.height;
  }
  if (originalWidth && originalHeight) {
    const aspectRatio = originalWidth / originalHeight;
    if (resolvedOptions.height && !resolvedOptions.width) {
      resolvedOptions.width = Math.round(resolvedOptions.height * aspectRatio);
    } else if (resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.height = Math.round(resolvedOptions.width / aspectRatio);
    } else if (!resolvedOptions.width && !resolvedOptions.height) {
      resolvedOptions.width = originalWidth;
      resolvedOptions.height = originalHeight;
    }
  }
  resolvedOptions.src = clonedSrc;
  const layout = options.layout ?? imageConfig.layout ?? "none";
  if (resolvedOptions.priority) {
    resolvedOptions.loading ??= "eager";
    resolvedOptions.decoding ??= "sync";
    resolvedOptions.fetchpriority ??= "high";
    delete resolvedOptions.priority;
  } else {
    resolvedOptions.loading ??= "lazy";
    resolvedOptions.decoding ??= "async";
    resolvedOptions.fetchpriority ??= "auto";
  }
  if (layout !== "none") {
    resolvedOptions.widths ||= getWidths({
      width: resolvedOptions.width,
      layout,
      originalWidth,
      breakpoints: imageConfig.breakpoints?.length ? imageConfig.breakpoints : isLocalService(service) ? LIMITED_RESOLUTIONS : DEFAULT_RESOLUTIONS
    });
    resolvedOptions.sizes ||= getSizesAttribute({ width: resolvedOptions.width, layout });
    delete resolvedOptions.densities;
    resolvedOptions.style = addCSSVarsToStyle(
      {
        fit: cssFitValues.includes(resolvedOptions.fit ?? "") && resolvedOptions.fit,
        pos: resolvedOptions.position
      },
      resolvedOptions.style
    );
    resolvedOptions["data-astro-image"] = layout;
  }
  const validatedOptions = service.validateOptions ? await service.validateOptions(resolvedOptions, imageConfig) : resolvedOptions;
  const srcSetTransforms = service.getSrcSet ? await service.getSrcSet(validatedOptions, imageConfig) : [];
  let imageURL = await service.getURL(validatedOptions, imageConfig);
  const matchesValidatedTransform = (transform) => transform.width === validatedOptions.width && transform.height === validatedOptions.height && transform.format === validatedOptions.format;
  let srcSets = await Promise.all(
    srcSetTransforms.map(async (srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : await service.getURL(srcSet.transform, imageConfig),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    })
  );
  if (isLocalService(service) && globalThis.astroAsset.addStaticImage && !(isRemoteImage(validatedOptions.src) && imageURL === validatedOptions.src)) {
    const propsToHash = service.propertiesToHash ?? DEFAULT_HASH_PROPS;
    imageURL = globalThis.astroAsset.addStaticImage(
      validatedOptions,
      propsToHash,
      originalFilePath
    );
    srcSets = srcSetTransforms.map((srcSet) => {
      return {
        transform: srcSet.transform,
        url: matchesValidatedTransform(srcSet.transform) ? imageURL : globalThis.astroAsset.addStaticImage(srcSet.transform, propsToHash, originalFilePath),
        descriptor: srcSet.descriptor,
        attributes: srcSet.attributes
      };
    });
  } else if (imageConfig.assetQueryParams) {
    const imageURLObj = createPlaceholderURL(imageURL);
    imageConfig.assetQueryParams.forEach((value, key) => {
      imageURLObj.searchParams.set(key, value);
    });
    imageURL = stringifyPlaceholderURL(imageURLObj);
    srcSets = srcSets.map((srcSet) => {
      const urlObj = createPlaceholderURL(srcSet.url);
      imageConfig.assetQueryParams.forEach((value, key) => {
        urlObj.searchParams.set(key, value);
      });
      return {
        ...srcSet,
        url: stringifyPlaceholderURL(urlObj)
      };
    });
  }
  return {
    rawOptions: resolvedOptions,
    options: validatedOptions,
    src: imageURL,
    srcSet: {
      values: srcSets,
      attribute: srcSets.map((srcSet) => `${srcSet.url} ${srcSet.descriptor}`).join(", ")
    },
    attributes: service.getHTMLAttributes !== void 0 ? await service.getHTMLAttributes(validatedOptions, imageConfig) : {}
  };
}

const $$Astro$d = createAstro("https://moathalgunimi17-svg.github.io");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$d, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  if (layout !== "none") {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  const image = await getImage(props);
  const additionalAttributes = {};
  if (image.srcSet.values.length > 0) {
    additionalAttributes.srcset = image.srcSet.attribute;
  }
  const { class: className, ...attributes } = { ...additionalAttributes, ...image.attributes };
  return renderTemplate`${maybeRenderHead()}<img${addAttribute(image.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}>`;
}, "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/node_modules/astro/components/Image.astro", void 0);

const $$Astro$c = createAstro("https://moathalgunimi17-svg.github.io");
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$c, $$props, $$slots);
  Astro2.self = $$Picture;
  const defaultFormats = ["webp"];
  const defaultFallbackFormat = "png";
  const specialFormatsFallback = ["gif", "svg", "jpg", "jpeg"];
  const { formats = defaultFormats, pictureAttributes = {}, fallbackFormat, ...props } = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(ImageMissingAlt);
  }
  const scopedStyleClass = props.class?.match(/\bastro-\w{8}\b/)?.[0];
  if (scopedStyleClass) {
    if (pictureAttributes.class) {
      pictureAttributes.class = `${pictureAttributes.class} ${scopedStyleClass}`;
    } else {
      pictureAttributes.class = scopedStyleClass;
    }
  }
  const layout = props.layout ?? imageConfig.layout ?? "none";
  const useResponsive = layout !== "none";
  if (useResponsive) {
    props.layout ??= imageConfig.layout;
    props.fit ??= imageConfig.objectFit ?? "cover";
    props.position ??= imageConfig.objectPosition ?? "center";
  }
  for (const key in props) {
    if (key.startsWith("data-astro-cid")) {
      pictureAttributes[key] = props[key];
    }
  }
  const originalSrc = await resolveSrc(props.src);
  const optimizedImages = await Promise.all(
    formats.map(
      async (format) => await getImage({
        ...props,
        src: originalSrc,
        format,
        widths: props.widths,
        densities: props.densities
      })
    )
  );
  let resultFallbackFormat = fallbackFormat ?? defaultFallbackFormat;
  if (!fallbackFormat && isESMImportedImage(originalSrc) && specialFormatsFallback.includes(originalSrc.format)) {
    resultFallbackFormat = originalSrc.format;
  }
  const fallbackImage = await getImage({
    ...props,
    format: resultFallbackFormat,
    widths: props.widths,
    densities: props.densities
  });
  const imgAdditionalAttributes = {};
  const sourceAdditionalAttributes = {};
  if (props.sizes) {
    sourceAdditionalAttributes.sizes = props.sizes;
  }
  if (fallbackImage.srcSet.values.length > 0) {
    imgAdditionalAttributes.srcset = fallbackImage.srcSet.attribute;
  }
  const { class: className, ...attributes } = {
    ...imgAdditionalAttributes,
    ...fallbackImage.attributes
  };
  return renderTemplate`${maybeRenderHead()}<picture${spreadAttributes(pictureAttributes)}> ${Object.entries(optimizedImages).map(([_, image]) => {
    const srcsetAttribute = props.densities || !props.densities && !props.widths && !useResponsive ? `${image.src}${image.srcSet.values.length > 0 ? ", " + image.srcSet.attribute : ""}` : image.srcSet.attribute;
    return renderTemplate`<source${addAttribute(srcsetAttribute, "srcset")}${addAttribute(mime.lookup(image.options.format ?? image.src) ?? `image/${image.options.format}`, "type")}${spreadAttributes(sourceAdditionalAttributes)}>`;
  })}  <img${addAttribute(fallbackImage.src, "src")}${spreadAttributes(attributes)}${addAttribute(className, "class")}> </picture>`;
}, "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/node_modules/astro/components/Picture.astro", void 0);

const mod = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: 'Module' }));

function filterPreloads(data, preload) {
  if (!preload) {
    return null;
  }
  if (preload === true) {
    return data;
  }
  return data.filter(
    ({ weight, style, subset }) => preload.some((p) => {
      if (p.weight !== void 0 && weight !== void 0 && !checkWeight(p.weight.toString(), weight)) {
        return false;
      }
      if (p.style !== void 0 && p.style !== style) {
        return false;
      }
      if (p.subset !== void 0 && p.subset !== subset) {
        return false;
      }
      return true;
    })
  );
}
function checkWeight(input, target) {
  const trimmedInput = input.trim();
  if (trimmedInput.includes(" ")) {
    return trimmedInput === target;
  }
  if (target.includes(" ")) {
    const [a, b] = target.split(" ");
    const parsedInput = Number.parseInt(input);
    return parsedInput >= Number.parseInt(a) && parsedInput <= Number.parseInt(b);
  }
  return input === target;
}

const $$Astro$b = createAstro("https://moathalgunimi17-svg.github.io");
const $$Font = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$b, $$props, $$slots);
  Astro2.self = $$Font;
  const { componentDataByCssVariable } = mod;
  if (!componentDataByCssVariable) {
    throw new AstroError(ExperimentalFontsNotEnabled);
  }
  const { cssVariable, preload = false } = Astro2.props;
  const data = componentDataByCssVariable.get(cssVariable);
  if (!data) {
    throw new AstroError({
      ...FontFamilyNotFound,
      message: FontFamilyNotFound.message(cssVariable)
    });
  }
  const filteredPreloadData = filterPreloads(data.preloads, preload);
  return renderTemplate`<style>${unescapeHTML(data.css)}</style>${filteredPreloadData?.map(({ url, type }) => renderTemplate`<link rel="preload"${addAttribute(url, "href")} as="font"${addAttribute(`font/${type}`, "type")} crossorigin>`)}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/node_modules/astro/components/Font.astro", void 0);

const assetQueryParams = undefined;
							const imageConfig = {"endpoint":{"route":"/_image/"},"service":{"entrypoint":"astro/assets/services/sharp","config":{}},"domains":[],"remotePatterns":[],"responsiveStyles":false};
							Object.defineProperty(imageConfig, 'assetQueryParams', {
								value: assetQueryParams,
								enumerable: false,
								configurable: true,
							});
							const getImage = async (options) => await getImage$1(options, imageConfig);

const categories = [
  {
    id: "girls",
    slug: "girls",
    name: { ar: "للبنات", en: "For girls" },
    blurb: { ar: "قلوب وألوان وردية هادئة", en: "Hearts and quiet pinks" },
    art: "kid-facemask",
    tint: "blush"
  },
  {
    id: "boys",
    slug: "boys",
    name: { ar: "للأولاد", en: "For boys" },
    blurb: { ar: "غيوم ومربعات بدرجات الأزرق", en: "Clouds and soft blue checks" },
    art: "kid-camera",
    tint: "lavender"
  },
  {
    id: "everyone",
    slug: "everyone",
    name: { ar: "للجميع", en: "For everyone" },
    blurb: { ar: "خطوط وفيونكات تناسب الكل", en: "Stripes and bows for anyone" },
    art: "kid-reading",
    tint: "butter"
  }
];
const sizes = [
  { id: "2y", label: { ar: "سنتان", en: "2 yrs" } },
  { id: "3y", label: { ar: "3 سنوات", en: "3 yrs" } },
  { id: "4y", label: { ar: "4 سنوات", en: "4 yrs" } },
  { id: "5y", label: { ar: "5 سنوات", en: "5 yrs" } },
  { id: "6y", label: { ar: "6 سنوات", en: "6 yrs" } },
  { id: "8y", label: { ar: "8 سنوات", en: "8 yrs" } }
];
const products = [
  {
    id: "p-cloud-dreams",
    slug: "cloud-dreams",
    name: { ar: "بيجامة غيوم الأحلام", en: "Cloud Dreams pajamas" },
    summary: { ar: "غيوم بيضاء على لافندر هادئ", en: "White clouds on calm lavender" },
    description: {
      ar: "طقم بقميص بأزرار وبنطال طويل، تزيّنه غيوم صغيرة على لون لافندر هادئ. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.",
      en: "A button-up top and long trousers scattered with small clouds on calm lavender. This listing is sample data until Nooma adds the real details."
    },
    categoryId: "boys",
    price: 11.5,
    colourways: [
      { id: "lavender", name: { ar: "لافندر", en: "Lavender" }, swatch: "#C5CCF0", photos: [], art: "kid-camera" }
    ],
    sizeIds: ["2y", "3y", "4y", "5y", "6y", "8y"],
    featured: true,
    sample: true
  },
  {
    id: "p-little-hearts",
    slug: "little-hearts",
    name: { ar: "بيجامة القلوب الصغيرة", en: "Little Hearts pajamas" },
    summary: { ar: "قلوب وردية على أرضية فاتحة", en: "Pink hearts on a pale ground" },
    description: {
      ar: "قلوب وردية صغيرة على أرضية فاتحة، مع رباط عند الخصر. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.",
      en: "Small pink hearts on a pale ground, with a tie at the waist. This listing is sample data until Nooma adds the real details."
    },
    categoryId: "girls",
    price: 11.5,
    colourways: [
      { id: "blush", name: { ar: "وردي", en: "Blush" }, swatch: "#F7B9C0", photos: [], art: "kid-facemask" }
    ],
    sizeIds: ["2y", "3y", "4y", "5y", "6y"],
    featured: true,
    sample: true
  },
  {
    id: "p-classic-stripes",
    slug: "classic-stripes",
    name: { ar: "بيجامة الخطوط الكلاسيكية", en: "Classic Stripes pajamas" },
    summary: { ar: "خطوط ناعمة بلونين", en: "Soft stripes in two colours" },
    description: {
      ar: "خطوط طولية ناعمة بقصّة كلاسيكية وجيب صغير على الصدر، بلونين للاختيار. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.",
      en: "Soft vertical stripes in a classic cut with a small chest pocket, in two colours. This listing is sample data until Nooma adds the real details."
    },
    categoryId: "everyone",
    price: 12.5,
    colourways: [
      { id: "pink", name: { ar: "وردي", en: "Pink" }, swatch: "#F4C3C8", photos: [], art: "kid-stretch" },
      { id: "butter", name: { ar: "أصفر زبدي", en: "Butter" }, swatch: "#F7DC92", photos: [], art: "kid-reading" }
    ],
    sizeIds: ["2y", "3y", "4y", "5y", "6y", "8y"],
    featured: true,
    sample: true
  },
  {
    id: "p-blue-gingham",
    slug: "blue-gingham",
    name: { ar: "بيجامة المربعات الزرقاء", en: "Blue Gingham pajamas" },
    summary: { ar: "مربعات زرقاء بلمسة خضراء", en: "Blue checks with a hint of green" },
    description: {
      ar: "مربعات زرقاء فاتحة بقصّة مستقيمة وأزرار أمامية. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.",
      en: "Pale blue checks in a straight cut with front buttons. This listing is sample data until Nooma adds the real details."
    },
    categoryId: "boys",
    price: 10.5,
    colourways: [
      { id: "blue", name: { ar: "أزرق", en: "Blue" }, swatch: "#BFD3F2", photos: [], art: "kid-brushing" }
    ],
    sizeIds: ["3y", "4y", "5y", "6y", "8y"],
    featured: false,
    sample: true
  },
  {
    id: "p-butter-bows",
    slug: "butter-bows",
    name: { ar: "بيجامة الفيونكات", en: "Butter Bows pajamas" },
    summary: { ar: "فيونكات زرقاء على أصفر زبدي", en: "Blue bows on butter yellow" },
    description: {
      ar: "فيونكات صغيرة بلون أزرق هادئ على أرضية صفراء زبدية. بيانات هذا المنتج نموذج تجريبي إلى أن تضيف نُومة تفاصيله الحقيقية.",
      en: "Little bows in calm blue on a butter-yellow ground. This listing is sample data until Nooma adds the real details."
    },
    categoryId: "everyone",
    price: 10.5,
    colourways: [
      { id: "butter", name: { ar: "أصفر زبدي", en: "Butter" }, swatch: "#F8E1A0", photos: [], art: "kid-baking" }
    ],
    sizeIds: ["2y", "3y", "4y", "5y"],
    featured: true,
    sample: true
  }
];

function normalize(text) {
  return text.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f\u064b-\u065f\u0670\u0640]/g, "").replace(/[أإآٱ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه").replace(/ؤ/g, "و").replace(/ئ/g, "ي").replace(/\s+/g, " ").trim();
}

const kidBaking = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/kid-baking.DQob03mq.png","width":505,"height":773,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-baking.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-baking.png");
							return target[name];
						}
					});

const kidBrushing = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/kid-brushing.BzO5GVqv.png","width":418,"height":679,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-brushing.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-brushing.png");
							return target[name];
						}
					});

const kidCamera = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/kid-camera.rWJbaC6p.png","width":518,"height":746,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-camera.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-camera.png");
							return target[name];
						}
					});

const kidFacemask = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/kid-facemask.BweqQKe5.png","width":517,"height":712,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-facemask.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-facemask.png");
							return target[name];
						}
					});

const kidReading = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/kid-reading.B1HOIgyn.png","width":510,"height":730,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-reading.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-reading.png");
							return target[name];
						}
					});

const kidStretch = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/kid-stretch.DUnU3p-n.png","width":471,"height":742,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-stretch.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/kid-stretch.png");
							return target[name];
						}
					});

const mirror = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/mirror-siblings.m3Q1kaBk.png","width":872,"height":1214,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/mirror-siblings.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/mirror-siblings.png");
							return target[name];
						}
					});

const art = {
  "kid-baking": kidBaking,
  "kid-brushing": kidBrushing,
  "kid-camera": kidCamera,
  "kid-facemask": kidFacemask,
  "kid-reading": kidReading,
  "kid-stretch": kidStretch,
  "mirror-siblings": mirror
};
const artAlt = {
  "kid-baking": { ar: "رسم لطفل ببيجامة صفراء بفيونكات يحرّك وعاء خبز", en: "Drawing of a child in yellow bow-print pajamas stirring a mixing bowl" },
  "kid-brushing": { ar: "رسم لطفل ببيجامة مربعات زرقاء يفرّش أسنانه", en: "Drawing of a child in blue gingham pajamas brushing his teeth" },
  "kid-camera": { ar: "رسم لطفل ببيجامة لافندر بالغيوم يلتقط صورة", en: "Drawing of a child in lavender cloud pajamas taking a photo" },
  "kid-facemask": { ar: "رسم لطفلة ببيجامة القلوب الوردية تضع ماسكاً", en: "Drawing of a girl in pink heart pajamas applying a face mask" },
  "kid-reading": { ar: "رسم لطفلة ببيجامة مخططة صفراء تقرأ قصة", en: "Drawing of a girl in yellow striped pajamas reading a story" },
  "kid-stretch": { ar: "رسم لطفلة ببيجامة مخططة وردية تتمطّى في الصباح", en: "Drawing of a girl in pink striped pajamas stretching in the morning" },
  "mirror-siblings": { ar: "رسم لأخوين ببيجامات وردية وزرقاء داخل إطار مرآة", en: "Drawing of two siblings in pink and blue pajamas inside a mirror frame" }
};
const photoFiles = /* #__PURE__ */ Object.assign({});
const colourPhotos = (c) => c.photos.map((f) => photoFiles[`/src/assets/products/${f}`]?.default).filter((x) => !!x);
const coverImage = (c) => colourPhotos(c)[0] ?? art[c.art];
const getProduct = (slug) => products.find((p) => p.slug === slug);
const getCategory = (id) => categories.find((c) => c.id === id);
const sizeById = new Map(sizes.map((s) => [s.id, s]));
const liveCategories = () => categories.filter((c) => products.some((p) => p.categoryId === c.id));
async function toClient(p) {
  const colourways = await Promise.all(
    p.colourways.map(async (c) => {
      const img = await getImage({ src: coverImage(c), width: 160, format: "webp" });
      return { id: c.id, name: c.name, swatch: c.swatch, thumb: img.src };
    })
  );
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    price: p.price,
    categoryId: p.categoryId,
    sizes: p.sizeIds.map((id) => ({ id, label: sizeById.get(id).label })),
    colourways,
    stock: p.stock,
    sample: p.sample,
    search: normalize(
      [
        p.name.ar,
        p.name.en,
        p.summary.ar,
        p.summary.en,
        ...p.colourways.flatMap((c) => [c.name.ar, c.name.en]),
        getCategory(p.categoryId)?.name.ar ?? "",
        getCategory(p.categoryId)?.name.en ?? ""
      ].join(" ")
    )
  };
}
let clientCache = null;
const clientCatalog = () => clientCache ??= Promise.all(products.map(toClient));

function createSvgComponent({ meta, attributes, children }) {
  const Component = createComponent((_, props) => {
    const normalizedProps = normalizeProps(attributes, props);
    return renderTemplate`<svg${spreadAttributes(normalizedProps)}>${unescapeHTML(children)}</svg>`;
  });
  Object.defineProperty(Component, "toJSON", {
    value: () => meta,
    enumerable: false
  });
  return Object.assign(Component, meta);
}
const ATTRS_TO_DROP = ["xmlns", "xmlns:xlink", "version"];
const DEFAULT_ATTRS = {};
function dropAttributes(attributes) {
  for (const attr of ATTRS_TO_DROP) {
    delete attributes[attr];
  }
  return attributes;
}
function normalizeProps(attributes, props) {
  return dropAttributes({ ...DEFAULT_ATTRS, ...attributes, ...props });
}

const stripes = createSvgComponent({"meta":{"src":"/C:/Program%20Files/Git/nooma/_astro/stripes.Cwb4prqI.svg","width":1450,"height":2201,"format":"svg"},"attributes":{"viewBox":"50 -362 1450 2201","preserveAspectRatio":"none"},"children":"<path transform=\"matrix(1.568816,0,0,1.568816,.089637089,-362.06657)\" d=\"M87.2 0H103.2C107.7 18.7 108.299999 35.6 108.899997 52.2 114.399997 198.59999 117.7 345.1 113.899997 491.6 111.59999 579.6 131.7 666.1 126.299999 754 117.299999 902.7 130.7 1051.3 129.59999 1199.9 129.09999 1265.2001 122.69999 1330.4 128.79999 1395.8 128.99999 1398.1001 129.09999 1400.7001 128.9 1403.2001H102.2C101.7 1400.6001 101.399997 1398.0001 101.1 1395.5001 96.6 1351.1001 104.7 1307.0001 106.1 1262.8002 111 1112.9002 93.2 963.5002 101.299999 813.7002 105.299999 739.3002 102.799999 665.1002 85 592.1002 83.2 584.6002 82.1 576.7002 82.2 569.00027 83.2 379.3 81.1 189.6 87.2 0ZM228.6 0H234.1C247.1 81.5 248.6 157.6 242.90001 232.7 237.00002 311.7 241.6 389.9 244.3 468.5 253 722.3 260.3 976.2 255.90001 1230.2 255.00002 1280.2999 256.1 1329.8999 265.1 1379.2999 266.5 1387.2 267.5 1395.2 268 1403.2999H240.7C232.7 1315.4999 232.9 1227.4999 232.3 1139.5 231.40001 1021.9 233.5 904.1 226.40001 786.9 218.1 649.5 219.40001 512.10006 214.8 374.7 210.7 251.6 229.2 129.1 227.5 6 227.5 4.2 227.9 2.5 228.6 0ZM356.8 0H377.69999C377.59999 .8 377.59999 1.7 377.59999 2.4 374.89997 81.200008 379.49998 159.9 378.8 238.7 377.3 399.5 382 560.4 384.09999 721.3 386.39997 903.3 388.19999 1085.3 391.3 1267.3 392 1308.2001 396.59999 1349.2001 400.5 1390 400.9 1394.2 401.5 1398.7 401.7 1403.1H366.5C366 1399.1 365.8 1395 365.8 1391.1 365.69999 1289 365.8 1186.9 365.8 1084.8 365.4 1084.8 365 1084.8 364.5 1084.8 358.9 855.2001 356.8 625.4 346.5 396.00007 340.6 263.50007 348.9 132.20008 356.6 .50006106L356.8 0ZM505.2 0H510.1C518.6 14 516.8 26.2 516.7 37.4 516.10006 165 521.3 292.4 529.10006 419.8 536.50009 540.7 514.10006 661.3 517.80007 782.19998 523.50009 965.1 517.30007 1148.3999 534.00009 1331 535.80007 1350.9 536.2001 1370.9 535.80007 1390.9 535.7001 1394.7001 535.60006 1399 535.00009 1403.1H503.50007C502.40007 1399.2999 501.70008 1395.4 501.50007 1391.9 496.10008 1297.8 485.30006 1203.9 491.20008 1109.4 496.4001 1026.2001 497.50007 943.4 489.70008 860.2 483.50007 794 486.00007 727.6 491.20008 660.9 497.60008 579.2 498.00007 496.80003 496.50007 414.80003 494.40007 299.40003 487.60008 184.10002 502.20008 69.00003 505.2 47.5 498.7 25.6 505.2 0ZM622.2 0H631.3C641.39999 27.3 643.89999 50 643.2 72.8 640.2 182.6 629.60006 292.7 633.8 402.2 645.1 698.4 643.3 994.9 656.8 1291 658.2 1320.9 662.5 1350.6 665.3 1380.5 666 1387.6 666.6 1396.4 665 1403.3H637.6C635.39999 1396.9 635 1388.8 634.6 1382.1001 625.39999 1247.0001 621.89999 1111.7001 621.19998 976.3001 620.2999 819.8001 615.6 663.40017 609.89999 507.00013 604.8 365.8001 613.49996 225.20014 624.1 84.60013 626.2 58.4 618.3 32.4 622.2 0ZM762.7 0H775.7C777.9 27.3 780.2 54.6 781.9 81.9 788.2 181.70001 776.5 281.3 778.30007 381.19999 783.80007 686.1 786.50009 991.1 790.80007 1296.1 791.30007 1330.4 794.60006 1364.7 796.7001 1399 796.80007 1400.3 796.9001 1401.7 797.00009 1403.1H767.9001C767.8001 1402 767.8001 1400.9 767.8001 1399.9 766.3001 1299.1 749.1001 1198.8 757.5001 1097.7 760.5001 1061.1 758.20016 1024.7 756.5001 988.1 744.8001 745.39999 743.20016 502.39997 754.20016 259.8 757.90017 178.99999 762.10018 98.29999 761.70016 17.399994 761.7 11.7 761.1 5.9 762.7 0ZM879 0H893.2C903.7 47.5 900 95.4 899.8 143.1 899.39999 252.8 882.2 362.2 889.39999 471.9 907.89999 755.5 895.99996 1039.7 905.1 1323.4 905.89999 1350 908.3 1376.5 909.69998 1403.1H881.2999C880.5999 1372.6 881.3999 1342.1 878.99996 1311.7999 861.0999 1085.7999 875.89999 859.49996 873.39999 633.3999 872.39999 547.9999 859.49996 462.8999 866.19998 377.3999 876.1 251.8 882.5 126.1 879 0Z\" fill=\"#d1d5e6\" fill-rule=\"evenodd\" />"});

const logoAr = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/logo-ar.CSf6vCQ3.png","width":900,"height":445,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-ar.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-ar.png");
							return target[name];
						}
					});

const $$Astro$a = createAstro("https://moathalgunimi17-svg.github.io");
const $$Icon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$Icon;
  const paths = {
    search: '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
    bag: '<path d="M5.5 8.5h13l-1 11.2a1.5 1.5 0 0 1-1.5 1.3H8a1.5 1.5 0 0 1-1.5-1.3z"/><path d="M9 10.5V7a3 3 0 0 1 6 0v3.5"/>',
    menu: '<path d="M4 7h16M4 12h11M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    chevron: '<path d="m9 6 6 6-6 6"/>',
    chevronDown: '<path d="m6 9 6 6 6-6"/>',
    whatsapp: '<path d="M4.5 19.5 5.6 16A8 8 0 1 1 8.4 18.6z"/><path d="M9.2 8.8c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.6 1.5c.1.2 0 .5-.1.6l-.5.6c.6 1.1 1.5 2 2.6 2.6l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-3-.3a8.6 8.6 0 0 1-3.6-3.6c-.6-1.4-.5-2.4-.3-3z"/>',
    instagram: '<rect x="4" y="4" width="16" height="16" rx="4.5"/><circle cx="12" cy="12" r="3.6"/><circle cx="16.8" cy="7.2" r=".6" fill="currentColor"/>',
    mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7 7.5 6 7.5-6"/>',
    phone: '<path d="M6.6 4.5h2.6l1.3 3.6-1.8 1.2a10 10 0 0 0 4 4l1.2-1.8 3.6 1.3v2.6a1.6 1.6 0 0 1-1.7 1.6A13.5 13.5 0 0 1 5 6.2a1.6 1.6 0 0 1 1.6-1.7z"/>',
    truck: '<path d="M3.5 6.5h10v9h-10zM13.5 9.5h3.6l2.9 3v3h-6.5z"/><circle cx="7.5" cy="17" r="1.8"/><circle cx="16.5" cy="17" r="1.8"/>',
    ruler: '<rect x="3" y="8" width="18" height="8" rx="1.8"/><path d="M7 8v3M11 8v4M15 8v3M19 8v2"/>',
    refresh: '<path d="M19.5 12a7.5 7.5 0 1 1-2.2-5.3"/><path d="M19.5 4.5v4h-4"/>',
    chat: '<path d="M5 18.5V7a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 7v6.5a2.5 2.5 0 0 1-2.5 2.5H8.5z"/><path d="M9 9.5h6M9 12.5h4"/>',
    check: '<path d="m5 12.5 4.5 4.5L19 7.5"/>',
    trash: '<path d="M5 7h14M10 7V5h4v2M7 7l.8 12h8.4L17 7"/>',
    filter: '<path d="M4 7h16M7 12h10M10 17h4"/>',
    star: '<path d="m12 4 2.3 4.8 5.2.6-3.9 3.5 1.1 5.1L12 15.5 7.3 18l1.1-5.1-3.9-3.5 5.2-.6z"/>',
    sparkle: '<path d="M12 3c.6 4.6 2.4 6.4 7 7-4.6.6-6.4 2.4-7 7-.6-4.6-2.4-6.4-7-7 4.6-.6 6.4-2.4 7-7z"/>',
    moon: '<path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.8v2M12 19.2v2M2.8 12h2M19.2 12h2M5.5 5.5l1.4 1.4M17.1 17.1l1.4 1.4M5.5 18.5l1.4-1.4M17.1 6.9l1.4-1.4"/>',
    globe: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.4 2.6 3.5 5.4 3.5 8.5s-1.1 5.9-3.5 8.5c-2.4-2.6-3.5-5.4-3.5-8.5s1.1-5.9 3.5-8.5z"/>',
    gift: '<rect x="4" y="9" width="16" height="11" rx="1.5"/><path d="M3 9h18v-.5H3zM12 9v11"/><path d="M12 9c-1.6-3.4-5-3.6-5-1.4C7 9 9.6 9 12 9zM12 9c1.6-3.4 5-3.6 5-1.4C17 9 14.4 9 12 9z"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 8v.01"/>',
    alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16v.01"/>',
    copy: '<rect x="8" y="8" width="11.5" height="11.5" rx="2"/><path d="M5 15.5V6.5A1.5 1.5 0 0 1 6.5 5h9"/>',
    heart: '<path d="M12 19.5s-7-4.3-7-9.3A3.9 3.9 0 0 1 12 8a3.9 3.9 0 0 1 7 2.2c0 5-7 9.3-7 9.3z"/>'
  };
  const { name, class: cls, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<svg${addAttribute(["icon", cls], "class:list")} viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"${addAttribute(label ? void 0 : "true", "aria-hidden")}${addAttribute(label ? "img" : void 0, "role")}${addAttribute(label, "aria-label")} focusable="false">${unescapeHTML(paths[name])}</svg>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/Icon.astro", void 0);

const $$Astro$9 = createAstro("https://moathalgunimi17-svg.github.io");
const $$Announcement = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Announcement;
  const { locale } = Astro2.props;
  const t = useT(locale);
  const a = site.announcement;
  return renderTemplate`${renderTemplate`${maybeRenderHead()}<div class="announce"><p class="announce__text">${renderComponent($$result, "Icon", $$Icon, { "name": "sparkle", "class": "announce__spark" })}<span>${a[locale]}</span>${renderComponent($$result, "Icon", $$Icon, { "name": "sparkle", "class": "announce__spark" })}</p></div>`}${renderTemplate`<div class="sample-bar"><p class="container">${renderComponent($$result, "Icon", $$Icon, { "name": "info" })}${t("common.sampleBanner")}</p></div>`}`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/Announcement.astro", void 0);

const $$BagIcon = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<svg class="bag-icon" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false"> <defs> <clipPath id="bag-body"><path d="M6.5 11h19l-1.4 15.2a2 2 0 0 1-2 1.8H9.9a2 2 0 0 1-2-1.8z"></path></clipPath> </defs> <path class="bag-icon__body" d="M6.5 11h19l-1.4 15.2a2 2 0 0 1-2 1.8H9.9a2 2 0 0 1-2-1.8z"></path> <g clip-path="url(#bag-body)" class="bag-icon__stripes"> <path d="M9 10c.6 6 -.6 12 .2 19M13.5 10c-.5 6 .6 12 -.2 19M18 10c.6 6-.5 12 .2 19M22.5 10c-.5 6 .5 12-.2 19"></path> </g> <path class="bag-icon__outline" d="M6.5 11h19l-1.4 15.2a2 2 0 0 1-2 1.8H9.9a2 2 0 0 1-2-1.8z"></path> <path class="bag-icon__handle" d="M11.5 13.5V9a4.5 4.5 0 0 1 9 0v4.5"></path> </svg>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/BagIcon.astro", void 0);

const logoEn = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/logo-en.BL52SutJ.png","width":900,"height":490,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-en.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-en.png");
							return target[name];
						}
					});

const $$Astro$8 = createAstro("https://moathalgunimi17-svg.github.io");
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Header;
  const { locale } = Astro2.props;
  const t = useT(locale);
  const other = locale === "ar" ? "en" : "ar";
  const langHref = alternate(Astro2.url.pathname, other);
  const logo = locale === "ar" ? logoAr : logoEn;
  const cats = liveCategories();
  const here = Astro2.url.pathname;
  const isCurrent = (p) => here === href(locale, p) ? "page" : void 0;
  return renderTemplate`${maybeRenderHead()}<header class="site-header" data-header> <div class="container header__bar"> <button class="icon-btn header__menu" type="button" data-open="mobile-menu" aria-haspopup="dialog"> ${renderComponent($$result, "Icon", $$Icon, { "name": "menu" })} <span class="visually-hidden">${t("a11y.menu")}</span> </button> <a class="header__logo"${addAttribute(href(locale), "href")}${addAttribute(t("a11y.home"), "aria-label")}> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": "", "width": 150, "densities": [1, 2], "loading": "eager", "fetchpriority": "high" })} </a> <nav class="header__nav"${addAttribute(t("nav.shop"), "aria-label")}> <ul role="list"> <li><a${addAttribute(href(locale, routes.shop), "href")}${addAttribute(isCurrent(routes.shop), "aria-current")}>${t("nav.allProducts")}</a></li> <li class="has-panel"> <button type="button" class="nav-disclosure" aria-expanded="false" aria-controls="nav-collections"> ${t("nav.collections")} ${renderComponent($$result, "Icon", $$Icon, { "name": "chevronDown" })} </button> <div class="nav-panel" id="nav-collections" hidden> <ul role="list" class="nav-panel__grid"> ${cats.map((c) => renderTemplate`<li> <a class="nav-tile"${addAttribute(href(locale, routes.collection(c.slug)), "href")}${addAttribute(`--tint: var(--tint-${c.tint})`, "style")}> ${renderComponent($$result, "Image", $$Image, { "src": art[c.art], "alt": "", "width": 96, "densities": [1, 2] })} <span><strong>${c.name[locale]}</strong><small>${c.blurb[locale]}</small></span> </a> </li>`)} </ul> </div> </li> <li><a${addAttribute(href(locale, routes.about), "href")}${addAttribute(isCurrent(routes.about), "aria-current")}>${t("nav.about")}</a></li> <li><a${addAttribute(href(locale, routes.contact), "href")}${addAttribute(isCurrent(routes.contact), "aria-current")}>${t("nav.contact")}</a></li> </ul> </nav> <div class="header__actions"> <button class="icon-btn" type="button" data-open="search-dialog" aria-haspopup="dialog"> ${renderComponent($$result, "Icon", $$Icon, { "name": "search" })} <span class="visually-hidden">${t("nav.search")}</span> </button> <a class="header__lang"${addAttribute(langHref, "href")}${addAttribute(other, "hreflang")}${addAttribute(other, "lang")} data-lang-switch> <span aria-hidden="true">${t("nav.langCode")}</span> <span class="visually-hidden">${t("nav.lang")}</span> </a> <button class="bag-btn" type="button" data-open-cart aria-haspopup="dialog"> ${renderComponent($$result, "BagIcon", $$BagIcon, {})} <span class="bag-btn__count" data-cart-count aria-hidden="true">0</span> <span class="visually-hidden" data-cart-label>${t("a11y.cartCount", { n: 0 })}</span> </button> </div> </div> </header> <dialog class="sheet sheet--start" id="mobile-menu"${addAttribute(t("a11y.menu"), "aria-label")}> <div class="sheet__head"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": site.name[locale], "width": 110, "densities": [1, 2] })} <button class="icon-btn" type="button" data-close> ${renderComponent($$result, "Icon", $$Icon, { "name": "close" })}<span class="visually-hidden">${t("a11y.closeMenu")}</span> </button> </div> <nav class="sheet__body mobile-nav"${addAttribute(t("a11y.menu"), "aria-label")}> <a class="mobile-nav__big"${addAttribute(href(locale, routes.shop), "href")}>${t("nav.allProducts")}</a> <p class="mobile-nav__label">${t("nav.collections")}</p> <ul role="list" class="mobile-nav__tiles"> ${cats.map((c) => renderTemplate`<li> <a class="nav-tile"${addAttribute(href(locale, routes.collection(c.slug)), "href")}${addAttribute(`--tint: var(--tint-${c.tint})`, "style")}> ${renderComponent($$result, "Image", $$Image, { "src": art[c.art], "alt": artAlt[c.art][locale], "width": 72, "densities": [1, 2] })} <span><strong>${c.name[locale]}</strong></span> </a> </li>`)} </ul> <ul role="list" class="mobile-nav__links"> <li><a${addAttribute(href(locale, routes.about), "href")}>${t("nav.about")}</a></li> <li><a${addAttribute(href(locale, routes.sizeGuide), "href")}>${t("nav.sizeGuide")}</a></li> <li><a${addAttribute(href(locale, routes.faq), "href")}>${t("faq.title")}</a></li> <li><a${addAttribute(href(locale, routes.contact), "href")}>${t("nav.contact")}</a></li> <li><a${addAttribute(langHref, "href")}${addAttribute(other, "hreflang")}${addAttribute(other, "lang")} data-lang-switch>${renderComponent($$result, "Icon", $$Icon, { "name": "globe" })} ${t("nav.lang")}</a></li> </ul> <div class="mobile-nav__contact"> <a class="btn btn--wa btn--block"${addAttribute(site.contact.whatsappLink, "href")} target="_blank" rel="noopener">${renderComponent($$result, "Icon", $$Icon, { "name": "whatsapp" })} ${t("hero.whatsapp")}</a> <a class="btn btn--ghost btn--block"${addAttribute(site.contact.instagramUrl, "href")} target="_blank" rel="noopener">${renderComponent($$result, "Icon", $$Icon, { "name": "instagram" })} <bdi dir="ltr">@${site.contact.instagramHandle}</bdi></a> </div> </nav> </dialog>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/Header.astro", void 0);

const $$Astro$7 = createAstro("https://moathalgunimi17-svg.github.io");
const $$Stars = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Stars;
  const { count = 18, seed = 1, class: cls } = Astro2.props;
  let s = seed * 9301 + 49297;
  const rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  const stars = Array.from({ length: count }, (_, i) => ({
    x: (rnd() * 96 + 2).toFixed(1),
    y: (rnd() * 90 + 4).toFixed(1),
    size: Math.round(8 + rnd() * 14),
    delay: (rnd() * 4).toFixed(2),
    dur: (2.6 + rnd() * 2.8).toFixed(2),
    tone: i % 3 === 0 ? "blush" : i % 3 === 1 ? "butter" : "paper"
  }));
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["stars", cls], "class:list")} aria-hidden="true"> ${stars.map((st) => renderTemplate`<svg${addAttribute(`star star--${st.tone}`, "class")} viewBox="0 0 24 24"${addAttribute(`left:${st.x}%;top:${st.y}%;width:${st.size}px;height:${st.size}px;--d:${st.delay}s;--t:${st.dur}s`, "style")}> <path d="M12 2c.7 5.4 2.6 7.3 8 8-5.4.7-7.3 2.6-8 8-.7-5.4-2.6-7.3-8-8 5.4-.7 7.3-2.6 8-8z"></path> </svg>`)} </div>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/Stars.astro", void 0);

const logoArLight = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/logo-ar-light.DTtl7HEk.png","width":900,"height":445,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-ar-light.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-ar-light.png");
							return target[name];
						}
					});

const logoEnLight = new Proxy({"src":"/C:/Program%20Files/Git/nooma/_astro/logo-en-light._VJN67WD.png","width":900,"height":490,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-en-light.png";
							}
							if (target[name] !== undefined && globalThis.astroAsset) globalThis.astroAsset?.referencedImages.add("C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/assets/brand/logo-en-light.png");
							return target[name];
						}
					});

const catCurled = createSvgComponent({"meta":{"src":"/C:/Program%20Files/Git/nooma/_astro/cat-curled.DUWP5z2z.svg","width":778,"height":724,"format":"svg"},"attributes":{"viewBox":"344 397 778 724"},"children":"\r\n<defs>\r\n<clipPath id=\"clip_1\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M0 0H6250V6250H0Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n<clipPath id=\"clip_2\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M0 0H6250V6250H0Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n<clipPath id=\"clip_3\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M1451.4177 1588.6987H4676.418V4660.5739H1451.4177Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n</defs>\r\n<g clip-path=\"url(#clip_1)\">\r\n\r\n</g>\r\n<g clip-path=\"url(#clip_2)\">\r\n\r\n</g>\r\n<g clip-path=\"url(#clip_3)\">\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M433.55 278.34C433.55 362.45 339.34999 405.93 223.10999 405.93 106.869998 405.93 12.67 362.45 12.67 278.34 12.67 254.51 20.23 231.91 33.78 211.79999 41.78376 200.02735 51.217096 189.54068 62.079999 180.34 69.12691 174.31552 76.57024 168.82886 84.409999 163.88 90.00333 160.31334 95.82666 156.98 101.88 153.88 108.729999 150.38 115.88 147.14 123.36 144.23001 124.85 143.67002 126.36 143.08002 127.86 142.52 138.64151 138.55875 149.64151 135.34542 160.86 132.88 181.36104 128.30356 202.11437 126.03023 223.12 126.060009 319.77 126.060009 401.12 173.20001 425.84999 237.43001 428.387 243.95166 430.30268 250.65099 431.59706 257.52796 432.8914 264.40495 433.5424 271.3423 433.55 278.34Z\" fill=\"#f7c67e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M14.24 260.39C9.595056 268.6932 6.0417225 277.43989 3.58 286.63 1.4523745 294.7225 .27119626 302.95085 .036464584 311.31507-.19826706 319.67927 .5195781 327.9609 2.19 336.16 9.719999 374.16 35.649999 408.36 66.380008 430.16 74.18789 435.7201 82.45789 440.47676 91.19 444.43 91.512638 444.61228 91.84597 444.77229 92.19 444.91 100.41 448.52336 108.38667 451.6 116.12 454.14 117.65 454.66 119.12 455.14 120.61 455.57 127.611377 457.81925 134.71804 459.6626 141.93 461.1 146.84999 462.1 151.59 462.89 156.2 463.45 159.73 463.89 163.2 464.19 166.51999 464.37004 217.51999 467.37004 246.41999 443.56004 231.75 413.10005 224.01 397.17005 208.12 390.51005 184.67 382.85005L182.19 382.07005C176.48 380.24006 170.3 378.33006 163.73001 376.19004 160.82 375.24003 157.81002 374.24003 154.73001 373.19004 149.64002 371.49003 144.28002 369.62004 138.73001 367.49003 133.18001 365.36003 127.500019 363.14 121.58001 360.57 120.19001 359.96003 118.84001 359.4 117.490009 358.79 109.07 355 101.28 351 94.15 347 68.51 332.59 51 317 39 303.08 34.009817 297.36854 29.51315 291.29185 25.51 284.84999 16.46 270.31 14.24 260.39 14.24 260.39Z\" fill=\"#f7c67e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M184.67 385.86C184.36034 385.86097 184.057 385.81764 183.76 385.72999L174.06999 382.65998C170.45999 381.51997 166.7 380.33 162.79 379.05998 159.84999 378.08665 156.84999 377.08665 153.79 376.05998 147.87 374.05998 142.59999 372.20997 137.70999 370.31999 131.4 367.93998 125.70999 365.64997 120.44999 363.31999L119.039989 362.71C118.12998 362.31999 117.219989 361.93 116.30998 361.52 108.08998 357.84999 100.11998 353.84 92.64998 349.59999 70.07 337 51.23 322 36.65 305.08 31.554646 299.24134 26.961314 293.0313 22.870003 286.44999 13.700003 271.65998 11.3600029 261.44999 11.260003 261.05 11.216417 260.85304 11.192457 260.65373 11.188124 260.45207 11.18379 260.2504 11.199166 260.05024 11.234251 259.85157 11.269338 259.65293 11.323459 259.45964 11.396616 259.2716 11.469772 259.08366 11.560559 258.90464 11.668978 258.7345 11.777396 258.5644 11.901363 258.4065 12.040877 258.2608 12.180391 258.1151 12.332774 257.98445 12.498026 257.86875 12.663279 257.75306 12.838225 257.6546 13.022867 257.5734 13.207509 257.49217 13.3983 257.42973 13.595239 257.38606 13.792177 257.34239 13.991483 257.31837 14.193154 257.31394 14.394825 257.30955 14.594989 257.32487 14.793645 257.35987 14.992302 257.39488 15.185636 257.44895 15.373648 257.52204 15.561659 257.59513 15.740737 257.68586 15.910881 257.79423 16.081027 257.9026 16.238968 258.0265 16.384709 258.16593 16.53045 258.3054 16.66119 258.45774 16.77693 258.62297 16.89267 258.78819 16.991189 258.96308 17.072482 259.14768 17.153775 259.33235 17.21628 259.5231 17.260003 259.72 17.260003 259.81 19.530003 269.41 28.110003 283.24 32.025804 289.5449 36.425806 295.49159 41.31 301.08 55.39 317.45 73.68 332 95.64 344.29 102.95 348.44 110.74 352.37 118.8 355.96003 119.69 356.36003 120.560009 356.73 121.450008 357.12004L122.87 357.73C128.08 359.99003 133.65001 362.24003 139.87 364.6 144.69 366.45 149.87 368.31 155.72 370.25 158.78 371.3033 161.78 372.3033 164.72 373.25 168.6 374.51 172.35 375.7 175.94 376.83L185.61 379.9C185.80698 379.92988 185.99916 379.9787 186.18653 380.04643 186.37389 380.11415 186.55286 380.1995 186.72342 380.30247 186.89397 380.40547 187.05284 380.52409 187.20001 380.65834 187.34722 380.7926 187.47989 380.93995 187.59806 381.10038 187.71622 381.26078 187.8176 381.43119 187.90219 381.61158 187.98679 381.79197 188.05298 381.97889 188.10077 382.1723 188.14855 382.36573 188.17699 382.56196 188.18611 382.761 188.19525 382.96 188.18488 383.15803 188.155 383.355 188.12512 383.552 188.07631 383.74418 188.00858 383.93156 187.94086 384.1189 187.8555 384.29786 187.75252 384.4684 187.64954 384.63899 187.5309 384.79786 187.39662 384.94505 187.26235 385.09223 187.11499 385.22489 186.95458 385.34306 186.79416 385.4612 186.62377 385.5626 186.44339 385.6472 186.263 385.73179 186.0761 385.79798 185.88268 385.84574 185.68924 385.89353 185.49303 385.92198 185.294 385.9311 185.09497 385.94023 184.89698 385.92988 184.7 385.9L184.67 385.86Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M160.85 132.91C160.6491 133.5493 160.37577 134.15598 160.03 134.73001 159.11806 136.33536 157.87807 137.62535 156.31 138.6 153.93 141.36 148.64 149.06002 143.95 162.25 136.5 183 133 209.9 133.93 240 133.93999 240.36553 133.9321 240.73069 133.90636 241.09546 133.88062 241.46024 133.83713 241.82289 133.7759 242.18343 133.71466 242.54395 133.63596 242.90062 133.53981 243.25345 133.44367 243.60628 133.33054 243.95357 133.20043 244.29535 133.0703 244.63709 132.92378 244.97165 132.7609 245.29906 132.59803 245.62647 132.41956 245.94516 132.2255 246.25511 132.03144 246.56505 131.82271 246.86478 131.5993 247.1543 131.37592 247.44384 131.13893 247.72177 130.88834 247.98812 130.63773 248.25443 130.37473 248.50789 130.09934 248.74849 129.82393 248.98908 129.53745 249.21564 129.23989 249.42819 128.94229 249.64073 128.63506 249.83826 128.31816 250.02075 128.00127 250.20323 127.676219 250.36983 127.343029 250.52053 127.00981 250.67119 126.670047 250.80524 126.32372 250.92266 125.9774 251.04007 125.62617 251.1403 125.270038 251.22336 124.913898 251.3064 124.55456 251.37186 124.19202 251.41976 123.829479 251.46764 123.46547 251.49771 123.09999 251.51H122.759998C122.040248 251.51032 121.32712 251.44171 120.62062 251.30419 119.91413 251.16664 119.22735 250.96273 118.56027 250.69242 117.893199 250.42212 117.25819 250.09044 116.65523 249.69738 116.05228 249.30432 115.49254 248.85718 114.97602 248.35591 114.45951 247.85466 113.99577 247.30858 113.584819 246.71768 113.17387 246.12679 112.8233 245.502 112.53313 244.84333 112.24295 244.18466 112.01854 243.5043 111.859889 242.80225 111.70123 242.10019 111.61127 241.38944 111.59 240.67 110.21999 194.25 118.59 162.15 127.86 142.53 138.63874 138.57598 149.63539 135.36931 160.85 132.91Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M123.36 144.26C122.41511 145.38013 121.28511 146.26346 119.97 146.90999 115.91 150.62999 96.55 171.32999 98.53 223.04999 98.54237 223.41497 98.53693 223.77967 98.51366 224.14409 98.490398 224.50855 98.449428 224.871 98.39075 225.23145 98.332057 225.59188 98.255939 225.9486 98.16239 226.30159 98.06885 226.6546 97.95831 227.0022 97.830799 227.3444 97.70327 227.6866 97.55937 228.02176 97.3991 228.3499 97.23882 228.67804 97.062938 228.99759 96.87143 229.30854 96.679927 229.61948 96.47372 229.92035 96.25281 230.21114 96.031909 230.50193 95.79735 230.78127 95.54914 231.04914 95.30093 231.317 95.040248 231.57213 94.767108 231.81453 94.49397 232.05693 94.20967 232.28543 93.9142 232.50003 93.61873 232.71463 93.3135 232.91432 92.99851 233.0991 92.68352 233.28389 92.360279 233.45288 92.02877 233.60607 91.697269 233.75923 91.35908 233.89589 91.01422 234.01604 90.66936 234.13617 90.319469 234.23921 89.96454 234.32517 89.60961 234.4111 89.251338 234.47954 88.88972 234.53047 88.5281 234.58139 88.16486 234.61458 87.8 234.63H87.36C86.64476 234.62856 85.936199 234.55907 85.234317 234.42151 84.532428 234.28397 83.850048 234.08089 83.18717 233.81226 82.5243 233.54361 81.89305 233.21434 81.29343 232.82444 80.69381 232.43453 80.13677 231.99114 79.622318 231.49423 79.107868 230.99733 78.64541 230.45601 78.23495 229.87029 77.824489 229.28456 77.47352 228.66512 77.18205 228.01197 76.89058 227.35881 76.66393 226.68389 76.50211 225.98719 76.340297 225.29048 76.246257 224.58477 76.22 223.87001 76.04 219.29001 76.04 214.87001 76.15 210.61002 76.31364 204.3384 76.82364 198.09506 77.68 191.88002 78.92365 182.30641 81.166988 172.97309 84.41 163.88002 90.003337 160.31336 95.82667 156.98001 101.880008 153.88002 108.73 150.41 115.91 147.17 123.36 144.26Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M326.16 320.37C226.16 325.91999 142.53 284.63 137.62001 196.04999 133.56002 123.109989 185.09001 58.47998 259.26 34.829988 266.4013 32.559465 273.64799 30.699467 281 29.25 284.90666 28.43 288.88999 27.763335 292.95 27.25 298.46003 26.47 304.05003 25.91 309.74003 25.61 312.54 25.460001 315.33003 25.35 318.08003 25.310002 323.96669 25.236668 329.80003 25.386668 335.58003 25.760003 344.05314 26.370993 352.45646 27.500994 360.79 29.150002 437.19 44.410005 495.68 102.98 499.79 175.95001 504.7 264.52 426.17 314.82 326.16 320.37Z\" fill=\"#f7c67e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M435.16 290.81C435.06996 290.65055 434.96528 290.50135 434.84599 290.3624 434.72669 290.22349 434.595 290.09748 434.451 289.98435 434.30696 289.87129 434.1533 289.77326 433.99003 289.6903 433.82673 289.60734 433.65696 289.54106 433.48069 289.4914 433.3044 289.44175 433.125 289.40974 432.94245 289.39533 432.75987 289.3809 432.57765 289.3843 432.39573 289.40565 432.2138 289.42698 432.03575 289.46577 431.86146 289.522 431.6872 289.57826 431.52006 289.6509 431.36003 289.74 402.85 305.74 366.42 315.34 326 317.59 217.72 323.59 144.84 275.84 140.4 195.9 139.88034 186.51552 140.29383 177.17237 141.64046 167.8705 142.98709 158.56864 145.24028 149.49179 148.4 140.64 148.46475 140.46646 148.51177 140.28826 148.54102 140.10536 148.57027 139.92247 148.5812 139.7385 148.57382 139.55342 148.56644 139.36835 148.54088 139.18582 148.49713 139.00583 148.45339 138.82585 148.39234 138.65196 148.31397 138.48413 148.2356 138.31632 148.14145 138.15787 148.03153 138.00879 147.9216 137.85971 147.79805 137.72293 147.66089 137.59847 147.52371 137.47402 147.37563 137.3643 147.21662 137.26932 147.0576 137.17435 146.89078 137.096 146.71616 137.03424 146.54152 136.97249 146.36254 136.92858 146.17917 136.90247 145.99579 136.87636 145.81165 136.8686 145.62674 136.87918 145.44182 136.88976 145.25977 136.91846 145.08055 136.96529 144.90137 137.01212 144.72855 137.07616 144.5621 137.15743 144.39566 137.23867 144.23886 137.33553 144.0917 137.44802 143.94457 137.56049 143.80994 137.68639 143.68785 137.82569 143.56577 137.96498 143.45862 138.11493 143.36641 138.27556 143.27419 138.43619 143.19872 138.60433 143.14 138.78 139.85712 147.97945 137.51793 157.4129 136.12244 167.08036 134.72693 176.74782 134.30278 186.45769 134.85 196.20999 139.22 274.87 206.44 323.68 307.93 323.68 313.93 323.68 320.06666 323.50666 326.34 323.16 367.6 320.87 404.88 311 434.12 294.62 434.27937 294.5292 434.4283 294.4237 434.56687 294.3035 434.7054 294.1833 434.8309 294.05073 434.94334 293.9058 435.05574 293.76087 435.15287 293.60633 435.2348 293.44224 435.31675 293.2781 435.38185 293.10758 435.4301 292.93067 435.47843 292.75373 435.50898 292.57377 435.52177 292.39079 435.5346 292.20783 435.52943 292.02537 435.50627 291.8434 435.4831 291.66145 435.44236 291.48353 435.3841 291.3096 435.3258 291.1357 435.2511 290.96919 435.16 290.81Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M380.76 55.89C380.76 55.89 449.66-14.520004 474.30003 2.7200013 498.94004 19.960007 477.78004 118.450008 477.78004 118.450008L380.76 55.89Z\" fill=\"#f7c67e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M236.57 63.9C236.57 63.9 160.29 1.55 137.72 21.41 115.15001 41.27 147.07 136.82 147.07 136.82L236.57 63.9Z\" fill=\"#f7c67e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M410.16 47.81C410.16 47.81 451.36 5.52 468 17.18 484.64 28.84 470.36 95.5 470.36 95.5 453.77 73.61 434.12 57 410.16 47.81Z\" fill=\"#fff3e7\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M208.56 60.43C208.56 60.43 163.86 25.580002 148.56 39.02 133.26 52.46 154.89 117.11 154.89 117.11 169 93 185.92 72.86 208.56 60.43Z\" fill=\"#fff3e7\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M290.06999 180.19C290.06999 180.5958 290.0501 181.00061 290.01036 181.40445 289.97056 181.80828 289.91108 182.20919 289.83189 182.60715 289.75276 183.00514 289.65428 183.3983 289.53648 183.78662 289.41868 184.17494 289.2821 184.55654 289.1268 184.93143 288.9715 185.30634 288.79823 185.67273 288.60694 186.03061 288.41569 186.38848 288.2073 186.7361 287.98188 187.07349 287.75645 187.41089 287.51499 187.73644 287.25755 188.05013 287.00013 188.3638 286.72798 188.66411 286.441 188.95105 286.15409 189.23799 285.8538 189.51018 285.5401 189.76761 285.2264 190.02504 284.90089 190.26648 284.56346 190.4919 284.22608 190.71735 283.87849 190.9257 283.5206 191.117 283.16273 191.30829 282.79634 191.48157 282.42143 191.63686 282.0465 191.79215 281.6649 191.9287 281.27659 192.0465 280.88829 192.16429 280.49513 192.26277 280.0971 192.34194 279.69914 192.42111 279.29826 192.48058 278.89445 192.52036 278.4906 192.56012 278.0858 192.58 277.68 192.58 277.2742 192.58 276.8694 192.56012 276.46556 192.52034 276.0617 192.48056 275.6608 192.4211 275.2628 192.34192 274.8648 192.26277 274.47169 192.16429 274.08335 192.0465 273.695 191.9287 273.31343 191.79215 272.9385 191.63686 272.56364 191.48157 272.19728 191.30829 271.8394 191.117 271.4815 190.9257 271.13389 190.71735 270.79646 190.4919 270.45909 190.26648 270.13356 190.02504 269.81986 189.76761 269.50617 189.51018 269.20585 189.23799 268.9189 188.95105 268.63203 188.66411 268.35984 188.3638 268.1024 188.05013 267.84498 187.73644 267.60353 187.41089 267.37806 187.07349 267.15263 186.7361 266.94429 186.38848 266.753 186.03061 266.56169 185.67273 266.3884 185.30634 266.2331 184.93143 266.07783 184.55654 265.94129 184.17494 265.8235 183.78662 265.7057 183.39832 265.6072 183.00516 265.528 182.60717 265.44889 182.20919 265.3894 181.80828 265.34965 181.40445 265.30989 181.00061 265.28999 180.5958 265.28999 180.19 265.28999 179.78423 265.30989 179.37941 265.34965 178.97559 265.3894 178.57175 265.44889 178.17082 265.528 177.77283 265.6072 177.37485 265.7057 176.9817 265.8235 176.59339 265.94129 176.20507 266.07783 175.82344 266.2331 175.44853 266.3884 175.07364 266.56169 174.70726 266.753 174.3494 266.94429 173.99153 267.15263 173.64389 267.37806 173.30648 267.60353 172.96909 267.84498 172.64356 268.1024 172.32988 268.35984 172.0162 268.63203 171.71588 268.9189 171.42894 269.20585 171.14202 269.50617 170.86983 269.81986 170.6124 270.13356 170.35497 270.45906 170.11353 270.79643 169.88808 271.13386 169.66263 271.4815 169.45427 271.83937 169.26299 272.19725 169.0717 272.56364 168.8984 272.9385 168.74312 273.31343 168.58783 273.695 168.45131 274.0833 168.33353 274.47166 168.21573 274.86479 168.11724 275.26277 168.03806 275.66078 167.95891 276.0617 167.89945 276.46556 167.85968 276.8694 167.8199 277.2742 167.8 277.68 167.8 278.0858 167.8 278.4906 167.8199 278.89445 167.85968 279.29826 167.89946 279.69914 167.95893 280.0971 168.03807 280.49513 168.11725 280.88829 168.21573 281.27659 168.33353 281.6649 168.45131 282.04649 168.58785 282.4214 168.74314 282.7963 168.89842 283.1627 169.07172 283.52058 169.263 283.87846 169.45427 284.22608 169.66263 284.56346 169.88808 284.90089 170.11353 285.2264 170.35498 285.5401 170.61241 285.8538 170.86985 286.15409 171.14202 286.441 171.42894 286.72798 171.71588 287.00013 172.01619 287.25755 172.32987 287.51499 172.64354 287.75645 172.96909 287.98188 173.30648 288.2073 173.64389 288.41569 173.99153 288.60697 174.3494 288.79823 174.70726 288.9715 175.07364 289.1268 175.44853 289.2821 175.82344 289.41868 176.20505 289.53648 176.59337 289.65428 176.98169 289.75276 177.37485 289.83189 177.77283 289.91108 178.17082 289.97056 178.57175 290.0103 178.97559 290.05009 179.37941 290.06999 179.78423 290.06999 180.19Z\" fill=\"#62442f\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M394.34 174.4C394.34 174.80579 394.3201 175.21059 394.28034 175.61441 394.24055 176.01827 394.18107 176.41918 394.1019 176.81716 394.02278 177.21515 393.9243 177.60829 393.8065 177.99662 393.6887 178.38492 393.55213 178.76653 393.39683 179.14142 393.24159 179.51633 393.0683 179.88272 392.877 180.24059 392.68574 180.59845 392.47737 180.94609 392.2519 181.2835 392.02647 181.62091 391.78504 181.94644 391.52763 182.26012 391.27018 182.57379 390.998 182.8741 390.71104 183.16104 390.42408 183.44799 390.12379 183.72017 389.81013 183.9776 389.49644 184.23502 389.17088 184.47644 388.83348 184.70188 388.49607 184.92734 388.14845 185.13571 387.7906 185.327 387.4327 185.51828 387.0663 185.69156 386.6914 185.84685 386.31654 186.00215 385.93495 186.1387 385.54664 186.2565 385.1583 186.37429 384.76515 186.47275 384.36714 186.55191 383.96919 186.63109 383.56828 186.69055 383.16444 186.73033 382.76063 186.77011 382.3558 186.79 381.95 186.79 381.54426 186.79 381.13945 186.7701 380.7356 186.73032 380.33177 186.69055 379.93086 186.63109 379.53285 186.55191 379.13487 186.47275 378.7417 186.37427 378.3534 186.25649 377.96507 186.1387 377.58348 186.00215 377.20857 185.84687 376.83366 185.69158 376.46726 185.51828 376.10935 185.32701 375.7515 185.13571 375.40388 184.92734 375.06648 184.70189 374.72904 184.47644 374.4035 184.23502 374.08985 183.9776 373.77616 183.72017 373.47584 183.44799 373.1889 183.16104 372.90199 182.8741 372.6298 182.5738 372.37239 182.26013 372.11494 181.94646 371.87348 181.62091 371.64805 181.2835 371.4226 180.94609 371.21427 180.59845 371.02296 180.24059 370.83164 179.88272 370.65837 179.51633 370.50309 179.14142 370.3478 178.76653 370.21128 178.38492 370.09349 177.99662 369.97569 177.60829 369.8772 177.21515 369.798 176.81716 369.71888 176.41918 369.65943 176.01827 369.61967 175.61441 369.5799 175.21059 369.56004 174.80579 369.56 174.4 369.56004 173.99422 369.5799 173.58942 369.61967 173.18556 369.65943 172.78174 369.7189 172.38083 369.79804 171.98282 369.8772 171.58483 369.97569 171.19167 370.09349 170.80335 370.21128 170.41503 370.3478 170.03342 370.50309 169.65853 370.65837 169.28363 370.83164 168.91725 371.02296 168.55939 371.21424 168.2015 371.42259 167.85387 371.648 167.51647 371.87348 167.17908 372.11494 166.85353 372.3724 166.53984 372.62983 166.22617 372.90199 165.92588 373.1889 165.63893 373.47584 165.35199 373.77616 165.07982 374.08985 164.82239 374.4035 164.56497 374.72904 164.32353 375.06648 164.09809 375.40388 163.87264 375.7515 163.66428 376.10935 163.473 376.46726 163.28171 376.83366 163.10842 377.20857 162.95313 377.58348 162.79785 377.96507 162.66132 378.35337 162.54352 378.7417 162.42572 379.13487 162.32724 379.53285 162.24806 379.93086 162.16892 380.33177 162.10945 380.7356 162.06967 381.13945 162.02989 381.54426 162.01001 381.95 162.01 382.3558 162.01001 382.76063 162.02989 383.16444 162.06966 383.56828 162.10944 383.96919 162.16892 384.36714 162.24806 384.76515 162.32724 385.1583 162.42572 385.54664 162.54352 385.93495 162.6613 386.31654 162.79784 386.69145 162.95311 387.06636 163.1084 387.43275 163.2817 387.79063 163.47299 388.1485 163.66428 388.49613 163.87264 388.8335 164.09807 389.1709 164.32352 389.49644 164.56496 389.81013 164.82238 390.12379 165.0798 390.42408 165.35199 390.71104 165.63893 390.998 165.92588 391.27018 166.22618 391.52766 166.53986 391.78507 166.85353 392.02647 167.17908 392.2519 167.51647 392.47737 167.85387 392.68574 168.2015 392.877 168.55937 393.0683 168.91725 393.24159 169.28363 393.39683 169.65853 393.55213 170.03342 393.6887 170.41503 393.8065 170.80335 393.9243 171.19167 394.02278 171.58481 394.1019 171.9828 394.18107 172.38082 394.24055 172.78174 394.2803 173.18556 394.3201 173.58942 394.34 173.99422 394.34 174.4Z\" fill=\"#62442f\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M445.12 197C444.7622 196.99492 444.4164 196.92798 444.08265 196.79918 443.7488 196.6704 443.44773 196.48775 443.17933 196.25122 442.91087 196.0147 442.6917 195.73899 442.5219 195.42406 442.35215 195.10913 442.2422 194.77455 442.1921 194.42032 442.142 194.06606 442.15486 193.71408 442.23069 193.36443 442.30653 193.01477 442.44065 192.68912 442.633 192.38745 442.82533 192.08577 443.064 191.82678 443.34904 191.6105 443.63404 191.39421 443.9477 191.23406 444.29 191.13L480.29 182.89C480.49076 182.81276 480.6974 182.75774 480.90995 182.72493 481.1225 182.69213 481.33613 182.68228 481.55079 182.69542 481.76548 182.70858 481.9763 182.74439 482.18327 182.80286 482.39027 182.86135 482.58866 182.94116 482.77845 183.04232 482.96827 183.14347 483.14515 183.26363 483.30909 183.40283 483.47306 183.54203 483.62034 183.69705 483.75093 183.86792 483.88157 184.03879 483.99253 184.22159 484.0838 184.41632 484.17515 184.61107 484.2447 184.8133 484.29249 185.02298 484.34028 185.23268 484.36524 185.44506 484.36738 185.66013 484.36949 185.8752 484.34873 186.08803 484.30506 186.29862 484.26145 186.50922 484.19593 186.71277 484.1085 186.90927 484.02107 187.10578 483.91377 187.29074 483.78654 187.46417 483.6593 187.6376 483.51515 187.79553 483.35398 187.93795 483.19279 188.08036 483.0183 188.204 482.83055 188.30887 482.64277 188.41376 482.44599 188.49748 482.24024 188.56006 482.03446 188.62264 481.8244 188.66262 481.61003 188.68L445.61003 196.93C445.44795 196.96212 445.28459 196.98545 445.12 197Z\" fill=\"#62442f\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M483.54 213.76H483.28L446.28 212.59C446.06565 212.61574 445.85099 212.61832 445.63606 212.59774 445.4211 212.57715 445.21086 212.53385 445.00529 212.46785 444.79969 212.40186 444.60353 212.31468 444.41676 212.20633 444.22999 212.09798 444.05693 211.97093 443.89759 211.82521 443.73826 211.67949 443.59629 211.51845 443.47175 211.34207 443.34718 211.16571 443.24287 210.97809 443.15885 210.7792 443.0748 210.5803 443.01295 210.37474 442.97328 210.16249 442.9336 209.95024 442.91703 209.7362 442.92359 209.52039 442.93016 209.30457 442.95967 209.09194 443.01213 208.88249 443.06459 208.67304 443.1388 208.4716 443.23478 208.27817 443.33076 208.08475 443.44624 207.9038 443.58128 207.7353 443.7163 207.56682 443.86775 207.41469 444.0356 207.2789 444.2035 207.14311 444.38395 207.0268 444.5769 206.92998 444.7699 206.83315 444.971 206.75803 445.1802 206.70462 445.3894 206.65122 445.60194 206.62076 445.81773 206.61325 446.0335 206.60572 446.2476 206.62129 446.46 206.66L483.46 207.82C483.8184 207.86594 484.1574 207.97312 484.47709 208.14154 484.79676 208.30995 485.07688 208.52899 485.3174 208.79863 485.55799 209.06827 485.74375 209.37148 485.8747 209.70824 486.00566 210.04499 486.07359 210.39402 486.07847 210.75531 486.08335 211.11661 486.02485 211.46733 485.90296 211.8075 485.7811 212.14766 485.60359 212.45574 485.3704 212.73175 485.1372 213.00777 484.8631 213.23426 484.5481 213.41123 484.23307 213.5882 483.897 213.70446 483.53999 213.76001L483.54 213.76Z\" fill=\"#62442f\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M217.68 209.66C217.51 209.67482 217.34 209.67482 217.17 209.66L180.43 205.46C180.07686 205.3717 179.7506 205.22403 179.4512 205.01696 179.15183 204.80989 178.89852 204.55672 178.69129 204.25742 178.48407 203.95815 178.33623 203.63196 178.24776 203.27886 178.15927 202.92575 178.13582 202.56836 178.17743 202.20671 178.21906 201.8451 178.32305 201.5024 178.48941 201.17862 178.65576 200.85485 178.87383 200.57074 179.14359 200.32634 179.41338 200.08194 179.71758 199.89292 180.05615 199.75923 180.39473 199.62555 180.74602 199.55582 181.10999 199.55L217.84999 203.76001C218.19977 203.82718 218.52719 203.95265 218.83229 204.13642 219.13739 204.32018 219.40137 204.55094 219.62425 204.82872 219.84717 205.1065 220.01528 205.41423 220.12857 205.75188 220.24188 206.08954 220.29341 206.43636 220.28318 206.79236 220.27297 207.14838 220.20162 207.49169 220.06914 207.82228 219.93663 208.15288 219.75115 208.45044 219.51267 208.71495 219.27422 208.97949 218.99742 209.19474 218.68228 209.36067 218.36714 209.52661 218.03305 209.63306 217.68 209.68001V209.66Z\" fill=\"#62442f\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M181.34 230.54C180.97969 230.52356 180.6336 230.4447 180.30173 230.30344 179.96987 230.16217 179.67313 229.96739 179.41152 229.7191 179.1499 229.4708 178.9399 229.18463 178.78151 228.8606 178.62311 228.53655 178.5263 228.19506 178.49108 227.83612 178.45584 227.47716 178.48442 227.12335 178.5768 226.77469 178.66919 226.42604 178.81955 226.1045 179.02791 225.8101 179.23627 225.51569 179.48947 225.26694 179.78755 225.06386 180.0856 224.86078 180.40976 224.71616 180.76 224.62999L217.37 219.37999C217.57633 219.31984 217.78668 219.28229 218.00107 219.26732 218.21544 219.25235 218.42897 219.26033 218.64163 219.29123 218.85433 219.32218 219.06128 219.37534 219.26253 219.45073 219.46376 219.52613 219.6547 219.62204 219.83531 219.73847 220.01596 219.85492 220.18216 219.98921 220.33393 220.14136 220.48569 220.29352 220.61956 220.46006 220.73554 220.64095 220.85152 220.82189 220.94698 221.01308 221.02188 221.21451 221.09677 221.41594 221.1494 221.62303 221.17978 221.83576 221.21019 222.04851 221.21765 222.26207 221.20215 222.47643 221.18666 222.69077 221.14856 222.90102 221.08786 223.10717 221.02718 223.31334 220.9453 223.5107 220.8422 223.69925 220.73909 223.88782 220.61713 224.06327 220.4763 224.2256 220.33551 224.38797 220.17908 224.53351 220.00699 224.66225 219.83492 224.79097 219.65111 224.89995 219.4556 224.98917 219.2601 225.07842 219.05736 225.14586 218.84737 225.19153 218.63736 225.23717 218.42491 225.26 218.20999 225.26L181.59999 230.51C181.51396 230.52552 181.42729 230.53553 181.34 230.54Z\" fill=\"#62442f\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M259.71 203.74C259.16773 203.23499 258.56785 202.81168 257.91029 202.47008 257.25273 202.12848 256.56144 201.88105 255.83649 201.72777 255.1115 201.5745 254.37923 201.52095 253.63968 201.56717 252.90013 201.61339 252.18024 201.75766 251.48 202 250.58655 202.32689 249.77132 202.79114 249.0343 203.39275 248.29729 203.99436 247.67919 204.7001 247.18 205.51 246.59119 204.76309 245.89667 204.13262 245.09645 203.61856 244.29625 203.1045 243.4341 202.73499 242.51 202.51 241.78629 202.34369 241.05355 202.27777 240.31177 202.31226 239.57 202.34671 238.84654 202.48029 238.14138 202.713 237.43622 202.94571 236.77535 203.26895 236.15876 203.68273 235.54216 204.09653 234.99259 204.58562 234.51 205.15 233.73676 206.08768 233.18399 207.14105 232.85172 208.31012 232.51944 209.47919 232.43553 210.66582 232.59999 211.87 233.17687 215.22397 234.5102 218.24398 236.59999 220.93 238.31372 223.43749 240.43372 225.53415 242.95999 227.21999 243.60495 227.59674 244.27162 227.93009 244.95999 228.21999 245.49619 228.49578 246.05916 228.69646 246.6489 228.82204 247.23863 228.94763 247.83454 228.99373 248.43659 228.96035 249.03862 228.92694 249.62577 228.81522 250.198 228.62517 250.77025 228.43512 251.30757 228.17339 251.81 227.83998 252.45464 227.48313 253.0713 227.08312 253.66 226.63999 255.99123 224.67224 257.8679 222.33892 259.29 219.63999 261.0763 216.73961 262.0763 213.5896 262.29 210.18999 262.32405 208.98293 262.11683 207.81882 261.66835 206.69765 261.21989 205.57648 260.56709 204.5906 259.71 203.74Z\" fill=\"#dc7a5d\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M430.09 194.28C429.54835 193.77402 428.94874 193.34993 428.29124 193.00775 427.63374 192.66555 426.94239 192.41779 426.2172 192.26448 425.492 192.11115 424.75956 192.05788 424.01979 192.10466 423.28004 192.15143 422.5601 192.29654 421.86 192.54 420.9663 192.86656 420.15095 193.33066 419.41389 193.9323 418.67686 194.53395 418.05888 195.23986 417.56 196.04999 416.97279 195.30132 416.2789 194.66986 415.4784 194.15561 414.67784 193.64133 413.81504 193.27278 412.88999 193.04999 412.16627 192.88367 411.4335 192.81775 410.69175 192.85222 409.94996 192.88669 409.22648 193.02027 408.52134 193.25298 407.81617 193.48567 407.1553 193.80892 406.53874 194.22272 405.92213 194.6365 405.37257 195.1256 404.88999 195.68999 404.12113 196.62773 403.57234 197.6802 403.24357 198.84741 402.9148 200.01465 402.8336 201.19884 403 202.4 403.5978 205.73848 404.94779 208.73848 407.05 211.4 408.75843 213.9128 410.87843 216.00946 413.40998 217.68999 414.05299 218.07071 414.71965 218.40404 415.40998 218.68999 415.9462 218.96579 416.50917 219.16648 417.09889 219.29207 417.68864 219.41765 418.28456 219.46373 418.88658 219.43033 419.48863 219.39693 420.07579 219.2852 420.648 219.09516 421.22026 218.90512 421.75758 218.6434 422.25999 218.30998 422.90235 217.94959 423.519 217.54959 424.11 217.10999 426.4404 215.14159 428.31706 212.80826 429.74 210.10999 431.52626 207.2132 432.52626 204.06653 432.74 200.66999 432.7571 199.46797 432.5354 198.31174 432.0749 197.20131 431.6144 196.09088 430.95277 195.11711 430.09 194.28Z\" fill=\"#dc7a5d\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M294.25 200.87C299.54 195.95 317.25 185.47 330.4 184.28 343.55 183.09 362.46 190.14 368.47 194.19 383.56 204.37 385.61 216.75 378.95 224.55 370.40003 234.55 341.61003 238.68001 333.5 209.16 328.29 244.73001 297.85 236.70001 292.87 232.16 286.76 226.52 280.52 213.65 294.25 200.87Z\" fill=\"#fff3e7\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M347.31 188C347.56 192.44 340.85 198.67 332.16999 199.15 323.48997 199.62999 316.16999 194.15 315.87998 189.73999 315.58998 185.32999 322.46998 181.29999 331.14997 180.81999 339.82997 180.34 347.06 183.51 347.31 188Z\" fill=\"#dc7a5d\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M334.28 94.52C334.28694 94.885059 334.2759 95.24959 334.247 95.61358 334.2181 95.97757 334.17143 96.339267 334.10694 96.69866 334.04246 97.05806 333.96049 97.41343 333.86109 97.76477 333.7617 98.11611 333.6453 98.46173 333.5119 98.80163 333.3785 99.141529 333.22874 99.47405 333.06263 99.799228 332.89656 100.1244 332.7149 100.440639 332.51774 100.747959 332.32057 101.05526 332.10877 101.35216 331.88236 101.63864 331.65599 101.92513 331.4161 102.19982 331.16273 102.46272 330.90934 102.72561 330.64366 102.97543 330.36567 103.21221 330.08769 103.44898 329.7988 103.671558 329.49897 103.87992 329.19908 104.08827 328.8897 104.281429 328.57087 104.45937 328.25205 104.637317 327.92524 104.799198 327.59049 104.94501 327.25569 105.09081 326.91459 105.21985 326.56715 105.332118 326.2197 105.44438 325.86759 105.53934 325.5108 105.61698 325.154 105.694629 324.79426 105.754589 324.43159 105.79685 324.0689 105.83913 323.70506 105.8635 323.34 105.869998H323.11C322.74876 105.87071 322.3883 105.85391 322.02873 105.81959 321.6691 105.78527 321.31199 105.7336 320.9574 105.66456 320.6028 105.59553 320.2524 105.50947 319.9062 105.40638 319.55998 105.30329 319.21955 105.183658 318.88493 105.04747 318.55033 104.9113 318.2231 104.759227 317.90333 104.59125 317.58354 104.42326 317.27259 104.24017 316.97056 104.04197 316.66856 103.84377 316.37687 103.6314 316.09547 103.40485 315.8141 103.17829 315.54435 102.93862 315.28623 102.685848 315.02815 102.433078 314.78294 102.16839 314.55058 101.891788 314.3182 101.61518 314.0998 101.32796 313.89537 101.03011 313.69093 100.732288 313.5014 100.42524 313.3268 100.108989 313.1522 99.792728 312.99333 99.46875 312.8502 99.13705 312.7071 98.80536 312.5804 98.467517 312.47016 98.1235 312.3599 97.77949 312.26655 97.43094 312.19013 97.07786 312.11375 96.724788 312.05467 96.368839 312.01289 96.01002 311.9711 95.651187 311.94679 95.291179 311.93998 94.92999 311.30998 57.769994 300.54997 37.219995 292.98997 27.23999 298.49998 26.45999 304.08998 25.89999 309.77998 25.59999 312.57997 25.449992 315.36997 25.33999 318.11997 25.299992 326.54 40.86 333.72 63.61 334.28 94.52Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M368.91 79.59C368.9166 79.956699 368.90519 80.32284 368.8758 80.68842 368.84638 81.05401 368.79914 81.417278 368.73405 81.77821 368.66889 82.13915 368.5862 82.496028 368.486 82.84883 368.3858 83.20165 368.26853 83.5487 368.13423 83.889987 367.99989 84.23126 367.84913 84.56513 367.68196 84.89159 367.5148 85.21805 367.33204 85.53552 367.13365 85.84401 366.93528 86.1525 366.72227 86.45051 366.49458 86.738048 366.26689 87.02559 366.02568 87.30127 365.7709 87.565097 365.51609 87.82891 365.24897 88.0796 364.9695 88.31716 364.69007 88.55471 364.39967 88.777988 364.0983 88.98699 363.7969 89.195987 363.486 89.389698 363.1656 89.56812 362.84519 89.746547 362.51676 89.90883 362.18037 90.05497 361.84397 90.2011 361.5012 90.33038 361.15208 90.44282 360.80299 90.55525 360.44923 90.6503 360.0908 90.72794 359.7323 90.80558 359.3709 90.865459 359.0066 90.90757 358.64225 90.94968 358.2767 90.97382 357.91 90.979999H357.73C357.36787 90.97939 357.0066 90.96126 356.64625 90.92559 356.28587 90.88992 355.92805 90.83689 355.57286 90.766498 355.2176 90.69608 354.8666 90.608638 354.5199 90.50415 354.1732 90.39967 353.83235 90.27865 353.49736 90.141078 353.16233 90.003498 352.83479 89.85002 352.51469 89.68066 352.19459 89.51128 351.88349 89.3268 351.58134 89.12722 351.27919 88.927639 350.98738 88.71388 350.7059 88.48597 350.4245 88.258068 350.1548 88.01707 349.89677 87.76298 349.63874 87.50888 349.39363 87.24288 349.1614 86.96499 348.9292 86.68709 348.71104 86.398609 348.50685 86.09953 348.30265 85.80045 348.1134 85.49219 347.93916 85.174739 347.7649 84.857288 347.6064 84.53215 347.46376 84.19932 347.321 83.86648 347.19477 83.52751 347.085 83.18242 346.9752 82.837329 346.8824 82.48773 346.80659 82.13363 346.7307 81.779529 346.67219 81.42258 346.63099 81.06279 346.58979 80.70301 346.56614 80.34208 346.56 79.979999 346.11 54.979997 341.16 37.489995 335.61 25.729996 344.08314 26.340987 352.48646 27.470988 360.81999 29.119996 365.37 42.65 368.54 59.37 368.91 79.59Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M292.25 88C292.25663 88.36683 292.2452 88.7331 292.21583 89.09881 292.18644 89.464519 292.1392 89.8279 292.0741 90.188968 292.009 90.55004 291.92637 90.90705 291.82618 91.259998 291.72599 91.612949 291.60877 91.96013 291.47447 92.30155 291.34016 92.642978 291.18943 92.977 291.0223 93.30361 290.8552 93.63022 290.67247 93.94785 290.47413 94.25651 290.2758 94.56517 290.06278 94.86336 289.83515 95.151088 289.6075 95.438808 289.3663 95.714679 289.11155 95.97869 288.85676 96.24271 288.58967 96.49361 288.31028 96.73138 288.03086 96.96915 287.74046 97.19265 287.4391 97.401889 287.13774 97.61112 286.8268 97.80508 286.50639 97.983768 286.18595 98.162448 285.8575 98.32498 285.52113 98.47138 285.18473 98.61778 284.84196 98.747348 284.4928 98.86007 284.14366 98.972789 283.78984 99.068119 283.43128 99.146068 283.07279 99.224018 282.7113 99.284198 282.3469 99.32662 281.98249 99.36905 281.61686 99.39351 281.25 99.4H281.07C280.7076 99.40037 280.34608 99.383129 279.98536 99.34827 279.62467 99.31341 279.2665 99.2611 278.9109 99.191349 278.55528 99.12159 278.2039 99.03472 277.85673 98.93074 277.50956 98.82676 277.16825 98.70615 276.83283 98.56891 276.49745 98.43169 276.1695 98.27849 275.849 98.10931 275.52854 97.94013 275.21705 97.755779 274.91453 97.556247 274.612 97.35673 274.3199 97.14298 274.03819 96.91501 273.75648 96.68703 273.4865 96.44589 273.2283 96.191608 272.9701 95.937328 272.72486 95.671108 272.49259 95.39294 272.2603 95.11476 272.04209 94.825969 271.83796 94.526538 271.63383 94.22711 271.44474 93.91847 271.27064 93.60062 271.09657 93.28277 270.93836 92.957218 270.796 92.62394 270.65364 92.29068 270.5278 91.95129 270.4185 91.605777 270.3092 91.26025 270.21699 90.91023 270.14176 90.55572 270.06657 90.20122 270.00877 89.843898 269.96839 89.48375 269.928 89.12362 269.9052 88.76237 269.9 88.4 269.49 63.9 264.65 46.670003 259.25 34.86 266.39399 32.57896 273.64399 30.70896 281 29.25 287.15 44 291.8 63.39 292.25 88Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M184.67 382.81C173.04999 406.49 167 433.66334 166.52 464.33 217.52 467.33 246.42002 443.52 231.75 413.06 224 397.13 208.12 390.47 184.67 382.81Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M138.8 367.45C125.520008 392.45 117.91 421.45 116.12 454.1 117.65 454.62 119.12 455.1 120.61 455.53 127.611377 457.77925 134.71804 459.6226 141.93 461.06 143.01999 428.41999 150.32999 399.96 163.73 376.15 160.81999 375.19999 157.81 374.19999 154.73 373.15 149.68 371.45 144.32 369.58 138.8 367.45Z\" fill=\"#f29f6e\" />\r\n<path transform=\"matrix(1.5299467,0,0,1.5296294,350.1762,403.5281)\" d=\"M94.15 347C79.700008 370.63 70.43 398.44 66.380008 430.16999 74.18789 435.73008 82.45789 440.48674 91.19 444.43998 93.93 410.97999 102.810009 382.24998 117.560009 358.8 109.07 355 101.28 351 94.15 347Z\" fill=\"#f29f6e\" />\r\n</g>\r\n<path transform=\"matrix(1,0,0,-1,0,1507.9199)\" d=\"M348.34025 389.20768H1122.3546V1126.6322H348.34025Z\" fill-opacity=\"0\" />\r\n"});

const $$Astro$6 = createAstro("https://moathalgunimi17-svg.github.io");
const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Footer;
  const { locale } = Astro2.props;
  const t = useT(locale);
  const logo = locale === "ar" ? logoArLight : logoEnLight;
  const cats = liveCategories();
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  const path = Astro2.url.pathname;
  return renderTemplate`${maybeRenderHead()}<footer class="site-footer"> <div class="footer__sky" aria-hidden="true"> ${renderComponent($$result, "Stars", $$Stars, { "count": 26, "seed": 7 })} <svg class="footer__moon" viewBox="0 0 120 120"><path d="M84 86A42 42 0 0 1 40 22a42 42 0 1 0 44 64z"></path></svg> </div> <img class="footer__cat"${addAttribute(catCurled.src, "src")} width="150" height="139" alt="" loading="lazy" decoding="async"> <div class="container footer__top"> <div class="footer__brand"> ${renderComponent($$result, "Image", $$Image, { "src": logo, "alt": site.name[locale], "width": 190, "densities": [1, 2], "loading": "lazy" })} <p>${t("footer.tagline")}</p> <p class="footer__night" lang="en">Stay cozy, sleep well <span aria-hidden="true">☾</span></p> </div> <nav class="footer__cols"${addAttribute(t("footer.shop"), "aria-label")}> <div> <h2>${t("footer.shop")}</h2> <ul role="list"> <li><a${addAttribute(href(locale, routes.shop), "href")}>${t("nav.allProducts")}</a></li> ${cats.map((c) => renderTemplate`<li><a${addAttribute(href(locale, routes.collection(c.slug)), "href")}>${c.name[locale]}</a></li>`)} </ul> </div> <div> <h2>${t("footer.help")}</h2> <ul role="list"> <li><a${addAttribute(href(locale, routes.sizeGuide), "href")}>${t("nav.sizeGuide")}</a></li> <li><a${addAttribute(href(locale, routes.faq), "href")}>${t("faq.title")}</a></li> <li><a${addAttribute(href(locale, routes.shipping), "href")}>${t("policy.shipping")}</a></li> <li><a${addAttribute(href(locale, routes.returns), "href")}>${t("policy.returns")}</a></li> </ul> </div> <div> <h2>${t("footer.brand")}</h2> <ul role="list"> <li><a${addAttribute(href(locale, routes.about), "href")}>${t("nav.about")}</a></li> <li><a${addAttribute(href(locale, routes.contact), "href")}>${t("nav.contact")}</a></li> <li><a${addAttribute(href(locale, routes.privacy), "href")}>${t("policy.privacy")}</a></li> <li><a${addAttribute(href(locale, routes.terms), "href")}>${t("policy.terms")}</a></li> </ul> </div> <div> <h2>${t("footer.contact")}</h2> <ul role="list" class="footer__contact"> <li><a${addAttribute(site.contact.whatsappLink, "href")} target="_blank" rel="noopener">${renderComponent($$result, "Icon", $$Icon, { "name": "whatsapp" })} ${t("contact.wa")}</a></li> <li><a${addAttribute(`tel:${site.contact.phoneTel}`, "href")}>${renderComponent($$result, "Icon", $$Icon, { "name": "phone" })} <bdi dir="ltr">${site.contact.phoneDisplay}</bdi></a></li> <li><a${addAttribute(`mailto:${site.contact.email}`, "href")} class="footer__email">${renderComponent($$result, "Icon", $$Icon, { "name": "mail" })} <bdi dir="ltr">${site.contact.email}</bdi></a></li> <li><a${addAttribute(site.contact.instagramUrl, "href")} target="_blank" rel="noopener">${renderComponent($$result, "Icon", $$Icon, { "name": "instagram" })} <bdi dir="ltr">@${site.contact.instagramHandle}</bdi></a></li> </ul> </div> </nav> </div> <div class="container footer__bottom"> <p>© ${year} Nooma · نُومة — ${t("footer.rights")}</p> <p class="footer__langs"> ${renderComponent($$result, "Icon", $$Icon, { "name": "globe" })} <a${addAttribute(alternate(path, "ar"), "href")} lang="ar" hreflang="ar"${addAttribute(locale === "ar" ? "true" : void 0, "aria-current")} data-lang-switch>العربية</a> <span aria-hidden="true">·</span> <a${addAttribute(alternate(path, "en"), "href")} lang="en" hreflang="en"${addAttribute(locale === "en" ? "true" : void 0, "aria-current")} data-lang-switch>English</a> </p> </div> </footer>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/Footer.astro", void 0);

const $$Astro$5 = createAstro("https://moathalgunimi17-svg.github.io");
const $$CartPanel = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$CartPanel;
  const { locale, variant } = Astro2.props;
  const t = useT(locale);
  const id = `gift-${variant}`;
  const EmptyHeading = variant === "page" ? "h2" : "h3";
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["cart", `cart--${variant}`], "class:list")} data-cart-root${addAttribute(variant, "data-variant")}> <div class="cart__empty" data-cart-empty hidden> <img class="cart__empty-cat"${addAttribute(catCurled.src, "src")} width="180" height="167" alt="" loading="lazy"> ${renderComponent($$result, "EmptyHeading", EmptyHeading, {}, { "default": ($$result2) => renderTemplate`${t("cart.emptyTitle")}` })} <p class="muted">${t("cart.emptyText")}</p> <a class="btn"${addAttribute(href(locale, routes.shop), "href")}>${t("cart.continue")}</a> </div> <ul role="list" class="cart__lines" data-cart-lines></ul> <div class="cart__summary" data-cart-summary hidden> ${renderTemplate`<details class="cart__gift"> <summary>${renderComponent($$result, "Icon", $$Icon, { "name": "gift" })} ${t("cart.gift")}</summary> <div class="field"> <label${addAttribute(id, "for")}>${t("cart.giftLabel")}</label> <textarea class="textarea"${addAttribute(id, "id")} maxlength="240" rows="3" data-gift-note${addAttribute(`${id}-hint`, "aria-describedby")}></textarea> <small${addAttribute(`${id}-hint`, "id")} class="muted">${t("cart.giftHint")}</small> </div> </details>`} <dl class="cart__totals"> <div><dt>${t("cart.subtotal")}</dt><dd data-cart-subtotal>—</dd></div> <div><dt>${t("cart.shipping")}</dt><dd class="muted">${t("cart.shippingTbc")}</dd></div> <div class="cart__total"><dt>${t("cart.total")}</dt><dd data-cart-total>—</dd></div> </dl> <button class="btn btn--wa btn--block" type="button" data-checkout> ${renderComponent($$result, "Icon", $$Icon, { "name": "whatsapp" })} <span class="btn__label">${t("cart.checkout")}</span> </button> <p class="cart__note">${renderComponent($$result, "Icon", $$Icon, { "name": "info" })} ${t("cart.note")}</p> ${variant === "drawer" && renderTemplate`<a class="link-arrow cart__page-link"${addAttribute(href(locale, routes.cart), "href")}>${t("cart.viewBag")} ${renderComponent($$result, "Icon", $$Icon, { "name": "arrow" })}</a>`} </div> </div>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/CartPanel.astro", void 0);

const $$Astro$4 = createAstro("https://moathalgunimi17-svg.github.io");
const $$CartDrawer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CartDrawer;
  const { locale } = Astro2.props;
  const t = useT(locale);
  return renderTemplate`${maybeRenderHead()}<dialog class="sheet sheet--end cart-drawer" id="cart-drawer" aria-labelledby="cart-drawer-title"> <div class="sheet__head"> <h2 id="cart-drawer-title" class="cart-drawer__title">${renderComponent($$result, "BagIcon", $$BagIcon, {})} ${t("cart.title")} <span class="chip" data-cart-items></span></h2> <button class="icon-btn" type="button" data-close> ${renderComponent($$result, "Icon", $$Icon, { "name": "close" })}<span class="visually-hidden">${t("a11y.close")}</span> </button> </div> <div class="sheet__body"> ${renderComponent($$result, "CartPanel", $$CartPanel, { "locale": locale, "variant": "drawer" })} </div> </dialog> <template id="tpl-cart-line"> <li class="cart-line"> <a class="cart-line__media" data-l-link tabindex="-1" aria-hidden="true"><img data-l-img alt="" width="80" height="96" loading="lazy"></a> <div class="cart-line__info"> <a class="cart-line__name" data-l-link data-l-name></a> <p class="cart-line__meta" data-l-meta></p> <span class="chip chip--sample" data-l-sample hidden></span> <div class="cart-line__row"> <div class="stepper stepper--sm" role="group" data-l-stepper> <button type="button" class="stepper__btn" data-l-dec>${renderComponent($$result, "Icon", $$Icon, { "name": "minus" })}<span class="visually-hidden" data-l-dec-label></span></button> <input class="stepper__input" lang="en" dir="ltr" type="text" inputmode="numeric" pattern="[0-9]*" autocomplete="off" min="1" data-l-qty> <button type="button" class="stepper__btn" data-l-inc>${renderComponent($$result, "Icon", $$Icon, { "name": "plus" })}<span class="visually-hidden" data-l-inc-label></span></button> </div> <strong class="cart-line__price" data-l-price></strong> </div> </div> <button type="button" class="icon-btn cart-line__remove" data-l-remove>${renderComponent($$result, "Icon", $$Icon, { "name": "trash" })}<span class="visually-hidden" data-l-remove-label></span></button> </li> </template>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/CartDrawer.astro", void 0);

const $$Astro$3 = createAstro("https://moathalgunimi17-svg.github.io");
const $$SearchDialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SearchDialog;
  const { locale } = Astro2.props;
  const t = useT(locale);
  const suggestions = products.slice(0, 4).map((p) => ({ name: p.name[locale], slug: p.slug }));
  return renderTemplate`${maybeRenderHead()}<dialog class="search-dialog" id="search-dialog" aria-labelledby="search-title"> <form class="search-dialog__form" role="search"${addAttribute(href(locale, routes.shop), "action")} method="get"> <h2 id="search-title" class="visually-hidden">${t("search.title")}</h2> <label class="search-dialog__field"> ${renderComponent($$result, "Icon", $$Icon, { "name": "search" })} <span class="visually-hidden">${t("shop.searchLabel")}</span> <input type="search" name="q" autocomplete="off"${addAttribute(t("search.placeholder"), "placeholder")} data-search-input aria-controls="search-results" aria-describedby="search-status"> </label> <button class="icon-btn" type="button" data-close>${renderComponent($$result, "Icon", $$Icon, { "name": "close" })}<span class="visually-hidden">${t("a11y.close")}</span></button> </form> <p class="search-dialog__status muted" id="search-status" data-search-status aria-live="polite">${t("search.hint")}</p> <ul role="list" class="search-dialog__results" id="search-results" data-search-results></ul> <div class="search-dialog__suggest" data-search-suggest> ${suggestions.map((s) => renderTemplate`<a class="chip"${addAttribute(href(locale, routes.product(s.slug)), "href")}>${s.name}</a>`)} </div> </dialog>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/SearchDialog.astro", void 0);

const starNote = createSvgComponent({"meta":{"src":"/C:/Program%20Files/Git/nooma/_astro/star-note.BY3wv04K.svg","width":1484,"height":1418,"format":"svg"},"attributes":{"viewBox":"8 41 1484 1418"},"children":"\r\n<defs>\r\n<clipPath id=\"clip_1\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M0 0H6250V6250H0Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n<clipPath id=\"clip_2\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M0 0H6250V6250H0Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n<clipPath id=\"clip_3\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M57.872488 198.23538H6192.0837V6051.3205H57.872488Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n<clipPath id=\"clip_4\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M0 0H6250V6250H0Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n<clipPath id=\"clip_5\">\r\n<path transform=\"matrix(.24,0,0,.24,466.8,473.52)\" d=\"M0 0H2203V2515H0Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n<path id=\"font_6_1\" d=\"\" />\r\n<path id=\"font_6_13\" d=\"M.30299378 .5509949C.30032859 .54766848 .2954966 .5451711 .28849793 .5435028 .28149925 .54183456 .27433268 .5436656 .2669983 .548996 .26166789 .5529938 .25533549 .5571594 .2480011 .5614929 .2406667 .5658264 .23266602 .56999209 .22399903 .57398989 .21533203 .57799789 .20666504 .5813344 .19799805 .58399966 .18933106 .58666488 .18099976 .58799746 .17300415 .58799746 .16300456 .58799746 .15250142 .58566287 .14149475 .58099368 .13049825 .57633468 .1210022 .56967166 .11300659 .56100466 .09766642 .54433187 .092163089 .52816268 .09649658 .51249697 .10083008 .49683128 .11233012 .48233033 .1309967 .46899415 .14300029 .46032716 .15600078 .4514923 .16999817 .44248963 .18399556 .4334971 .19782512 .42466737 .21148682 .41600038 .22515869 .40733338 .23815918 .39899699 .25048829 .3909912 .26282756 .3829956 .27366639 .37599693 .28300477 .36999513 .29499818 .3619995 .3063253 .35333253 .31698609 .34399415 .32765708 .33466593 .33699037 .32416789 .34498597 .3125 .35299174 .30083213 .35932923 .2876638 .3639984 .272995 .3686676 .2583364 .3710022 .24167378 .3710022 .2230072 .366333 .18633525 .35183207 .15716553 .3274994 .13549805 .30316673 .11383057 .274999 .09999593 .24299622 .09399414 .21500142 .088663738 .1875 .08966573 .16049195 .09700012 .13349407 .10433451 .11066183 .118337 .09199524 .13900757 .08733622 .14433797 .08333842 .15166728 .08000183 .16099549 .076665248 .17033386 .07632955 .17700196 .07899475 .18099976 .083002727 .18700154 .09000651 .19116719 .1000061 .1934967 .1100057 .19583638 .11767069 .19533794 .1230011 .19200135 .1383311 .17800395 .1563263 .1678365 .1769867 .16149903 .19765727 .15516155 .21932984 .15466309 .2420044 .16000366 .25933839 .16400147 .27333579 .17149861 .28399659 .18249512 .29466758 .19350179 .30133567 .20600383 .30400086 .22000122 .30733744 .23467 .3055013 .24983724 .29849244 .26550294 .29149375 .2811686 .2789968 .29533387 .2610016 .30799867 .23366802 .32866923 .20449829 .3480021 .17349243 .3659973 .14249675 .3840027 .11099752 .40466819 .07899475 .42799378 .06366476 .44132997 .05250041 .45599876 .04550171 .47200013 .03850301 .4880015 .035003663 .5036672 .035003663 .5189972 .035003663 .5349986 .038335165 .55016586 .04499817 .5644989 .051661176 .578832 .060994466 .59183248 .07299805 .60350039 .085001628 .6151683 .09900411 .6246694 .11500549 .6320038 .13100688 .6393382 .14867147 .6436717 .16799927 .6450043 .19466146 .64633688 .22032674 .64083358 .24499512 .62849429 .26966349 .61616519 .2896627 .6009979 .30499269 .58299258 .30832926 .57899478 .3098297 .57399496 .30949403 .56799319 .3091685 .5620015 .30700175 .55633547 .30299378 .5509949Z\" />\r\n<path id=\"font_6_29\" d=\"M.26800538 .3929901C.28067018 .39365135 .29333497 .39064536 .30599977 .38397218 .31866456 .37730918 .32499696 .36697898 .32499696 .35298158 .32366435 .34164939 .31749473 .33448283 .30648805 .33148194 .29549156 .32848106 .28666178 .3269806 .27999879 .3269806 .2666626 .3269806 .2523295 .3266449 .23699951 .3259735 .22166951 .3253123 .20600383 .3243154 .19000244 .3229828 .18866985 .3009796 .1875 .28030906 .18649292 .26097108 .18549602 .24164327 .18466187 .22447713 .18399048 .20947266 .18332927 .19447835 .18299866 .18231201 .18299866 .17297364 .18299866 .16364543 .18333435 .15865071 .18400574 .1579895 .19866435 .16065471 .2144928 .16515096 .23149109 .17147827 .24849956 .17781575 .26550294 .18481446 .28250123 .19247437 .2994995 .20014446 .3161621 .20814514 .332489 .21647644 .34882609 .22481792 .364329 .23265584 .3789978 .23999024 .385671 .24331665 .3918406 .24431356 .3975067 .24298096 .40317283 .24164836 .40667216 .23864746 .40800477 .23397827 .40933738 .22665406 .40833537 .21765645 .40499879 .20698548 .4016622 .1963145 .3956604 .18664551 .3869934 .17797852 .3769938 .16998291 .36382548 .16081746 .3474884 .15048218 .3311615 .1401469 .31366477 .13031006 .29499818 .12097168 .27633158 .11164347 .25749717 .10348002 .23849488 .09648132 .21950276 .08948263 .20267232 .08531698 .18800354 .083984378 .16600037 .081980388 .14933269 .08797709 .13800049 .10197449 .12666829 .115982059 .1203359 .13365174 .119003299 .15498352 .11767069 .17631531 .117502849 .20097859 .118499759 .22897339 .119496669 .25697837 .120661418 .28664653 .12199402 .3179779 .10932922 .3166453 .09716288 .31548057 .085494998 .31448365 .07382711 .31348673 .06266276 .312322 .052001954 .31098939 .04333496 .31098939 .03383382 .31298829 .023498536 .31698609 .013163249 .3209839 .0079956059 .3286489 .0079956059 .33998109 .0079956059 .34397889 .009663899 .3493093 .013000488 .3559723 .016337077 .36264549 .023671469 .36765037 .035003663 .37098695 .06233724 .37565614 .092671718 .37965394 .12600708 .38298036 .12801107 .41431175 .13034566 .4446462 .13301087 .47398377 .13567607 .50332137 .13800557 .5299886 .13999939 .5539856 .14067078 .5619812 .14300537 .5689799 .14700318 .5749817 .15100098 .58098348 .15533448 .5839844 .16000366 .5839844 .17133586 .58465579 .1821645 .5818227 .19248963 .5754852 .2028249 .56914779 .20799256 .5619812 .20799256 .5539856 .20532735 .5313212 .20283 .50565597 .20050049 .47698976 .19817098 .44832359 .19600423 .4189911 .19400025 .3889923 .20733643 .39032493 .22016907 .39115397 .23249817 .3914795 .24483745 .3918152 .2566732 .39231874 .26800538 .3929901Z\" />\r\n<path id=\"font_6_18\" d=\"M.29100038 .49499513C.29366557 .47632853 .2958323 .4564972 .2975006 .4355011 .2991689 .414505 .3005015 .39333598 .3014984 .37199403 .30249534 .35066224 .30299378 .32999674 .30299378 .30999757 .30299378 .28999839 .30266319 .27199809 .30200196 .2559967 .32333375 .24132793 .33616639 .22832744 .34049989 .21699524 .34483338 .20566304 .34533183 .19566345 .34199525 .18699646 .33799745 .17500305 .3308309 .1688385 .3204956 .16850281 .3101603 .16816712 .29832969 .17166646 .28500367 .17900086 .27566529 .17233785 .2649943 .16517131 .25299073 .15750122 .24099732 .14983113 .22833252 .14249675 .21499634 .13549805 .20167034 .12849935 .18833924 .12232971 .17500305 .116989139 .16166687 .11165873 .14933269 .10799662 .13800049 .10600281 .1166687 .10266622 .09749857 .106664028 .08049011 .117996219 .06349182 .12932842 .051996869 .14633179 .04600525 .16900635 .041997274 .18433635 .04099528 .2001648 .042999269 .2164917 .045003255 .23282878 .05000305 .24849446 .057998659 .26348878 .06600443 .27849327 .07683817 .29199729 .09049988 .30400086 .10416158 .31600444 .12033081 .32533775 .13900757 .33200074 .14366658 .33400474 .15016175 .335673 .15849304 .33700563 .16683452 .33833824 .17550151 .33883668 .18449402 .33850099 .1934967 .33816529 .20266216 .33632914 .21199036 .33299256 .22132874 .32966615 .23000081 .32400004 .23800659 .31599427 .23800659 .32732646 .23783875 .3398234 .23750305 .3534851 .23716736 .36715699 .23666382 .3809916 .23599243 .394989 .23533122 .40899659 .23449707 .42216493 .23348999 .43449403 .23249309 .44683329 .23132833 .45733644 .22999573 .46600343 .22866313 .47600303 .22482808 .48216758 .2184906 .48449708 .21216329 .48683677 .20433553 .4863383 .19500733 .4830017 .17900594 .4776713 .16033428 .46733604 .13899231 .45199586 .11766052 .43666587 .09733073 .42033387 .07800293 .40299989 .07200114 .39699809 .0651652 .3943278 .057495119 .394989 .049835206 .3956604 .04333496 .39866639 .037994386 .40400697 .032663984 .40933738 .029663086 .41550193 .0289917 .4225006 .028330485 .4294993 .031000773 .43700157 .037002565 .44500733 .04833476 .45700074 .060999555 .46932984 .07499695 .48199464 .08899435 .4946696 .10365804 .5061696 .11898804 .51649478 .1343282 .52683 .14999898 .53532919 .16600037 .5419922 .18200176 .54866537 .19800313 .5523326 .21400452 .5529938 .23733013 .55366519 .25532533 .5484975 .2679901 .53749087 .28066508 .5264943 .28833518 .5123291 .29100038 .49499513M.17500305 .27999879C.16633606 .27799479 .15716553 .27382408 .14749146 .26748658 .13782756 .26115928 .12916057 .25349427 .12149048 .24449158 .11383057 .23549907 .10816447 .22549947 .10449219 .2144928 .10083008 .20349629 .10066732 .19266765 .104003909 .18200684 .10533651 .17799886 .108169559 .17499288 .11250305 .17298889 .11683655 .17099507 .121668498 .17066448 .1269989 .17199707 .14300029 .17533367 .16116841 .18183391 .1815033 .1914978 .20183818 .2011617 .21800232 .21166484 .22999573 .2230072 .22999573 .227005 .22799683 .23216756 .22399903 .23849488 .22000122 .24483235 .21533203 .25116477 .20999146 .25749208 .20466106 .26382957 .1988271 .2693329 .19248963 .27400209 .18616231 .27867127 .18033345 .28067018 .17500305 .27999879Z\" />\r\n<path id=\"font_6_31\" d=\"M.35099793 .4398651C.35300193 .40386454 .35516868 .3675283 .35749818 .33085633 .35982768 .29419456 .36032615 .25800578 .35899354 .22229004 .35766093 .1865743 .3541616 .15171306 .34849549 .1177063 .34282939 .08370972 .33332826 .051208497 .31999208 .020202637 .30666606-.01079305 .28883363-.03962199 .26649476-.06628418 .24416606-.09295654 .21600342-.11695862 .18200684-.1382904 .17666626-.141627 .17082723-.1436259 .16448975-.14428711 .15816243-.1449585 .15199788-.14479065 .1459961-.14378357 .13999431-.14278667 .13465882-.14111836 .12998963-.13877869 .12533061-.13644918 .1223348-.13328552 .1210022-.12928772 .11899821-.12328593 .11999512-.116617839 .12399292-.10928345 .1280009-.10195923 .13466899-.09429423 .14399719-.08628845 .17333476-.06428528 .19800313-.040949506 .21800232-.016281128 .23800151 .008377075 .2539978 .035039266 .2659912 .063705448 .27799479 .09237162 .28582765 .12354533 .28948976 .15722656 .29316203 .19091797 .29299928 .22779846 .28900147 .26786805 .2809957 .25785829 .27165733 .24750774 .26098634 .2368164 .25032554 .22613526 .23899333 .21661885 .22698975 .20826721 .21499634 .19991558 .20266724 .19290161 .19000244 .18722534 .17733765 .18154907 .16533916 .17871094 .15400696 .17871094 .14466858 .17871094 .1353302 .18071492 .12599182 .1847229 .11666361 .18873088 .10733541 .19641114 .0980072 .20776367 .08733622 .22179158 .07783508 .23764546 .069503787 .25532533 .061172487 .27301536 .05400594 .29019166 .04800415 .30685426 .04200236 .323527 .037165326 .3385264 .033493043 .35185243 .029830933 .3651886 .027664185 .37452699 .026992798 .37986756 .025660197 .38653056 .025660197 .39286296 .026992798 .39886476 .028335572 .40486656 .032669069 .40853373 .039993287 .40986634 .049992879 .41186015 .059326173 .41118876 .067993167 .40785218 .076660159 .40452577 .08266195 .39919535 .085998538 .39186097 .088663738 .38452659 .09233093 .37319438 .09700012 .35786439 .10166931 .3425344 .10733541 .32736717 .11399841 .31236268 .120661418 .29735819 .12782796 .28418986 .13549805 .27285768 .14316814 .26152549 .15133667 .25585938 .16000366 .25585938 .17000325 .25585938 .18183391 .26085917 .1954956 .27085877 .20916748 .28085838 .22233582 .29385887 .23500061 .30986024 .2476654 .3258616 .25849916 .34369407 .26750184 .36335755 .27650453 .38303123 .28100587 .40220133 .28100587 .42086793 .28100587 .42486573 .28167216 .42952983 .28300477 .43486024 .28433738 .44019065 .28633628 .44535319 .28900147 .4503479 .29166667 .45535279 .29483033 .45968629 .29849244 .4633484 .3021647 .46702067 .30599977 .4691925 .30999757 .4698639 .32066856 .4711965 .33016969 .46836344 .33850099 .46136476 .34683229 .45436607 .35099793 .4471995 .35099793 .4398651Z\" />\r\n<path id=\"font_6_19\" d=\"M.2709961 .38201905C.26633708 .37934367 .260671 .37850444 .2539978 .37950135 .2473348 .38050843 .2416687 .38468934 .23699951 .39204408 .22632854 .406072 .21332805 .41308595 .19799805 .41308595 .18400066 .41308595 .17149861 .4099121 .16049195 .40356446 .14949544 .3972168 .13983155 .38886515 .13150025 .37850953 .123168949 .3681539 .11633301 .35662843 .11099243 .3439331 .105662029 .3312378 .101999919 .31854249 .1000061 .30584718 .09666952 .28246055 .10066732 .26274619 .11199951 .2467041 .1233317 .2306722 .14099629 .22265625 .16499329 .22265625 .18433126 .22198487 .20616658 .225825 .23049927 .23417664 .25483195 .24252828 .27766419 .25338746 .29899598 .26675416 .30833436 .27076213 .31700135 .2731018 .32499696 .2737732 .33300273 .27444459 .3396708 .2704366 .34500123 .26174928 .35166423 .25105796 .34999595 .24019878 .33999635 .22917176 .32999674 .2181549 .31666566 .20831299 .30000306 .199646 .2833303 .1903178 .26582847 .18214925 .24749756 .17514038 .22916667 .16814168 .21066793 .16314189 .19200135 .16014099 .17333476 .15715027 .15483094 .1569875 .13648987 .15965271 .118158977 .16231792 .100997928 .16865032 .085006717 .1786499 .05966695 .19598389 .044331869 .22067769 .039001466 .25273133 .033671064 .28479515 .036005659 .317866 .04600525 .35194398 .05000305 .36463929 .055669149 .37750245 .06300354 .39053346 .07033793 .40356446 .07916769 .41541545 .0894928 .42608644 .09982809 .43675743 .111328128 .44592286 .12399292 .45358277 .13666789 .46125285 .15067037 .4664205 .16600037 .4690857 .19066875 .47309367 .21433513 .4705963 .23699951 .46159364 .2596639 .45259095 .2746633 .43608604 .28199769 .41207887 .2833303 .40673829 .2833303 .40122477 .28199769 .39553834 .28066508 .38986207 .2769979 .38535563 .2709961 .38201905Z\" />\r\n<path id=\"font_6_25\" d=\"M.2709961 .4741974C.29099528 .4668528 .3078257 .45584107 .32148744 .4411621 .3351593 .42648316 .34566245 .40996806 .35299684 .39161683 .3603312 .3732656 .36449687 .3544108 .36549378 .3350525 .36650086 .31570436 .3643341 .2976888 .35899354 .28100587 .3516693 .26231895 .34233604 .2439677 .33099366 .22595215 .31966148 .2079366 .30666099 .19191997 .2919922 .17790222 .2773336 .16389466 .260671 .15255229 .2420044 .14387512 .22333782 .13519795 .20266724 .13085938 .17999268 .13085938 .15266927 .13085938 .12966919 .13719686 .11099243 .14987183 .092325847 .16255696 .07765707 .1789093 .066986087 .19892884 .056325277 .21894837 .049494428 .2416331 .04649353 .26698304 .043502809 .29234315 .044006349 .31770326 .04800415 .34306336 .050669355 .36175028 .055165609 .37993369 .06149292 .39761354 .067830409 .41530357 .07599894 .4309845 .085998538 .44465638 .09599813 .4583384 .10749817 .46951805 .12049866 .4781952 .13349915 .48687236 .14833069 .49121095 .16499329 .49121095 .17433167 .49121095 .18599956 .4893748 .19999695 .4857025 .21399434 .48203025 .22699483 .4768575 .23899842 .47018434 .2476654 .4782003 .2583313 .47953797 .2709961 .4741974M.23300171 .40100099C.22566732 .40567018 .21716309 .41183473 .20748902 .41949464 .19782512 .4271647 .18933106 .43099977 .18200684 .43099977 .17400106 .43099977 .16616313 .42733256 .15849304 .41999818 .15083313 .4126638 .14417012 .40416465 .13850403 .39450074 .13283794 .38483683 .1280009 .3750051 .12399292 .3650055 .11999512 .3550059 .11732992 .34700523 .115997318 .34100343 .1140035 .33100382 .1126709 .31900025 .11199951 .30499269 .111328128 .29099528 .112325038 .27716065 .114990238 .26348878 .11766561 .24982707 .12283325 .23749797 .13049317 .22650147 .13816326 .21550496 .14966329 .20767212 .16499329 .20300293 .17433167 .20033773 .18533325 .20050049 .19799805 .20349121 .21066284 .20649211 .22315979 .21199036 .23548889 .21998596 .24782817 .22799175 .25949607 .23866272 .27049256 .2519989 .28149925 .26533509 .29000346 .28067018 .29600526 .29800416 .30266825 .31733195 .30283103 .3374939 .29649354 .35849 .29016624 .37949626 .2773336 .39466859 .2579956 .40400697 .25333659 .40067039 .24867249 .39900209 .2440033 .39900209 .2393341 .39900209 .23566692 .39966838 .23300171 .40100099Z\" />\r\n<path id=\"font_6_32\" d=\"M.09399414 .28059388C.08466593 .28126527 .07633463 .28527323 .069000247 .2926178 .06166585 .29996238 .057998659 .30830894 .057998659 .31765748 .057998659 .327006 .06199646 .3336843 .069992069 .33769227 .07799784 .34170024 .08833313 .3443705 .100997928 .34570313 .11499532 .34635417 .12832642 .34700523 .14099121 .34765626 .15366619 .34830729 .16633606 .34895835 .17900086 .34960938 .19166565 .3647461 .20433045 .3798828 .21699524 .39501954 .22966004 .41015626 .24266052 .42529298 .2559967 .4404297 .22200012 .43976847 .1888326 .43626914 .15649414 .42993165 .124165859 .42360435 .095336917 .4177704 .070007327 .4124298 .062672939 .4124298 .0541687 .415095 .04449463 .42042542 .03483073 .425766 .028996787 .43243409 .026992798 .4404297 .025660197 .4471334 .025828043 .45366923 .027496338 .46003724 .029164633 .46640525 .033665975 .4712626 .041000368 .47460938 .047002157 .47662355 .05766805 .47947184 .07299805 .4831543 .08832804 .48683677 .10532633 .49068705 .12399292 .4947052 .1426595 .49873353 .16166179 .5020854 .18099976 .50476077 .20033773 .5074463 .21733602 .50878909 .23199463 .50878909 .2473348 .50878909 .26183573 .5071309 .27549745 .5038147 .2891693 .5004985 .30167137 .49386598 .31300355 .48391725 .32033793 .47661338 .32400514 .46583048 .32400514 .4515686 .32400514 .43730674 .32033793 .42652894 .31300355 .41923524 .30566917 .40994773 .29766847 .3996633 .28900147 .38838197 .28033448 .37710063 .2710012 .36482749 .2610016 .3515625 .28100077 .35221354 .30116783 .35253907 .3215027 .35253907 .34183757 .35253907 .3630015 .35253907 .3849945 .35253907 .3896637 .35253907 .39483134 .35186769 .40049745 .3505249 .40616355 .34918214 .41166178 .34700013 .4169922 .34397889 .42233277 .34095765 .42700196 .33725993 .43099977 .33288575 .43499757 .32852174 .43733216 .32331849 .43800355 .317276 .43933616 .3045095 .43599955 .2962799 .42799378 .29258729 .41999818 .28890483 .40933229 .2877299 .3959961 .2890625L.20899964 .2830963C.19366963 .26319886 .179835 .24446106 .16749573 .22688294 .15516663 .20930481 .14533489 .19487508 .13800049 .18359375 .17466228 .18359375 .21416219 .18559265 .25650025 .18959046 .2988383 .19359844 .3400065 .19859822 .38000489 .20458985 .3846639 .20526123 .3896586 .20442708 .394989 .2020874 .4003296 .19975789 .40549723 .196757 .41049195 .19308472 .41549684 .1894226 .41966249 .18541973 .4229889 .18107605 .42632548 .17673238 .42799378 .17288716 .42799378 .1695404 .42799378 .16619365 .42632548 .16284688 .4229889 .15950012 .41966249 .15615337 .41583253 .15330506 .41149903 .1509552 .40716554 .14861553 .40249635 .1464386 .39749146 .14442444 .39249674 .14242046 .3883311 .14108277 .3849945 .14041138 .3630015 .1364034 .33950297 .13255818 .3144989 .12887573 .28949485 .12519329 .26449076 .12200928 .2394867 .11932373 .2144928 .11664835 .18999736 .11463928 .16600037 .11329651 .14200337 .111963909 .119669597 .1116333 .09899902 .11230469 .08832804 .11230469 .07865906 .11380514 .069992069 .11680603 .061335248 .1198171 .054840089 .12416077 .05050659 .12983704 .046173097 .1355133 .04416911 .14269002 .04449463 .15136719 .044830324 .16005452 .048665365 .17040508 .055999757 .18241883 .068003337 .19845073 .079833988 .21481323 .0914917 .23150635 .103159587 .24819947 .11533102 .26489768 .12800598 .28160096L.09399414 .28059388Z\" />\r\n<path id=\"font_6_2\" d=\"M.06399536-.07800293C.05866496-.07333374 .057332357-.06733195 .05999756-.05999756 .06266276-.052663167 .065327968-.04633077 .067993167-.041000368 .07466634-.02567037 .08066813-.009506226 .085998538 .0074920656 .09132894 .024500529 .09566244 .04266866 .09899902 .06199646 .10033163 .07066345 .10499573 .07816061 .11299133 .084487918 .12099711 .0908254 .13166809 .09199524 .14500427 .08799744 .15033467 .08533224 .15349834 .08149719 .15449524 .07649231 .15550232 .0714976 .15600586 .06599935 .15600586 .05999756 .15600586 .050669355 .15483602 .039835615 .15249634 .027496338 .15016683 .015167236 .14699809 .003168742 .14299011-.0084991459 .13899231-.020167033 .1343282-.031000773 .1289978-.041000368 .1236674-.050999959 .1186676-.05866496 .11399841-.06399536 .10600281-.07266235 .09750366-.0784963 .08850098-.08149719 .07949829-.084498088 .07132975-.083333339 .06399536-.07800293Z\" />\r\n<path id=\"font_6_28\" d=\"M.22799683 .42414857C.22666423 .43149314 .22533162 .43850709 .22399903 .44519044 .22266643 .45187379 .21933492 .45621745 .21400452 .45822145 .20267232 .461558 .19066875 .46188865 .17799378 .45921327 .16532898 .45654807 .15366109 .45237223 .14299011 .4466858 .1323293 .44100953 .1233317 .43466697 .115997318 .42765809 .108662929 .4206492 .10466512 .4144694 .104003909 .40911866 .101999919 .39909873 .10466512 .38941447 .11199951 .38006593 .1193339 .37071739 .1299998 .3613688 .14399719 .35202027 .16733296 .33799235 .19166565 .32362876 .21699524 .30892945 .242335 .29424034 .26367188 .27921549 .28100587 .26385499 .29833985 .24849446 .3101705 .23162842 .3164978 .21325684 .3228353 .19488526 .32133485 .17401123 .31199647 .15063477 .30466209 .13260906 .29099528 .11791483 .2709961 .106552127 .25099693 .095199588 .22899883 .08634949 .20500183 .08000183 .18100484 .073664348 .15700276 .06932577 .1329956 .066986087 .10899862 .0646464 .08866882 .06347656 .072006229 .06347656 .06799825 .06347656 .06316122 .064982097 .057495119 .067993167 .05182902 .071004237 .04649353 .07451884 .041488649 .07853699 .03649394 .08255514 .032160444 .086736049 .02848816 .09107971 .02482605 .095433559 .022994996 .09928385 .022994996 .102630618 .022994996 .11468506 .0283254 .123051967 .038986207 .12773133 .049657186 .13242086 .06066386 .13476563 .072006229 .13476563 .08799744 .13476563 .105158489 .13559978 .12348938 .13726807 .14183045 .13893636 .15933228 .14160665 .17599488 .14527893 .19266765 .14895122 .20766704 .15379334 .22099304 .1598053 .23432923 .16581726 .24366252 .17349243 .24899292 .18283081 .2536621 .19084676 .25082908 .20036316 .24049378 .21138 .23016866 .22239685 .21650188 .23391216 .19949341 .2459259 .18249512 .25794984 .16416423 .26963298 .14450073 .28097535 .12483724 .29232789 .10800171 .30267845 .09399414 .31202699 .07999674 .32137553 .06799825 .3325602 .057998659 .34558106 .047999067 .3586019 .041666669 .37479148 .039001466 .39414979 .038330079 .41150413 .041992189 .42819215 .049987794 .44421388 .057993574 .46024577 .068496707 .47443644 .08149719 .4867859 .09449768 .49913536 .10932922 .50898239 .12599182 .5163269 .1426646 .52367147 .15933228 .52734377 .17599488 .52734377 .20466106 .52601119 .22832744 .518163 .24699402 .50379946 .2656606 .48943583 .2766622 .4682312 .27999879 .44018556 .27999879 .4308268 .27849833 .42314149 .27549745 .41712953 .27249656 .41112773 .2673289 .40745545 .2599945 .40611268 .2506663 .40478007 .24316915 .40594993 .23750305 .4096222 .23183696 .41329447 .22866822 .4181366 .22799683 .42414857Z\" />\r\n<path id=\"font_6_22\" d=\"M.125 .5926056C.1283366 .51993307 .13400269 .44476319 .14199829 .36709596 .15000408 .28943888 .15867107 .21527608 .16799927 .14460755 .17000325 .11526998 .16200257 .10027059 .14399719 .099609378 .13999939 .099609378 .13600159 .10110474 .13200379 .10409546 .12800598 .10709635 .12433878 .1109314 .1210022 .115600589 .11766561 .120269779 .114496868 .12526958 .11149597 .13059998 .10849508 .13594055 .106664028 .14060974 .10600281 .14460755 .10066223 .17860413 .09565735 .21459961 .09098816 .252594 .08632914 .29059855 .08216349 .32876588 .07849121 .36709596 .0748291 .4054362 .07166544 .44293724 .069000247 .479599 .066335048 .51627096 .06466675 .54993698 .06399536 .5805969 .065327968 .5965983 .06765747 .6100972 .07098389 .62109377 .07432047 .6321004 .08132426 .63726809 .09199524 .6365967 .10332743 .6359355 .11149088 .63143417 .116485599 .62309268 .12149048 .61476138 .12432861 .604599 .125 .5926056Z\" />\r\n<path id=\"font_6_21\" d=\"M.28300477 .36044313C.25700379 .34513346 .2290039 .333313 .19900513 .3249817 .16900635 .31666056 .13667298 .3125 .102005008 .3125 .10333761 .28916423 .11000061 .2706604 .12199402 .25698854 .1339976 .24332683 .14900208 .23516338 .16700745 .23249817 .17766826 .23116558 .1884969 .23149617 .19949341 .23348999 .21050008 .23549398 .22083538 .23866272 .23049927 .24299622 .24016316 .24732971 .24899292 .25216166 .25698854 .25749208 .2649943 .26283265 .27199809 .26816813 .27799989 .27349855 .28400169 .2788391 .29033409 .28233848 .29699708 .28399659 .30367027 .2856649 .30867005 .28583274 .31199647 .28450013 .32133485 .2811737 .32467143 .2711741 .32200624 .25450135 .31133525 .23316956 .29600016 .21500142 .27600099 .19999695 .2560018 .18500264 .23366802 .17550659 .20899964 .17150879 .18766785 .16750081 .16566468 .16849773 .14299011 .17449951 .12032572 .1805013 .09999593 .19216919 .08200073 .20950318 .06667074 .22483318 .05500285 .24283345 .04699707 .26350404 .039001466 .2841746 .034001668 .3055013 .03199768 .32748414 .030003867 .34812419 .031840009 .36776734 .037506105 .38641358 .0431722 .4050598 .052001954 .4215393 .06399536 .43585206 .07599894 .45017497 .09099833 .46199546 .10899353 .47131349 .1269989 .4806417 .14800008 .48597209 .17199707 .4873047 .20066326 .48930869 .22666423 .48398338 .25 .47132875 .27333579 .4586741 .28966777 .44102479 .29899598 .41838075 .30433656 .4057261 .305837 .3947347 .3034973 .3854065 .30116783 .37608848 .29433695 .36776734 .28300477 .36044313M.16799927 .42799378C.16133626 .42666117 .15416973 .42432658 .14649964 .42099 .13882955 .41766358 .13182576 .41349793 .12548828 .40849305 .11916097 .40349833 .11349487 .39783225 .10848999 .39149476 .10349528 .38516746 .10066732 .3780009 .1000061 .36999513 .111338298 .36999513 .12383524 .3709971 .13749695 .3730011 .15116883 .3750051 .164505 .37750245 .1775055 .38049317 .19050598 .38349406 .20250447 .3869934 .21350098 .3909912 .22449748 .39499919 .23366292 .39933778 .24099732 .40400697 .23566692 .41667176 .22583516 .4245046 .21150208 .4275055 .19716899 .43050639 .18266805 .43066917 .16799927 .42799378Z\" />\r\n<path id=\"font_6_26\" d=\"M.21099854 .01600647C.21032715 .008672078 .20699056 .001836141 .20098877-.004501343 .19499715-.010838826 .18833415-.013671875 .18099976-.013000488 .16966756-.012329102 .16100057-.0079956059 .15499878 0 .148997 .0079956059 .1459961 .014663696 .1459961 .020004273 .1459961 .045333864 .14532979 .07183329 .14399719 .09950256 .1426646 .12717183 .14100139 .15567017 .13900757 .18499756 .13034058 .18366497 .12250265 .1844991 .115493778 .1875 .10849508 .1905009 .103663127 .19533284 .100997928 .20199585 .096328739 .21332805 .09699503 .22332764 .102996829 .23199463 .10899862 .24066162 .1186676 .248998 .13200379 .25700379 .12866719 .28167216 .12549846 .30600486 .12249756 .33000184 .119496669 .3539988 .11633301 .3773295 .11300659 .3999939 .112335208 .40400187 .11266581 .40766908 .11399841 .41099549 .11533102 .41433207 .116994228 .41750083 .11898804 .4205017 .12099203 .4235026 .12466431 .42633567 .13000489 .42900086 .13867188 .43233744 .14850362 .42967225 .15950012 .42100526 .17050679 .41233827 .17800904 .40133668 .18200684 .3880005 .18401082 .3753357 .18617757 .36083476 .18850708 .34449769 .1908366 .32817079 .19300334 .31033836 .19500733 .29100038 .20900472 .29966737 .22216797 .30900065 .23449707 .31900025 .24683635 .32899986 .25750224 .33966575 .26649476 .35099793 .27549745 .3623301 .28233338 .37416078 .28700257 .38648988 .29167176 .39882914 .29300437 .41166688 .29100038 .42500306 .28966777 .43633525 .28466798 .4464976 .27600099 .4554901 .26733399 .4644928 .2536672 .46932984 .23500061 .47000123 .21833802 .47066245 .20183818 .46932475 .1855011 .46598817 .16916402 .46266175 .15316265 .45833335 .13749695 .45300294 .12183126 .44767253 .10649618 .44134013 .0914917 .43400575 .0764974 .42667137 .062001546 .41933695 .04800415 .41200257 .03866577 .40667216 .02949524 .4045054 .020492554 .40550233 .011500041 .40649925 .005671183 .40966288 .0030059815 .4149933-.0029958089 .42832948-.0024973553 .44032798 .004501343 .45098878 .011500041 .46165977 .02233378 .47166444 .037002565 .4810028 .04966736 .4883372 .064829509 .49583436 .08248901 .50349429 .10015869 .51116439 .11882528 .51783248 .13848877 .52349856 .15816243 .5291646 .1781667 .5331624 .19850159 .53549197 .21883647 .5378316 .2383372 .53750106 .25700379 .5345001 .27567039 .5314992 .29250083 .5251668 .30749513 .5155029 .3224996 .50583907 .33466593 .4916738 .34399415 .4730072 .35532633 .44233705 .35849 .4141693 .3534851 .38850404 .3484904 .36283876 .3384908 .33950297 .32348634 .3184967 .30849204 .2975006 .29016114 .27849833 .26849366 .26148988 .24682617 .24449158 .22499593 .22932942 .20300293 .21600342 .20633953 .18000286 .20867412 .14433289 .21000672 .10899353 .21133931 .073664348 .21166992 .04266866 .21099854 .01600647Z\" />\r\n<path id=\"font_6_30\" d=\"M.39700318 .14787293C.39167277 .14053853 .385671 .13570659 .3789978 .13337708 .3723348 .13104756 .366333 .12988281 .36099244 .12988281 .35166423 .13054402 .34299723 .13370769 .33499146 .13937378 .32699586 .14503987 .32200114 .15087383 .32000733 .15687561 .31599937 .16820781 .31166078 .1808726 .30699159 .19487 .30233256 .20887757 .2978363 .2230479 .2935028 .23738098 .2891693 .25171409 .28466798 .26571147 .27999879 .27937318 .2753296 .29304505 .2709961 .3055471 .2669983 .31687928 .2536621 .2935435 .24099224 .2700399 .22898865 .24636841 .21699524 .22270711 .20366414 .19821167 .18899536 .17288208 .18233235 .16288249 .17466736 .15604656 .16600037 .15237427 .15733338 .14871216 .14999898 .14721172 .14399719 .14787293 .1353302 .14854431 .12749736 .1518809 .12049866 .15788269 .11349996 .16388448 .10800171 .16955059 .104003909 .17488098 .09666952 .18687439 .08933512 .20237224 .08200073 .22137451 .07466634 .24037679 .067830409 .26037599 .06149292 .28137208 .055165609 .30237834 .049331666 .32337953 .04399109 .3443756 .038660688 .36538188 .034332277 .3842163 .03100586 .4008789 .029001872 .4122111 .029164633 .42287699 .03149414 .4328766 .03383382 .4428762 .039667768 .44854228 .04899597 .44987489 .060328168 .45054627 .07065836 .4467112 .07998657 .43836976 .08932495 .43003846 .09466044 .421875 .09599304 .4138794 .09866842 .4005432 .10183716 .38604228 .10549927 .3703766 .10916138 .3547109 .11315918 .33887736 .117492679 .32287599 .12182617 .3068746 .12615967 .2912089 .13049317 .2758789 .13482666 .26054893 .139328 .24688213 .14399719 .23487854 .15399678 .2508799 .16516114 .26937867 .17749024 .29037477 .18982952 .311381 .20166524 .3317159 .21299744 .3513794 .22432964 .37104289 .23465984 .38820903 .24398804 .4028778 .25332643 .4175466 .2606659 .4265442 .26600648 .4298706 .27000428 .432546 .27567039 .4323832 .28300477 .42938233 .29033915 .42638145 .29566957 .4222158 .29899598 .41688539 .31366477 .38754783 .3258311 .3553772 .335495 .32037355 .34516908 .28538005 .3546702 .2528839 .3639984 .22288513 .3733368 .23487854 .3833364 .250707 .3939972 .27037049 .40466819 .29004417 .41500346 .31087748 .42500306 .33287049 .43500266 .35487367 .44433595 .37687684 .45300294 .39888 .46166993 .42088319 .4686686 .44054667 .47399903 .45787049 .47932945 .47587586 .48666383 .48454286 .4960022 .48387147 .5080058 .48253886 .518336 .47854106 .5269928 .47187806 .5356598 .46521507 .5389964 .45821635 .53700259 .45088197 .5223338 .392217 .5033315 .338384 .47999574 .28938294 .45667015 .24038188 .42900596 .19321187 .39700318 .14787293Z\" />\r\n<path id=\"font_6_33\" d=\"M.71699526 .3816986C.71699526 .419693 .7068278 .45102439 .6864929 .47569276 .666158 .50036117 .63498947 .5126953 .59298709 .5126953 .5796611 .5126953 .56799826 .5093587 .55799868 .50268557 .5479991 .49602256 .5393321 .48769126 .5319977 .47769166 .52466329 .46769206 .5183258 .4565226 .5129852 .44418336 .50765487 .43185426 .5033264 .42035929 .5 .4096985 .49666343 .39969889 .49315898 .39052836 .4894867 .3821869 .48582459 .3738556 .47932945 .36968995 .47000123 .36968995 .46066285 .36968995 .4538269 .3738556 .4494934 .3821869 .4451599 .39052836 .44132487 .39969889 .43798829 .4096985 .43466188 .42035929 .43032838 .43185426 .4249878 .44418336 .41965739 .4565226 .41315715 .46769206 .40548707 .47769166 .39782716 .48769126 .3889974 .49602256 .3789978 .50268557 .3689982 .5093587 .35766093 .5126953 .34498597 .5126953 .303655 .5126953 .2726542 .5001933 .25198365 .4751892 .23132324 .4501953 .22099304 .41903178 .22099304 .3816986 .22099304 .35036723 .22899373 .31636558 .24499512 .2796936 .2609965 .24303182 .28116355 .20636495 .30549623 .169693 .3298289 .1330312 .35665895 .09736633 .38598634 .062698367 .41532389 .028030396 .44332887-.0026397706 .47000123-.029312134 .49599204-.0026397706 .52348837 .028030396 .55249026 .062698367 .5814921 .09736633 .60815939 .1330312 .63249209 .169693 .65682479 .20636495 .67699179 .24303182 .69299319 .2796936 .70899459 .31636558 .71699526 .35036723 .71699526 .3816986M.7539978 .38786317C.7539978 .34853617 .7446645 .3075358 .7259979 .26486207 .70733138 .22219849 .6838277 .18036397 .65548709 .13935852 .62715658 .098353069 .59632369 .059183759 .5629883 .021850586 .5296631-.015482585 .4986674-.048482259 .47000123-.07714844 .44066368-.048482259 .40932719-.015482585 .37599183 .021850586 .34266664 .059183759 .3118337 .098353069 .28349305 .13935852 .25516258 .18036397 .23166402 .22219849 .21299744 .26486207 .19433086 .3075358 .18499756 .34853617 .18499756 .38786317 .18499756 .41053773 .18866475 .4315389 .19599915 .4508667 .20333354 .47020469 .21350098 .4870402 .22650147 .5013733 .23950196 .51570639 .2546692 .5268707 .27200318 .53486636 .28933717 .54287216 .30800376 .546875 .32800294 .546875 .3626709 .546875 .3920034 .5355428 .41600038 .5128784 .43999736 .49021403 .45799766 .45288087 .47000123 .4008789 .4813334 .45288087 .49883018 .49021403 .52249148 .5128784 .5461629 .5355428 .57533267 .546875 .6100006 .546875 .6299998 .546875 .6486664 .54287216 .66600039 .53486636 .68333438 .5268707 .6985016 .51570639 .7115021 .5013733 .72450259 .4870402 .73483279 .47020469 .7424927 .4508667 .7501628 .4315389 .7539978 .41053773 .7539978 .38786317Z\" />\r\n<path id=\"font_6_24\" d=\"M.10499573 .45500184C.10699972 .44500224 .109166469 .4338328 .11149597 .42149354 .113835658 .40916444 .1163381 .39649964 .119003299 .38349916 .121668498 .37049867 .12399801 .35733033 .12599182 .34399415 .1279958 .33066813 .12966411 .31800334 .1309967 .30599977 .13900249 .32333375 .14766948 .34166465 .15699768 .36099244 .16633606 .3803304 .1765035 .39816285 .1875 .41448976 .1984965 .4308268 .2101593 .44432578 .2224884 .45498658 .23482768 .46565757 .24833171 .47099305 .2630005 .47099305 .28500367 .47099305 .3035024 .46299235 .3184967 .44699098 .3335012 .43099977 .34616599 .41116844 .3564911 .38749696 .3668264 .36383567 .3749949 .33900453 .3809967 .31300355 .3869985 .28700257 .3919983 .26400248 .3959961 .2440033 .3999939 .22599793 .3919932 .21266175 .37199403 .20399475 .3626658 .19933574 .3556671 .19866944 .35099793 .20199585 .34632875 .20533245 .34366355 .20866902 .34300233 .21200562 .33966575 .22000122 .335495 .23399861 .3304901 .2539978 .3254954 .27399699 .31982932 .29432679 .31349183 .31498719 .30716453 .33565776 .29999797 .35365806 .2919922 .36898805 .28399659 .38432823 .274999 .391332 .2649994 .3899994 .25299583 .38933818 .24232991 .38034059 .23300171 .3630066 .22499593 .34899903 .2168274 .3334961 .2084961 .3164978 .2001648 .2994995 .19199626 .28216554 .18399048 .26449586 .17599488 .24683635 .16816204 .22917176 .16049195 .21150208 .15283203 .1938324 .14567058 .17766316 .13900757 .16299439 .13433838 .15833538 .12849935 .1551717 .12149048 .15350342 .11449178 .15183513 .10733032 .15233357 .1000061 .15499878 .093332927 .15700276 .08799744 .16033428 .083999637 .16499329 .08000183 .16966248 .07800293 .17433167 .07800293 .17900086 .07200114 .23100281 .065831508 .27833558 .05949402 .32099916 .053166707 .36366273 .045003255 .40732829 .035003663 .45199586 .030334473 .46733604 .029500327 .47950236 .03250122 .48849488 .035502118 .49749757 .045333864 .5009969 .06199646 .49899293 .08533224 .49499513 .09966532 .48033143 .10499573 .45500184Z\" />\r\n<path id=\"font_6_20\" d=\"M.21000672 .6320038C.20800273 .6439972 .20883179 .6549937 .2124939 .6649933 .21616619 .67499288 .22366841 .68066409 .23500061 .68200686 .2450002 .6833394 .25382997 .6806691 .26148988 .673996 .26915995 .66733297 .27399699 .65866598 .27600099 .647995 .28933717 .57133486 .3018341 .49516807 .31349183 .41949464 .3251597 .3438314 .33566285 .26966859 .34500123 .19700623 .3476664 .17766826 .34632875 .16449993 .34098817 .15750122 .33565776 .15050252 .32933045 .14533489 .32200624 .14199829 .31400047 .1386617 .3064982 .1386617 .2994995 .14199829 .29250083 .14533489 .28799949 .15133667 .28599549 .16000366L.28500367 .16600037 .28100587 .16499329C.2590027 .15699768 .23599752 .15249634 .21199036 .15148926 .18799336 .15049236 .16499329 .1533254 .14299011 .1599884 .12099711 .16666158 .101501468 .17749532 .084503177 .19248963 .06750488 .2074941 .055338544 .22666423 .04800415 .25 .032002767 .30133058 .04200236 .34799705 .07800293 .3899994 .093332927 .40733338 .11233012 .42299906 .1349945 .43699647 .15766907 .45099388 .18500264 .46199546 .21699524 .47000123L.23500061 .47399903 .21000672 .6320038M.10899353 .2749939C.1130015 .2590027 .1203359 .24667359 .1309967 .23800659 .14166768 .2293396 .15433248 .22350566 .16899109 .22050476 .18365987 .21750386 .19932556 .21700032 .21598816 .21899414 .23266094 .22099813 .248998 .22466533 .2649994 .22999573L.27400209 .23300171 .2460022 .40899659 .22599793 .40400697C.21200054 .399999 .19716899 .39382936 .1815033 .38549806 .1658376 .37716676 .15200298 .367335 .13999939 .3560028 .1279958 .34467063 .11882528 .33200074 .11248779 .31799317 .106160487 .30399577 .10499573 .2896627 .10899353 .2749939Z\" />\r\n<path id=\"font_6_27\" d=\"M.33999635 .46981813C.32800294 .46315513 .31550599 .4561564 .3025055 .44882203 .289505 .44148765 .27650453 .4329834 .26350404 .42330934 .25050355 .41364543 .23816936 .40231324 .22650147 .38931275 .21483357 .37631227 .20433553 .36081443 .19500733 .3428192 .18167115 .31747947 .17266846 .29164125 .16799927 .26530458 .16333008 .23897808 .16032918 .21315003 .15899658 .18782044 .15899658 .17581685 .15616353 .16364543 .15049744 .15130615 .14483135 .13897705 .13699849 .1328125 .1269989 .1328125 .11433411 .1328125 .104166667 .13931275 .09649658 .15231323 .08883667 .16531372 .08366903 .17781575 .08099365 .18981934 .06966146 .2371521 .060328168 .28398133 .052993776 .330307 .045669557 .37664286 .03933716 .42281089 .033996583 .46881105 .033996583 .4781494 .03682963 .4841512 .042495729 .4868164 .048161825 .4894816 .054662069 .4904836 .06199646 .4898224 .070002239 .489151 .07766724 .487147 .084991458 .48381043 .092325847 .480484 .09666443 .4751536 .0980072 .4678192 .1006724 .44315086 .104003909 .41731773 .10800171 .39031983 .11199951 .36332194 .115997318 .34015403 .11999512 .32081605 .12266032 .34348045 .1299947 .36547853 .14199829 .3868103 .15400188 .40815226 .16883342 .42748515 .18649292 .44480897 .2041626 .46214295 .22416179 .47681175 .24649048 .4888153 .26882936 .5008189 .29166667 .5088196 .31500245 .5128174 .32500205 .51414999 .33333335 .51414999 .33999635 .5128174 .34666953 .5114848 .3513387 .5091502 .3540039 .5058136 .3566691 .5024872 .35716758 .49715678 .35549928 .4898224 .35383097 .482488 .34866334 .47581993 .33999635 .46981813Z\" />\r\n<path id=\"font_6_23\" d=\"M.100997928 .44799806C.10166931 .43733726 .10283407 .4241689 .10449219 .40849305 .106160487 .39282737 .10799662 .37649537 .11000061 .35949708 .1120046 .34249879 .11417135 .32566325 .116500858 .30899049 .11883036 .29232789 .12099711 .2769979 .1230011 .2630005 .1303355 .27766929 .13933309 .29566957 .1499939 .31700135 .16066487 .33833314 .1718343 .35883079 .1835022 .37849427 .19517009 .39816795 .20716858 .4148356 .21949768 .4284973 .23183696 .4421692 .2430064 .44900514 .25300599 .44900514 .26366679 .44900514 .27349855 .4438375 .28250123 .4335022 .2915039 .4231669 .29933677 .4106649 .30599977 .3959961 .31266276 .3813273 .3184916 .36566163 .32348634 .34899903 .3284912 .33233644 .33266197 .31766764 .33599855 .30499269 .33866374 .31365968 .3421631 .32349143 .34649659 .33448792 .35083009 .3454946 .35549418 .35683189 .3604889 .36849977 .36549378 .38016764 .37115989 .3916677 .37748719 .40299989 .38382469 .41433207 .3906606 .42433167 .397995 .43299867 .406662 .44233705 .41599528 .44917298 .42599488 .45350648 .43599449 .45783998 .44332887 .4600067 .44799806 .4600067 .45399986 .4600067 .46116639 .45817057 .46949769 .4544983 .47782899 .45083619 .48632813 .44600425 .49499513 .44000245 .5036621 .43400065 .5118306 .4268341 .51950076 .4185028 .52717086 .4101715 .5333354 .40167237 .5379944 .39300538 .54733279 .375 .554835 .35533143 .5605011 .33399964 .5661672 .31266786 .5703328 .29233299 .57299807 .272995 .57566329 .2536672 .5774943 .23650106 .5784912 .22149658 .5794983 .20650228 .58033248 .19600423 .58099368 .19000244 .58099368 .18133545 .57999166 .1748352 .5779877 .17050171 .57599386 .16616822 .5723317 .16266887 .56700137 .16000366 .55966696 .15666707 .55332949 .15549724 .5479889 .15649414 .5426585 .15750122 .538325 .15966797 .5349884 .16299439 .531662 .16633098 .52899679 .17016602 .5269928 .17449951 .52499899 .17883301 .5236664 .18266805 .522995 .18600464 .52100118 .20133464 .5188344 .21700032 .51649478 .23300171 .5141652 .2490031 .5116679 .26450096 .5090027 .27949525 .50633749 .29449974 .50316879 .3085022 .49949647 .3215027 .49583436 .33450318 .4920044 .3460032 .4880066 .3560028 .48666383 .358668 .48449198 .36216737 .4814911 .36650086 .47850038 .37083436 .47516886 .375 .47149659 .3789978 .46783448 .3829956 .4643351 .38632713 .46099855 .3889923 .45766197 .3916677 .45532737 .39333598 .45399476 .3939972 .44733177 .3939972 .44033305 .38782756 .43299867 .37548829 .42566429 .36315919 .4186605 .34832765 .4119873 .33099366 .4053243 .31365968 .39915977 .29549156 .39349366 .27648927 .38782756 .25749717 .3836619 .24133301 .3809967 .22799683 .3809967 .21066284 .37766014 .1978302 .37098695 .1894989 .36432395 .1811676 .35733033 .17700196 .3500061 .17700196 .34267173 .17700196 .33483378 .179835 .3264923 .1855011 .318161 .19116719 .31266276 .19766744 .30999757 .20500183 .30599977 .21566265 .30166627 .22766114 .29699708 .24099732 .29232789 .2543335 .28749085 .26800028 .28248597 .28199769 .27749125 .2959951 .27249146 .30966188 .26748658 .32299806 .26249186 .33633424 .257665 .34833274 .25300599 .35899354 .2436676 .34632875 .23449707 .33233134 .22549439 .31700135 .21650188 .30167137 .20783489 .28600566 .19949341 .27000428 .19116211 .2540029 .18316143 .23816936 .17549134 .22250366 .16783142 .20683797 .16066997 .19300334 .15400696 .18099976 .14933777 .17366536 .14433289 .16716512 .13899231 .16149903 .13366191 .15583293 .12732952 .15299988 .11999512 .15299988 .11466471 .15299988 .10899862 .15549724 .102996829 .16049195 .09699503 .16549683 .09132894 .17166646 .085998538 .17900086 .08066813 .18633525 .07583618 .19466655 .071502689 .20399475 .06716919 .21333313 .06400045 .22266643 .06199646 .23199463 .056666059 .2606608 .052164716 .29216004 .04849243 .3264923 .044830324 .36083476 .041330976 .39433799 .037994386 .42700196 .03733317 .43833415 .03883362 .44883219 .042495729 .4584961 .04616801 .46817018 .053334554 .4746704 .06399536 .47799684 .07532755 .48000083 .083994548 .47833253 .08999634 .47299195 .09599813 .46766154 .09966532 .45933024 .100997928 .44799806Z\" />\r\n<path id=\"font_7_3335\" d=\"M.38900758 .5439606C.3703308 .542628 .34999085 .5394592 .32798768 .53445437 .30599467 .52945968 .28083293 .51996359 .25250245 .5059662 .22417195 .49196879 .19883728 .4746348 .17649842 .45396424 .15415955 .43330384 .13515727 .40530906 .11949158 .36997987 .10382589 .33465068 .09599304 .29465739 .09599304 .25 .09599304 .20467122 .103993739 .1641744 .11999512 .12850952 .1359965 .09285482 .15549724 .06486002 .17849732 .044525148 .20149739 .02420044 .22749837 .007039388 .25650025-.006958008 .2855021-.020965577 .3105011-.030298869 .3314972-.034957887 .35250346-.039627077 .37167359-.04262797 .38900758-.04396057 .34899903-.0059661867 .318161 .038528444 .29649354 .089523319 .2748362 .14051819 .26400758 .19401042 .26400758 .25 .26400758 .3059896 .2748362 .3594818 .29649354 .41047669 .318161 .46147157 .34899903 .5059662 .38900758 .5439606M.054992677 .25C.054992677 .34998576 .090159099 .4308065 .16049195 .49246217 .23082479 .554128 .31765748 .58496096 .42099 .58496096 .44899497 .58496096 .46299745 .5779622 .46299745 .56396487 .46299745 .55663046 .46033225 .55096438 .45500184 .54696658 .40766908 .5122986 .3706665 .46880088 .34399415 .4164734 .31733195 .3641459 .30400086 .3086548 .30400086 .25 .30400086 .19134522 .31733195 .13585408 .34399415 .08352661 .3706665 .031199137 .40766908-.012298584 .45500184-.046966554 .46033225-.050303144 .46299745-.05596924 .46299745-.063964847 .45566307-.07796224 .44199626-.08496094 .42199708-.08496094 .31733195-.08496094 .22999573-.053797407 .1599884 .008529663 .08999125 .07085673 .054992677 .15134685 .054992677 .25Z\" />\r\n<path id=\"font_6_9\" d=\"M.42500306 .5337677C.42033387 .47710673 .41483055 .4192759 .40849305 .36027528 .40216575 .30127464 .3936666 .24577332 .3829956 .19377136 .3803304 .18110657 .3766632 .17210388 .37199403 .1667633 .367335 .1614329 .360672 .1577708 .352005 .15577698 .34467063 .15444438 .33450318 .15677388 .3215027 .1627655 .3085022 .16876729 .29766847 .17743428 .28900147 .18876648 .27766929 .20410665 .26550294 .22094219 .25250245 .23927307 .23950196 .25760398 .22549947 .27627055 .210495 .29527284 .19550069 .31427513 .179835 .33310954 .16349793 .35177613 .14717102 .37044273 .13000489 .3877767 .11199951 .40377809 .10999552 .35977174 .10832723 .31626893 .10699463 .27326966 .105662029 .23027039 .105662029 .18710327 .10699463 .14376831 .10699463 .13776653 .10166422 .13476563 .09100342 .13476563 .07833862 .13476563 .068003337 .14126587 .05999756 .15426636 .052001954 .16726685 .04733785 .18043518 .04600525 .19377136 .044001264 .20710755 .042999269 .22627259 .042999269 .25126649 .042999269 .27627055 .043497724 .30243937 .04449463 .32977296 .04550171 .35710655 .04667155 .3834381 .04800415 .4087677 .04933675 .43410746 .050669355 .45410667 .052001954 .46876527 .053334554 .48476664 .05716451 .49643455 .06349182 .5037689 .06982931 .51110336 .07599894 .5144399 .08200073 .5137787 .095336917 .5124359 .104166667 .50859579 .10848999 .5022583 .11282349 .495931 .11532593 .48810325 .115997318 .47877503 .13999431 .46144105 .16216024 .44277445 .18249512 .42277528 .20283 .4027761 .22149658 .3824412 .23849488 .36177064 .25550334 .34110008 .2711741 .32059733 .2855072 .30026246 .2998403 .27993775 .31333924 .261439 .32600404 .24476624 .33399964 .28476463 .34049479 .32943217 .3454895 .37876893 .35049439 .42810569 .35566203 .47977195 .36099244 .5337677 .3603312 .54044088 .3643341 .5469411 .3730011 .55326846 .3816681 .5596059 .3896688 .56243899 .39700318 .5617676 .41566978 .560435 .42500306 .5511017 .42500306 .5337677Z\" />\r\n<path id=\"font_6_14\" d=\"M.45199586 .522995C.3833313 .5263316 .31733195 .5209961 .2539978 .5069885 .19066365 .49299113 .1279958 .47399394 .06599426 .44999696 .05000305 .44399516 .03783671 .44466148 .02949524 .45199586 .02116394 .45933024 .016998291 .46666465 .016998291 .47399903 .02166748 .48666383 .030003867 .4969991 .042007448 .5050049 .17866516 .57166549 .31532798 .59632876 .45199586 .57899478 .45866905 .5770009 .46417237 .572169 .46850587 .5644989 .47283937 .5568288 .4743398 .55032858 .4730072 .54499819 .47166444 .53833517 .46966044 .5328369 .46699525 .5285034 .46433006 .5241699 .45933024 .5223338 .45199586 .522995M.30999757 .17399597C.30999757 .16666158 .30749513 .16016133 .30249024 .15449524 .2974955 .14882915 .29133097 .14532979 .28399659 .14399719 .27067057 .14200337 .26200868 .14433797 .25801087 .15100098 .25401307 .15766399 .25167848 .16532898 .25100709 .17399597 .2503357 .22066753 .24949646 .26716615 .24848938 .31349183 .24749248 .35982768 .24533081 .4063314 .2420044 .45300294 .2420044 .45566813 .2416687 .4588318 .24099732 .4624939 .2403361 .46616618 .2403361 .46983338 .24099732 .47349549 .2416687 .47716777 .24316915 .48033653 .24549866 .4830017 .24782817 .4856669 .2516632 .4876658 .25700379 .4889984 .27233378 .4916636 .2833303 .48916117 .2899933 .4814911 .29666648 .47383119 .30000306 .46633403 .30000306 .45899964 .30533348 .41099549 .30866496 .36332704 .30999757 .31599427 .31133018 .2686615 .31133018 .22132874 .30999757 .17399597Z\" />\r\n<clipPath id=\"clip_8\">\r\n<path transform=\"matrix(.24,0,0,.24,0,0)\" d=\"M1731.9133 3283.2498H4222.538V3995.7498H1731.9133Z\" clip-rule=\"evenodd\" />\r\n</clipPath>\r\n</defs>\r\n<g>\r\n<g clip-path=\"url(#clip_1)\">\r\n\r\n</g>\r\n<g clip-path=\"url(#clip_2)\">\r\n\r\n</g>\r\n<g clip-path=\"url(#clip_3)\">\r\n<path transform=\"matrix(.8029122,0,0,.8029122,12.041895,47.08511)\" d=\"M876.673 119.957C764.224 125.923007 739.365 389.144 712.227 465.108 696.18 510.028 684.54299 566.201 649.596 600.88906 565.402 684.458 357.30503 700.179 244.25702 719.50106 204.19902 726.348 109.403018 728.09707 92.89902 777.10507 75.33102 829.27206 149.90901 884.2471 184.58902 908.7001 262.76704 963.8241 459.446 1056.462 459.446 1166.9231 459.446 1257.8821 345.20603 1435.1881 313.659 1534.821 304.536 1563.6371 274.522 1648.135 318.103 1664.855 367.352 1683.75 440.362 1622.7429 476.937 1599.093 554.768 1548.769 752.13406 1381.831 849.621 1390.386 994.602 1403.109 1137.123 1550.748 1263.141 1617.822 1296.198 1635.417 1392.438 1682.2941 1422.117 1632.719 1446.1859 1592.515 1404.648 1511.231 1392.846 1473.103 1361.6019 1372.159 1326.268 1270.243 1304.824 1166.64 1295.7109 1122.607 1283.235 1073.033 1302.285 1030.079 1361.843 895.79 1446.113 889.173 1560.505 811.566 1594.0651 788.798 1773.8201 708.771 1752.5 654.764 1732.993 605.35 1570.246 613.397 1527.706 608.27499 1393.0131 592.05899 1244.009 610.85598 1113.833 567.41299 975.898 521.381 973.1 114.84097 876.673 119.95697V119.957Z\" fill=\"#fff7f6\" fill-rule=\"evenodd\" />\r\n<path transform=\"matrix(.8029122,0,0,.8029122,12.041895,47.08511)\" d=\"M880.656 16.555C894.155 124.135 918.224 270.944 971.777 393.55 1007.93399 476.32899 1057.3829 548.13699 1127.002 587.708 1177.302 616.29806 1258.437 627.86 1346.006 631.727 1470.8159 637.239 1608.5549 626.437 1692.936 621.98599 1719.306 620.589 1782.9711 616.889 1810.435 615.66 1816.4081 615.39199 1820.749 615.24099 1822.7681 615.24197 1844.7891 615.2509 1833.676 638.47 1828.077 640.33999 1817.072 644.01797 1801.076 650.81198 1783.2151 658.803 1747.082 674.96798 1703.5562 695.959 1677.227 707.02297 1612.108 734.38796 1541.515 759.32998 1477.258 793.97897 1435.2411 816.63497 1395.9431 843.4539 1362.854 878.01998 1292.439 951.608 1259.51 1041.367 1252.19 1135.485 1241.1349 1277.645 1288.163 1429.644 1353.34 1552.171 1384.901 1611.42 1430.766 1682.7991 1450.189 1717.519 1456.163 1728.198 1459.688 1735.9441 1460.335 1739.433 1461.156 1743.85 1459.162 1746.367 1457.8059 1747.7059 1455.95 1749.539 1453.398 1750.8279 1449.7949 1750.189 1448.8579 1750.023 1446.398 1749.3579 1443.6439 1746.627 1441.2909 1744.293 1436.4949 1738.575 1430.033 1730.4779 1400.0859 1692.95 1331.798 1601.9689 1305.377 1573.918 1246.0819 1511.521 1177.693 1453.5809 1101.502 1411.759 1025.892 1370.256 942.69198 1344.7471 854.16098 1345.3251 792.30599 1345.8461 733.51797 1362.05 678.35397 1387.728 594.9119 1426.569 519.8889 1487.182 455.06095 1548.873 422.19197 1579.9861 333.64195 1675.832 295.63197 1716.547 287.93498 1724.791 282.25798 1730.784 279.53596 1733.63 265.30796 1748.503 253.47495 1734.1381 247.45096 1721.853 243.74996 1718.7521 241.77097 1714.927 243.26696 1710.345 243.12895 1709.5349 243.12096 1708.984 243.25196 1708.7689L355.22297 1530.2279C404.81596 1450.0349 454.12498 1364.0779 468.66596 1273.0239 477.77696 1215.9679 472.93696 1156.897 445.01097 1096.0809 426.92597 1056.606 389.10896 1019.52896 343.94996 985.64596 245.08596 911.4699 110.670948 853.8739 48.422945 828.34896 32.863946 821.96896 21.692944 817.54098 16.496943 815.31198-15.188057 801.7139 15.067943 772.277 22.000943 772.319 41.28994 772.435 63.23194 771.47598 85.06294 770.016 121.32994 767.58999 157.29294 763.781 180.62094 761.067 247.15094 753.359 312.92494 740.172 377.06794 721.471 441.19395 702.774 503.69294 678.586 563.6859 648.87106 634.69796 613.697 695.3269 558.62106 740.5049 492.88703 785.82589 426.94404 815.6669 350.27503 824.6399 271.93305 827.2969 248.73305 829.6299 225.49906 831.7709 202.24504 834.9939 167.23505 837.7829 132.18204 840.58987 97.13804 841.72689 82.95004 841.7418 40.89304 843.1688 24.019036 843.6328 18.536036 844.5048 14.647036 845.17086 12.858035 847.6148 6.292035 851.9558 3.610035 854.68289 2.346035 858.84286 .41903497 863.08889 .095035079 867.41989 1.391035 870.4369 2.293035 875.31289 4.249035 878.87789 10.870035 879.79287 12.653035 880.3959 14.575035 880.6559 16.555035L880.656 16.555ZM392.641 1555.675C407.34999 1541.125 420.08699 1528.822 428.906 1520.8391 498.06 1458.5671 577.935 1397.9522 665.755 1359.9031 725.267 1334.118 788.362 1318.551 854.281 1319.718 946.772 1321.181 1032.839 1350.038 1111.1741 1394.587 1188.3811 1438.494 1258.1881 1497.608 1318.285 1561.845 1332.3661 1576.7639 1358.261 1609.369 1384.0071 1642.372 1367.8551 1615.658 1350.967 1587.1 1336.895 1560.9039 1269.4711 1435.554 1220.9921 1279.8009 1231.578 1133.9519 1238.764 1034.9609 1273.052 940.5009 1346.6431 862.7179 1381.16 826.2209 1422.181 797.7359 1466.139 773.6739 1530.8401 738.2589 1601.956 712.4999 1667.567 684.4219 1689.032 675.2359 1722 659.3009 1752.962 644.8559 1730.2631 646.2699 1707.659 647.7069 1694.4441 648.4989 1609.4231 653.6099 1470.665 665.4489 1344.8201 660.8159 1251.65 657.3869 1165.4951 644.5489 1111.7711 614.5329 1036.2532 572.3399 981.4271 495.85389 941.6821 406.7359 909.21316 333.9299 886.77218 252.6949 870.78018 175.7959 869.99417 185.6889 869.18417 195.5809 868.34017 205.4689 866.32919 229.0079 864.12319 252.5279 861.5892 276.0149 852.4792 360.4649 820.9762 443.30488 772.59219 514.6329 724.04116 586.2049 658.4712 646.1189 581.6882 684.68887 519.7162 715.8198 455.11518 741.2418 388.79618 760.9818 322.50019 780.7158 254.48317 794.75186 185.65117 803.1178 168.18018 805.2328 143.77017 807.9818 117.38417 810.3408 163.04517 830.1668 221.04218 857.2768 277.6952 889.7258 367.77619 941.32186 453.6182 1007.00088 486.1002 1077.3279 518.2072 1147.0059 523.9792 1214.7189 513.55819 1280.1339 498.13618 1376.9329 446.53819 1468.6859 393.76817 1553.903L392.64115 1555.6749 392.641 1555.675Z\" fill=\"#d1d5e6\" fill-rule=\"evenodd\" />\r\n</g>\r\n<g clip-path=\"url(#clip_4)\">\r\n<g>\r\n<g clip-path=\"url(#clip_5)\">\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,720.1627,537.4228)\" fill=\"#56618e\" />\r\n<use data-text=\"S\" xlink:href=\"#font_6_13\" transform=\"matrix(69.6494,0,0,-69.6494,600.2073,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\"t\" xlink:href=\"#font_6_29\" transform=\"matrix(69.6494,0,0,-69.6494,627.9927,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\"a\" xlink:href=\"#font_6_18\" transform=\"matrix(69.6494,0,0,-69.6494,656.4048,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\"y\" xlink:href=\"#font_6_31\" transform=\"matrix(69.6494,0,0,-69.6494,681.4047,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,709.6776,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\"c\" xlink:href=\"#font_6_19\" transform=\"matrix(69.6494,0,0,-69.6494,729.17617,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\"o\" xlink:href=\"#font_6_25\" transform=\"matrix(69.6494,0,0,-69.6494,754.3849,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\"z\" xlink:href=\"#font_6_32\" transform=\"matrix(69.6494,0,0,-69.6494,782.5185,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\"y\" xlink:href=\"#font_6_31\" transform=\"matrix(69.6494,0,0,-69.6494,814.9696,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\",\" xlink:href=\"#font_6_2\" transform=\"matrix(69.6494,0,0,-69.6494,843.2425,612.161)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,589.0961,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"s\" xlink:href=\"#font_6_28\" transform=\"matrix(69.6494,0,0,-69.6494,608.605,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"l\" xlink:href=\"#font_6_22\" transform=\"matrix(69.6494,0,0,-69.6494,632.21218,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"e\" xlink:href=\"#font_6_21\" transform=\"matrix(69.6494,0,0,-69.6494,646.7664,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"e\" xlink:href=\"#font_6_21\" transform=\"matrix(69.6494,0,0,-69.6494,671.2092,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"p\" xlink:href=\"#font_6_26\" transform=\"matrix(69.6494,0,0,-69.6494,695.652,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,722.25357,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"w\" xlink:href=\"#font_6_30\" transform=\"matrix(69.6494,0,0,-69.6494,741.7521,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"e\" xlink:href=\"#font_6_21\" transform=\"matrix(69.6494,0,0,-69.6494,781.3063,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"l\" xlink:href=\"#font_6_22\" transform=\"matrix(69.6494,0,0,-69.6494,805.749,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"l\" xlink:href=\"#font_6_22\" transform=\"matrix(69.6494,0,0,-69.6494,820.30337,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\",\" xlink:href=\"#font_6_2\" transform=\"matrix(69.6494,0,0,-69.6494,834.85757,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,851.2294,686.8992)\" fill=\"#56618e\" />\r\n<use data-text=\"&#x2661;\" xlink:href=\"#font_6_33\" transform=\"matrix(69.6494,0,0,-69.6494,466.82228,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"a\" xlink:href=\"#font_6_18\" transform=\"matrix(69.6494,0,0,-69.6494,532.2816,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"n\" xlink:href=\"#font_6_24\" transform=\"matrix(69.6494,0,0,-69.6494,557.2815,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"d\" xlink:href=\"#font_6_20\" transform=\"matrix(69.6494,0,0,-69.6494,586.80789,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,611.66848,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"d\" xlink:href=\"#font_6_20\" transform=\"matrix(69.6494,0,0,-69.6494,631.167,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"r\" xlink:href=\"#font_6_27\" transform=\"matrix(69.6494,0,0,-69.6494,656.02767,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"e\" xlink:href=\"#font_6_21\" transform=\"matrix(69.6494,0,0,-69.6494,681.0275,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"a\" xlink:href=\"#font_6_18\" transform=\"matrix(69.6494,0,0,-69.6494,705.47036,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"m\" xlink:href=\"#font_6_23\" transform=\"matrix(69.6494,0,0,-69.6494,730.4702,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,773.7152,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"s\" xlink:href=\"#font_6_28\" transform=\"matrix(69.6494,0,0,-69.6494,793.21377,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"w\" xlink:href=\"#font_6_30\" transform=\"matrix(69.6494,0,0,-69.6494,816.82089,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"e\" xlink:href=\"#font_6_21\" transform=\"matrix(69.6494,0,0,-69.6494,856.375,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"e\" xlink:href=\"#font_6_21\" transform=\"matrix(69.6494,0,0,-69.6494,880.8178,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"t\" xlink:href=\"#font_6_29\" transform=\"matrix(69.6494,0,0,-69.6494,905.2606,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,933.6728,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"&#x263e;\" xlink:href=\"#font_7_3335\" transform=\"matrix(69.6494,0,0,-69.6494,953.1713,761.6374)\" fill=\"#56618e\" />\r\n<use data-text=\"N\" xlink:href=\"#font_6_9\" transform=\"matrix(69.6494,0,0,-69.6494,578.34567,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"o\" xlink:href=\"#font_6_25\" transform=\"matrix(69.6494,0,0,-69.6494,610.4486,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"o\" xlink:href=\"#font_6_25\" transform=\"matrix(69.6494,0,0,-69.6494,638.58218,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"m\" xlink:href=\"#font_6_23\" transform=\"matrix(69.6494,0,0,-69.6494,666.71578,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"a\" xlink:href=\"#font_6_18\" transform=\"matrix(69.6494,0,0,-69.6494,709.9607,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\" \" xlink:href=\"#font_6_1\" transform=\"matrix(69.6494,0,0,-69.6494,734.9606,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"T\" xlink:href=\"#font_6_14\" transform=\"matrix(69.6494,0,0,-69.6494,754.4591,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"e\" xlink:href=\"#font_6_21\" transform=\"matrix(69.6494,0,0,-69.6494,788.79049,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"a\" xlink:href=\"#font_6_18\" transform=\"matrix(69.6494,0,0,-69.6494,813.2333,1060.5902)\" fill=\"#56618e\" />\r\n<use data-text=\"m\" xlink:href=\"#font_6_23\" transform=\"matrix(69.6494,0,0,-69.6494,838.23318,1060.5902)\" fill=\"#56618e\" />\r\n</g>\r\n</g>\r\n</g>\r\n<g clip-path=\"url(#clip_8)\">\r\n<path transform=\"matrix(.7999964,0,0,.7999964,416.34547,787.9799)\" d=\"M464 90.64 467.05 93.12C467.49375 97.32479 467.40376 101.51813 466.78 105.700008 466.4205 107.848819 466.2705 110.012149 466.33 112.19 466.50999 115.75 467.56999 118.98 471.44999 120.990009 475.13725 121.46552 478.75724 121.15552 482.30998 120.060009 493.63545 116.83356 503.8621 111.50023 512.99 104.060009 516.37 101.32001 519.56 98.340007 522.77999 95.41 523.8355 94.40919 524.8155 93.33919 525.72 92.200008 526.1323 91.59802 526.489 90.96469 526.79 90.3L524.43 88.05C528.26 86.75 528.26 86.75 530.43 89.4 530.43 92.090007 528.75 94.01 527.01 95.880008 520.3256 103.12708 512.80569 109.36708 504.45 114.600009 497.03584 119.262859 489.09916 122.729518 480.64 125 477.61146 125.772228 474.54814 125.952228 471.45 125.54 467.35 125.06 464.6 122.39 462.90003 118.75 462.01576 116.91752 461.59574 114.984188 461.64 112.95 461.75 109.689998 461.74003 106.42 461.77003 103.149997 461.77003 102.09 461.77003 101.02999 461.67 99.259998 458.68153 103.19729 455.96488 107.31395 453.52003 111.60999 451.88 114.42999 450.29 117.28999 448.65003 120.09999 447.76036 121.94551 446.377 123.27885 444.50004 124.09999 442.76005 123.88999 441.93003 122.74999 441.17005 121.15999 442.38005 114.249988 443.70005 107.15999 445.17005 100.15999 446.64006 93.15999 448.55006 86.30999 449.11006 79.15999 447.11006 82.80999 445.05006 86.40999 443.11006 90.09999 436.70005 102.51999 429.61006 114.54999 422.56007 126.609989 421.10008 129.10999 419.70008 131.65999 418.23008 134.15999 417.76808 134.93759 417.24809 135.67427 416.67008 136.37 416.20219 136.95714 415.60975 137.362 414.89274 137.58458 414.17573 137.80716 413.4582 137.80898 412.74009 137.59 412.38117 137.5055 412.04783 137.36171 411.74006 137.15865 411.43229 136.95558 411.16899 136.70569 410.95008 136.40895 410.73118 136.11222 410.57017 135.78684 410.46699 135.43282 410.3638 135.0788 410.32484 134.71787 410.35008 134.34999 410.16117 131.07949 410.2745 127.81948 410.69007 124.56999 412.10008 116.92999 413.95008 109.37999 415.56007 101.77999 415.76255 100.25302 415.8859 98.71969 415.93006 97.17999 414.86006 98.59 414.35008 99.24999 413.85008 99.92999 408.85008 106.60999 404.06007 113.439998 398.85008 119.92999 395.6463 123.65294 392.2363 127.17628 388.62007 130.5 386.49305 132.45336 384.02305 133.7567 381.21006 134.41L377.21006 132.32C376.02006 128.20001 374.77006 124.40001 376.33006 120.32001 377.55244 110.96896 379.77574 101.8623 383 93 383.0881 92.28667 383.0881 91.57333 383 90.86 379.33 95.07 376.08 98.86 372.71 102.62 369.34 106.380008 366.16 109.96001 361.3 112.420009H356.74C355.94999 111.700008 355.13999 110.990009 354.34999 110.26 353.74 109.69 353.70997 108.5 352.34999 108.54 352.0886 108.960689 351.86528 109.40069 351.67997 109.86 348.18998 121.32 344.32997 132.63 338.43998 143.12 336.81095 145.94255 334.9576 148.6092 332.87998 151.12 331.6817 152.49886 330.2617 153.58887 328.61997 154.39 328.30567 154.5798 327.9751 154.73491 327.62828 154.85535 327.28138 154.97579 326.92579 155.05893 326.5615 155.10475 326.1972 155.15059 325.83213 155.15813 325.46626 155.12737 325.10038 155.0966 324.74168 155.02822 324.39015 154.92218 324.0386 154.81616 323.70195 154.67482 323.38008 154.49816 323.0582 154.32149 322.75816 154.11334 322.47993 153.87372 322.20176 153.63411 321.95146 153.36823 321.72904 153.0761 321.50663 152.78397 321.31694 152.47193 321.15998 152.14 319.72703 149.75412 318.95368 147.17079 318.83998 144.39 318.72999 138.22 318.35997 131.99 319.01997 125.88 319.76997 118.88 320.14997 111.829998 321.75996 104.88 322.00123 103.17491 322.10124 101.46158 322.05995 99.74 320.24995 101.119998 319.81996 102.89 319.14994 104.45 314.52995 115.299999 309.57994 126 304.00993 136.39 301.40824 141.60044 298.40824 146.57044 295.00993 151.3 293.4363 153.52106 291.73298 155.63773 289.89994 157.65001 288.27815 159.47255 286.27815 160.65589 283.89994 161.20001 282.8295 161.07062 281.8453 160.70749 280.94737 160.11063 280.04945 159.51377 279.33363 158.74689 278.79994 157.81002 278.51994 156.61002 278.0999 155.04001 277.79994 153.45001 277.59504 152.56304 277.53504 151.66637 277.61994 150.76001 278.50996 144.50002 279.20994 138.20001 280.78996 132.06002 283.65995 120.85001 286.26997 109.570018 289.57997 98.49001 293.51997 85.31001 297.80998 72.22002 302.88996 59.420015 303.6979 57.39385 304.63127 55.42718 305.68995 53.52001 306.3182 52.55564 307.03153 51.658975 307.82997 50.830015 309.54997 50.700014 310.05998 51.670015 310.82997 52.830015 309.36997 57.34001 307.94996 61.990015 306.36997 66.59001 304.36997 72.41001 302.23997 78.18001 300.20997 84.000019 299.45997 86.16002 299.25996 88.610019 298.09999 90.51002 296.97428 92.55922 296.1776 94.729228 295.70997 97.02002 295.11997 99.290019 294.37998 101.53002 293.70997 103.78002 293.03996 106.03002 292.30998 108.28002 291.70997 110.55002 291.10997 112.820018 290.62998 115.13002 290.06996 117.41002 289.50993 119.69002 288.84996 121.95002 288.31996 124.24002 286.95997 130.24002 285.59996 136.24002 284.31996 142.24002 283.76997 144.89002 283.39994 147.58002 283.02995 150.24002 282.76994 152.17002 283.02995 152.74002 284.53996 154.82003 285.47996 154.01003 286.46995 153.27002 287.31996 152.39003 291.74995 147.74004 294.98997 142.23003 297.85997 136.59003 303.46995 125.59003 308.73997 114.45003 314.09996 103.34003 316.60997 98.11002 318.97996 92.81003 321.45994 87.56003 322.30995 85.77003 323.13993 83.900028 325.64994 83.16003L328.53996 85.38003C328.64527 87.010028 328.64527 88.64003 328.53996 90.27003 327.81996 95.64003 326.93995 100.99003 326.17997 106.36003 325.50996 111.19003 324.91996 116.04003 324.28996 120.87003 323.98997 123.200038 323.49995 125.53003 323.41996 127.87003 323.24995 132.95003 323.27995 138.04004 323.26997 143.13004 323.35884 145.33826 323.9088 147.42493 324.91996 149.39003 325.10997 149.81003 325.71995 150.04003 326.28996 150.49004 328.4337 149.40113 330.14369 147.83779 331.41996 145.80004 332.80149 143.88779 334.04148 141.88779 335.13996 139.80004 338.82719 133.09456 341.82719 126.09456 344.13996 118.80003 346.13996 112.21004 348.42997 105.72003 350.56996 99.18003 351.02503 98.186458 351.31169 97.146457 351.42994 96.06003 351.33995 91.68003 352.27995 87.41003 352.53993 83.06003 352.84275 79.28091 353.66279 75.61757 355 72.07 355.59 70.4 356.25 68.61 358.61 67.74L360.9 68.74C361.12846 69.155719 361.3051 69.59238 361.43 70.049999 361.76545 73.14946 361.5221 76.20279 360.69999 79.20999 359.62998 82.84999 358.86 86.579998 357.80998 90.20999 356.35997 95.20999 356.80998 100.26999 357.41996 105.31999 357.6286 106.09158 357.96195 106.80492 358.41996 107.45999 358.871 107.732128 359.35789 107.83552 359.8806 107.77018 360.40333 107.70485 360.84977 107.48479 361.21995 107.10999 362.97554 105.81944 364.6422 104.422779 366.21995 102.91999 372.65327 96.49999 379.03996 90.03666 385.37995 83.52999 386.34297 82.44669 387.24296 81.31336 388.07997 80.12999 388.73997 79.27999 389.37995 78.40999 389.63996 78.05999 391.78996 77.78999 392.42997 78.59999 393.02998 79.93999 392.55998 82.57999 391.02998 85.08999 390.02998 87.77998 386.68736 96.97801 384.02067 106.36801 382.02998 115.94998 381.28865 119.31654 380.9453 122.72321 381 126.17 381.03984 126.80245 381.12315 127.429119 381.25 128.05 381.3995 128.2543 381.58424 128.41919 381.8041 128.54467 382.024 128.67014 382.25993 128.74529 382.5119 128.7701 382.76387 128.7949 383.0099 128.76723 383.25004 128.68704 383.49015 128.60688 383.70347 128.48119 383.89 128.31 386.5698 126.16098 389.1231 123.87098 391.55003 121.439998 398.538 113.804569 404.99134 105.74123 410.91004 97.24999 413.91004 93.119998 416.51005 88.77999 419.27003 84.51999 419.66819 83.90037 419.9582 83.2337 420.14 82.51999 422.6 72.30999 425.99003 62.369989 429.14 52.35999 429.30003 51.85999 429.42 51.35999 429.63 50.529989 428.47 50.449987 427.42 50.299989 426.37 50.299989 416.37 50.33999 406.37 50.396657 396.37 50.469987 394.915 50.457304 393.47169 50.580636 392.04 50.839986 387.89 51.669988 383.71003 51.249986 379.55003 51.169988 377.99003 51.169988 376.46003 50.359987 375.12004 49.97999 374.39 48.24999 375.37004 47.619989 376.39 47.259988 377.26887 47.028089 378.1622 46.934759 379.07 46.97999 381.98 46.97999 384.89 46.97999 387.79 46.899988 390.14 46.799989 392.47 46.439989 394.79 46.269987 396.59669 46.129987 398.40669 46.049985 400.22 46.029985 409.13 45.94998 418.04 45.909986 426.95 45.829984 428.37004 45.829984 429.79 45.659986 431.32 45.559984 431.943 44.40305 432.503 43.21639 433 42 436.74 31 441.24 20.33 445.61 9.59 446.6112 7.249421 447.7412 4.9727547 449 2.76 449.66 1.54 450.79 .99 452.55 1.67 452.89317 2.3869544 453.1098 3.1402875 453.19999 3.9299999 453.13059 5.558338 452.9206 7.168338 452.56999 8.76 450.06327 20.628827 446.9166 32.325494 443.12998 43.85 442.96998 44.35 442.86997 44.85 442.68998 45.579999 443.4077 45.71502 444.13105 45.80502 444.86 45.85 449.56999 45.85 454.27 45.85 458.91999 45.85 460.43998 43.85 460.99998 41.78 461.77 39.76 463.19 36.039999 464.66 32.339998 466.13999 28.649998 466.3622 27.943942 466.72343 27.318093 467.2236 26.772452 467.72377 26.22681 468.3159 25.81266 469 25.53 470.63 25.640002 470.8 27.04 471.3 28.19 470.09999 33.98 467.3 39.35 466.12 45.47 467.05595 45.655607 467.99928 45.788938 468.94999 45.870004 472.03999 45.920003 475.12998 45.870004 478.21998 45.870004L552.38998 45.780004C554.5775 45.878225 556.73086 45.651559 558.85 45.100004 560.7142 44.55363 562.5875 44.520299 564.47 45.000005 565.52999 45.930006 565.61 46.710004 564.8 47.720006 561.5692 48.745214 558.2592 49.23188 554.87 49.180006 536.69 49.180006 518.51 49.280004 500.33 49.370004 497.59858 49.235174 494.8919 49.43517 492.21 49.97 490.58729 50.227308 488.95729 50.287309 487.31999 50.15 479.87998 50.15 472.42997 50.15 465.31999 50.15 463.62998 51.230005 463.31999 52.68 462.89997 54.050004 459.1933 65.776668 455.90998 77.62667 453.04997 89.600009 452.04997 93.82001 451.04997 98.03001 450.10997 102.270008 449.80998 103.64001 449.38996 105.07001 450.30998 106.740009 452.30998 103.82001 454.30998 100.990009 456.24998 98.240009 458.28468 95.14718 460.868 92.613849 464 90.64ZM440.78 50.64C437.17 58.27 433.78 65.5 430.32 72.64 428.8619 75.56613 427.67857 78.599468 426.77003 81.74 422.97004 95.33 420.19004 109.149997 417.16004 122.92 417.11277 123.86571 417.1661 124.80571 417.32005 125.74 420.95005 119.74 424.20005 114.57 427.32005 109.27 431.73005 101.759998 436.01005 94.17999 440.40003 86.659999 446.20429 76.4044 451.40428 65.851078 456 55 456.4825 53.69143 456.88255 52.358098 457.2 51 453.4 50.14 446.56 50 440.79 50.64H440.78Z\" fill=\"#f9b1ac\" />\r\n<path transform=\"matrix(.7999964,0,0,.7999964,416.34547,787.9799)\" d=\"M237.36 103.76C239.04 103.4 240.2 103.65 240.67 104.76 241.14905 105.76015 241.26239 106.80015 241.01 107.880008 240.00995 110.79377 238.85994 113.6471 237.56 116.44 235.12572 122.102748 232.10906 127.43607 228.51 132.44 229.56999 136.96 229.56999 136.96 232.36 139.32 239.16 140.82 244.85 138.59001 249.64 133.8 251.81999 131.63 253.75 129.21 255.81999 126.93 256.53 126.16 257.33 125.47 258.11 124.72 259.21 126.200008 258.68998 127.4 258.11 128.51 255.96227 132.80352 252.98561 136.41352 249.18 139.34 246.1205 141.67893 242.7305 143.3456 239.01 144.34 234.01 145.61 230.12 144.51 226.62999 141.01999 225.87 140.24999 225.12999 139.45999 224.48 138.77999 222.98 138.56998 222.4 139.62999 221.65999 140.35999 218.65999 143.27999 215.85999 146.35999 212.20999 148.52999 210.79666 149.34998 209.34999 150.10332 207.87 150.78998 204.51 152.37998 201.48 151.60999 198.87 149.20998 197.59664 148.0325 196.57007 146.66918 195.79032 145.12001 195.01059 143.57086 194.52715 141.93418 194.34 140.20998 194.15 138.78998 194.12999 137.34998 194.05 136.14998 193.90653 136.00363 193.73889 135.89437 193.54709 135.82216 193.35526 135.74997 193.15715 135.72158 192.95279 135.73699 192.74843 135.75241 192.55686 135.81021 192.37804 135.91039 192.19924 136.01056 192.0499 136.14377 191.93001 136.30998 189.12001 138.87999 186.51001 141.65999 183.32 143.80998 181.16 145.25998 179.01001 146.50998 176.77 146.65999 173.86 146.87999 173.57 144.20999 171.77 142.95999 170.14 143.95999 168.48001 145.04 166.77 146.06999 160.77 149.76 159.44 150.06999 153.06 149.37 150 148.37 149.34999 145.54 147.84999 143.09999 144.7 146.43999 142.07999 149.98 138.37 152.31999 137.38195 152.87076 136.36196 153.35408 135.31 153.76999L132.38 152.30998C131.13 147.99999 132.32 144.11998 133.65001 140.06998 132.65001 141.06998 131.65001 141.96997 130.65001 142.93997 126.01001 147.54998 121.43001 152.21997 116.72001 156.75998 114.831027 158.45467 112.85769 160.04467 110.80001 161.52999 110.11951 162.0829 109.38145 162.54364 108.585849 162.9122 107.790248 163.28075 106.96155 163.54578 106.09974 163.70732 105.23793 163.86885 104.3695 163.92192 103.49443 163.86652 102.61936 163.81111 101.76456 163.64893 100.93001 163.37999 97.72001 160.66999 97.76001 156.98999 98.630008 153.43 99.97 148 101.630008 142.64 103.4 137.31 105.69 130.25 108.130008 123.24 110.58 116.229999 111.30484 114.54118 111.511508 112.79118 111.200008 110.979999 110.28001 110.46 109.87 111.189998 109.450008 111.659999 104.586627 117.05841 100.14663 122.78507 96.130008 128.84 90.72 137 85.380008 145.20999 80.00001 153.39 79.51001 154.14 79.00001 154.85 78.600009 155.39 77.170009 156.23 76.00001 156.44 74.840007 155.58 74.61096 155.29122 74.43096 154.97455 74.3 154.63 74.01269 152.79778 74.22269 151.02445 74.93 149.31 76.75 144.38 78.45 139.41 80.23 134.48 85 121.22 89.75 108.12 94.43 95 95.43 92.11 96.21 89.11 96.99 86.14 97.03366 85.46046 96.96033 84.79379 96.77 84.14 94.68 84.45 93.77 85.92 92.71 87.14 89.6 90.67 86.63 94.34 83.59 97.93 78.199817 104.545658 73.223148 111.458988 68.659999 118.67 62.069997 128.67 55.569997 138.67 49.869997 149.25 44.869997 158.5 40.169996 167.93 35.289995 177.25 34.109994 179.49 32.789995 181.66 31.439993 183.81 31.002619 184.34354 30.495953 184.8002 29.919993 185.18 29.151812 185.13948 28.463232 184.88423 27.854256 184.41423 27.24528 183.94425 26.823859 183.34284 26.589993 182.60999 26.559922 182.24739 26.593255 181.89072 26.689993 181.53998 29.169993 176.69998 31.569993 171.80998 34.189996 167.03998 41.419996 153.82997 48.579996 140.57999 54.879999 126.88998 59.475965 116.82547 63.35596 106.49214 66.52 95.88998 69.54702 85.86851 70.66369 75.63851 69.87 65.2 69.699237 62.42664 68.83923 59.88664 67.29 57.579999 66.82457 56.851366 66.23757 56.239316 65.529018 55.74385 64.820468 55.24838 64.04413 54.907098 63.2 54.719999 58.54 55.319997 54.64 57.879999 51.02 60.969999 37.33 72.68 26.8 86.83 18.45 102.74 12.833532 113.37206 8.743532 124.562068 6.18 136.31 4.56818 143.61312 4.001513 150.99645 4.4799997 158.45999 4.50258 159.1883 4.6059138 159.90496 4.7899997 160.60999 4.8493387 160.87874 4.952537 161.12946 5.0995948 161.36212 5.2466528 161.59477 5.4288365 161.79557 5.6461455 161.9645 5.863454 162.13339 6.1029827 162.2604 6.3647315 162.3455 6.6264798 162.43064 6.894902 162.4688 7.1699998 162.45999 11.07 160.32999 11.07 160.32999 17.35 151.76 17.550419 152.48319 17.640419 153.21985 17.62 153.97 16.910002 157.28 14.780001 159.81 12.720001 162.33 10.980001 164.45 8.960001 166.33 6.070001 166.71 3.400001 166.31002 1.9700012 164.62001 1.1800013 162.19 .48286755 160.11952 .08953383 157.99286 0 155.81-.33 145.93 1.3 136.31 3.8 126.81 8.91 107.61 18.44 90.6 30.58 75 34.31745 70.06703 38.474119 65.51703 43.05 61.35 47.54 57.35 52.11 53.53 57.76 51.21 59.614824 50.39464 61.55482 50.017976 63.579999 50.079999 64.97011 50.084329 66.282558 50.405775 67.517337 51.044328 68.75211 51.682886 69.773 52.568109 70.58 53.699998 71.83 55.469999 73.15 57.219999 73.58 59.46 74.450008 64.46 76.03 69.31 74.87 74.46 74.672107 75.530948 74.57544 76.61094 74.58 77.7 74.36 85 72.64 92 70.6 99 69.53 102.64 68.159999 106.2 66.99 109.81 66.88639 110.736667 66.88639 111.66333 66.99 112.59 75.81 99.92999 84.479999 88.1 95.56 78.83 96.03083 78.67785 96.510829 78.564517 97 78.49 100.64 78.49 101.57 79.369998 101.73 82.799999 101.75151 86.0965 101.18817 89.28983 100.04 92.38 97.61 99.78 95.04 107.119998 92.42 114.46 90.189998 120.78 87.88 127.07 85.6 133.37 85.37765 133.80144 85.28446 134.25919 85.32045 134.74321 85.35644 135.22725 85.51628 135.66619 85.799999 136.06 87.85999 133.06 89.869998 130.28 91.71999 127.399997 96.13999 120.509998 101.48999 114.34 106.63999 108.02 107.80088 106.56242 109.25088 105.499088 110.98999 104.829998 111.23839 104.71091 111.49755 104.623889 111.76748 104.568927 112.03741 104.513957 112.30997 104.49271 112.58515 104.50518 112.86034 104.517658 113.12985 104.56348 113.3937 104.64264 113.65755 104.721797 113.907779 104.8319 114.14439 104.97298 114.38099 105.11405 114.59683 105.28182 114.79192 105.4763 114.987018 105.67078 115.15547 105.88609 115.29729 106.122249 115.4391 106.3584 115.55 106.60828 115.63 106.87188 115.70999 107.135478 115.75665 107.40485 115.76999 107.67999 116.050899 110.05073 115.864238 112.38406 115.20999 114.67999 113.009998 121.37999 110.939998 128.12999 108.77999 134.84999 106.99999 140.35999 105.10999 145.84999 103.34999 151.35999 102.34999 154.56999 102.41999 156.35999 103.34999 159.88999 103.83999 159.93999 104.44999 160.19998 104.85999 160.00998 106.727649 159.30205 108.49765 158.40204 110.16999 157.30998 113.086368 155.15042 115.85636 152.81708 118.47999 150.30998 123.57999 145.38999 128.62999 140.40999 133.47998 135.24999 138.06998 130.35999 142.36998 125.19998 146.82999 120.18999 148.50998 118.29999 150.10999 116.26999 152.82999 115.83999 154.27999 116.26999 155.00998 117.14999 154.82999 119.14999 148.01999 127.73999 140.82999 136.58998 136.55998 147.15 137.15999 148.15 137.60999 147.51999 137.92998 147.23999 143.18126 142.64232 147.38127 137.22899 150.53 131 152.4 127.47 154.13 123.88 155.89 120.29 156.62 118.79 157.37 117.36 159.16 116.950008 159.3939 116.97623 159.61266 117.04842 159.81623 117.16658 160.01978 117.28475 160.19095 117.43889 160.32973 117.629 160.4685 117.81911 160.56316 118.029109 160.61367 118.259 160.6642 118.4889 160.66632 118.71923 160.62001 118.950008 160.50685 120.20471 160.23685 121.42471 159.81002 122.61001 158.63002 125.850009 157.29001 129.02 156.08002 132.24 155.08002 134.79001 154.27002 137.36 153.38002 139.93001 152.90003 141.33 152.91002 141.34001 153.60002 144.39002L156.15003 145.62001C160.1082 145.28096 163.67487 143.91764 166.85002 141.53002 168.34003 140.53002 169.85002 139.53002 171.36002 138.53002 173.6475 137.00684 175.55084 135.10018 177.07003 132.81002 180.75012 127.35876 185.08345 122.488758 190.07003 118.20001 192.07003 116.42001 194.45003 115.030017 197.02002 113.20001 198.08002 110.20001 199.16002 106.76001 200.52002 103.42001 202.64002 98.22002 204.81002 93.030017 207.21002 87.960018 210.64882 80.52199 214.84883 73.541988 219.81003 67.02001 221.69004 64.60001 223.66004 62.150014 226.96002 61.39001 228.74002 61.76001 229.69002 62.950014 230.29003 65.18001 228.40003 70.75001 226.49002 76.78001 224.29003 82.72001 222.09003 88.66001 219.66002 94.52001 217.36002 100.43001 214.24443 108.22557 210.0911 115.42223 204.90001 122.020008 203.35 124.020008 201.76001 126.020008 200.29001 127.87 197.67002 132.76001 199.20001 137.58 200.19 142.33 200.26172 142.88297 200.4188 143.4105 200.66121 143.91265 200.90363 144.4148 201.21903 144.8659 201.6074 145.266 201.99578 145.66609 202.43732 145.99475 202.93202 146.25197 203.42676 146.50919 203.94942 146.68187 204.5 146.77 211.1 145.09001 215.5 141.82 222.5 133.29001 222.53 120.81 228.18 111.19 237.36 103.76ZM223.6 72C215.41 81.86 209.1 94.86 203.44 111.66 202.84 113.43 201.54001 115.22 202.34 117.5 202.82347 117.15563 203.26682 116.76563 203.67 116.33 208.15967 110.11599 211.82633 103.44932 214.67 96.33 217.87 88.34 220.63 80.12 223.6 72ZM179.89002 139C180.6179 139.0424 181.31867 138.92415 181.9923 138.64524 182.66593 138.36629 183.24517 137.95455 183.73001 137.41 185.50002 135.87001 187.19002 134.25 188.88 132.62001 190.56999 130.99002 191.99 129.62001 193.43001 128.00002 194.26001 127.070018 194.77 125.930019 193.62001 124.640018 188.32 128.51 183.37 132.62 179.89 139H179.89002Z\" fill=\"#f9b1ac\" />\r\n<path transform=\"matrix(.7999964,0,0,.7999964,416.34547,787.9799)\" d=\"M704.91 160C704.1 160.58 703.56 161.28 702.95999 161.34 699.36996 161.72 695.85 162.62 692.17996 162.55 683.44998 162.38 674.7299 162.55 665.99996 162.43001 663.83999 162.43001 661.68997 162.03002 659.51998 161.86 658.07998 161.75 656.61996 161.66 655.17 161.65 624.27 161.65 593.36666 161.65 562.45999 161.65 558.45999 161.65 554.51998 162.31 550.54 162.4 542.54 162.57999 534.54 162.56 526.54 162.67 523.82998 162.67 521.11 162.52 518.42 163.33 517.1655 163.56436 515.90219 163.63103 514.63 163.53 509.72 163.61 504.81 163.64 499.9 163.74 497.37 163.79001 494.84 163.63 492.34 164.40001 491.08378 164.64963 489.8171 164.7263 488.54 164.63 484.36003 164.71 480.14 164.43001 476.01 164.91 468.78 165.75 461.49003 165.39 454.29 166.12001 449.04 166.65001 443.76 166.47002 438.57 167.12001 432.96003 167.83002 427.32 167.58002 421.76 168.24 416.7 168.85 411.6 168.69 406.59 169.33 401.58 169.97 396.79 169.77 391.97 170.43001 387.45 171.05 382.84 170.69 378.45 171.53002 372.52003 172.66002 366.45 171.65001 360.62004 173.31002 360.44 173.33023 360.26 173.33023 360.08003 173.31002 353.75004 173.74 347.39 173.86002 341.08003 174.69002 335.52003 175.44002 329.86003 175.15003 324.36003 176.44002 324.00306 176.5086 323.64305 176.55194 323.28004 176.57003 317.50004 177.00002 311.66004 177.06003 305.96003 177.97002 300.76 178.80002 295.44004 178.34001 290.33003 179.71002 289.97038 179.78415 289.60704 179.82749 289.24003 179.84003 283.83003 180.27002 278.35 180.31003 273.02003 181.24002 267.69004 182.17002 262.55003 181.88002 257.37004 182.95003 253.86003 183.68003 250.19004 183.58003 246.59003 184.14003 241.77002 184.89003 236.77002 184.64003 232.02002 185.63004 227.27002 186.62004 222.57003 185.89003 218.02002 187.39003 217.84304 187.43704 217.66304 187.46372 217.48003 187.47003 212.61003 187.90003 207.73003 188.26003 202.87003 188.79004 198.75003 189.24004 194.64003 189.90004 190.52002 190.47003 189.80002 190.57004 189.09003 190.73003 188.37003 190.77004 182.37003 191.02004 176.51003 192.06003 170.60002 192.87004 165.94002 193.51004 161.22002 193.71004 156.55002 194.26004 152.43003 194.75005 148.33002 195.51004 144.22002 196.08005 141.00002 196.53005 137.75002 196.53005 134.51001 197.21006 130.63 198.02005 126.600009 198.07006 122.66001 198.59006 118.54001 199.13005 114.45001 199.88005 110.34001 200.46006 106.76001 200.97005 103.16001 201.35005 99.57001 201.82006 96.880008 202.17006 94.18001 202.48006 91.520008 202.96006 82.810009 204.53006 74.01 205.62006 65.380008 207.62006 65.22 207.62006 65.08 207.82006 64.770008 208.04006 65.07001 208.41005 65.32001 209.04006 65.670009 209.04006 66.56627 209.20255 67.4696 209.26921 68.380008 209.24005 83.28001 209.24005 98.19 209.31006 113.100009 209.24005 117.25001 209.24005 121.40001 208.62006 125.55 208.35005 132.42 207.90006 139.29001 207.50005 146.17 207.08005 150.7 205.55005 155.6 206.70005 160.17 205.17005 164.38 205.34004 168.45 204.27005 172.59 203.86005 175.47 203.57006 178.34999 203.19005 181.19 202.66005 191.49 200.73006 201.87 199.17005 211.96 196.23006 214.96 195.37006 217.89002 194.54006 220.78 193.49005 225.91 191.61005 231.31 190.93006 236.63 189.95006 237.81369 189.89659 238.98703 189.98326 240.15001 190.21006 239.65001 190.97005 239.42002 191.67006 239.15001 191.70006 230.22 192.40006 221.85 195.40006 213.36002 197.89006 204.17185 200.61457 194.83852 202.68456 185.36002 204.10007 179.82003 204.92008 174.36002 206.10007 168.82 207.02007 165.97 207.47006 163.08 207.52007 160.21 208.02007 155.77 208.83007 151.21 209.02007 146.72 209.44007 143.85 209.74007 140.98 210.14006 138.11 210.44007 135.41 210.71007 132.66 210.31006 130.02 211.32007 129.30764 211.47637 128.58763 211.52971 127.86 211.48007 123.53 211.74007 119.2 211.66007 114.86 212.40007 111.14 213.04007 107.24 212.64008 103.43 212.74007 99.81 212.84008 96.17 212.51007 92.59 213.51007 91.51234 213.69545 90.42901 213.73879 89.34 213.64008 84.42999 213.64008 79.509998 213.50008 74.61 213.74008 69.31 213.99008 64.16 212.74008 58.9 212.55008 57.34 212.50008 55.800004 211.71009 54.160005 211.24008 53.750005 210.37009 53.380006 209.57009 53.160005 209.00008 53.216779 208.56737 53.336786 208.15297 53.520029 207.7569 53.703275 207.3608 53.94141 207.00106 54.234445 206.67765 54.52748 206.35424 54.862077 206.08188 55.238225 205.86058 55.61438 205.63928 56.014974 205.47913 56.440004 205.38008 59.173215 204.41608 61.956548 203.62941 64.79 203.02008 71.72 201.72008 78.69 200.61008 85.65 199.46009 91.89 198.46009 98.12 197.36008 104.380008 196.46009 108.32001 195.89008 112.3 195.58008 116.25001 195.11008 118.94001 194.79007 121.630008 194.42008 124.32001 194.03008 128.43001 193.44008 132.53002 192.80008 136.64002 192.19008 137.36002 192.09008 138.09001 192.03008 138.81002 192.00008 144.43001 191.72008 149.96 190.78008 155.51001 190.00008 159.63 189.40007 163.8 189.17008 167.93001 188.65007 173.13 188.00008 178.39002 187.80007 183.54001 186.74007 184.07685 186.6532 184.61684 186.59653 185.16 186.57007 190.03 186.14008 194.91 185.80007 199.77 185.25006 204.44 184.73006 209.08 183.91007 213.77 183.38007 218.46 182.85007 223.19 182.79007 227.82 182.02007 233.01001 181.15007 238.32 181.46007 243.44 180.20006 243.79967 180.12595 244.16301 180.08261 244.53 180.07006 249.53 179.64006 254.69 179.56006 259.67 178.70006 264.86003 177.79006 270.18003 178.27007 275.30003 176.91007 275.47877 176.87693 275.65876 176.85359 275.84004 176.84006 281.26005 176.41007 286.68003 175.99005 292.09004 175.53006 293.89 175.38007 295.68003 175.10007 297.48005 174.90006 298.92005 174.75006 300.36006 174.60005 301.81004 174.51006 304.16004 174.36006 306.54005 174.61006 308.81004 173.71006 309.16224 173.60378 309.52223 173.55377 309.89 173.56006 315.67 173.13007 321.45 172.73006 327.23 172.27007 329.03 172.12007 330.82 171.82007 332.61003 171.60007 333.51 171.49007 334.41 171.38007 335.31004 171.33007 339.31004 171.13007 343.25004 170.89006 347.23005 170.38007 353.69004 169.55007 360.23005 169.45008 366.74006 168.97006 369.63008 168.76006 372.49006 168.25006 375.37007 168.05007 382.61006 167.56006 389.89006 167.48006 397.07008 166.62007 401.96009 166.04007 406.88008 166.23007 411.70008 165.57007 417.31007 164.79007 422.96009 165.15007 428.51008 164.44007 434.06007 163.73006 439.77009 164.04007 445.33009 163.37006 451.66007 162.61006 458.04008 163.00006 464.33009 162.25006 471.2201 161.43006 478.13008 161.91007 484.9701 161.20006 493.6701 160.29006 502.4101 160.88005 511.0601 160.06006 521.5801 159.06006 532.06008 159.48006 542.6101 159.13007 546.4101 159.00006 550.2301 159.35007 554.0001 158.40007 555.26278 158.2152 556.5294 158.18186 557.8001 158.30007H643.9701C646.7001 158.30007 649.4301 158.37007 652.1501 158.30007 654.51638 158.30113 656.8497 158.02446 659.1501 157.47006 661.1348 157.10224 663.1348 156.97557 665.1501 157.09006 668.04629 157.00452 670.9296 156.76451 673.8001 156.37006 677.42349 155.84743 681.04678 155.84743 684.6701 156.37006 689.0201 157.08007 693.3501 157.00006 697.6701 157.18006 699.69766 157.1587 701.6276 157.58203 703.4601 158.45006 703.9 158.63 704.27 159.27 704.91 160Z\" fill=\"#f9b1ac\" />\r\n<path transform=\"matrix(.7999964,0,0,.7999964,416.34547,787.9799)\" d=\"M690.07 62.57C681.07 68.31 680.07 69.39 672.7 71.57L669.2 70.89C667.2 74.05 665.28 77.1 663.34 80.16 658.954 86.825649 654.17398 93.19565 649 99.27 646.49 102.34 643.64 105.17999 639.79 106.46 636.63 104.909999 636.63 104.909999 635.16 101.33 636.77999 88.770008 641.3 76.93 645.73 65.06 646.04 64.24 646.37 63.429998 646.63998 62.749998 645.83999 61.619997 645.20999 62.219999 644.63998 62.599996 641.3599 64.869998 638.19998 67.31999 634.81997 69.42999 630.05996 72.42999 625.2299 75.329998 619.5399 76.42999 618.0499 80.299999 616.7299 84.03999 615.17996 87.689998 612.71688 93.767047 609.6035 99.49038 605.8399 104.85999 605.26919 105.78204 604.54727 106.564647 603.6742 107.20778 602.8011 107.850917 601.83969 108.30832 600.7899 108.579998 600.1285 108.573749 599.5209 108.38967 598.9672 108.02779 598.4135 107.6659 598.0011 107.183307 597.7299 106.579998 597.202 105.71335 596.85177 104.78006 596.6791 103.78011 596.5064 102.78018 596.5233 101.78348 596.7299 100.78999 597.7299 96.2 598.0799 91.48999 599.7299 87.009998 601.1999 82.92999 602.3999 78.73999 603.7899 74.329998 603.2303 73.51158 602.7236 72.66158 602.2699 71.77999 601.57986 70.378658 601.25247 68.89716 601.2878 67.33551 601.3231 65.77386 601.71719 64.308689 602.4699 62.93999 605.0799 57.69999 608.61996 53.54999 613.9599 51.48999 615.4099 49.79999 615.8699 47.60999 617.9599 46.79999 619.2999 46.50999 619.8699 47.43999 620.5199 48.479993 620.2599 49.479993 619.9799 50.479993 619.6999 51.52999 619.7899 51.88999 619.7799 52.32999 619.98989 52.52999 623.1999 56.16999 623.3799 60.37999 622.3799 64.81999 622.22988 65.52999 621.9999 66.21999 621.8899 66.939998 621.6799 68.31 621.5199 69.7 621.2899 71.49999 622.36996 71.06999 623.18997 70.80999 623.9499 70.42999 626.5929 69.237339 629.1629 67.904 631.6599 66.42999 636.5099 63.259996 641.2999 59.95999 645.92996 56.429994 648.51998 54.489995 651.0399 52.339994 652.56997 49.309995 652.86996 48.719995 653.56997 48.309995 654.00997 47.939996 654.34286 47.91022 654.6715 47.935354 654.996 48.015394 655.3204 48.09543 655.623 48.226026 655.90377 48.40718 656.1846 48.588346 656.42837 48.810224 656.63497 49.072824 656.8416 49.335424 656.99996 49.62448 657.1099 49.939996 657.17129 50.293329 657.17129 50.64666 657.1099 50.999998 655.7299 54.539999 654.37997 58.099996 652.8999 61.6 649.22109 70.477298 646.02108 79.523967 643.2999 88.74 642.2999 92.15 641.4699 95.649997 640.4599 99.56 641.0635 99.31971 641.6335 99.01638 642.1699 98.649997 644.27719 96.65216 646.27719 94.55216 648.1699 92.34999 653.7525 85.64919 658.7759 78.55253 663.2399 71.05999 664.8599 68.219989 666.3599 65.48999 666.67996 62.05999 666.94998 59.05999 668.18997 56.11999 669.11996 53.19999 670.1699 49.92999 671.7999 46.85999 672.42996 43.439989 672.69638 42.709539 673.05307 42.026208 673.49996 41.389989L675.4099 41.209989C677.55996 43.209989 677.4099 45.559988 677.0899 47.939989 676.47628 53.758588 674.88296 59.295255 672.3099 64.54999 672.09378 65.25726 671.9937 65.9806 672.0099 66.719989 672.6032 66.80453 673.1966 66.80453 673.7899 66.719989 679.7282 64.33065 685.1782 61.11398 690.1399 57.069986 692.9116 54.943239 695.1983 52.383245 697 49.39 699.13 45.82 701.74 42.54 704.17 39.15 704.81 38.280004 705.56 37.49 705.93 37.06 709.48 36.06 711.44 37.36 712.86 39.83 714.86 43.350004 714.86 47.050004 713.94 50.88 712.27786 57.081377 709.5178 62.748044 705.66 67.880008 702 72.94 697.85 77.43001 692.22 80.21001 691.6445 81.197689 691.1778 82.23435 690.81997 83.32001 689.4185 89.73805 688.9319 96.22472 689.3599 102.78001 689.75997 109.03001 693.55996 112.78001 699.74996 113.14001 703.2943 113.36075 706.80947 113.13234 710.2955 112.454799 713.7815 111.77724 717.1263 110.67231 720.32998 109.14001 726.86367 106.229129 732.6437 102.229129 737.67 97.14001 739.98648 94.825778 741.6531 92.11244 742.67 89.00001 741.07998 83.40001 739.67 81.810009 733.36 78.43001 733.23 77.43001 733.92 77.15001 734.64999 77.170009 735.55899 77.14969 736.4323 77.31635 737.26998 77.670009 741.08999 79.670009 744.17996 82.310009 745.47 86.670009 745.68 87.36001 745.92 88.04001 746.14999 88.740009 745.8508 90.63956 745.2794 92.45336 744.43588 94.18143 743.5923 95.90949 742.5136 97.475688 741.19998 98.880008 732.19998 108.61 721.50997 115.28001 708.30996 117.79001 705.65328 118.39726 702.96328 118.6506 700.2399 118.55001 697.1243 118.41641 694.19766 117.60307 691.4599 116.11001 690.375 115.51327 689.3829 114.78936 688.4835 113.93828 687.58419 113.08721 686.8067 112.13649 686.15109 111.086109 685.4955 110.03571 684.9829 108.919628 684.6134 107.73784 684.2439 106.55605 684.0294 105.34677 683.9699 104.11001 683.46896 98.48656 683.65896 92.88656 684.5399 87.31001 685.7742 79.25098 687.69088 71.35764 690.2899 63.630014 690.41 63.3 690.16 62.91 690.07 62.57ZM693.07 75.729999C701.07 69.649997 704.98 63.359998 708.07 54.359994 708.88796 51.78575 709.51467 49.165754 709.95 46.499994 710.12 45.569993 710.45 44.289995 708.95 43.609994 705.09 47.819993 701.43 52.229993 698.95 57.45999 695.86 63.75 693.45 71.37 693 75.73L693.07 75.729999ZM603.2 99.47C604.61 96.98 606.2 94.55 607.4 91.97 609.51 87.6 611.88 83.32 612.94 78.520008 612.94 78.25001 612.68 77.91 612.42 77.350009H608.76998C605.6 84.34 604.27 91.76 603.2 99.47ZM614.72 72.9C615.32998 71.310009 615.82998 70.17 616.19998 68.98 616.5997 67.77661 616.9064 66.54994 617.11996 65.3 617.3037 64.04 617.39706 62.773336 617.39999 61.500005 617.39999 60.370004 617.68 59.160005 616.77999 57.770006 614.16757 62.335889 612.16757 67.15588 610.77999 72.23L614.72 72.9Z\" fill=\"#f9b1ac\" />\r\n<path transform=\"matrix(.7999964,0,0,.7999964,416.34547,787.9799)\" d=\"M581.37 41.81C581.1678 40.23983 581.2242 38.67901 581.5393 37.12754 581.85446 35.57607 582.4113 34.11689 583.21 32.75 584.67007 30.04 585.75 27.14 587.10006 24.369999 590.82 16.71 594.61007 9.079999 598.61007 .9399986L600.61007-.0000014305115 602.25009 1.7699986C601.73007 3.5199986 601.32009 5.279999 600.67007 6.9499986 597.26339 15.723331 593.8167 24.483332 590.33 33.23 587.92007 39.28 585.39 45.29 582.95 51.34 579.2833 60.4 575.6167 69.47 571.95 78.55 568.2833 87.630008 564.7 96.72667 561.2 105.840007 560.92849 106.85268 560.7685 107.882678 560.72006 108.93 567.8721 115.6273 576.05209 120.65063 585.26 124 591.89718 126.476497 598.7272 128.17983 605.75 129.11 613.28 130.11 620.94 131.38 628.5 130.26 634.07 129.43999 639.67 129.54999 645.24 128.65999 650.58999 127.79999 655.95 127.05999 661.42 125.859989L660.18 124.219989C660.1766 124.03547 660.2153 123.860279 660.29617 123.694408 660.377 123.52853 660.4913 123.390148 660.6388 123.27925 660.7863 123.16836 660.951 123.097118 661.1328 123.065509 661.31466 123.0339 661.4937 123.04539 661.67 123.09998 663.07998 123.36998 664.45 123.83998 666.11 124.30998 666.26 125.30998 666.39999 126.30998 666.54 127.249988 664.26998 129.36998 661.54 129.95999 658.93 130.42998 654.31 131.24999 649.73 132.29998 645.06 132.93997 632.39 134.69997 627.74 135.11997 615.85 135.01998 605.0868 134.90567 594.6168 133.09568 584.44 129.58998 575.89389 126.79081 568.19058 122.48414 561.33 116.66998 560.6287 116.09682 559.892 115.57349 559.12 115.09998 558.72848 114.91373 558.3218 114.77039 557.9 114.66998 556.26 118.83998 554.64 123.02998 552.98007 127.209987 551.5101 130.90999 550.08 134.63999 548.47006 138.27999 547.76589 139.76506 546.8792 141.13173 545.81008 142.37999 545.62026 142.60742 545.4052 142.80779 545.1649 142.98108 544.9246 143.1544 544.6667 143.29524 544.39108 143.4036 544.1153 143.51194 543.83047 143.58443 543.5365 143.62107 543.24258 143.65772 542.94869 143.65737 542.6548 143.62 542.3609 143.58263 542.07626 143.50945 541.80087 143.40042 541.5254 143.2914 541.26779 143.14995 541.02798 142.97608 540.7881 142.80219 540.57357 142.60129 540.3843 142.37339 540.195 142.1455 540.0369 141.89769 539.91006 141.62999 539.158 140.34879 538.7914 138.96546 538.81008 137.48 539.05007 132.23999 538.23007 126.939998 539.6501 121.77 539.6917 121.58893 539.7084 121.405597 539.7001 121.21999 539.5401 115.409999 540.9001 109.67999 540.88009 103.88999 540.88009 99.149997 541.6601 94.51999 542.0301 89.829998 542.2101 87.63999 543.0301 87.119998 545.9201 87.23999 549.2201 92.43999 551.1001 98.69999 555.6401 103.08999 556.0547 103.07068 556.4195 102.92589 556.7345 102.65563 557.0495 102.385379 557.248 102.04683 557.3301 101.63999 563.65676 85.83999 569.99008 70.04332 576.3301 54.249994 578 50.21 579.6 46.18 581.37 41.81ZM553.89 110 549.97006 104.8C548.64 103.04 547.97006 100.8 545.64 99.200008 545.51 102.55 545.74 105.490009 545.19 108.29001 544.6743 111.68075 544.38766 115.09075 544.33 118.520008 544.21 120.520008 543.95 122.46001 543.66006 124.420009 543.1807 127.8577 543.33078 131.2677 544.11007 134.65001 547.59 126.24 550.87 118.27 553.89 110Z\" fill=\"#f9b1ac\" />\r\n<path transform=\"matrix(.7999964,0,0,.7999964,416.34547,787.9799)\" d=\"M392.64 67.36C390.25 68.42 388.49003 67.2 386.75 66.19 386.44 64.810009 387.22 64.3 388.16 64.450008 390.07 64.74 390.19 64.93 392.64 67.36Z\" fill=\"#f9b1ac\" />\r\n</g>\r\n<path transform=\"matrix(1,0,0,-1,0,1507.9199)\" d=\"M13.850068 55.486825H1486.1499V1460.3532H13.850068Z\" fill-opacity=\"0\" />\r\n<path transform=\"matrix(1,0,0,-1,0,1507.9199)\" d=\"M415.6592 548.734H1013.75906V719.94009H415.6592Z\" fill-opacity=\"0\" />\r\n</g>\r\n"});

const $$Astro$2 = createAstro("https://moathalgunimi17-svg.github.io");
const $$OrderDialog = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$OrderDialog;
  const { locale } = Astro2.props;
  const t = useT(locale);
  return renderTemplate`${maybeRenderHead()}<dialog class="order-dialog" id="order-dialog" aria-labelledby="order-title" aria-describedby="order-text"> <button class="icon-btn order-dialog__close" type="button" data-close>${renderComponent($$result, "Icon", $$Icon, { "name": "close" })}<span class="visually-hidden">${t("a11y.close")}</span></button> <div class="order-dialog__card" aria-hidden="true"> <img${addAttribute(starNote.src, "src")} width="220" height="210" alt=""> </div> <h2 id="order-title">${t("order.title")}</h2> <p id="order-text" class="muted" data-order-text>${t("order.text")}</p> <label class="order-dialog__label" for="order-message">${t("order.preview")}</label> <textarea class="textarea order-dialog__msg" id="order-message" readonly rows="8" data-order-message></textarea> <div class="order-dialog__actions"> <a class="btn btn--wa" data-order-open target="_blank" rel="noopener" href="#">${renderComponent($$result, "Icon", $$Icon, { "name": "whatsapp" })} ${t("order.open")}</a> <button class="btn btn--ghost" type="button" data-order-copy>${renderComponent($$result, "Icon", $$Icon, { "name": "copy" })} <span class="btn__label">${t("order.copy")}</span></button> </div> <p class="order-dialog__after">${renderComponent($$result, "Icon", $$Icon, { "name": "info" })} ${t("order.after")}</p> </dialog>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/OrderDialog.astro", void 0);

const $$Astro$1 = createAstro("https://moathalgunimi17-svg.github.io");
const $$QuickAdd = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$QuickAdd;
  const { locale } = Astro2.props;
  const t = useT(locale);
  return renderTemplate`${maybeRenderHead()}<dialog class="sheet sheet--bottom quick-add" id="quick-add" aria-labelledby="qa-title"> <form class="quick-add__form" data-quick-form novalidate> <div class="sheet__head"> <div class="quick-add__title"> <img data-qa-img alt="" width="64" height="76"> <div> <h2 id="qa-title" data-qa-name></h2> <p class="quick-add__price" data-qa-price></p> </div> </div> <button class="icon-btn" type="button" data-close>${renderComponent($$result, "Icon", $$Icon, { "name": "close" })}<span class="visually-hidden">${t("a11y.close")}</span></button> </div> <div class="sheet__body"> <fieldset class="opt-group" data-qa-colours> <legend>${t("product.colour")}</legend> <div class="swatches" data-qa-colour-list></div> </fieldset> <fieldset class="opt-group" aria-describedby="qa-size-error"> <legend>${t("product.size")}</legend> <div class="sizes" data-qa-size-list></div> <p class="field-error" id="qa-size-error" data-qa-error aria-live="assertive"></p> </fieldset> <div class="quick-add__actions"> <button class="btn btn--block" type="submit">${renderComponent($$result, "Icon", $$Icon, { "name": "bag" })} <span class="btn__label">${t("product.add")}</span></button> <a class="link-arrow" data-qa-link href="#">${t("product.view")} ${renderComponent($$result, "Icon", $$Icon, { "name": "arrow" })}</a> </div> </div> </form> </dialog>`;
}, "C:/Users/Mkhal/OneDrive/\u0633\u0637\u062D \u0627\u0644\u0645\u0643\u062A\u0628/pro websites/nooma/src/components/QuickAdd.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro("https://moathalgunimi17-svg.github.io");
const $$Base = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Base;
  const { locale, path, title, description, ogImage, jsonLd, noindex } = Astro2.props;
  const t = useT(locale);
  const dir = locale === "ar" ? "rtl" : "ltr";
  const site_ = Astro2.site ?? new URL(site.domain);
  const isPreview = !site_.hostname.endsWith(new URL(site.domain).hostname);
  const hideFromSearch = noindex || isPreview;
  const canonical = new URL(href(locale, path), site_).href;
  const altAr = new URL(href("ar", path), site_).href;
  const altEn = new URL(href("en", path), site_).href;
  const og = ogImage ?? (await getImage({ src: logoAr, width: 900, format: "jpg", background: "#FFF6F5" })).src;
  const ogAbs = new URL(og, site_).href;
  const catalog = await clientCatalog();
  const clientKeys = [
    "cart.remove",
    "cart.removed",
    "cart.undo",
    "cart.viewBag",
    "cart.updated",
    "cart.items",
    "product.chooseSize",
    "product.added",
    "product.priceTbc",
    "product.sample",
    "product.decrease",
    "product.increase",
    "product.qty",
    "order.copied",
    "order.copyFail",
    "order.copy",
    "order.text",
    "order.textCopy",
    "order.msg.greeting",
    "order.msg.size",
    "order.msg.colour",
    "order.msg.qty",
    "order.msg.subtotal",
    "order.msg.priceTbc",
    "order.msg.shipping",
    "order.msg.gift",
    "order.msg.sample",
    "order.msg.closing",
    "order.single",
    "search.empty",
    "search.results",
    "a11y.cartCount",
    "shop.count",
    "shop.count1",
    "shop.count2",
    "shop.remove",
    "product.outOfStock",
    "product.colours"
  ];
  const strings = Object.fromEntries(clientKeys.map((k) => [k, dict[locale][k]]));
  const clientConfig = {
    locale,
    whatsappLink: site.contact.whatsappLink,
    whatsappNumber: site.contact.whatsappNumber,
    maxQty: site.commerce.maxQtyPerLine,
    sample: site.sampleCatalog,
    productBase: href(locale, "products/"),
    cartUrl: href(locale, routes.cart),
    strings
  };
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Nooma",
    alternateName: "نُومة",
    url: site.domain,
    email: site.contact.email,
    sameAs: [site.contact.instagramUrl]
  };
  const safeJson = (v) => JSON.stringify(v).replaceAll("<", String.fromCharCode(92) + "u003c");
  const ld = [orgLd, ...jsonLd ? Array.isArray(jsonLd) ? jsonLd : [jsonLd] : []];
  return renderTemplate(_b || (_b = __template(["<html", "", "", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><title>', '</title><meta name="description"', ">", '<meta name="theme-color" content="#FFF6F5"><meta property="og:type" content="website"><meta property="og:site_name"', '><meta property="og:title"', '><meta property="og:description"', '><meta property="og:url"', '><meta property="og:image"', '><meta property="og:locale"', '><meta property="og:locale:alternate"', '><meta name="twitter:card" content="summary_large_image"><link rel="icon" type="image/png" sizes="64x64"', '><link rel="apple-touch-icon"', '><link rel="sitemap"', "><script>document.documentElement.classList.add('js');</script><style>", "</style>", "", '</head> <body> <a class="skip-link" href="#main">', "</a> ", " ", ' <main id="main" tabindex="-1"> ', " </main> ", " ", " ", " ", " ", ' <div class="toast-region" role="status" aria-live="polite" aria-atomic="true" id="toast"></div> <div class="visually-hidden" aria-live="polite" id="sr-live"></div> <script type="application/json" id="nooma-catalog">', '</script> <script type="application/json" id="nooma-config">', "</script> ", " </body> </html>"])), addAttribute(locale, "lang"), addAttribute(dir, "dir"), addAttribute(locale, "data-locale"), title, addAttribute(description, "content"), hideFromSearch ? renderTemplate`<meta name="robots" content="noindex, follow">` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": async ($$result2) => renderTemplate`<link rel="canonical"${addAttribute(canonical, "href")}><link rel="alternate" hreflang="ar-OM"${addAttribute(altAr, "href")}><link rel="alternate" hreflang="en"${addAttribute(altEn, "href")}><link rel="alternate" hreflang="x-default"${addAttribute(altAr, "href")}>` })}`, addAttribute(locale === "ar" ? "نُومة" : "Nooma", "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(canonical, "content"), addAttribute(ogAbs, "content"), addAttribute(locale === "ar" ? "ar_OM" : "en_US", "content"), addAttribute(locale === "ar" ? "en_US" : "ar_OM", "content"), addAttribute(`${"/C:/Program Files/Git/nooma/"}favicon.png`, "href"), addAttribute(`${"/C:/Program Files/Git/nooma/"}apple-touch-icon.png`, "href"), addAttribute(`${"/C:/Program Files/Git/nooma/"}sitemap-index.xml`, "href"), unescapeHTML(`:root{--stripes-url:url("${stripes.src}")}`), ld.map((o) => renderTemplate(_a || (_a = __template(['<script type="application/ld+json">', "</script>"])), unescapeHTML(safeJson(o)))), renderHead(), t("a11y.skip"), renderComponent($$result, "Announcement", $$Announcement, { "locale": locale }), renderComponent($$result, "Header", $$Header, { "locale": locale }), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, { "locale": locale }), renderComponent($$result, "CartDrawer", $$CartDrawer, { "locale": locale }), renderComponent($$result, "SearchDialog", $$SearchDialog, { "locale": locale }), renderComponent($$result, "QuickAdd", $$QuickAdd, { "locale": locale }), renderComponent($$result, "OrderDialog", $$OrderDialog, { "locale": locale }), unescapeHTML(safeJson(catalog)), unescapeHTML(safeJson(clientConfig)), renderScript($$result, "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/layouts/Base.astro?astro&type=script&index=0&lang.ts"));
}, "C:/Users/Mkhal/OneDrive/سطح المكتب/pro websites/nooma/src/layouts/Base.astro", void 0);

export { $$Base as $, baseService as A, parseQuality as B, $$Stars as a, $$Icon as b, catCurled as c, $$Image as d, logoAr as e, logoEn as f, artAlt as g, href as h, art as i, $$CartPanel as j, site as k, liveCategories as l, mirror as m, countLabel as n, createSvgComponent as o, products as p, getProduct as q, routes as r, starNote as s, getCategory as t, useT as u, colourPhotos as v, getImage as w, sizeById as x, sizes as y, coverImage as z };
