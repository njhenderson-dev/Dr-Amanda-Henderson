// ---------------------------------------------------------------------------
// Central site configuration & content model.
// Content is separated from presentation so copy, practice details and SEO
// metadata can be edited here (or later moved to a lightweight CMS) without
// touching layout code.
// ---------------------------------------------------------------------------

export const site = {
  name: "Dr Amanda Henderson",
  shortName: "Dr Amanda Henderson",
  role: "Family GP",
  // Preferred canonical origin. Keep in sync with the deployed domain.
  url: "https://dramandahenderson.com",
  locale: "en_AU",
  tagline: "Thoughtful, thorough GP care for every stage of life.",
  description:
    "Dr Amanda Henderson is a female family GP in Maroubra, Sydney, with a particular interest in women's health, pregnancy and preconception care, shared antenatal care, children's health and family medicine.",
} as const;

export const practice = {
  // Place of practice — distinct from Dr Henderson (the doctor).
  name: "GP Maroubra",
  streetAddress: "14 Meagher Avenue",
  suburb: "South Maroubra",
  region: "NSW",
  postcode: "2035",
  country: "AU",
  countryName: "Australia",
  phone: "(02) 9311 9311",
  phoneHref: "tel:0293119311",
  // Established online booking provider (HotDoc). Do not build a custom flow.
  bookingUrl:
    "https://www.hotdoc.com.au/medical-centres/maroubra-NSW-2035/gp-maroubra/doctors/dr-amanda-henderson-1",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=14+Meagher+Avenue+South+Maroubra+NSW+2035",
  afterHours: {
    label: "Sydney Medical Service (after-hours home visits)",
    phone: "1300 466 347",
    phoneHref: "tel:1300466347",
    altPhone: "(02) 8724 6300",
    altPhoneHref: "tel:0287246300",
  },
  emergency: {
    label: "In an emergency, always call",
    phone: "000",
    phoneHref: "tel:000",
  },
} as const;

export const fullAddress = `${practice.streetAddress}, ${practice.suburb} NSW ${practice.postcode}`;

// Qualifications relevant to Amanda's current focus. Skin-cancer and cosmetic
// certificates are intentionally omitted from the new positioning.
export const qualifications = [
  "MBBS",
  "FRACGP",
  "MAppIFin",
  "BComm",
  "BBus",
] as const;

export const credentials = [
  "Fellow of the Royal Australian College of General Practitioners (FRACGP)",
  "Female family GP in Maroubra, Sydney",
  "Registered shared antenatal care provider — Royal Hospital for Women, Randwick",
] as const;

// Primary navigation — humans first. A small, clear set.
export const nav = [
  { label: "About", href: "/about" },
  { label: "Women's Health", href: "/womens-health" },
  { label: "Pregnancy", href: "/pregnancy-care" },
  { label: "Children's Health", href: "/childrens-health" },
  { label: "General GP Care", href: "/general-gp-care" },
  { label: "Articles", href: "/articles" },
] as const;

export type ServiceArea = {
  slug: string;
  title: string;
  href: string;
  eyebrow: string;
  summary: string; // homepage / card summary
  intro: string; // page lead
  covers: { heading: string; body: string }[];
  whenToSee: string[];
  consultation: string;
  faqs: { q: string; a: string }[];
  related: string[]; // slugs of related service areas
  metaTitle: string;
  metaDescription: string;
  knowsAbout: string[]; // for schema knowsAbout
};

