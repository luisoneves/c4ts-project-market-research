# 🗂️ Documentação de Sprints — Portfólio Luis Neves

🧠 Filosofia do Projeto
Este repositório foi desenvolvido com foco em boas práticas profissionais de front-end, replicando decisões técnicas e organizacionais que seriam adotadas por um desenvolvedor.
Cada etapa foi tratada como uma sprint, mesmo sendo um projeto individual, visando clareza, escalabilidade e histórico técnico para consultas futuras.
------------------------------------------------------------------------------------------------------------------------------------------------------
🟢 Sprint 1 — Estrutura Inicial do Projeto
Objetivo: preparar o ambiente e organizar estrutura base
- ✅ Escolha do bundler: Parcel
- Justificado pela simplicidade de configuração zero e produtividade no início do projeto.
- ✅ Gerenciador de pacotes: PNPM
- Por performance superior ao NPM e controle inteligente de dependências.
- ✅ Estrutura de diretórios criada:

📁 Estrutura Criada na Sprin

.parcel-cache/
src/
public/
├── assets/
│   ├── favicon/
│   │   ├── apple-touch-icon.png
│   │   ├── favicon-96x96.png
│   │   ├── favicon.ico
│   │   ├── favicon.svg
│   │   ├── site.webmanifest
│   │   ├── web-app-manifest-192x192.png
│   │   └── web-app-manifest-512x512.png
│   └── logo/
│       └── arquivos de identidade visual
├── index.html
├── src/
│   ├── assets/
│   │   ├── components/
│   │   │   ├── Sidebar.js
│   │   │   └── sections/
│   │   │       └── MainContent.js
│   │   ├── data/
│   │   │   ├── AboutData.json
│   │   │   ├── ContactData.json
│   │   │   ├── EducationData.json
│   │   │   ├── ExperienceData.json
│   │   │   ├── ServicesData.json
│   │   │   ├── SidebarData.json
│   │   │   └── projects.json
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   │   ├── about/
│   │   │   ├── contact/
│   │   │   ├── education/
│   │   │   ├── experience/
│   │   │   ├── services/
│   │   │   ├── shared/
│   │   │   └── sidebar/
│   │   └── styles/
│   │       ├── _components.scss
│   │       ├── _layout.scss
│   │       ├── _reset.scss
│   │       ├── _variables.scss
│   │       ├── main.scss
│   │       ├── sidebar.scss
│   │       └── tailwindcss.css
│   ├── index.css
│   ├── main.js
│   └── style.css
├── docs/
│   ├── image-optimization.md
│   ├── setup.md
│   └── SPRINTS.md
├── .gitignore
├── pnpm-lock.yaml
├── README.md
├── TODO.md
└── package.json


**index.html foi migrado manualmente do src/ para public/, seguindo boas práticas que separam arquivos estáticos e de entrada visível para o bundler.**

Documentação e Arquivos Técnicos Iniciais
Criados manualmente na Sprint 1:

.gitignore
README.md
TODO.md

🔄 Encerramento da Sprint
- Organização da estrutura finalizada ✔️
- Arquivos iniciais criados ✔️
- Projeto versionado e enviado ao GitHub ✔️
- Sprint encerrada com criação da branch setup/dependencies para iniciar as configurações e instalações de ferramentas e dependencias para melhor experiencia das boas práticas na Sprint 2
---------------------------------------------------------------------------------------------------------------------------------------------------

🧠 Liçõezinhas aprendidas — Sprint 1
- 📁 Organização é poder: Separar public/ e src/ desde o início trouxe clareza sobre o que será servido ao usuário e o que será processado pelo bundler.
- 🛠️ Parcel exige entrada clara: A configuração no package.json precisou ser ajustada para apontar o index.html dentro de public/, garantindo que o dev, build e watch:start funcionem corretamente:

"scripts": {
  "dev": "parcel public/index.html",
  "build": "parcel build public/index.html",
  "watch:start": "parcel public/index.html"
}

- ⚖️ A simplicidade ajuda: Evitar complexidade desnecessária (sem Webpack, Babel ou estrutura pesada) permitiu focar no conteúdo e na arquitetura visual.
- 📦 Escolhas iniciais moldam tudo: Começar com PNPM e Parcel já definiu a vibe leve e moderna do projeto.


---------------------------------------------------------------------------------------------------------------------------------------------------

🧩 Fixes e Ajustes Técnicos — Sprint 1
- 📎 Os arquivos docs/image-optimization.md e docs/setup.md foram previstos, mas ainda não foram criados durante a Sprint 1. Ficarão como backlog técnico para futura documentação detalhada.
- 📘 O arquivo SPRINTS.md começou como centralizador de toda a documentação, mas com o avanço da escrita e nível de detalhe, optou-se por separar em arquivos dedicados (sprint-1.md, sprint-2.md, etc.), organizados na pasta docs/sprints/.
- 🤔 Decisão de mover index.html para public/ foi inicialmente aplicada corretamente, mas o ajuste no package.json (apontando para public/index.html nos scripts) foi lembrado e implementado posteriormente — agora registrado como parte do fluxo de aprendizado.
🔧 Essas observações foram incorporadas para manter a fidelidade histórica do projeto e representar o processo real de evolução técnica.



