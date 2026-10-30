const fonts = [
  {
    id: "Inter",
    name: "Moderna (Inter)",
    cssFamily: "'Inter', sans-serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Montserrat",
    name: "Geometric (Montserrat)",
    cssFamily: "'Montserrat', sans-serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Bebas",
    name: "Condensada (Bebas)",
    cssFamily: "'Bebas Neue', sans-serif",
    offsetY: 4,
    canvasOffsetY: 0.05,
  },
  {
    id: "Playfair",
    name: "Elegante (Playfair)",
    cssFamily: "'Playfair Display', serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Cinzel",
    name: "Clássica (Cinzel)",
    cssFamily: "'Cinzel', serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Fira",
    name: "Monospace (Fira)",
    cssFamily: "'Fira Code', monospace",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Pacifico",
    name: "Cursiva (Pacifico)",
    cssFamily: "'Pacifico', cursive",
    offsetY: -4,
    canvasOffsetY: -0.04,
  },
  {
    id: "Marker",
    name: "Estilizada (Marker)",
    cssFamily: "'Permanent Marker', cursive",
    offsetY: 0,
    canvasOffsetY: 0,
  },
];

let avatarState = {
  text: "A",
  bgColor: "#fff",
  textColor: "#000",
  fontObj: fonts[0],
  fontSize: 16,
  nsfwActive: false,
  nsfwText: "NSFW",
  nsfwColor: "#ff3399",
  nsfwPosition: "bottom-right",
  nsfwSize: 20,
};

function initializeFonts() {
  const container = document.getElementById("font-options");
  container.innerHTML = "";
  fonts.forEach((f) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `font-btn ${f.cssFamily === avatarState.fontObj.cssFamily ? "active" : ""}`;
    btn.innerHTML = `<span style="font-family: ${f.cssFamily}">${f.name.split(" ")[0]}</span>`;
    btn.onclick = () => changeFont(f, btn);
    container.appendChild(btn);
  });
}

function updateText(value) {
  avatarState.text = value || "A";
  document.getElementById("avatar-text").innerText = avatarState.text;
}

function updateNsfwActive(active) {
  avatarState.nsfwActive = active;
  const optionsEl = document.getElementById("nsfw-options");
  const tagEl = document.getElementById("avatar-nsfw-tag");
  if (active) {
    optionsEl.classList.remove("hidden");
    tagEl.classList.remove("hidden");
  } else {
    optionsEl.classList.add("hidden");
    tagEl.classList.add("hidden");
  }
}

function updateNsfwText(value) {
  avatarState.nsfwText = value || "NSFW";
  document.getElementById("avatar-nsfw-tag").innerText = avatarState.nsfwText;
}

function formatHex(value) {
  let clean = value.trim();
  if (clean.startsWith("#")) {
    clean = clean.substring(1);
  }
  if (clean.length === 3 || clean.length === 6) {
    return "#" + clean;
  }
  return null;
}

function updateNsfwColor(value, isFromTextInput = false) {
  let formattedHex = formatHex(value);
  if (!formattedHex) return;

  avatarState.nsfwColor = formattedHex;
  document.getElementById("input-nsfw-color").value = formattedHex;

  if (!isFromTextInput) {
    document.getElementById("text-nsfw-color").value =
      formattedHex.toUpperCase();
  }

  document.getElementById("avatar-nsfw-tag").style.color = formattedHex;
}

function updateNsfwSize(val) {
  avatarState.nsfwSize = parseInt(val);
  document.getElementById("nsfw-size-value").innerText = val + "px";
  document.getElementById("avatar-nsfw-tag").style.fontSize = val + "px";
}

function updateNsfwPosition(pos) {
  avatarState.nsfwPosition = pos;
  const tagEl = document.getElementById("avatar-nsfw-tag");
  tagEl.className = "avatar-nsfw-tag";
  if (!avatarState.nsfwActive) {
    tagEl.classList.add("hidden");
  }

  tagEl.style.top = "";
  tagEl.style.bottom = "";
  tagEl.style.left = "";
  tagEl.style.right = "";

  const margin = "12px";
  if (pos === "top-left") {
    tagEl.style.top = margin;
    tagEl.style.left = margin;
  } else if (pos === "top-right") {
    tagEl.style.top = margin;
    tagEl.style.right = margin;
  } else if (pos === "bottom-left") {
    tagEl.style.bottom = margin;
    tagEl.style.left = margin;
  } else {
    tagEl.style.bottom = margin;
    tagEl.style.right = margin;
  }
}

