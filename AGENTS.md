# AGENTS.md — teste-front-end

Este projeto usa **Claude Code Skills** como mecanismo principal de contexto.
As regras de workflow, branching, PRs, commits, issues/milestones, feature list e ratchet
vivem em skills sob `~/.claude/skills/harness/`.

**Ponto de entrada:** invoque `harness-index` no início da sessão.

---

## Regras universais (fora de skill)

1. **Idioma.** Conteúdo em **pt-BR**. Identificadores técnicos em **inglês**.
2. **Não escreve sozinho fora do escopo permitido.** Atualização de progresso é mostrada ao dev para colar manual. Exceções: bootstrap inicial e comandos pedidos explicitamente.
3. **Validação do projeto passa antes de cada commit.** Comando: `npm run lint && npm run build && npm run test`. Tarefa sem validação verde não é tarefa pronta.
4. **`main` é protegida** — nunca pushe direto. Fluxo: `feat/*` → `develop` → `main`.
5. **Search antes de decidir.** Antes de propor decisão arquitetural, consulte MemPalace. Wing: `teste-front-end`.

---

## Stack deste projeto

React 19 + TypeScript + Vite 8 + SCSS Modules + Zod, sem backend próprio (dados via fetch de JSON remoto).
Detalhes completos em `.gsd/STACK.md`.

---

## Mecanismos do harness

- **Skills** (`~/.claude/skills/`) — `harness-index` lista todas.
- **MemPalace** (MCP) — memória cross-projeto. Wing: `teste-front-end`.
- **OpenSpace** (MCP) — skills auto-evolutivas.
- **RTK** (CLI, hook) — comprime saída de shell. Transparente.

---

## Delegação para subagentes especializados

| Tipo de tarefa                               | Subagente            |
| -------------------------------------------- | -------------------- |
| Implementar código frontend React/TypeScript | `frontend-developer` |
| TypeScript puro (sem framework específico)   | `typescript-pro`     |
| Revisar diff / PR (code review)              | `code-reviewer`      |
| Escrever ou atualizar testes                 | `test-automator`     |
| Decisão ou revisão de arquitetura            | `architect-reviewer` |
| Documentação técnica                         | `technical-writer`   |

**Quando NÃO delegar:** tarefas de uma linha, lookups, workflow (branch/commit/PR/issue).

---

## Documentação específica do projeto

@.gsd/STACK.md
