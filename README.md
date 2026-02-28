# 📦 Teste Front-End — React + TypeScript + Vite + SCSS

Este projeto é a base para o teste de desenvolvedor Front-End da Econverse, utilizando um setup moderno e boas práticas de desenvolvimento web.

---

## 🚀 Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router DOM](https://reactrouter.com/)
- [Sass (SCSS)](https://sass-lang.com/)
- [ESLint + Prettier + Husky + lint-staged](https://eslint.org/)

---

## 📁 Estrutura do Projeto

```bash
teste-front-end/
├── public/                # Arquivos estáticos (ex: favicon, logos)
│   └── vite.svg
├── src/
│   ├── assets/            # Imagens e outros arquivos estáticos
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/             # Custom hooks
│   ├── pages/             # Páginas da aplicação
│   │   ├── Home/
│   │   │   └── Home.tsx
│   │   └── NotFound/
│   │       ├── NotFound.module.scss
│   │       └── NotFound.tsx
│   ├── routes/            # Configuração de rotas
│   │   └── index.tsx
│   ├── services/          # Serviços e APIs
│   ├── styles/            # SCSS global, variáveis e reset
│   │   ├── global.scss
│   │   ├── main.scss
│   │   ├── reset.scss
│   │   └── variables.scss
│   ├── types/             # Tipos TypeScript
│   ├── App.tsx            # Componente raiz
│   └── main.tsx           # Ponto de entrada React
├── .husky/                # Hooks do Git (Husky)
├── .prettierrc            # Configuração do Prettier
├── eslint.config.js       # Configuração do ESLint
├── tsconfig.json          # Configuração do TypeScript
├── tsconfig.app.json      # TypeScript para aplicação
├── tsconfig.node.json     # TypeScript para Node.js
├── vite.config.ts         # Configuração do Vite
├── package.json           # Dependências e scripts
└── README.md              # Este documento
```

---

## 🛠️ Scripts Disponíveis

| Comando             | Descrição                                     |
| ------------------- | --------------------------------------------- |
| `npm run dev`       | Inicia o projeto em modo desenvolvimento      |
| `npm run build`     | Gera os arquivos para produção (`dist/`)      |
| `npm run preview`   | Pré-visualiza o build de produção             |
| `npm run lint`      | Executa o ESLint                              |
| `npm run format`    | Formata o código com Prettier                 |
| `npm run prepare`   | Ativa o Husky                                 |
| `npm run typecheck` | Verifica tipos TypeScript sem emitir arquivos |

---

## 🏃 Como Executar

1. **Clone o repositório:**

    ```bash
    git clone <url-do-repositorio>
    cd teste-front-end
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

3. **Execute em modo desenvolvimento:**

    ```bash
    npm run dev
    ```

4. **Acesse a aplicação:**
    ```
    http://localhost:5173
    ```

---

## 💡 Requisitos para Desenvolvimento

- **Node.js** v18+
- **npm** (ou outro gerenciador de pacotes)
- **Git** configurado
- **VS Code** (recomendado) com extensões ESLint e Prettier

---

## 🔧 Configurações de Desenvolvimento

O projeto inclui configurações para:

- **ESLint**: Análise estática de código
- **Prettier**: Formatação automática
- **Husky**: Git hooks para qualidade de código
- **lint-staged**: Lint apenas em arquivos modificados
- **TypeScript**: Tipagem estática

### Aliases de Importação

Para imports absolutos, utilize os aliases configurados:

- `@` : `src`
- `@assets` : `src/assets`
- `@components` : `src/components`
- `@hooks` : `src/hooks`
- `@pages` : `src/pages`
- `@services` : `src/services`
- `@styles` : `src/styles`
- `@app-types` : `src/types`

Os aliases estão definidos em `tsconfig.json` (TypeScript) e `vite.config.ts` (Vite).  
**Se adicionar novas pastas e quiser criar um alias, altere ambos os arquivos e reinicie o servidor de desenvolvimento.**

---

## 🎨 UI/UX

- UI desenvolvida diretamente com SCSS, sem bibliotecas de componentes externas.
- Design responsivo, seguindo o layout proposto no Figma.
- Sistema de cores, tipografia e espaçamentos definidos em `src/styles/variables.scss`.

---

## 📄 Licença

Este projeto é destinado exclusivamente para o teste de seleção da Econverse.  
Uso restrito para fins de avaliação técnica.
