# 🟠 Sprint 3 — Componentização Visual e Injeção via JavaScript

**⏱ Período:** Início da estrutura funcional do projeto
**🎯 Objetivo:** Criar o esqueleto visual da interface utilizando componentização modular e injeção dinâmica via `main.js`, reaproveitando a estrutura do MVP para acelerar evolução.

---

## 📁 Escopo planejado

- [x] Criar branch `feature/sprint-3-injecao-de-componentes-main.js`
- [x] Criar componentes em `src/assets/components/`:
  - `Sidebar.js`
  - `MainContent.js`
  - `ConnectSection/*.js`
  - `outros componentes se nescessario`
- [x] Injetar visual via `main.js` com funções para montar estrutura da interface
- [x] Estruturar `index.html` com `<div id="app">` para renderizar conteúdo dinâmico
- [x] Reutilizar classes do MVP para acelerar montagem e visual
- ⚠️  Configurar aliases no `package.json` (`@components`, `@styles`, `@data`)
- [x] Registrar preview visual (print ou HTML estático de componentes)

---

## 🧩 Subdivisão da Sprint 3

Esta sprint representa a **primeira fase técnica** da interface.
As demais etapas foram distribuídas em sprints futuras para otimizar o foco e permitir evolução contínua:

- 🎨 Sprint 4 → Estilização refinada com SCSS e `@apply` do Tailwind
- 📊 Sprint 5 → Dados dinâmicos via arquivos `.json` e animações JS

---

## 💬 Observações técnicas

- As classes visuais são mantidas do MVP por decisão estratégica
- A modularização acontece com base em estrutura `.js` (não HTML fragmentado)
- O uso de aliases garante melhor manutenção do projeto
- O visual aqui é _mockado estático_; dados dinâmicos virão na Sprint 5

---

## 🔧 Fixes e Decisões Incorporadas

- 🛠 **Sprint reestruturada**: objetivo inicial de fazer tudo foi dividido em etapas para garantir qualidade técnica e rastreabilidade
- 📁 O nome da branch foi atualizado para refletir a execução real: `feature/sprint-3-injecao-de-componentes-main.js`
- 📎 Observações pendentes da Sprint 2 foram incluídas como retrospectiva técnica

---

## 🔄 Retrospectiva Sprint 2 (Complementar)

- ❗️ Arquivos PostCSS (`.js`, `.mjs`, `.postcssrc`) criados, mas funcionalidade será confirmada agora
- 🚫 CSpell desativado via `.vscode/settings.json`; arquivo `cspell.json` mantido como referência
- 📂 Ajustes manuais feitos após o encerramento técnico da sprint:
  - `.gitignore`
  - `tailwind.config.js`
  - Pastas complementares (`logo/`, `favicon/`)

---

📌 *Este documento será atualizado com base na execução da branch `feature/sprint-3-injecao-de-componentes-main.js`*

### Relatório da Execução
- **Resolução de Aliases:** Foi realizada uma tentativa de configuração de *path aliases* para simplificar os imports. Após testes exaustivos, a abordagem se mostrou incompatível com a versão atual do Parcel e pnpm. A decisão técnica de reverter para imports relativos foi documentada no `README.md` principal para registro histórico.

### 💡 Aprendizados da Sprint

- **Oportunidade de Mesclar Sprints:** Percebi que a criação da estrutura do componente (Sprint 3) e o carregamento de dados (Sprint 5) poderiam ser feitos juntos na mesma sprint, já que ambos mexem no mesmo arquivo (`Sidebar.js`). Isso poderia otimizar o fluxo de trabalho.

### 🧠 Retrospectiva e Ações Futuras

Ao final desta sprint, os seguintes pontos foram registrados para análise e planejamento futuro:

#### 1. Descobertas Técnicas e Decisões
- **Resolução de Aliases:** Foi realizada uma tentativa de configuração de *path aliases*, mas a abordagem se mostrou incompatível com a stack. A decisão de reverter para imports relativos foi documentada no `README.md`.

#### 2. Aprendizados de Processo
- **Validação da Estratégia de Sprints:** A abordagem de "fatias horizontais" (focar apenas na estrutura nesta sprint) foi eficaz para manter o escopo controlado. No entanto, a experiência prática evidenciou o trade-off de precisar revisitar os mesmos arquivos em sprints futuras para adicionar estilo e dados, validando a teoria sobre a eficiência das "fatias verticais" em cenários de produção.

#### 3. Backlog de Melhorias Técnicas Identificadas
- [ ] **Refatorar Injeção de Metatags (Alocado para Sprint 5):**
  - **Contexto:** A injeção atual via `document.head.innerHTML` é funcional, mas "bruta".
  - **Melhoria Proposta:** Refatorar a lógica para criar e adicionar cada tag `<meta>` individualmente (`createElement` / `appendChild`), melhorando o controle, a performance e a segurança do DOM.


### 🖼️ Resultado Visual ao Final da Sprint

A imagem abaixo representa o esqueleto da interface montado ao final da Sprint 3, com os componentes estáticos injetados via JavaScript.

![Resultado da Sprint 3](../docs/sprints_previews/sprint_3_layout_final.png)
