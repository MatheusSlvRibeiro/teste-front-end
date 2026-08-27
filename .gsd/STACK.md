# STACK.md

Identificação do projeto: qual stack este código usa, como validar, que ambiente ele precisa.

Este arquivo é **preenchido pela entrevista de bootstrap** e **nunca é sobrescrito por scripts de sincronia**.
As convenções de código (folder layout, componentes, testes, schemas) **não** vão aqui — vêm da skill `stack-react-vite-scss` que combina com esta stack (ver `skills/harness-index`).

---

## Stack

> [inferido do package.json / setup desta sessão]

- Runtime / framework: Node 24 · Vite 8 · React 19
- Linguagem: TypeScript ~6.0 (strict, sem `any`)
- Banco / ORM: nenhum — sem backend próprio; dados vêm de fetch a um JSON estático remoto
- Estilização: Sass (SCSS Modules), sem biblioteca de UI
- Testes: Vitest + Testing Library (jsdom) — 3 princípios (parâmetros, ações, o que pode dar errado)
- Gerenciador de pacotes: npm
- Deploy: Vercel

**Archetype skill correspondente:** `stack-react-vite-scss`

---

## Validação (rodar antes de cada commit)

```bash
npm run lint && npm run build && npm run test
```

O que ele roda, em sequência:

1. `lint` — ESLint (flat config, TS + React Hooks + React Refresh + Prettier)
2. `build` — `tsc -b` (type check) + `vite build`
3. `test` — Vitest (Testing Library, ambiente jsdom)

**Uma tarefa só está completa quando este comando passa com zero erros.**
Nunca considere uma tarefa pronta com base apenas no seu próprio julgamento.

---

## Setup do zero

```bash
git clone https://github.com/MatheusSlvRibeiro/teste-front-end.git
cd teste-front-end
npm install
npm run dev
```

Depois de instalar as dependências, verifique se as milestones do ROADMAP existem no Forgejo (ver skill `workflow-issues`). Se faltar, rode a sincronia ROADMAP → Forgejo antes de qualquer outro trabalho.

---

## Variáveis de ambiente

| Variável                | Descrição                                                                                                                               |
| ----------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_PRODUCTS_API_URL` | URL do JSON remoto de produtos. Default: `https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json`. |
| `VITE_USE_MOCK_API`     | `"true"` para servir produtos de um mock local (`src/mocks/products.ts`) em vez do fetch real. Default: `"false"`.                      |

`.env.example` deve documentar as duas com esses defaults.

---

## Notas específicas do projeto

- Layout de referência: [Figma — Teste Front-End Jr](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1). Requer copiar o arquivo para conta própria para ter acesso de edição (e assim inspecionar cores/fontes/espaçamentos com precisão) — o agente não consegue acessar o Figma diretamente.
- JSON de produtos: `https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json` — endpoint público, sem autenticação.
- Print de referência da vitrine (não o layout final, só orientação): `https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png`.
- Restrição explícita do teste: nenhuma biblioteca de UI (Bootstrap, Foundation, etc.).
- Entrega do teste: link do repositório enviado para `gustavo.cipriano@econverse.com.br` com título "Teste Vaga FrontEnd" (ver README.md da raiz).
- Acesso a dados: implementar como um serviço com interface única (ex.: `getProducts(): Promise<Product[]>`) com duas implementações — fetch real (`VITE_PRODUCTS_API_URL`) e mock local — selecionadas por `VITE_USE_MOCK_API` num factory/adapter em `src/lib/api/`. Componentes consumidores dependem só da interface, nunca da implementação concreta, para poder alternar real/mock sem alterar quem consome os dados.

---

## Rastreamento de tasks

Este repositório é um fork isolado (`MatheusSlvRibeiro/teste-front-end`), sem organização Forgejo por trás — a sincronia do ROADMAP roda no **GitHub** (Issues, habilitadas manualmente neste fork), não no Forgejo padrão do harness. Ver skill `workflow-issues` para o procedimento original (Forgejo); aqui o mapeamento é o mesmo (`Milestone` = M0X, label `sprint/M0X-S0X` = sprint, issue com marcador `Task: M0X-S0X-T0X` = task), só o backend muda.

| Milestone               | Nº no GitHub                                                           | Issues                                                                                                |
| ----------------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| M01 — Vitrine funcional | [#1](https://github.com/MatheusSlvRibeiro/teste-front-end/milestone/1) | #1–#14, #20–#29 ([lista completa](https://github.com/MatheusSlvRibeiro/teste-front-end/milestones/1)) |
| M02 — Entrega           | [#2](https://github.com/MatheusSlvRibeiro/teste-front-end/milestone/2) | [#15–#19](https://github.com/MatheusSlvRibeiro/teste-front-end/milestones/2)                          |
