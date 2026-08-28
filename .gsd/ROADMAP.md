# ROADMAP.md — Vitrine de Produtos (Teste Front-End Econverse)

> Preencha os marcos (milestones), sprints e tarefas abaixo no início de um projeto novo.
> Mantenha as tarefas pequenas o suficiente para caber em uma sessão do agente.
> Atualize os marcadores de status conforme o trabalho avança.

---

## Como ler este arquivo

- **Milestone:** uma versão entregável do produto
- **Sprint:** uma capacidade vertical demonstrável dentro de um milestone
- **Tarefa:** uma unidade focada de trabalho, cabe em uma sessão do agente

Marcadores de status: `[ ]` pendente · `[~]` em progresso · `[x]` concluído

---

## Roadmap do projeto

> Sem prazo de entrega definido.

## M01 — Vitrine funcional

> Meta: entregar a vitrine consumindo o JSON remoto de produtos com a interação de modal de detalhes, cobrindo os requisitos obrigatórios do teste, e reproduzir visualmente as demais seções capturadas do Figma (header, hero, categorias, parceiros, marcas, newsletter, footer) como chrome estático.
> Entregável quando: o visitante abre a página, vê todas as seções do Figma renderizadas, vê os produtos do JSON na vitrine, clica em um e visualiza os dados corretos daquele produto em um modal — respeitando o layout do Figma pixel a pixel.

### S01 — Base do design system `[ ]`

- [ ] T01: extrair variáveis de design (cores, fontes, espaçamentos) do Figma para `src/styles/_variables.scss`
- [ ] T02: configurar injeção global de `_variables.scss`/`_mixins.scss` via `vite.config.ts` (`additionalData`)
- [ ] T03: montar layout base da página (header/hero se houver, grid da vitrine) com HTML semântico

### S02 — Consumo de dados e vitrine `[ ]`

- [ ] T01: criar schema zod (`src/schemas/product.ts`) para validar o shape do produto retornado pelo JSON
- [ ] T02: criar `src/lib/api` com interface única `getProducts()` e duas implementações (fetch real vs mock `src/mocks/products.ts`), alternadas por `VITE_USE_MOCK_API`
- [ ] T03: criar componente `ProductCard` (`src/components/ProductCard/`) e renderizar o grid de produtos na vitrine
- [ ] T04: tratar estados de loading e erro da busca (sem tela em branco em caso de falha)

### S03 — Modal de detalhes do produto `[ ]`

- [ ] T01: criar componente `Modal` genérico e acessível (foco preso, fecha com Esc, fecha clicando fora)
- [ ] T02: criar `ProductDetailModal` exibindo nome, imagem, descrição e preço do produto clicado
- [ ] T03: conectar o clique no `ProductCard` à abertura do modal com o produto correto (sem vazamento de estado entre produtos)

### S04 — Header e navegação `[ ]`

> Chrome visual, sem lógica funcional (busca/wishlist/carrinho/login não fazem nada).

- [ ] T01: criar `Header` (`src/components/Header/`) — barra de avisos (compra segura, frete grátis, parcele), busca, ícones (trocar, wishlist, usuário, carrinho)
- [ ] T02: criar `NavBar` — categorias (Todas categorias, Supermercado, Livros, Moda, Lançamentos, Ofertas do dia, Assinatura), item ativo destacado

### S05 — Hero e categorias em destaque `[ ]`

- [ ] T01: criar `HeroBanner` — imagem de fundo, headline, destaque "50% Off", botão "Ver produto"
- [ ] T02: criar `CategoryGrid` — grid de 7 ícones de categoria (Tecnologia ativa, demais neutras)

### S06 — Parceiros e marcas `[ ]`

- [ ] T01: criar `PartnerBanner` — par de banners "Parceiros" com imagem, texto e botão "CONFIRA"
- [ ] T02: criar `BrandCarousel` — carrossel de logos em "Navegue por marcas"

### S07 — Newsletter e footer `[ ]`

- [ ] T01: criar `Newsletter` — faixa escura com título, campos nome/e-mail, checkbox de termos, botão "INSCREVER"
- [ ] T02: criar `Footer` — logo, descrição, colunas Institucional/Ajuda/Termos, ícones sociais

### S08 — Montagem final da página `[ ]`

- [ ] T01: compor `App.tsx` com todas as seções na ordem do Figma (Header, NavBar, Hero, CategoryGrid, vitrine + PartnerBanner intercalados conforme print, BrandCarousel, Newsletter, Footer)
- [ ] T02: repetir a seção de vitrine ("Produtos relacionados") nos pontos em que aparece no Figma, reaproveitando o mesmo componente

### S09 — Polimento e qualidade `[ ]`

- [ ] T01: revisar pixel-perfect contra o Figma — todas as seções (cores, fontes, botões, espaçamentos)
- [ ] T02: aplicar boas práticas de SEO e HTML semântico (meta tags, landmarks, `alt` em imagens)
- [ ] T03: escrever testes (Vitest + Testing Library) para `ProductCard`, `Modal`/`ProductDetailModal` e `lib/api`, cobrindo os 3 princípios
- [ ] T04: atualizar `README.md` com instruções de setup, build e test

---

## M02 — Entrega

> Meta: fechar o teste técnico com qualidade de produção, publicar no Vercel e enviar o link do repositório.
> Entregável quando: a vitrine está publicada no Vercel e o e-mail com o link do repositório foi enviado para `gustavo.cipriano@econverse.com.br` com o título "Teste Vaga FrontEnd".

### S01 — Revisão final `[ ]`

- [ ] T01: checar responsividade da página inteira (header, hero, categorias, vitrine, modal, parceiros, marcas, newsletter, footer) em telas menores
- [ ] T02: rodar `npm run lint && npm run build && npm run test` limpo antes do envio
- [ ] T03: revisar `.harness/feature_list.json` — todas as features com `implemented: true`
- [ ] T04: publicar a vitrine no Vercel (usando `VITE_USE_MOCK_API=false` e `VITE_PRODUCTS_API_URL` real)
- [ ] T05: enviar o e-mail de entrega para `gustavo.cipriano@econverse.com.br` com o título "Teste Vaga FrontEnd" e o link do repositório (fork já existe em `MatheusSlvRibeiro/teste-front-end`)
