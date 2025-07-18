# ✅ TODO.md — Portfólio Pessoal Luis Neves

Este arquivo reúne todas as tarefas técnicas, melhorias, ideias futuras e ajustes organizados por fase de desenvolvimento.

---

## 🟢 Sprint 1 — Estrutura Inicial do Projeto

- [x] Criar diretórios: `public/`, `src/`, `docs/`
- [x] Criar subpastas (`favicon/`, `logo/`, `components/`, `data/`, `styles/`)
- [x] Migrar `index.html` do `src/` para `public/`
- [x] Configurar `package.json` com entrada:
  `"dev": "parcel public/index.html"`
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

## 🟠 Sprint 3 — Layout, Componentes e Interações *(em planejamento)*

- [ ] Criar branch `feature/sprint-3-esqueleto`
- [ ] Estruturar layout com SCSS modular
- [ ] Criar componentes: `Hero`, `Sidebar`, `About`, `Contact`...
- [ ] Integrar dados dos arquivos `.json`
- [ ] Criar animações com `ScrollReveal` ou `Anime.js`
- [ ] Implementar responsividade global

---

## 🌐 Deploy e Validações

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

- [ ] Adicionar validação futura sobre PostCSS (`.js`, `.mjs`, `.postcssrc`)
- [ ] Rever estrutura dos estilos e reaproveitamento modular
- [ ] Atualizar links e referências cruzadas entre `README.md`, `SPRINTS.md` e `sprint-X.md`
