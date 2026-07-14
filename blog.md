layout: default
title: Diário da Feira do Bem
permalink: /blog.html
---
<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Diário da Feira do Bem — Blog</title>
  <meta name="description"
    content="Diário da Feira do Bem, em Rondonópolis (MT): entregas da semana, histórias de famílias da comunidade, dicas de conservação e os ODS por trás do projeto." />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link
    href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Caveat:wght@600;700&family=IBM+Plex+Mono:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet" />

  <link rel="stylesheet" href="css/style.css" />
</head>

<body>

  <a class="skip-link" href="#conteudo-blog">Pular para o conteúdo</a>

  <!-- ============ HEADER (mesmo menu do site, links ajustados) ============ -->
  <header class="site-header">
    <div class="wrap header-inner">
      <a href="index.html" class="logo" aria-label="Feira do Bem, página inicial">
        <span class="logo-mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" width="34" height="34" fill="none">
            <path d="M24 6c8 0 14 7 14 15 0 10-14 21-14 21S10 31 10 21C10 13 16 6 24 6Z" stroke="currentColor"
              stroke-width="2.5" stroke-linejoin="round" />
            <path d="M24 14v18M17 20c3 0 7 2 7 7M31 20c-3 0-7 2-7 7" stroke="currentColor" stroke-width="2.5"
              stroke-linecap="round" />
          </svg>
        </span>
        <span class="logo-text">Feira<em>do Bem</em></span>
      </a>

      <button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="navMenu">
        <span></span><span></span><span></span>
        <span class="sr-only">Abrir menu</span>
      </button>

      <nav class="nav" id="navMenu">
        <a href="index.html">Início</a>
        <a href="index.html#historia">Sobre</a>
        <a href="index.html#como-funciona">Como funciona</a>
        <a href="index.html#ods">Os ODS aqui</a>
        <a href="blog.html" aria-current="page">Blog</a>
        <a href="index.html#contato">Contato</a>
        <a href="index.html#cadastro" class="btn btn-small btn-leaf">Quero me cadastrar</a>
      </nav>
    </div>
  </header>

  <main id="conteudo-blog">

    <!-- ============ FAIXA DE ABERTURA COM LETREIRO ============ -->
    <section class="blog-hero-band">
      <div class="wrap">
        <p class="blog-hero-eyebrow">Diário da Feira do Bem</p>
        <h1 class="blog-hero-title">O caderno de bordo das entregas</h1>
        <p class="blog-hero-sub">
          Entregas da semana, histórias de quem doa e de quem recebe, dicas práticas
          e os ODS por trás de cada decisão do projeto.
        </p>
      </div>
      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">
          <span>🥕 excedente da semana já reservado</span>
          <span>🍅 nova entrega no bairro Jardim das Flores</span>
          <span>🌽 cadastre-se e receba o próximo aviso</span>
          <span>🥬 ODS 2 · fome zero em prática</span>
          <span>🥕 excedente da semana já reservado</span>
          <span>🍅 nova entrega no bairro Jardim das Flores</span>
          <span>🌽 cadastre-se e receba o próximo aviso</span>
          <span>🥬 ODS 2 · fome zero em prática</span>
        </div>
      </div>
    </section>

     <!-- ============ LAYOUT: POSTS + BARRA LATERAL ============ -->
    <div class="blog-layout">
      <div class="blog-posts">
        {% for post in site.posts %}
          <article class="post-retro" id="{{ post.slug | default: post.title | slugify }}">
            <div class="post-date-stamp">
              <span class="dia">{{ post.date | date: "%d" }}</span>
              <span class="mes-ano">{{ post.date | date: "%b %Y" | downcase }}</span>
            </div>
            <div>
              <span class="post-tag">{{ post.category | default: "Post" }}</span>
              <h2>{{ post.title }}</h2>
              <div class="post-body">
                {{ post.excerpt | markdownify }}
                <a href="{{ post.url }}">Leia mais</a>
              </div>
            </div>
          </article>
        {% endfor %}
      </div>

      <!-- ============ BARRA LATERAL COM WIDGETS ============ -->
      <aside class="blog-sidebar">

        <div class="widget">
          <p class="widget-title">Sobre este diário</p>
          <div class="widget-body">
            <p>Aqui a gente registra as entregas da semana, histórias de quem doa e de
              quem recebe, e dicas para aproveitar melhor cada doação.</p>
            <p>Um projeto de extensão universitária — Tecnologia Aplicada à Inclusão Digital.</p>
          </div>
        </div>

        <div class="widget">
          <p class="widget-title">Contador de visitas</p>
          <div class="widget-body">
            <div class="hitcounter" id="hitcounter" aria-hidden="true">
              <span class="digito">0</span><span class="digito">0</span><span class="digito">0</span>
              <span class="digito">0</span><span class="digito">0</span><span class="digito">1</span>
            </div>
            <p class="hitcounter-legenda">visitas neste navegador desde que a página foi criada</p>
          </div>
        </div>

        <div class="widget">
          <p class="widget-title">Últimas entregas</p>
          <div class="widget-body">
            <ul class="widget-lista">
              <li>06/jul — Jardim das Flores, 4 caixas</li>
              <li>29/jun — Vila Progresso, 3 caixas</li>
              <li>22/jun — Centro, 5 caixas</li>
              <li>15/jun — Bairro São José, 2 caixas</li>
            </ul>
          </div>
        </div>

        <div class="widget">
          <p class="widget-title">Livro de visitas</p>
          <div class="widget-body">
            <form class="guestbook-form" id="formLivroVisitas">
              <input type="text" id="livroNome" placeholder="Seu nome" required maxlength="40" />
              <textarea id="livroMensagem" placeholder="Deixe um recado, uma história ou um agradecimento…" required maxlength="240"></textarea>
              <button type="submit" class="btn btn-tomato btn-small">Assinar</button>
            </form>
            <ul class="guestbook-lista" id="livroLista">
              <!-- preenchido via JavaScript a partir do localStorage -->
            </ul>
            <p class="guestbook-vazio" id="livroVazio" hidden>Seja a primeira pessoa a deixar um recado.</p>
          </div>
        </div>

      </aside>
    </div>

    <div class="blog-back">
      <a href="index.html" class="btn btn-outline-dark">← Voltar para o início</a>
    </div>

  </main>

  <!-- ============ FOOTER ============ -->
  <footer class="site-footer">
    <div class="wrap footer-inner">
      <div class="footer-col">
        <span class="logo-text logo-text--footer">Feira<em>do Bem</em></span>
        <p>Um projeto de extensão universitária conectando excedente de hortifrúti a
          quem precisa, com tecnologia simples e contato direto pelo WhatsApp.</p>
      </div>
      <div class="footer-col">
        <h4>Contato</h4>
        <p>WhatsApp: <span id="footerWhats">(66) 99986-5305</span></p>
        <p>Rondonópolis, MT</p>
        <p>Atendimento de segunda a sábado</p>
      </div>
      <div class="footer-col">
        <h4>Sobre o projeto</h4>
        <p>Atividade Extensionista — Tecnologia Aplicada à Inclusão Digital.</p>
      </div>
    </div>
    <div class="wrap footer-bottom">
      <p>Feira do Bem — feito para não deixar comida boa virar lixo.</p>
      <p style="margin-top: 8px;">&copy; 2026 desenvolvido por Mayara Silva.</p>
    </div>
  </footer>

  <script src="js/script.js"></script>
</body>

</html>