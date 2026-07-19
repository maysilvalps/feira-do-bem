# Feira do Bem

A **Feira do Bem** é uma iniciativa digital com foco em sustentabilidade e combate ao desperdício de alimentos.
O projeto conecta a identidade visual das feiras livres tradicionais a uma interface moderna, limpa e totalmente responsiva, incentivando ações práticas alinhadas ao consumo consciente.

🔗 **Site publicado:** https://maysilvalps.github.io/feira-do-bem/

---

## Sobre o projeto

Site desenvolvido para conectar o excedente de frutas, legumes e verduras de uma distribuidora a moradores de uma comunidade, com cadastro simples (nome + WhatsApp) e um blog sobre doação, ODS e inclusão digital.

Feito com **Jekyll** (gerador de sites estáticos), **HTML5 + CSS3 + JavaScript puro** no front-end — sem frameworks de JS, sem build de assets.

---

## Tecnologias utilizadas

* **Jekyll 4** — geração do site estático, posts do blog como coleção (`_posts`), layouts reutilizáveis.
* **HTML5** — estruturação semântica das páginas.
* **CSS3** — estilização personalizada baseada em variáveis de cor (conceito papel kraft/carimbo), design responsivo e adaptações para dispositivos móveis.
* **JavaScript (ES6)** — menu responsivo, formulário de cadastro, contador de visitas, livro de visitas, paginação do blog, acordeão da sidebar no celular, header que fica transparente ao rolar.
* **GitHub Actions** — build e deploy automáticos a cada `push` (não usa mais o build automático "nativo" do GitHub Pages, porque ele tem uma lista restrita de plugins — o build customizado permite mais liberdade).

---

## Estrutura do projeto

```
feira-do-bem/
├── .github/
│   └── workflows/
│       └── jekyll.yml       → workflow do GitHub Actions (build + deploy)
├── _layouts/
│   └── postlayout.html      → layout usado por cada post individual do blog
├── _posts/
│   └── AAAA-MM-DD-titulo.md → cada postagem do blog (ver seção "Como adicionar um post")
├── css/
│   └── style.css            → identidade visual unificada
├── js/
│   └── script.js            → menu, formulário, WhatsApp, contador, paginação, animações
├── images/                  → imagens do projeto (ícone, banners, fotos dos posts)
├── index.html               → página inicial (hero, sobre, como funciona, ODS, cadastro, prévia do blog)
├── ods.html                 → página dedicada aos ODS (aberta separadamente no celular)
├── blog.md                  → página do blog (lista os posts com paginação)
├── _config.yml              → configuração do Jekyll (título, url, permalinks)
├── Gemfile / Gemfile.lock    → dependências Ruby do projeto
└── README.md                → este arquivo
```

---

## Como rodar localmente

Precisa ter **Ruby** e **Bundler** instalados.

1. Abra a pasta `feira-do-bem` no terminal.
2. Instale as dependências:
   ```
   bundle install
   ```
3. Suba o servidor local:
   ```
   bundle exec jekyll serve
   ```
4. Acesse `http://127.0.0.1:4000/feira-do-bem/` no navegador. O Jekyll reconstrói o site automaticamente a cada arquivo salvo (exceto o `_config.yml` — mudanças nele exigem reiniciar o `jekyll serve`).

> Dica: se alguma mudança não aparecer, apague a pasta `_site` (`Remove-Item -Recurse -Force _site` no PowerShell) e rode `bundle exec jekyll serve` de novo.

---

## Como publicar (deploy)

O deploy é automático: qualquer `git push` na branch `main` dispara o workflow do GitHub Actions (`.github/workflows/jekyll.yml`), que builda o site com Jekyll e publica no GitHub Pages.

```
git add .
git commit -m "sua mensagem"
git push origin main
```

Acompanhe o progresso na aba **Actions** do repositório. Depois de uns minutos, o site atualizado aparece em `https://maysilvalps.github.io/feira-do-bem/`.

---

## Como adicionar um post novo no blog

1. Crie um arquivo em `_posts/` com o nome no formato `AAAA-MM-DD-titulo-curto.md` (a data no nome do arquivo é o que define a ordem do post).
2. Comece o arquivo com este front matter:
   ```yaml
   ---
   layout: postlayout
   title: "Título da postagem"
   date: 2026-07-20
   category: Dicas
   ---
   ```
3. Escreva o conteúdo em Markdown normalmente depois do front matter.

O post aparece automaticamente na lista do blog (mais recente primeiro) e no widget "Postagens" da barra lateral — não precisa editar nenhum outro arquivo.

### Sobre a paginação do blog

O blog mostra **4 posts por página**, com botões "← Mais recentes" / "Postagens mais antigas →" que aparecem sozinhos quando há mais de uma página. Isso é automático: com 30 posts, viram 8 páginas sem precisar mexer em nada.

Se um dia quiser mudar quantos posts aparecem por página, o número fica em `blog.md`, nessa linha (o `4` é o único número que importa):
```
data-pagina="{{ forloop.index0 | divided_by: 4 | plus: 1 }}"
```

---

## Ajustes importantes (WhatsApp)

O que muda com mais frequência está no topo do arquivo `js/script.js`, dentro do objeto `CONFIG`:

```js
const CONFIG = {
  whatsappNumber: "5566999999999", // WhatsApp 
  mensagemPadrao: (nome, bairro) => `...`, // texto enviado automaticamente ao se cadastrar
  mensagemDoador: () => `...`, // texto enviado quando um comércio quer doar
};
```

Número de WhatsApp: formato `55` (Brasil) + DDD + número, só dígitos. O rodapé do site é gerado automaticamente a partir desse número.

---

## Como funciona o cadastro

Este é um site estático — não há servidor nem banco de dados. O cadastro funciona assim:

1. Pessoa preenche nome e WhatsApp no formulário.
2. Os dados ficam salvos no navegador dela (`localStorage`).
3. Abre automaticamente uma conversa no WhatsApp com mensagem pronta para a distribuidora.

Se quiser guardar os cadastros de forma definitiva (em vez de só no navegador de quem preencheu), dá pra conectar o formulário a um back-end ou serviço externo (ex.: Google Forms, Firebase).

---

## Personalização visual

As cores, fontes e espaçamentos ficam centralizados em `css/style.css`, dentro de `:root`:

```css
:root {
  --paper: #F5EFDC;
  --moss: #263424;
  --tomato: #C7391F;
  --leaf: #4C7A3F;
  --corn: #E8A93C;
}
```

---

## Recursos do blog

* **Contador de visitas** — soma visitas no navegador (`localStorage`), efeito retrô.
* **Livro de visitas** — mensagens também ficam salvas no `localStorage`, visíveis só para quem escreveu naquele navegador.
* **Widgets colapsáveis no celular** — na barra lateral do blog, cada widget vira um acordeão (clica no título pra abrir/fechar) em telas estreitas; no computador ficam sempre abertos.
* **Header dinâmico** — o menu do topo fica mais transparente conforme a página é rolada.

---

## Contato e reconhecimento

Feira do Bem — feito para não deixar comida boa virar lixo.
© 2026 desenvolvido por Mayara Silva.