# Teste Econverse: Vaga Desenvolvedor Front-End

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
```

### Validação completa (lint + build + test)

```bash
npm run lint && npm run build && npm run test
```
