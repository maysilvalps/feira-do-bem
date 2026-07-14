# Feira do Bem

Site desenvolvido para conectar o excedente de frutas, legumes e verduras de uma
distribuidora a moradores de uma comunidade, com cadastro simples (nome + WhatsApp)
e um blog sobre doação, ODS e inclusão digital.

Feito em **HTML5 + CSS3 + JavaScript puro** — sem frameworks, sem build, sem instalação.

## Como abrir no VS Code

1. Abra a pasta `feira-do-bem` no VS Code.
2. Instale a extensão **Live Server** (se ainda não tiver).
3. Clique com o botão direito em `index.html` → **Open with Live Server**.
4. O site abre no navegador e atualiza sozinho a cada alteração salva.

## Estrutura de arquivos

```
feira-do-bem/
├── index.html         → página inicial (hero, sobre, como funciona, ODS, cadastro, prévia do blog)
├── blog.html          → página do blog, em página própria (diário de entregas, ODS, dicas, livro de visitas)
├── css/
│   └── style.css      → toda a identidade visual, incluindo o estilo "retrô" da página de blog
├── js/
│   └── script.js       → menu, formulário, WhatsApp, contador de visitas, livro de visitas, animações
└── README.md
```

## O que ajustar antes de publicar

Tudo que muda com frequência está concentrado no topo do arquivo `js/script.js`,
dentro do objeto `CONFIG`:

```js
const CONFIG = {
  whatsappNumber: "5566999999999", // troque pelo WhatsApp real da distribuidora
  mensagemPadrao: (nome, bairro) => `...`, // texto enviado automaticamente
};
```

- **Número de WhatsApp**: use o formato `55` (Brasil) + DDD + número, só dígitos.
- O rodapé do site (`(66) 99999-9999`) é gerado automaticamente a partir desse número.

## Como funciona o cadastro (sem back-end)

Este é um site estático — não há servidor nem banco de dados. Por isso, o
formulário de cadastro funciona assim:

1. A pessoa preenche nome e WhatsApp.
2. Os dados ficam salvos no navegador dela (`localStorage`), o que é útil só
   para você conferir localmente durante o desenvolvimento/apresentação —
   abra o Console do navegador (F12) e digite:
   ```js
   JSON.parse(localStorage.getItem("feiraDoBemCadastros"))
   ```
3. Ao mesmo tempo, abre uma conversa de WhatsApp já com a mensagem escrita,
   direcionada ao número configurado em `CONFIG.whatsappNumber` — é assim que
   o cadastro "chega" de verdade à distribuidora.

**Se depois você quiser guardar os cadastros de forma definitiva** (para todo
mundo, não só no navegador de quem preencheu), o próximo passo seria conectar
o formulário a um serviço como Google Forms, Firebase ou um back-end simples.
O código já está organizado para isso: é só trocar a função
`salvarCadastroLocal()` em `script.js` por uma chamada a essa API.

## Personalização visual

As cores, fontes e espaçamentos ficam centralizados no início do arquivo
`css/style.css`, dentro de `:root`. Para mudar a paleta, por exemplo, basta
editar as variáveis:

```css
:root {
  --paper: #F5EFDC;   /* fundo claro (papel kraft) */
  --moss: #263424;    /* verde escuro das seções de destaque */
  --tomato: #C7391F;  /* cor de ação (botões, links) */
  --leaf: #4C7A3F;    /* verde dos botões secundários */
  --corn: #E8A93C;    /* amarelo de apoio */
}
```

## Conteúdo do blog

Os posts em `blog.html` são só um ponto de partida — substitua pelos relatos
reais do projeto, fotos das entregas, depoimentos de quem recebeu doação, etc.
A página inicial (`index.html`) mostra só uma prévia de 3 posts, com um botão
"Ver todas as histórias e dicas" que leva para `blog.html`.

## Contador de visitas e livro de visitas

A página do blog tem dois recursos "estilo blog antigo", também sem back-end:

- **Contador de visitas**: soma 1 a cada vez que a página é aberta *no mesmo
  navegador* (guardado em `localStorage`, chave `feiraDoBemVisitas`). Não é um
  contador real de visitantes do site inteiro — é só um efeito decorativo/nostálgico.
- **Livro de visitas**: os recados ficam salvos em `localStorage`, chave
  `feiraDoBemLivroVisitas`, e só aparecem para quem está no mesmo navegador que
  escreveu. Se quiser que os recados fiquem visíveis para todo mundo que visita
  o site, aí sim entra a necessidade de um back-end de verdade (mesma observação
  do cadastro, na seção acima).