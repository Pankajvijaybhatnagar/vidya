export const SITE = {
  name: "Vinay Bal Mandir Gurukul Vidyapeeth",
  shortName: "Gurukul Vidyapeeth",
  nameHi: "विनय बाल मन्दिर गुरुकुल विद्यापीठ",
  trust: "Shri Lajja Ram Bashesar Dass",
  operator: "D.D.M. Nyas",
  operatorHi: "डी.डी.एम. न्यास",
  tagline: "A Value-Based Modern Learning Centre",
  taglineHi: "संस्कारमय जीवन पर आधारित आधुनिक शिक्षा केन्द्र",
  motto: "तेजो मयि धेहि",
  mottoMeaning: "Bestow radiance upon me",
  mottoSource: "अथर्ववेद, शौनक संहिता, काण्ड-7, सुक्त-89",
  founded: "24 May 2012",
  foundedHi: "24 मई 2012",
  established: 2012,
  affiliation: "Recognised by the Government of Haryana and affiliated to the Board of School Education Haryana, Bhiwani, under the Gurukul Vidyapeeth curriculum.",
  city: "Jind",
  state: "Haryana",
  url: "https://vinaybalmandir.example",
  // Phone numbers and address as printed on the Vidyapeeth's admissions and Sattra Shubharambh banners.
  phones: ["99920-93672", "98964-58218"],
  // Email is left empty until confirmed — it is cut off on every banner photo. Empty values are hidden.
  email: "",
  address: "Safidon Road, Lakhmirwala, Jind, Haryana 126102",
  addressHi: "सफीदों रोड, लखमीरवाला, जीन्द, हरियाणा – 126102",
};

export const telHref = (n) => `tel:+91${n.replace(/\D/g, "")}`;

// Office-bearers named on the Vidyapeeth's own banners (admissions banner; Shila Pujan Samaroh banner).
export const MANAGEMENT = [
  { nameHi: "पीठाधीश्वर श्रीमहन्त राजेश स्वरूप जी महाराज", name: "Shrimahant Rajesh Swaroop Ji Maharaj", roleHi: "संस्थापक एवं अध्यक्ष", role: "Founder & Chairman", slug: "founder" },
  { nameHi: "डॉ. कान्ता शर्मा", name: "Dr. Kanta Sharma", roleHi: "उपाध्यक्षा", role: "Vice-Chairperson", slug: "vice-chairperson" },
  { nameHi: "श्री विजय कुमार बंसल", name: "Shri Vijay Kumar Bansal", roleHi: "सह-संस्थापक · मुख्य ट्रस्टी", role: "Co-Founder · Chief Trustee", slug: "co-founder" },
  { nameHi: "श्री शिवेन्दु भारद्वाज", name: "Shri Shivendu Bhardwaj", roleHi: "निदेशक", role: "Director" },
  { nameHi: "श्री गुलाब सिंह", name: "Shri Gulab Singh", roleHi: "प्रबन्धक", role: "Manager" },
  { nameHi: "श्रीमती आरती भोला", name: "Smt. Aarti Bhola", roleHi: "बालवाटिका समन्वयक", role: "Balvatika Coordinator", slug: "balvatika-coordinator" },
];

export const NAV = [
  { href: "/", label: "Home" },
  {
    label: "About",
    href: "/about",
    children: [
      { href: "/about", label: "About Vidyapeeth", hint: "स्थापना एवं परिचय" },
      { href: "/our-logo", label: "Our Logo", hint: "तेजो मयि धेहि" },
      { href: "/vision-mission", label: "Vision & Mission", hint: "उद्देश्य एवं संकल्प" },
      { href: "/balvatika", label: "Balvatika", hint: "बाल वाटिका" },
    ],
  },
  {
    label: "Messages",
    href: "/messages",
    children: [
      { href: "/messages/founder", label: "Founder", hint: "संस्थापक" },
      { href: "/messages/co-founder", label: "Co-Founder", hint: "सह-संस्थापक" },
      { href: "/messages/vice-chairperson", label: "Vice-Chairperson", hint: "उपाध्यक्षा" },
      { href: "/messages/principal", label: "Principal", hint: "प्रधानाचार्य" },
      { href: "/messages/balvatika-coordinator", label: "Balvatika Coordinator", hint: "बालवाटिका समन्वयक" },
    ],
  },
  {
    label: "Academics",
    href: "/calendar",
    children: [
      { href: "/calendar", label: "Academic Calendar", hint: "Session 2027–28" },
      { href: "/examinations", label: "Examinations", hint: "परीक्षाएँ" },
      { href: "/holidays", label: "Holidays", hint: "अवकाश" },
      { href: "/activities", label: "Activities", hint: "सह-शैक्षिक गतिविधियाँ" },
      { href: "/fees", label: "Fee Structure", hint: "Session 2027–28" },
    ],
  },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact", label: "Contact" },
];
