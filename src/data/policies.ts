/**
 * Policy drafts. "known" holds only what is verified (Nooma's own Instagram
 * statements, or facts about how this website is built). "needs" lists what
 * Nooma must supply — it renders as a visible checklist, never as invented policy.
 */
import type { L10n } from './types';

export interface PolicyDoc {
  key: 'shipping' | 'returns' | 'privacy' | 'terms';
  known: L10n[];
  needs: L10n[];
}

export const policies: Record<PolicyDoc['key'], PolicyDoc> = {
  shipping: {
    key: 'shipping',
    known: [
      { ar: 'نوصل لجميع دول العالم (كما ورد في حساب نُومة على إنستغرام).', en: 'We deliver worldwide (as stated on Nooma’s Instagram).' },
      { ar: 'تُرسل الطلبات عبر الواتساب، ويؤكد فريق نُومة رسوم التوصيل ومدته لكل طلب قبل اعتماده.', en: 'Orders are sent on WhatsApp, and the Nooma team confirms delivery fees and timing for each order before it is accepted.' },
      { ar: 'لا يضيف الموقع أي رسوم توصيل تلقائياً.', en: 'The website never adds a delivery fee automatically.' },
    ],
    needs: [
      { ar: 'رسوم التوصيل داخل عُمان وخارجها', en: 'Delivery fees inside and outside Oman' },
      { ar: 'مدة تجهيز الطلب ومدة التوصيل المتوقعة', en: 'Order preparation time and expected delivery times' },
      { ar: 'شركات الشحن المستخدمة وإمكانية تتبّع الشحنة', en: 'Carriers used and whether tracking is available' },
      { ar: 'أي حد أدنى للتوصيل المجاني (إن وُجد)', en: 'Any free-delivery threshold (if offered)' },
    ],
  },
  returns: {
    key: 'returns',
    known: [
      { ar: 'لكل استفسار عن الاستبدال أو الإرجاع، تواصلي مع فريق نُومة عبر الواتساب.', en: 'For any exchange or return question, contact the Nooma team on WhatsApp.' },
    ],
    needs: [
      { ar: 'هل يتوفر الاستبدال؟ وهل يتوفر الإرجاع واسترداد المبلغ؟', en: 'Are exchanges offered? Are returns and refunds offered?' },
      { ar: 'المدة المسموحة بعد الاستلام', en: 'The allowed period after delivery' },
      { ar: 'شروط المنتج (غير مستخدم، بالبطاقة والتغليف…)', en: 'Item conditions (unworn, with tags and packaging…)' },
      { ar: 'من يتحمّل رسوم الشحن عند الاستبدال أو الإرجاع', en: 'Who pays shipping for exchanges or returns' },
      { ar: 'طريقة ومدة استرداد المبلغ', en: 'Refund method and timing' },
    ],
  },
  privacy: {
    key: 'privacy',
    known: [
      { ar: 'لا يحتاج الموقع إلى حساب أو تسجيل دخول.', en: 'The website needs no account or sign-in.' },
      { ar: 'محتويات الحقيبة تُحفظ في متصفحك على جهازك فقط (التخزين المحلي)، ولا تُرسل إلى أي خادم.', en: 'Your bag is stored only in your browser on your device (local storage) and is never sent to a server.' },
      { ar: 'لا يستخدم الموقع أدوات تحليل أو تتبّع أو إعلانات.', en: 'The website uses no analytics, tracking or advertising tools.' },
      { ar: 'عند الضغط على الواتساب أو البريد أو إنستغرام تنتقلين إلى تلك الخدمة، وتطبق سياساتها. رسالة الطلب تحتوي على القطع التي اخترتِها وبيانات التوصيل التي تكتبينها (الاسم والهاتف والبريد والمنطقة والعنوان)، وترسلينها أنتِ من الواتساب لديك إلى نُومة.', en: 'When you tap WhatsApp, email or Instagram you move to that service and its policies apply. The order message contains the items you chose and the delivery details you type (name, phone, email, area and address), and you send it yourself from your WhatsApp to Nooma.' },
      { ar: 'لا يرسل الموقع بيانات التوصيل إلى أي خادم. تُحفظ مؤقتاً في متصفحك خلال الزيارة فقط حتى لا تكتبيها مرة أخرى، وتُمسح عند إغلاق الصفحة.', en: 'The website sends your delivery details to no server. They are kept in your browser for this visit only, so you don’t have to type them again, and are cleared when you close the tab.' },
      { ar: 'نموذج التواصل لا يرسل بياناتك إلى خادم؛ بل يفتح تطبيق البريد لديك.', en: 'The contact form sends nothing to a server; it opens your own email app.' },
    ],
    needs: [
      { ar: 'الاسم القانوني للنشاط التجاري وبيانات التواصل لطلبات الخصوصية', en: 'The business’s legal name and a contact for privacy requests' },
      { ar: 'مدة الاحتفاظ ببيانات الطلبات المرسلة عبر الواتساب', en: 'How long order details received on WhatsApp are kept' },
      { ar: 'مراجعة قانونية للنص النهائي', en: 'Legal review of the final text' },
    ],
  },
  terms: {
    key: 'terms',
    known: [
      { ar: 'إرسال رسالة الطلب عبر الواتساب لا يعني أن الطلب مؤكد أو مدفوع؛ يتأكد الطلب برد فريق نُومة.', en: 'Sending the order message on WhatsApp does not mean the order is confirmed or paid; it is confirmed by the Nooma team’s reply.' },
      { ar: 'الأسعار معروضة بالريال العُماني.', en: 'Prices are shown in Omani rials.' },
    ],
    needs: [
      { ar: 'الاسم القانوني للنشاط ورقم السجل التجاري (إن وُجد)', en: 'The business’s legal name and commercial registration (if any)' },
      { ar: 'طرق الدفع وشروطها', en: 'Payment methods and terms' },
      { ar: 'سياسة إلغاء الطلب', en: 'Order cancellation policy' },
      { ar: 'القانون المطبَّق وجهة حل النزاعات', en: 'Governing law and dispute resolution' },
    ],
  },
};
