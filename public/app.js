const copy = {
  ru: {
    eyebrow: "ЗАКРЫТЫЙ ПОКЕРНЫЙ КЛУБ",
    heading: "Играете в покер?",
    invite: "Присоединяйтесь к нам.",
    description: "Выбирайте формат игры и комфортный лимит",
    cta: "Присоединиться к клубу",
    caption: "Откроется Telegram-бот",
    title: "SHIVA POKER — закрытый покерный клуб",
    descriptionMeta: "Выбирайте формат игры и комфортный лимит. SHIVA POKER.",
  },
  uk: {
    eyebrow: "ЗАКРИТИЙ ПОКЕРНИЙ КЛУБ",
    heading: "Граєте в покер?",
    invite: "Приєднуйтеся до нас.",
    description: "Обирайте формат гри та комфортний ліміт",
    cta: "Приєднатися до клубу",
    caption: "Відкриється Telegram-бот",
    title: "SHIVA POKER — закритий покерний клуб",
    descriptionMeta: "Обирайте формат гри та комфортний ліміт. SHIVA POKER.",
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
