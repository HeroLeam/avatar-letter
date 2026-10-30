const translations = {
  en: {
    subtitle: "Typography avatar creator",
    reset_btn: "Reset Defaults",
    download_btn: "Download High-Res PNG",
    panel_title: "Customization",
    label_text: "Avatar Text",
    hint_text: "Recommended: 1 to 3 chars",
    label_nsfw_toggle: "Show Corner Tag (e.g., NSFW)",
    label_nsfw_text: "Tag Text",
    label_nsfw_color: "Tag Color",
    label_nsfw_position: "Position",
    pos_top_left: "Top Left",
    pos_top_right: "Top Right",
    pos_bottom_left: "Bottom Left",
    pos_bottom_right: "Bottom Right",
    label_nsfw_size: "Tag Size",
    label_bg_color: "Background Color",
    label_text_color: "Text Color",
    btn_random: "Random",
    label_font_style: "Font Style",
    btn_random_font: "Random Font",
    label_font_size: "Font Size",
    footer_text: "Avatar Emby \u2022 Built for interactive web use",
    toast_saved: "Avatar saved successfully!",
    toast_rand_color: "Random text color generated!",
    toast_rand_font: "Font changed to: ",
    toast_reset: "Settings reset to default!",
  },
  pt: {
    subtitle: "Criador de avatares tipográficos",
    reset_btn: "Restaurar Padrão",
    download_btn: "Baixar PNG em Alta Resolução",
    panel_title: "Personalização",
    label_text: "Texto do Avatar",
    hint_text: "Recomendado: 1 a 3 caracteres",
    label_nsfw_toggle: "Exibir Tag no Canto (Ex: NSFW)",
    label_nsfw_text: "Texto da Tag",
    label_nsfw_color: "Cor da Tag",
    label_nsfw_position: "Posição",
    pos_top_left: "Superior Esquerdo",
    pos_top_right: "Superior Direito",
    pos_bottom_left: "Inferior Esquerdo",
    pos_bottom_right: "Inferior Direito",
    label_nsfw_size: "Tamanho da Tag",
    label_bg_color: "Cor de Fundo",
    label_text_color: "Cor da Letra",
    btn_random: "Aleatória",
    label_font_style: "Estilo da Fonte",
    btn_random_font: "Fonte Aleatória",
    label_font_size: "Tamanho da Fonte",
    footer_text: "Avatar Emby \u2022 Desenvolvido para uso web interativo",
    toast_saved: "Avatar salvo com sucesso!",
    toast_rand_color: "Cor da letra aleatória gerada!",
    toast_rand_font: "Fonte alterada para: ",
    toast_reset: "Configurações restauradas!",
  },
};

// Detect browser language
const userLang = navigator.language || navigator.userLanguage;
const currentLang = userLang.toLowerCase().startsWith("pt") ? "pt" : "en";

function translatePage() {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[currentLang] && translations[currentLang][key]) {
      el.innerText = translations[currentLang][key];
    }
  });
}
