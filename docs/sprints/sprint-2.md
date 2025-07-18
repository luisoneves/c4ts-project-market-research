🟡 Sprint 2 — Configuração de Ambiente e Boas Práticas

⏱ Período: Após estruturação da base na Sprint 1

🎯 Objetivo: Implementar ferramentas que garantem qualidade de código, consistência visual, automação e escalabilidade — configurando o mindset técnico antes de começar o layout.

⚙️ Ferramentas e Configurações Implementadas
✅ ESLint + Prettier
Padrões de código estabelecidos para manter consistência e evitar erros sutis.

- eslint.config.mjs define regras de linting modernas
- .prettierrc formata código automaticamente com base nas convenções do projeto
- Integração entre os dois previne conflitos de estilo

✅ Husky + Pre-commit
Automatiza o fluxo antes de cada commit, garantindo qualidade.

- Criado o hook pre-commit que executa pnpm lint:fix
- Evita envio de código com erros de estilo ou padrão

✅ PostCSS + TailwindCSS
Estilização utilitária e modular, adaptada ao Parcel.

- Criados os arquivos postcss.config.js, postcss.config.mjs e .postcssrc
- Observação técnica: devido ao comportamento do Parcel, foi necessário testar qual arquivo estava de fato sendo utilizado — o mais funcional foi postcss.config.js
- Criado o arquivo tailwindcss.css com:

@import "tailwindcss";

Essa separação foi essencial para permitir a importação do Tailwind via .css, enquanto o restante do estilo é tratado via SCSS — mantendo modularidade e compatibilidade com a pipeline de build.

🧠 Decisões e Ajustes Técnicos
🔍 Parcel exigiu adaptação específica
- O bundler Parcel não trata bem a mistura direta de SCSS e Tailwind, então foi necessário separar tailwindcss.css como arquivo utilitário independente.
- O arquivo principal main.scss continua responsável por variáveis, reset, layout e componentes.
🚫 Desabilitando o CSpell
- Apesar de configurar o cspell.json, foi decidido desativar o CSpell diretamente via .vscode/settings.json para não estender demais a sprint.
- Ainda assim, o arquivo cspell.json permanece versionado como base futura.

🗂️ Arquivos Criados/Modificados na Sprin

.husky/
├── install.mjs
├── pre-commit

.eslint.config.mjs
.prettierrc
.cspell.json
.postcssrc
postcss.config.js
postcss.config.mjs
tailwind.config.js
.vscode/settings.json

O conteúdo de .gitattributes, .gitignore, tailwind.config.js e demais arquivos podem ser conferidos nos commits da branch setup/dependencies.

🔄 Encerramento da Sprint
- Branch setup/dependencies criada para esta fase
- Testes executados para validação do ambiente
- Pull Request criado e mesclado via GitHub
- Branch excluída após merge para evitar trabalho duplicado
- Projeto sincronizado localmente com git pull origin main
- Sprint finalizada com ambiente preparado e base sólida para começar a Sprint 3: construção visual

--------------------------------------------------------------------------------------------------------------------------------------

🧠 Liçõezinhas aprendidas — Sprint 2
- 🧪 Em progresso: Foi criado `postcss.config.js`, `postcss.config.mjs` e `.postcssrc`, mas ainda será testado qual realmente é reconhecido pelo Parcel. Aparentemente `postcss.config.js` funciona, mas isso será confirmado na próxima sprint.
- 🎨 Separação entre SCSS e Tailwind foi essencial: Parcel não lida bem com mistura direta; usar tailwindcss.css como ponte independente, com @import "tailwindcss";, resolveu elegantemente.
- 🧼 Automatizar é prevenir: O Husky com pre-commit garante que o código esteja limpo antes de cada commit. Menos erros, menos vergonha.
- 📕 Nem tudo precisa continuar: O cspell.json foi configurado, mas optamos por desativar via .vscode/settings.json para simplificar. O importante é registrar essa escolha e manter a opção viva para o futuro.
- 🧩 Testar é parte do processo: Muitos arquivos foram criados e testados antes de decidir quais funcionavam melhor — documentação clara dessas decisões evita retrabalho e mostra maturidade técnica.


--------------------------------------------------------------------------------------------------------------------------------------

🔧 Fixes e Ajustes Técnicos (Retrospectiva)
- ❗️ Foram criados os arquivos postcss.config.js, postcss.config.mjs e .postcssrc, mas ainda não foi validado qual é realmente reconhecido pelo Parcel. Aparentemente o postcss.config.js funciona, mas será confirmado na Sprint 3.
- 🚫 O cspell.json foi configurado mas optamos por desabilitar o CSpell via .vscode/settings.json. O arquivo permanece como referência futura.
- 📂 Alguns arquivos e ajustes foram lembrados após o encerramento técnico da sprint, como:
- Refinamento do .gitignore
- Ajuste de estilo no tailwind.config.js
- Atualizações manuais em pastas do projeto (logo/, favicon/ etc.)
📌 Esses pontos foram incluídos aqui como correção documental para manter o histórico fiel e transparente.



