# ✅ TODO.md — Portfólio Pessoal Luis Neves

Este arquivo reúne todas as tarefas técnicas, melhorias, ideias futuras e ajustes organizados por fase de desenvolvimento.

---

## 🟢 Sprint 1 — Estrutura Inicial do Projeto

- [x] Criar diretórios: `public/`, `src/`, `docs/`
- [x] Criar subpastas (`favicon/`, `logo/`, `components/`, `data/`, `styles/`)
- [x] Migrar `index.html` do `src/` para `public/`
- [x] Configurar `package.json` com entrada: `"dev": "parcel public/index.html"`
- [x] Criar arquivos base: `.gitignore`, `README.md`, `TODO.md`

---

## 🟡 Sprint 2 — Ferramentas e Configurações Técnicas

- [x] Instalar ESLint + Prettier
- [x] Criar `.prettierrc` e `eslint.config.mjs`
- [x] Criar `.husky/pre-commit` com `lint:fix`
- [x] Configurar Tailwind via `tailwindcss.css`
- [x] Criar `tailwind.config.js`
- [x] Separar SCSS (`main.scss`) e utilitários (`tailwindcss.css`)
- [x] Criar arquivos PostCSS (`postcss.config.js`, `.postcssrc`, etc.)
- [x] Criar `cspell.json` e desabilitar via `.vscode/settings.json`
- [x] Atualizar `.gitattributes` e estrutura de build

---

## 🟠 Sprint 3 — Componentização Visual e Injeção via JavaScript *(em execução)*

- [x] Criar branch `feature/sprint-3-injecao-de-componentes-main.js`
- [ ] Criar componentes: `Sidebar`, `MainContent`, `Hero`, `About`, `Contact`...
- [x] Injetar componentes via `main.js`
- [x] Reutilizar classes visuais do MVP
- [x] Estruturar `index.html` com `<div id="app">`
- ⚠️ Configurar aliases no `package.json`
- [ ] Registrar preview visual dos componentes

---

## 🎨 Sprint 4 — Estilização Avançada *(planejado)*

- [ ] Criar variáveis SCSS e aplicar `@apply` no Tailwind
- [ ] Refatorar layout visual: cores, espaçamentos, responsividade
- [ ] Organizar estilos por componente (`_components.scss`, etc.)

---

## 🔁 Sprint 5 — Dados Dinâmicos e Interatividade *(planejado)*

- [ ] Criar arquivos `.json` com dados reais (`sidebarData.json`, etc.)
- [ ] Integrar dados via `import` nos componentes
- [ ] Refatorar componentes para leitura dinâmica
- [ ] Criar animações com `ScrollReveal` ou `Anime.js`

---

## 🌐 Sprint 6 — Deploy e Validações Técnicas *(planejado)*

- [ ] Configurar hospedagem na Vercel
- [ ] Adicionar domínio personalizado
- [ ] Testar comportamento mobile
- [ ] Verificar SEO e metatags
- [ ] Validar acessibilidade básica

---

## 🧠 Backlog Técnico e Ideias Futuras

- [ ] Formulário de contato com envio real
- [ ] Sistema de feedback do usuário
- [ ] Login simples para admin
- [ ] Dashboard de projetos
- [ ] Criar `docs/setup.md` com instruções locais
- [ ] Criar `docs/image-optimization.md` com práticas para imagens
- [ ] Estudar qual arquivo PostCSS Parcel realmente reconhece

---

## 🔧 Fixes e Observações Técnicas

### 🧩 Sprint 1
- 📎 `docs/image-optimization.md` e `docs/setup.md` previstos, mas não criados
- 📘 `SPRINTS.md` foi separado em arquivos individuais por sprint
- 🤔 Ajuste tardio no `package.json` para apontar para `public/index.html`

### 🧩 Sprint 2
- ❗️ Arquivos PostCSS criados (`.js`, `.mjs`, `.postcssrc`), mas ainda não validados
- 🚫 CSpell desativado via `.vscode/settings.json`; `cspell.json` mantido
- 📂 Ajustes manuais pós-sprint: `.gitignore`, `tailwind.config.js`, pastas visuais

### 🧩 Sprint 3
- 🛠 Sprint reestruturada em fases:
  - Componentização visual com classes do MVP
  - Estilização refinada (Sprint 4)
  - Dados dinâmicos e interatividade (Sprint 5)
- 📁 Branch renomeada para refletir escopo real: `feature/sprint-3-injecao-de-componentes-main.js`
- 📌 Fix técnico pendente: mover conteúdo estático para `sidebarData.json` e preparar leitura dinâmica
- ⚠️ **Tentativa de Configuração de Aliases:** A configuração foi implementada, mas se mostrou incompatível com a stack. A decisão de usar imports relativos foi documentada no `README.md`.
