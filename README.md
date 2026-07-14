# 🍅 Feira do Bem

A **Feira do Bem** é uma iniciativa digital com foco em sustentabilidade e combate ao desperdício de alimentos.  
O projeto conecta a identidade visual das feiras livres tradicionais a uma interface moderna, limpa e totalmente responsiva, incentivando ações práticas alinhadas ao consumo consciente.

---

## Sobre o projeto

Site desenvolvido para conectar o excedente de frutas, legumes e verduras de uma distribuidora a moradores de uma comunidade, com cadastro simples (nome + WhatsApp)  
e um blog sobre doação, ODS e inclusão digital.

Feito em **HTML5 + CSS3 + JavaScript puro** — sem frameworks, sem build, sem instalação.

---

## Tecnologias Utilizadas

* **HTML5:** Estruturação semântica das páginas principal e do diário/blog.  
* **CSS3:** Estilização personalizada baseada em variáveis de cor (conceito papel kraft/carimbo), design responsivo e adaptações para dispositivos móveis.  
* **JavaScript (ES6):** Manipulação de interações, gerenciamento do menu responsivo, validações locais de formulários.

---

## Estrutura do Projeto

feira-do-bem/ ├── index.html → página inicial (hero, sobre, como funciona, ODS, cadastro, prévia do blog) ├── blog.html → página do blog, estilo clássico (entregas, dicas, livro de visitas) ├── css/ │ └── style.css → identidade visual unificada ├── js/ │ └── script.js → scripts para menu, formulário, WhatsApp, contador, animações ├── images/ │ └── (imagens do projeto) └── README.md → este arquivo


---

## Como abrir no VS Code

1. Abra a pasta `feira-do-bem` no VS Code.  
2. Instale a extensão **Live Server** (se ainda não tiver).  
3. Clique com o botão direito em `index.html` → **Open with Live Server**.  
4. O site abre no navegador e atualiza automaticamente a cada alteração salva.

---

## Ajustes importantes (antes de publicar)

O que muda com frequência está no topo do arquivo `js/script.js`, dentro do objeto `CONFIG`:

```js
const CONFIG = {
  whatsappNumber: "5566999999999", // troque pelo WhatsApp real da distribuidora
  mensagemPadrao: (nome, bairro) => `...`, // texto enviado automaticamente
};
Número de WhatsApp: use o formato 55 (Brasil) + DDD + número, só dígitos.
O rodapé do site é gerado automaticamente a partir desse número.
Como funciona o cadastro
Este é um site estático — não há servidor nem banco de dados. O cadastro funciona assim:

Pessoa preenche nome e WhatsApp.
Os dados ficam salvos no navegador dela (localStorage).
Automaticamente abre conversa no WhatsApp com mensagem pronta para a distribuidora.
Se quiser guardar os cadastros de forma definitiva, pode conectar o formulário a um back-end ou serviço (ex: Google Forms, Firebase).

Personalização visual
As cores, fontes e espaçamentos ficam centralizados em css/style.css dentro de :root.
Alterar a paleta é simples editando variáveis CSS:

css


:root {
  --paper: #F5EFDC;
  --moss: #263424;
  --tomato: #C7391F;
  --leaf: #4C7A3F;
  --corn: #E8A93C;
}
Conteúdo do blog
Os posts em blog.html são ponto de partida. Substitua por relatos reais, fotos, depoimentos.
A página inicial mostra só a prévia de 3 posts, com botão para ver todas no blog.

Recursos do blog
Contador de visitas: soma visitas no navegador (localStorage), efeito retrô.
Livro de visitas: mensagens também ficam no localStorage e aparecem só para a pessoa que escreveu.
Contato e reconhecimento
Feira do Bem — feito para não deixar comida boa virar lixo.
© 2026 desenvolvido por Mayara Silva.