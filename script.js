const fontes = [
  {
    id: "Inter",
    nome: "Moderna (Inter)",
    cssFamily: "'Inter', sans-serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Montserrat",
    nome: "Geometric (Montserrat)",
    cssFamily: "'Montserrat', sans-serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Bebas",
    nome: "Condensada (Bebas)",
    cssFamily: "'Bebas Neue', sans-serif",
    offsetY: 4,
    canvasOffsetY: 0.05,
  },
  {
    id: "Playfair",
    nome: "Elegante (Playfair)",
    cssFamily: "'Playfair Display', serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Cinzel",
    nome: "Clássica (Cinzel)",
    cssFamily: "'Cinzel', serif",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Fira",
    nome: "Monospace (Fira)",
    cssFamily: "'Fira Code', monospace",
    offsetY: 0,
    canvasOffsetY: 0,
  },
  {
    id: "Pacifico",
    nome: "Cursiva (Pacifico)",
    cssFamily: "'Pacifico', cursive",
    offsetY: -4,
    canvasOffsetY: -0.04,
  },
  {
    id: "Marker",
    nome: "Estilizada (Marker)",
    cssFamily: "'Permanent Marker', cursive",
    offsetY: 0,
    canvasOffsetY: 0,
  },
];

let estadoAvatar = {
  texto: "A",
  corFundo: "#fff",
  corLetra: "#000",
  fonteObj: fontes[0],
  tamanhoLetra: 16,
  nsfwAtivo: false,
  nsfwTexto: "NSFW",
  nsfwCor: "#ff3399",
  nsfwPosicao: "bottom-right",
  nsfwTamanho: 20,
};

function inicializarFontes() {
  const container = document.getElementById("font-options");
  container.innerHTML = "";
  fontes.forEach((f) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `font-btn ${f.cssFamily === estadoAvatar.fonteObj.cssFamily ? "active" : ""}`;
    btn.innerHTML = `<span style="font-family: ${f.cssFamily}">${f.nome.split(" ")[0]}</span>`;
    btn.onclick = () => alterarFonte(f, btn);
    container.appendChild(btn);
  });
}

function atualizarTexto(valor) {
  estadoAvatar.texto = valor || "A";
  document.getElementById("avatar-text").innerText = estadoAvatar.texto;
}

function atualizarNsfwAtivo(ativo) {
  estadoAvatar.nsfwAtivo = ativo;
  const opcs = document.getElementById("nsfw-opcoes");
  const tagEl = document.getElementById("avatar-nsfw-tag");
  if (ativo) {
    opcs.classList.remove("hidden");
    tagEl.classList.remove("hidden");
  } else {
    opcs.classList.add("hidden");
    tagEl.classList.add("hidden");
  }
}

function atualizarNsfwTexto(valor) {
  estadoAvatar.nsfwTexto = valor || "NSFW";
  document.getElementById("avatar-nsfw-tag").innerText = estadoAvatar.nsfwTexto;
}

function atualizarNsfwCor(hex) {
  estadoAvatar.nsfwCor = hex;
  document.getElementById("input-nsfw-cor").value = hex;
  document.getElementById("texto-nsfw-cor").value = hex;
  document.getElementById("avatar-nsfw-tag").style.color = hex;
}

function atualizarNsfwTamanho(val) {
  estadoAvatar.nsfwTamanho = parseInt(val);
  document.getElementById("nsfw-tamanho-valor").innerText = val + "px";
  document.getElementById("avatar-nsfw-tag").style.fontSize = val + "px";
}

