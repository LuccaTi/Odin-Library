# The Odin Library

Aplicação de biblioteca desenvolvida com HTML, CSS e JavaScript puro (vanilla JS).

## Descrição

Este projeto funciona como uma Single Page Application (SPA) simples para cadastro e visualização de livros.

O usuário pode:

- abrir um formulário dinâmico na sidebar;
- cadastrar título, autor, número de páginas e status de leitura;
- validar campos obrigatórios no envio;
- visualizar livros em cards gerados via DOM;
- remover livros individuais da interface e do array em memória.

## Funcionalidades Implementadas

- Formulário criado e inserido dinamicamente com JavaScript.
- Validação nativa do navegador usando campos obrigatórios (`required`).
- Criação de objetos `Book` com identificador único (`crypto.randomUUID()`).
- Armazenamento dos livros em array local durante a sessão.
- Renderização de cards com botões de ação.
- Remoção de livro do DOM e do array.
- Layout responsivo com CSS Grid (estrutura da página e grade de cards).
- Truncamento de textos longos com reticências para manter consistência visual dos cards.

## Tecnologias e Conceitos Aplicados

- HTML5 semântico (`header`, `aside`, `main`, `footer`).
- CSS Grid e Flexbox para layout e alinhamento.
- Abordagem Mobile First com media query para telas maiores.
- Manipulação intensa do DOM com JavaScript vanilla.
- Eventos (`click`, `submit`) e controle de comportamento padrão com `preventDefault()`.
- Criação e manipulação de objetos e arrays (`push`, `findIndex`, `splice`).

## Estrutura do Projeto

- `index.html`: estrutura base da aplicação.
- `styles.css`: estilos, responsividade e visual dos componentes.
- `script.js`: lógica de formulário, criação de livros e renderização de cards.

## Como Executar

1. Clone este repositório.
2. Abra a pasta do projeto.
3. Execute o arquivo `index.html` no navegador.

