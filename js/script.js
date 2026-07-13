/* =====================================================
   FEIRA DO BEM — script.js
   =====================================================
   Tudo em JavaScript puro, sem dependências externas.
   ===================================================== */

// -----------------------------------------------------
// CONFIGURAÇÃO — edite aqui os dados do seu projeto
// -----------------------------------------------------
const CONFIG = {
  // Número de WhatsApp da distribuidora/organização, no formato internacional,
  // só dígitos (código do país + DDD + número). Exemplo para Brasil, DDD 66:
  whatsappNumber: "5566999999999",

  // Mensagem enviada automaticamente ao WhatsApp quando alguém se cadastra
  // para RECEBER doações.
  mensagemPadrao: (nome, bairro) =>
    `Olá! Meu nome é ${nome}${bairro ? `, moro no bairro ${bairro}` : ""} ` +
    `e quero entrar na lista da Feira do Bem para receber avisos de doação de frutas, legumes e verduras.`,

  // Mensagem enviada quando um empresário clica para se tornar DOADOR.
  mensagemDoador: () =>
    `Olá! Tenho um comércio e gostaria de saber como parceirar com a Feira do Bem ` +
    `para doar o excedente de alimentos.`,
};

document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initFormCadastro();
  initScrollReveal();
  initFooterWhats();
  initHitCounter();
  initGuestbook();
  initLinkDoador();
});

// -----------------------------------------------------
// MENU MOBILE
// -----------------------------------------------------
function initMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");
  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const aberto = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!aberto));
    menu.classList.toggle("is-open", !aberto);
  });

  // Fecha o menu ao clicar em um link (mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      menu.classList.remove("is-open");
    });
  });
}

// -----------------------------------------------------
// FORMULÁRIO DE CADASTRO
// -----------------------------------------------------
function initFormCadastro() {
  const form = document.getElementById("formCadastro");
  if (!form) return;

  const nomeInput = document.getElementById("nome");
  const whatsInput = document.getElementById("whatsapp");
  const bairroInput = document.getElementById("bairro");
  const erroNome = document.getElementById("erroNome");
  const erroWhats = document.getElementById("erroWhatsapp");
  const sucesso = document.getElementById("formSucesso");
  const sucessoNome = document.getElementById("sucessoNome");
  const linkWhats = document.getElementById("linkWhats");

  // Máscara simples de telefone: (99) 99999-9999
  whatsInput.addEventListener("input", () => {
    let digitos = whatsInput.value.replace(/\D/g, "").slice(0, 11);
    if (digitos.length > 6) {
      digitos = digitos.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
    } else if (digitos.length > 2) {
      digitos = digitos.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else if (digitos.length > 0) {
      digitos = digitos.replace(/(\d{0,2})/, "($1");
    }
    whatsInput.value = digitos.trim();
  });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = nomeInput.value.trim();
    const whatsDigitos = whatsInput.value.replace(/\D/g, "");
    const bairro = bairroInput.value.trim();

    let valido = true;

    if (nome.length < 2) {
      erroNome.textContent = "Digite seu nome completo.";
      nomeInput.classList.add("invalido");
      valido = false;
    } else {
      erroNome.textContent = "";
      nomeInput.classList.remove("invalido");
    }

    if (whatsDigitos.length < 10) {
      erroWhats.textContent = "Digite um WhatsApp válido, com DDD.";
      whatsInput.classList.add("invalido");
      valido = false;
    } else {
      erroWhats.textContent = "";
      whatsInput.classList.remove("invalido");
    }

    if (!valido) return;

    // Salva localmente (útil para o professor conferir os cadastros de teste
    // e como ponto de partida caso você conecte um back-end depois).
    salvarCadastroLocal({ nome, whatsapp: whatsDigitos, bairro, data: new Date().toISOString() });

    // Monta o link do WhatsApp com a mensagem pronta
    const mensagem = encodeURIComponent(CONFIG.mensagemPadrao(nome, bairro));
    const url = `https://wa.me/${CONFIG.whatsappNumber}?text=${mensagem}`;

    linkWhats.href = url;
    sucessoNome.textContent = `Valeu, ${nome}! Cadastro recebido.`;
    sucesso.hidden = false;
    sucesso.scrollIntoView({ behavior: "smooth", block: "center" });

    // Abre o WhatsApp automaticamente numa nova aba
    window.open(url, "_blank", "noopener");

    form.reset();
  });
}