function atualizarNsfwPosicao(pos) {
  estadoAvatar.nsfwPosicao = pos;
  const tagEl = document.getElementById("avatar-nsfw-tag");
  tagEl.className = "avatar-nsfw-tag";
  if (!estadoAvatar.nsfwAtivo) {
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

function atualizarCorFundo(hex) {
  estadoAvatar.corFundo = hex;
  document.getElementById("input-cor-fundo").value = hex;
  document.getElementById("texto-cor-fundo").value = hex;
  document.getElementById("avatar-container").style.backgroundColor = hex;
  atualizarGlow(hex);
}

function atualizarCorLetra(hex) {
  estadoAvatar.corLetra = hex;
  document.getElementById("input-cor-letra").value = hex;
  document.getElementById("texto-cor-letra").value = hex;
  document.getElementById("avatar-text").style.color = hex;
}

function alterarFonte(fonteObj, botaoEl) {
  estadoAvatar.fonteObj = fonteObj;
  const txtEl = document.getElementById("avatar-text");
  txtEl.style.fontFamily = fonteObj.cssFamily;
  txtEl.style.transform = `translateY(${fonteObj.offsetY}px)`;

  const botoes = document.getElementById("font-options").children;
  for (let b of botoes) {
    b.classList.remove("active");
  }
  botaoEl.classList.add("active");
}

function atualizarTamanho(val, vindoDoInput) {
  let num = parseFloat(val);
  if (isNaN(num) || num <= 0) num = 1;

  estadoAvatar.tamanhoLetra = num;
  document.getElementById("avatar-text").style.fontSize = num + "rem";

  if (vindoDoInput) {
    document.getElementById("input-tamanho").value = num;
  } else {
    document.getElementById("input-tamanho-num").value = num;
  }
}

function atualizarGlow(hex) {
  const glow = document.getElementById("preview-glow");
  glow.style.background = `linear-gradient(90deg, ${hex}, #4f46e5)`;
}

function gerarCorAleatoriaFundo() {
  const letrasHex = "0123456789ABCDEF";
  let cor = "#";
  for (let i = 0; i < 6; i++) {
    cor += letrasHex[Math.floor(Math.random() * 16)];
  }
  atualizarCorFundo(cor);
}

function gerarCorAleatoriaLetra() {
  const letrasHex = "0123456789ABCDEF";
  let cor = "#";
  for (let i = 0; i < 6; i++) {
    cor += letrasHex[Math.floor(Math.random() * 16)];
  }
  atualizarCorLetra(cor);
  mostrarToast("Cor da letra aleatória gerada!", "fa-dice");
}

function escolherFonteAleatoria() {
  const indiceAleatorio = Math.floor(Math.random() * fontes.length);
  const fonteEscolhida = fontes[indiceAleatorio];

  const container = document.getElementById("font-options");
  const botoes = container.children;
  for (let i = 0; i < botoes.length; i++) {
    if (fontes[i].cssFamily === fonteEscolhida.cssFamily) {
      alterarFonte(fonteEscolhida, botoes[i]);
      break;
    }
  }
  mostrarToast(
    `Fonte alterada para: ${fonteEscolhida.nome.split(" ")[0]}`,
    "fa-font",
  );
}

function resetarPadroes() {
  atualizarTexto("A");
  gerarCorAleatoriaFundo();
  atualizarCorLetra("#000000");
  atualizarTamanho(16, false);
  document.getElementById("input-tamanho-num").value = 16;
  document.getElementById("input-nsfw-check").checked = false;
  atualizarNsfwAtivo(false);
  document.getElementById("input-nsfw-tamanho").value = 20;
  atualizarNsfwTamanho(20);
  atualizarNsfwCor("#ff3399");
  inicializarFontes();
  alterarFonte(fontes[0], document.getElementById("font-options").children[0]);
  mostrarToast("Configurações restauradas!", "fa-rotate-right");
}

function baixarAvatar() {
  const canvas = document.createElement("canvas");
  const tamanhoCanvas = 512;
  canvas.width = tamanhoCanvas;
  canvas.height = tamanhoCanvas;
  const ctx = canvas.getContext("2d");

  const raioBordaPx = 32;

  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, tamanhoCanvas, tamanhoCanvas, raioBordaPx);
  ctx.fillStyle = estadoAvatar.corFundo;
  ctx.fill();
  ctx.restore();

  let familyName = "Inter";
  if (estadoAvatar.fonteObj.cssFamily.includes("Playfair"))
    familyName = "Playfair Display";
  else if (estadoAvatar.fonteObj.cssFamily.includes("Fira"))
    familyName = "Fira Code";
  else if (estadoAvatar.fonteObj.cssFamily.includes("Montserrat"))
    familyName = "Montserrat";
  else if (estadoAvatar.fonteObj.cssFamily.includes("Bebas"))
    familyName = "Bebas Neue";
  else if (estadoAvatar.fonteObj.cssFamily.includes("Pacifico"))
    familyName = "Pacifico";
  else if (estadoAvatar.fonteObj.cssFamily.includes("Cinzel"))
    familyName = "Cinzel";
  else if (estadoAvatar.fonteObj.cssFamily.includes("Marker"))
    familyName = "Permanent Marker";

  const fontSizePx = (estadoAvatar.tamanhoLetra / 16) * 260;
  ctx.font = `900 ${fontSizePx}px "${familyName}", sans-serif`;
  ctx.fillStyle = estadoAvatar.corLetra;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const offsetYCanvas =
    (estadoAvatar.tamanhoLetra / 16) *
    (tamanhoCanvas * estadoAvatar.fonteObj.canvasOffsetY);
  ctx.fillText(
    estadoAvatar.texto,
    tamanhoCanvas / 2,
    tamanhoCanvas / 2 + offsetYCanvas + fontSizePx * 0.05,
  );

  if (estadoAvatar.nsfwAtivo) {
    const fontSizeNsfwPx = (estadoAvatar.nsfwTamanho / 20) * 36; // Proporção escalada com o novo padrão de 20px
    ctx.font = `700 ${fontSizeNsfwPx}px "Inter", sans-serif`;

    const paddingX = fontSizeNsfwPx * 0.6;
    const paddingY = fontSizeNsfwPx * 0.4;
    const metrics = ctx.measureText(estadoAvatar.nsfwTexto);
    const tagW = metrics.width + paddingX * 2;
    const tagH = fontSizeNsfwPx + paddingY * 1.5;
    const margin = 24;

    let tagX = margin;
    let tagY = margin;

    if (estadoAvatar.nsfwPosicao === "top-left") {
      tagX = margin;
      tagY = margin;
    } else if (estadoAvatar.nsfwPosicao === "top-right") {
      tagX = tamanhoCanvas - tagW - margin;
      tagY = margin;
    } else if (estadoAvatar.nsfwPosicao === "bottom-left") {
      tagX = margin;
      tagY = tamanhoCanvas - tagH - margin;
    } else if (estadoAvatar.nsfwPosicao === "bottom-right") {
      tagX = tamanhoCanvas - tagW - margin;
      tagY = tamanhoCanvas - tagH - margin;
    }

    ctx.save();
    ctx.beginPath();
    ctx.roundRect(tagX, tagY, tagW, tagH, 8);
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fill();
    ctx.restore();

    ctx.fillStyle = estadoAvatar.nsfwCor;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillText(estadoAvatar.nsfwTexto, tagX + paddingX, tagY + tagH / 2);
  }

  const link = document.createElement("a");
  link.download = `avatar-${estadoAvatar.texto.toLowerCase()}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();

  mostrarToast("Avatar baixado com sucesso em PNG!", "fa-circle-check");
}

function mostrarToast(mensagem, iconeClass = "fa-circle-check") {
  const toast = document.getElementById("toast");
  const msgEl = document.getElementById("toast-msg");
  const iconEl = document.getElementById("toast-icon");

  msgEl.innerText = mensagem;
  iconEl.className = `fa-solid ${iconeClass}`;

  toast.classList.remove("hidden");
  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

window.onload = () => {
  inicializarFontes();
  gerarCorAleatoriaFundo();
  atualizarCorLetra("#000000");
  atualizarTamanho(16, false);
  document.getElementById("input-tamanho-num").value = 16;
  document.getElementById("input-nsfw-check").checked = false;
  atualizarNsfwAtivo(false);
  atualizarNsfwPosicao("bottom-right");
  document.getElementById("input-nsfw-tamanho").value = 20;
  document.getElementById("nsfw-tamanho-valor").innerText = "20px";
  atualizarNsfwCor("#ff3399");
  document.getElementById("input-nsfw-cor").value = "#ff3399";
  document.getElementById("texto-nsfw-cor").value = "#FF3399";
  alterarFonte(fontes[0], document.getElementById("font-options").children[0]);
};