// The core clinical pillars. Skin cancer and cosmetic procedures are
// deliberately absent from this positioning.
export const serviceAreas: ServiceArea[] = [
  {
    slug: "womens-health",
    title: "Women's Health",
    href: "/womens-health",
    eyebrow: "Care across every life stage",
    summary:
      "Contraception, periods and pelvic pain, PCOS, breast concerns, sexual health, perimenopause and menopause — discussed properly and without judgement.",
    intro:
      "Women's health is one of the areas I care for most often, and one I find especially rewarding. Whether it's contraception, difficult periods, a breast concern, or the changes of perimenopause, my aim is the same: to listen carefully, explain your options clearly, and help you make a decision that suits your life.",
    covers: [
      {
        heading: "Contraception",
        body: "From the pill to long-acting options such as the implant (Implanon) and IUDs, we can talk through what might suit your body, your plans and your preferences — and I can arrange or provide most options in the practice.",
      },
      {
        heading: "Periods, pain and PCOS",
        body: "Heavy, painful or irregular periods can have a real impact on everyday life. We can work through what might be causing them — including PCOS, endometriosis, fibroids or iron deficiency — and discuss the options available.",
      },
      {
        heading: "Cervical screening & sexual health",
        body: "Cervical screening (including self-collection), STI testing and vaginal symptoms are routine parts of general practice. A visit should feel private, unhurried and free of judgement.",
      },
      {
        heading: "Breast concerns",
        body: "If you've noticed a lump, pain or change, we can examine it, arrange the right imaging if needed, and explain what happens next — and talk through screening when it's due.",
      },
      {
        heading: "Perimenopause & menopause",
        body: "Hot flushes, sleep changes, mood and brain fog are common and treatable. We can talk through what's happening and the options — including menopausal hormone therapy where appropriate.",
      },
    ],
    whenToSee: [
      "Your periods are heavy, painful, irregular or affecting daily life",
      "You'd like to start, change or review contraception",
      "You've noticed a breast lump, pain or change",
      "You're due for cervical screening or would like STI testing",
      "You're noticing symptoms of perimenopause or menopause",
    ],
    consultation:
      "We'll start by talking through what's brought you in and how it's affecting you. Depending on your concern that might involve an examination, blood tests, a cervical screening test or imaging. I'll explain what I'm looking for, what the options are, and we'll decide on the next step together. Some things are sorted in one visit; others are worth reviewing over time.",
    faqs: [
      {
        q: "Can a GP help with perimenopause?",
        a: "Yes. A GP is often the best place to start. We can confirm what's going on, rule out other causes, and discuss options ranging from lifestyle measures to menopausal hormone therapy, referring on only if needed.",
      },
      {
        q: "What contraception options can I discuss with my GP?",
        a: "All of them — the pill, mini-pill, vaginal ring, implant, hormonal and copper IUDs, injections and non-hormonal options. We can weigh up effectiveness, bleeding patterns, side effects and your medical history to find a good fit.",
      },
      {
        q: "Do I need a referral for cervical screening?",
        a: "No. Cervical screening is done in general practice, and self-collection is now an option for most people. You can book directly.",
      },
    ],
    related: ["pregnancy-care", "general-gp-care"],
    metaTitle: "Women's Health GP in Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Women's health care in Maroubra with Dr Amanda Henderson: contraception, periods and PCOS, cervical screening, breast concerns, perimenopause and menopause.",
    knowsAbout: [
      "Women's health",
      "Contraception",
      "Cervical screening",
      "Polycystic ovary syndrome",
      "Endometriosis",
      "Menopause",
      "Perimenopause",
    ],
  },
  {
    slug: "pregnancy-care",
    title: "Pregnancy & Preconception Care",
    href: "/pregnancy-care",
    eyebrow: "From planning to postnatal",
    summary:
      "Preconception planning, shared antenatal care with the Royal Hospital for Women, and looking after you and your baby after the birth.",
    intro:
      "Pregnancy is a good time to have a GP who knows you and can walk alongside you. I offer preconception advice, shared antenatal care with the Royal Hospital for Women, and postnatal care for you and your baby — so much of the journey can be looked after close to home.",
    covers: [
      {
        heading: "Before you conceive",
        body: "Ideally we'd meet a few months before you start trying. We can review your health and medications, check immunity and screening, start folate, and talk through anything specific to you — including planning after 35 or with an existing condition.",
      },
      {
        heading: "Shared antenatal care",
        body: "As a registered shared care provider with the Royal Hospital for Women in Randwick, I can look after much of your routine pregnancy care locally, coordinating with the hospital for your scans, tests and birth.",
      },
      {
        heading: "Through your pregnancy",
        body: "We'll keep an eye on your health and your baby's, arrange the recommended tests and screening, and talk through the everyday questions — food and medication safety, nausea, exercise, and how you're feeling.",
      },
      {
        heading: "After the birth",
        body: "The six-week check looks after both mother and baby. We can also support feeding, sleep, recovery, contraception and perinatal mental health — for as long as you need.",
      },
    ],
    whenToSee: [
      "You're thinking about trying for a baby in the next year",
      "You've had a positive pregnancy test",
      "You'd like shared antenatal care close to home",
      "You're approaching your six-week postnatal check",
      "Pregnancy or new parenthood is feeling hard",
    ],
    consultation:
      "At a first pregnancy visit we'll confirm dates, talk through your health and history, arrange your early tests and screening, and set up a plan for the months ahead — including whether shared care suits you. There's no rush; it's a chance to ask anything that's on your mind.",
    faqs: [
      {
        q: "What does a shared care GP do?",
        a: "In shared antenatal care, your routine pregnancy check-ups happen with your GP close to home, while the hospital manages your scans, specialist care and the birth. It means continuity with someone who knows you, with the hospital's expertise behind you.",
      },
      {
        q: "When should I see a GP before trying for a baby?",
        a: "Ideally about three months before you start trying. That gives time to start folate, review medications and immunity, address any health issues and answer your questions — so you go into pregnancy well prepared.",
      },
      {
        q: "What can I talk to my GP about after having a baby?",
        a: "Anything — your recovery, feeding, sleep, mood, contraception, and your baby's growth and development. The six-week check is a natural point to bring it all together, but you're welcome any time.",
      },
    ],
    related: ["womens-health", "childrens-health"],
    metaTitle: "Pregnancy & Shared Antenatal Care GP, Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Preconception advice, shared antenatal care with the Royal Hospital for Women, and postnatal care in Maroubra with Dr Amanda Henderson.",
    knowsAbout: [
      "Preconception care",
      "Antenatal care",
      "Shared maternity care",
      "Postnatal care",
      "Perinatal mental health",
    ],
  },
  {
    slug: "childrens-health",
    title: "Children's Health",
    href: "/childrens-health",
    eyebrow: "Babies, children & families",
    summary:
      "Newborn and childhood care, feeding and development, immunisations, common illnesses, and taking parents' concerns seriously.",
    intro:
      "Caring for children — and reassuring their parents — is one of the joys of family medicine. From newborn checks and immunisations to feeding, development and the common illnesses of childhood, I try to give parents clear guidance and take their concerns seriously.",
    covers: [
      {
        heading: "Babies & feeding",
        body: "Weight and growth, feeding (breast and bottle), starting solids and introducing allergy foods, sleep and settling — the practical questions of the early months.",
      },
      {
        heading: "Development & checks",
        body: "Routine developmental checks help pick up anything worth watching early. If you have concerns about your child's milestones, movement, speech or behaviour, we can look into them together.",
      },
      {
        heading: "Immunisations",
        body: "I provide the routine childhood immunisations on the National Immunisation Program, and can talk through the schedule and any catch-ups.",
      },
      {
        heading: "Common illnesses & concerns",
        body: "Coughs, fevers, rashes, ears, tummies and childhood eczema — the everyday illnesses of childhood, plus early steps if you have concerns such as ADHD.",
      },
    ],
    whenToSee: [
      "Your baby is due for a check, weigh or immunisation",
      "You have questions about feeding, sleep or starting solids",
      "You're worried about your child's development or behaviour",
      "Your child is unwell and you'd like them seen",
      "You'd like to talk through concerns such as ADHD",
    ],
    consultation:
      "With children I take my time and follow the parent's lead — you know your child best. We'll talk through what you've noticed, examine your child gently, and make a plan together, whether that's simple reassurance, treatment, a review, or a referral if it's needed.",
    faqs: [
      {
        q: "When should my baby have developmental checks?",
        a: "There are recommended checks through the first years of life — around the newborn period, and at key ages as your child grows. They're a chance to review growth, development and immunisations, and to raise anything you've noticed.",
      },
      {
        q: "Can I see a GP about my child's development or behaviour?",
        a: "Absolutely. A GP is a good first step. We can talk through your concerns, do an initial assessment, and coordinate referral to a paediatrician or allied health if that's the right next step.",
      },
    ],
    related: ["pregnancy-care", "general-gp-care"],
    metaTitle: "Children's Health GP in Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Family GP care for babies and children in Maroubra: feeding and development, immunisations, common childhood illnesses and parental concerns.",
    knowsAbout: [
      "Paediatrics",
      "Childhood immunisation",
      "Child development",
      "Infant feeding",
      "Childhood eczema",
    ],
  },
  {
    slug: "general-gp-care",
    title: "General GP Care",
    href: "/general-gp-care",
    eyebrow: "Whole-person family medicine",
    summary:
      "The broad range of physical and mental health concerns people bring to their GP — plus preventative health, men's health, travel medicine and lifestyle care.",
    intro:
      "Much of general practice is the everyday work of family medicine: the new symptom, the ongoing condition, the check-up, the referral, and the mental health concern. I care for adults across the whole range of health issues, with an emphasis on prevention and on knowing you over time.",
    covers: [
      {
        heading: "Everyday & ongoing health",
        body: "New symptoms, acute illness, chronic conditions such as blood pressure, cholesterol and diabetes, and coordinating care with specialists and allied health.",
      },
      {
        heading: "Mental health",
        body: "Stress, anxiety, low mood and sleep are common reasons to see a GP. We can talk it through, make a plan, and arrange a mental health care plan or referral where that helps.",
      },
      {
        heading: "Preventative health",
        body: "Health checks, screening, cardiovascular and diabetes risk, immunisations and healthy-lifestyle support — helping you understand and manage your longer-term health.",
      },
      {
        heading: "Men's health",
        body: "The health check men often put off — heart and diabetes risk, blood pressure, prostate discussion, mental health — in a straightforward, practical visit.",
      },
      {
        heading: "Travel medicine",
        body: "Pre-travel consultations covering vaccines, malaria prevention, and staying well abroad — ideally a few weeks before you go.",
      },
      {
        heading: "Lifestyle medicine",
        body: "Weight, sleep, alcohol, smoking and wellbeing — practical, non-judgemental support for the changes you'd like to make.",
      },
    ],
    whenToSee: [
      "You have a new symptom or an ongoing condition to manage",
      "You're due for a general health check or screening",
      "You'd like to talk about your mental health",
      "You have a trip coming up and need travel advice or vaccines",
      "You'd like support with weight, sleep, alcohol or smoking",
    ],
    consultation:
      "A standard consultation is a chance to work through what's brought you in, in the context of your wider health. I'd rather understand the whole picture than treat a symptom in isolation, so we may cover more than one thing, agree what's most important, and plan a review if we need more time.",
    faqs: [
      {
        q: "What does continuity of care with a family GP mean?",
        a: "It means seeing a GP who knows you and your history, so your care builds over time rather than starting from scratch each visit. Continuity is linked to better health and fewer things falling through the cracks — and it's central to how I like to work.",
      },
      {
        q: "How far in advance should I book a travel appointment?",
        a: "Ideally six to eight weeks before you travel, as some vaccines need time or several doses. If your trip is sooner, it's still worth coming in — we'll do what we can.",
      },
    ],
    related: ["womens-health", "childrens-health"],
    metaTitle: "General Family Medicine GP in Maroubra | Dr Amanda Henderson",
    metaDescription:
      "Whole-person general practice in Maroubra: everyday and ongoing health, mental health, preventative care, men's health, travel medicine and lifestyle support.",
    knowsAbout: [
      "General practice",
      "Preventive medicine",
      "Men's health",
      "Travel medicine",
      "Lifestyle medicine",
      "Mental health",
    ],
  },
];

export function getServiceArea(slug: string) {
  return serviceAreas.find((s) => s.slug === slug);
}

// "What you can expect" — the practice philosophy, reused on home & about.
export const expectations = [
  {
    title: "To be heard",
    body: "Your concerns should be taken seriously. I'll listen properly before we decide what to do.",
  },
  {
    title: "Clear explanations",
    body: "Medical information should make sense — including your options and what happens next.",
  },
  {
    title: "Thorough care",
    body: "I try to consider the bigger picture rather than treating symptoms in isolation.",
  },
  {
    title: "Continuity",
    body: "Care works best as a relationship — a GP who gets to know you and your health over time.",
  },
];

// Nearby areas for natural local relevance (used sparingly, not as doorway pages).
export const nearbyAreas = [
  "Maroubra",
  "South Maroubra",
  "Coogee",
  "Randwick",
  "Kingsford",
  "Malabar",
  "Matraville",
  "Pagewood",
];