function salvarCadastroLocal(cadastro) {
  try {
    const lista = JSON.parse(localStorage.getItem("feiraDoBemCadastros") || "[]");
    lista.push(cadastro);
    localStorage.setItem("feiraDoBemCadastros", JSON.stringify(lista));
  } catch (erro) {
    console.warn("Não foi possível salvar o cadastro localmente:", erro);
  }
}

// -----------------------------------------------------
// CONTADOR DE VISITAS (efeito "hit counter" retrô)
// Só existe na página do blog — some sozinho se não achar os elementos.
// -----------------------------------------------------
function initHitCounter() {
  const container = document.getElementById("hitcounter");
  if (!container) return;

  const digitos = container.querySelectorAll(".digito");

  let contador = 0;
  try {
    contador = parseInt(localStorage.getItem("feiraDoBemVisitas") || "0", 10);
    contador += 1;
    localStorage.setItem("feiraDoBemVisitas", String(contador));
  } catch (erro) {
    contador = 1;
  }

  const texto = String(contador).padStart(digitos.length, "0").slice(-digitos.length);
  digitos.forEach((digito, i) => {
    digito.textContent = texto[i];
  });
}

// -----------------------------------------------------
// LIVRO DE VISITAS (guestbook) — só existe na página do blog
// -----------------------------------------------------
function initGuestbook() {
  const form = document.getElementById("formLivroVisitas");
  const lista = document.getElementById("livroLista");
  const vazio = document.getElementById("livroVazio");
  if (!form || !lista) return;

  function carregarRecados() {
    try {
      return JSON.parse(localStorage.getItem("feiraDoBemLivroVisitas") || "[]");
    } catch (erro) {
      return [];
    }
  }

  function salvarRecados(recados) {
    try {
      localStorage.setItem("feiraDoBemLivroVisitas", JSON.stringify(recados));
    } catch (erro) {
      console.warn("Não foi possível salvar o recado localmente:", erro);
    }
  }

  function formatarData(iso) {
    const data = new Date(iso);
    return data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function desenhar() {
    const recados = carregarRecados();
    lista.innerHTML = "";

    if (recados.length === 0) {
      vazio.hidden = false;
      return;
    }
    vazio.hidden = true;

    recados
      .slice()
      .reverse()
      .forEach((recado) => {
        const item = document.createElement("li");
        item.className = "guestbook-entry";
        item.innerHTML = `
          <span class="nome">${escapeHtml(recado.nome)}</span>
          <span class="data">${formatarData(recado.data)}</span>
          <p>${escapeHtml(recado.mensagem)}</p>
        `;
        lista.appendChild(item);
      });
  }

  function escapeHtml(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
  }

  form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    const nome = document.getElementById("livroNome").value.trim();
    const mensagem = document.getElementById("livroMensagem").value.trim();
    if (!nome || !mensagem) return;

    const recados = carregarRecados();
    recados.push({ nome, mensagem, data: new Date().toISOString() });
    salvarRecados(recados);
    form.reset();
    desenhar();
  });

  desenhar();
}

// -----------------------------------------------------
// REVELAÇÃO SUAVE AO ROLAR A PÁGINA
// -----------------------------------------------------
function initScrollReveal() {
  const alvos = document.querySelectorAll(
    ".passo-card, .ods-stamp, .teaser-card, .stamp-card, .sobre-texto, .post-retro, .widget, .historia-texto, .historia-quote, .banner-doadores-inner"
  );

  alvos.forEach((el) => el.setAttribute("data-reveal", ""));

  if (!("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  alvos.forEach((el) => observer.observe(el));
}

// -----------------------------------------------------
// NÚMERO DE WHATSAPP NO RODAPÉ (mantém tudo em um só lugar: CONFIG)
// -----------------------------------------------------
function initFooterWhats() {
  const span = document.getElementById("footerWhats");
  if (!span) return;
  const digitos = CONFIG.whatsappNumber;
  if (digitos.length >= 13) {
    const ddd = digitos.slice(2, 4);
    const parte1 = digitos.slice(4, 9);
    const parte2 = digitos.slice(9);
    span.textContent = `(${ddd}) ${parte1}-${parte2}`;
  }
}

// -----------------------------------------------------
// LINK DE WHATSAPP PARA EMPRESÁRIOS QUE QUEREM DOAR
// -----------------------------------------------------
function initLinkDoador() {
  const link = document.getElementById("linkDoador");
  if (!link) return;

  const mensagem = encodeURIComponent(CONFIG.mensagemDoador());
  link.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${mensagem}`;
  link.target = "_blank";
  link.rel = "noopener";
}