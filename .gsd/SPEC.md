# SPEC.md — Vitrine de Produtos (Teste Front-End Econverse)

> Preencha todas as seções abaixo no início de um projeto novo.
> Seja breve. Um parágrafo por seção costuma bastar.
> Este arquivo é lido no começo de toda sessão do agente — specs vagos geram código vago.

---

## Visão

> [atualizado após revisão do Figma real em 2026-08-27] Uma página de marketplace (header, hero, categorias, vitrine de produtos, parceiros, marcas, newsletter, footer) que reproduz visualmente o design da Econverse, com a vitrine de produtos consumindo um JSON remoto e abrindo detalhes de cada item em um modal — para avaliação técnica de uma vaga de desenvolvedor front-end júnior. Só a vitrine e o modal são funcionais com dados reais; as demais seções são fiéis ao Figma visualmente, mas decorativas (sem backend/estado por trás).

---

## Problema

> [inferido do README] Quem visita uma vitrine de produtos online precisa ver as principais informações de um item (nome, imagem, preço, descrição) sem perder o contexto da lista — sair para uma página de detalhe interrompe a navegação e é mais lento do que abrir a informação no lugar.
>
> Este projeto é, ao mesmo tempo, um teste técnico: o "problema" real que ele resolve é demonstrar organização de projeto, lógica de código e componentização para a avaliação da vaga.

---

## Solução

1. Buscar a lista de produtos de um endpoint JSON remoto (`produtos.json`) e exibir a vitrine respeitando o layout do [Figma](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1) pixel a pixel (cores, fontes, botões)
2. Abrir um modal com as principais informações do produto ao clicar em um item da vitrine
3. Reproduzir visualmente as demais seções do Figma — header (avisos, busca, ícones, navegação), hero de promoção, categorias em destaque, banners de parceiros, carrossel de marcas, newsletter e footer — como chrome estático, sem lógica funcional por trás
4. Aplicar boas práticas de SEO e HTML semântico

---

## Usuários

- **Visitante da vitrine:** navega o catálogo de produtos, clica em um item para ver detalhes no modal. Único papel do sistema — sem login, sem admin.

---

## Fora de escopo

- Carrinho de compras / checkout funcional — o ícone de carrinho existe visualmente (chrome do header), mas não adiciona nem persiste itens
- Busca funcional, wishlist, login/área logada — campos e ícones existem visualmente, sem lógica por trás
- Navegação real entre categorias/marcas ou paginação de "produtos relacionados" — carrosséis e abas são visuais; não filtram nem carregam mais dados
- Backend próprio — os dados de produto vêm de um JSON estático remoto já publicado pela Econverse; qualquer outro dado no layout (preço riscado, parcelamento, frete grátis, banners de parceiros, marcas) é conteúdo fixo de layout, não dado real
- Bibliotecas de UI (Bootstrap, Foundation ou similares) — proibido pelo README do teste

---

## Critérios de sucesso

- A vitrine renderiza um card para cada produto retornado pelo JSON remoto
- Clicar em um produto abre um modal com os dados corretos daquele produto específico
- Todas as seções capturadas do Figma (header, hero, categorias, vitrine, parceiros, marcas, newsletter, footer) estão presentes e visualmente fiéis
- O layout confere pixel a pixel com o Figma (cores, tamanhos de fonte, botões)
- `npm run lint`, `npm run build` e `npm run test` passam sem erro

---

## Restrições importantes

- Não usar nenhuma biblioteca de UI (Bootstrap, Foundation, etc.) — verificação manual em code review
- Estilização via Sass (SCSS Modules), conforme já configurado no projeto
- Dados de produto sempre validados via schema zod antes de uso — resposta de API é `unknown` até o `.parse()`
- Layout pixel a pixel é critério de avaliação explícito do teste — não aproximar valores "de olho"
- O card de produto exibe elementos que não existem no JSON (preço original riscado, parcelamento, frete grátis) como texto fixo de layout, idêntico em todo card — não são derivados de `price` nem inventados por produto

---

> **Stack, validação, env vars e setup** ficam em `.gsd/STACK.md`.
> **Convenções de código** (folder layout, componentes, testes) vêm da skill `stack-react-vite-scss`.