function updateBgColor(value, isFromTextInput = false) {
  let formattedHex = formatHex(value);
  if (!formattedHex) return;

  avatarState.bgColor = formattedHex;
  document.getElementById("input-bg-color").value = formattedHex;

  if (!isFromTextInput) {
    document.getElementById("text-bg-color").value = formattedHex.toUpperCase();
  }

  document.getElementById("avatar-container").style.backgroundColor =
    formattedHex;
  updateGlow(formattedHex);
}

function updateTextColor(value, isFromTextInput = false) {
  let formattedHex = formatHex(value);
  if (!formattedHex) return;

  avatarState.textColor = formattedHex;
  document.getElementById("input-text-color").value = formattedHex;

  if (!isFromTextInput) {
    document.getElementById("text-text-color").value =
      formattedHex.toUpperCase();
  }

  document.getElementById("avatar-text").style.color = formattedHex;
}

function changeFont(fontObj, buttonEl) {
  avatarState.fontObj = fontObj;
  const textEl = document.getElementById("avatar-text");
  textEl.style.fontFamily = fontObj.cssFamily;
  textEl.style.transform = `translateY(${fontObj.offsetY}px)`;

  const buttons = document.getElementById("font-options").children;
  for (let b of buttons) {
    b.classList.remove("active");
  }
  buttonEl.classList.add("active");
}

function updateFontSize(val, isFromInput) {
  let num = parseFloat(val);
  if (isNaN(num) || num <= 0) num = 1;

  avatarState.fontSize = num;
  document.getElementById("avatar-text").style.fontSize = num + "rem";

  if (isFromInput) {
    document.getElementById("input-size").value = num;
  } else {
    document.getElementById("input-size-num").value = num;
  }
}

function updateGlow(hex) {
  const glow = document.getElementById("preview-glow");
  glow.style.background = `linear-gradient(90deg, ${hex}, #4f46e5)`;
}

function randomizeBgColor() {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  updateBgColor(color);
}

function randomizeTextColor() {
  const hexChars = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += hexChars[Math.floor(Math.random() * 16)];
  }
  updateTextColor(color);
  showToast(translations[currentLang].toast_rand_color, "fa-dice");
}

function randomizeFont() {
  const randomIndex = Math.floor(Math.random() * fonts.length);
  const chosenFont = fonts[randomIndex];

  const container = document.getElementById("font-options");
  const buttons = container.children;
  for (let i = 0; i < buttons.length; i++) {
    if (fonts[i].cssFamily === chosenFont.cssFamily) {
      changeFont(chosenFont, buttons[i]);
      break;
    }
  }
  showToast(
    translations[currentLang].toast_rand_font + chosenFont.name.split(" ")[0],
    "fa-font",
  );
}

function resetDefaults() {
  updateText("A");
  randomizeBgColor();
  updateTextColor("#000000");
  updateFontSize(16, false);
  document.getElementById("input-size-num").value = 16;
  document.getElementById("input-nsfw-check").checked = false;
  updateNsfwActive(false);
  updateNsfwPosition("bottom-right");
  document.getElementById("input-nsfw-size").value = 20;
  document.getElementById("nsfw-size-value").innerText = "20px";
  updateNsfwColor("#ff3399");
  document.getElementById("input-nsfw-color").value = "#ff3399";
  document.getElementById("text-nsfw-color").value = "FF3399";
  initializeFonts();
  changeFont(fonts[0], document.getElementById("font-options").children[0]);
  showToast(translations[currentLang].toast_reset, "fa-rotate-right");
}

