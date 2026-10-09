const copy = {
  ru: {
    eyebrow: "ЗАКРЫТЫЙ ПОКЕРНЫЙ КЛУБ",
    heading: "Играете в покер?",
    invite: "Присоединяйтесь к нам.",
    perk1: "Оплата так, как удобно — криптовалюта или карта",
    perk2: "Мгновенное пополнение и вывод средств",
    perk3: "Турниры, джекпоты и розыгрыши для участников",
    cta: "Присоединиться к клубу",
    caption: "Откроется Telegram-бот",
    title: "SHIVA POKER — закрытый покерный клуб",
    descriptionMeta: "Оплата криптовалютой или картой, мгновенные выплаты, турниры и джекпоты. SHIVA POKER.",
  },
  uk: {
    eyebrow: "ЗАКРИТИЙ ПОКЕРНИЙ КЛУБ",
    heading: "Граєте в покер?",
    invite: "Приєднуйтеся до нас.",
    perk1: "Оплата так, як зручно — криптовалюта або картка",
    perk2: "Миттєве поповнення та виведення коштів",
    perk3: "Турніри, джекпоти та розіграші для учасників",
    cta: "Приєднатися до клубу",
    caption: "Відкриється Telegram-бот",
    title: "SHIVA POKER — закритий покерний клуб",
    descriptionMeta: "Оплата криптовалютою або карткою, миттєві виплати, турніри та джекпоти. SHIVA POKER.",
  },
};

const STORAGE_KEY = "shiva.locale";
const LEGACY_KEY = "shiva-language";

function readStoredLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_KEY);
    if (stored === "uk" || stored === "ua") return "uk";
    if (stored === "ru") return "ru";
  } catch {}
  return (navigator.language || "").toLowerCase().startsWith("uk") ? "uk" : "ru";
}

function persistLanguage(language) {
  try {
    localStorage.setItem(STORAGE_KEY, language);
  } catch {}
}

function applyLanguage(language) {
  const selected = language === "uk" || language === "ua" ? "uk" : "ru";
  const strings = copy[selected];
  document.documentElement.lang = selected;
  document.title = strings.title;
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) descriptionTag.setAttribute("content", strings.descriptionMeta);
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", strings.descriptionMeta);
  document.querySelectorAll("[data-copy]").forEach((element) => {
    element.textContent = strings[element.dataset.copy];
  });
  document.querySelectorAll("[data-lang]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.lang === selected));
  });
}

applyLanguage(readStoredLanguage());

document.querySelectorAll("[data-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    applyLanguage(button.dataset.lang);
    persistLanguage(button.dataset.lang === "ua" ? "uk" : button.dataset.lang);
  });
});
