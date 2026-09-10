# Teste Econverse: Vaga Desenvolvedor Front-End

Backend deste projeto: [econverse-backend](https://github.com/MatheusSlvRibeiro/econverse-backend) — frontend e backend formam uma peça única de portfólio.

### Vem ser #Econverse!

Segue abaixo as instruções para a execução do teste.

## Instruções
- Faça um fork desse projeto para a sua conta pessoal do GitHub.
- Desenvolva a página conforme as **Especificações Técnicas** 
- Crie um README com as instruções para compilar, testar e rodar o projeto.
- O link do repositório deverá ser enviado para o e-mail gustavo.cipriano@econverse.com.br com o título **Teste Vaga FrontEnd**

## Especificações Técnicas
- Desenvolver a pagina em React e TypeScript conforme o [layout](https://www.figma.com/file/rWnzPeoxgynuNPsJjV0VmV/Teste-Front-End-Jr?node-id=0%3A1). Para conseguir pegar os elementos do Figma, basta copiar o layout para sua conta que terá acesso de edição.
- Montar a [vitrine](https://app.econverse.com.br/teste-front-end/junior/tecnologia/layout/vitrine-produtos.png) de produtos consumindo as informações dos produtos em json atraves desse [Link](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json).
- Desenvolver a interação ao clicar em um produto conforme layout. A interação consiste em abrir um modal com as principais informações do produto presente no arquivo [JSON](https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json) conforme o produto que clicar.
- Utilizar Pré-processador Sass, Less ou Stylus.
- Respeitar o Layout pixel a pixel, tamanho das fontes, cores e botões.
- Não Utilizar bibliotecas UI como Bootstrap, Foundation, ou afins.

## Pontos Extras
- Utilizar Boas práticas de SEO
- Uso de HTML semântico

## O que avaliaremos em seu teste
- Organização do projeto
- Lógica do código
- Componentização
- Alcance dos objetivos propostos

**Boa sorte! ;)**

---

## Como rodar o projeto

### Pré-requisitos

- Node.js 20+ e npm

### Instalação

```bash
git clone https://github.com/MatheusSlvRibeiro/teste-front-end.git
cd teste-front-end
npm install
```

### Variáveis de ambiente

Copie o arquivo de exemplo e ajuste se necessário (os defaults já funcionam sem alteração):

```bash
cp .env.example .env
```

| Variável | Descrição | Default |
|---|---|---|
| `VITE_PRODUCTS_API_URL` | URL do JSON de produtos | `https://app.econverse.com.br/teste-front-end/junior/tecnologia/lista-produtos/produtos.json` |
| `VITE_USE_MOCK_API` | `"true"` para usar mock local em vez do fetch real | `"false"` |
| `VITE_API_BASE_URL` | Base de um backend REST real, lida por `src/services/api.ts` (`GenericService`) | não usada neste teste — sem backend próprio |

### Desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:5173`.

### Build de produção

```bash
npm run build
```

O artefato gerado fica em `dist/`.

### Testes

```bash
npm run test        # executa todos os testes (Vitest + Testing Library)
```

### Lint

```bash
npm run lint        # ESLint com flat config (TS + React Hooks + Prettier)
npm run lint:fix     # aplica os fixes automáticos
npm run format       # Prettier (npm run format:check só verifica)
```

### Screenshot de validação visual

```bash
npm run screenshot                    # sobe o dev server, captura full-page em 1441×900 e derruba o servidor
npm run screenshot -- / desktop.png   # rota e nome de arquivo opcionais
```

Não é uma suíte E2E (sem asserções), só um atalho para conferência visual manual durante o desenvolvimento. O arquivo gerado fica em `screenshots/` (ignorada pelo git). Requer o Chromium do Playwright — se não estiver instalado, rode `npx playwright install chromium`.

### Validação completa (lint + build + test)

```bash
npm run lint && npm run build && npm run test
```

Esse é o gate que precisa passar limpo antes de qualquer commit — ver `AGENTS.md`.

---

## Sobre o desenvolvimento

Este projeto foi construído com um workflow assistido por IA (Claude Code), orquestrado por um harness próprio versionado no repositório:

- **`AGENTS.md`** — regras universais do projeto (idioma, gate de validação, fluxo de branches).
- **`.gsd/`** — documentação de arquitetura viva: `STACK.md` (stack e convenções), `SPEC.md` (especificação funcional) e `ROADMAP.md` (milestones/sprints/tasks com status).
- **`.harness/`** — rastreamento de features (`feature_list.json`) com critérios de aceite e status de implementação/verificação, e baseline de métricas (`baseline.json`).
- **`.claude/`** — configuração de skills e subagentes especializados usados durante a implementação (ex.: `frontend-developer` para componentes React, `test-automator` para os testes).

A ideia é manter as decisões de arquitetura e o progresso rastreáveis e auditáveis, com um gate de qualidade (`npm run lint && npm run build && npm run test`) que precisa passar antes de cada commit — os 462 testes e o build atuais passam limpos.