function downloadAvatar() {
  const canvas = document.createElement("canvas");
  const canvasSize = 512;
  canvas.width = canvasSize;
  canvas.height = canvasSize;
  const ctx = canvas.getContext("2d");

  const borderRadiusPx = 32;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, canvasSize, canvasSize, borderRadiusPx);
  ctx.fillStyle = avatarState.bgColor;
  ctx.fill();
  ctx.restore();

  let familyName = "Inter";
  if (avatarState.fontObj.cssFamily.includes("Playfair"))
    familyName = "Playfair Display";
  else if (avatarState.fontObj.cssFamily.includes("Fira"))
    familyName = "Fira Code";
  else if (avatarState.fontObj.cssFamily.includes("Montserrat"))
    familyName = "Montserrat";
  else if (avatarState.fontObj.cssFamily.includes("Bebas"))
    familyName = "Bebas Neue";
  else if (avatarState.fontObj.cssFamily.includes("Pacifico"))
    familyName = "Pacifico";
  else if (avatarState.fontObj.cssFamily.includes("Cinzel"))
    familyName = "Cinzel";
  else if (avatarState.fontObj.cssFamily.includes("Marker"))
    familyName = "Permanent Marker";

  const fontSizePx = (avatarState.fontSize / 16) * 260;
  ctx.font = `900 ${fontSizePx}px "${familyName}", sans-serif`;
  ctx.fillStyle = avatarState.textColor;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const offsetYCanvas =
    (avatarState.fontSize / 16) *
    (canvasSize * avatarState.fontObj.canvasOffsetY);
  ctx.fillText(
    avatarState.text,
    canvasSize / 2,
    canvasSize / 2 + offsetYCanvas + fontSizePx * 0.05,
  );

  if (avatarState.nsfwActive) {
    const fontSizeNsfwPx = (avatarState.nsfwSize / 20) * 36;
    ctx.font = `700 ${fontSizeNsfwPx}px "Inter", sans-serif`;

    const paddingX = fontSizeNsfwPx * 0.6;
    const paddingY = fontSizeNsfwPx * 0.4;
    const metrics = ctx.measureText(avatarState.nsfwText);
    const tagW = metrics.width + paddingX * 2;
    const tagH = fontSizeNsfwPx + paddingY * 1.5;
    const margin = 24;

    let tagX = margin;
    let tagY = margin;

    if (avatarState.nsfwPosition === "top-left") {
      tagX = margin;
      tagY = margin;
    } else if (avatarState.nsfwPosition === "top-right") {
      tagX = canvasSize - tagW - margin;
      tagY = margin;
    } else if (avatarState.nsfwPosition === "bottom-left") {
      tagX = margin;
      tagY = canvasSize - tagH - margin;
    } else if (avatarState.nsfwPosition === "bottom-right") {
      tagX = canvasSize - tagW - margin;
      tagY = canvasSize - tagH - margin;
    }

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(tagX, tagY, tagW, tagH, 8);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = avatarState.nsfwColor;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(avatarState.nsfwText, tagX + paddingX, tagY + tagH / 2);
  }

  const link = document.createElement("a");
  link.download = `avatar-${avatarState.text.toLowerCase()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();

  showToast(translations[currentLang].toast_saved, "fa-circle-check");
}

function showToast(message, iconClass = "fa-circle-check") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  const iconEl = document.getElementById("toast-icon");

  msgEl.innerText = message;
  iconEl.className = `fa-solid ${iconClass}`;

  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
  translatePage(); // Traduz com base no i18n.js
  document
    .getElementById("text-bg-color")
    .addEventListener("input", (e) => updateBgColor(e.target.value, true));
  document
    .getElementById("text-text-color")
    .addEventListener("input", (e) => updateTextColor(e.target.value, true));
  document
    .getElementById("text-nsfw-color")
    .addEventListener("input", (e) => updateNsfwColor(e.target.value, true));
});

window.onload = () => {
  initializeFonts();
  randomizeBgColor();
  updateTextColor("#000000");
  updateFontSize(16, false);
  document.getElementById("input-size-num").value = 16;
  document.getElementById("input-nsfw-check").checked = false;
  updateNsfwActive(false);
  updateNsfwPosition("bottom-right");
  document.getElementById("input-nsfw-size").value = 20;
  document.getElementById("nsfw-size-value").innerText = "20px";
  updateNsfwColor("#ff3399");
  document.getElementById("input-nsfw-color").value = "#ff3399";
  document.getElementById("text-nsfw-color").value = "FF3399";
  changeFont(fonts[0], document.getElementById("font-options").children[0]);
};
