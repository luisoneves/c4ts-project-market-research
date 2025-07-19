# 🧑‍💻 Portfólio Pessoal — Luis Neves

Este projeto é um portfólio pessoal desenvolvido com foco em organização, escalabilidade e boas práticas de front-end. A proposta inicial é apresentar meus projetos concluídos, formação acadêmica e formas de contato. Com o tempo, ele será expandido para incluir projetos em andamento, feedbacks de clientes e funcionalidades institucionais.

---

## 🚀 Tecnologias Utilizadas

- [Parcel](https://parceljs.org/) — Bundler leve e rápido
- [PNPM](https://pnpm.io/) — Gerenciador de pacotes eficiente
- [Sass](https://sass-lang.com/) *(em breve)*
- [TailwindCSS](https://tailwindcss.com/) *(em breve)*
- JavaScript

---

## 📦 Instalação e Execução

Para instalar as dependências e rodar o projeto localmente:

```bash
pnpm install
pnpm run dev

📁 Estrutura do Projeto
Organizado por seções, componentes reutilizáveis e dados em JSON para facilitar manutenção e escalabilidade.

├── public/
│   ├── assets/
│   │   └── favicon/
│   │   └── logo/
│   └── index.html
├── src/
│   ├── assets/
│   │   ├── components/
│   │   ├── data/
│   │   ├── styles/
│   └── main.js
├── docs/
│   ├── image-optimization.md
│   └── setup.md
├── .gitignore
├── README.md
├── TODO.md


📍 Status do Projet
Em desenvolvimento — estrutura inicial concluída e organização definida

🌐 Deploy
O projeto está hospedado no Vercel (link será adicionado futuramente)

🧠 Observações
Este projeto é parte do meu processo de aprendizado e evolução como desenvolvedor front-end. A estrutura foi pensada para ser leve, escalável e adaptável a futuras integrações com backend e autenticação.

### 🧠 Arquitetura e Decisões Técnicas

**Uso de Imports Relativos vs. Path Aliases**

Durante o desenvolvimento deste projeto, foi realizada uma investigação aprofundada para implementar *path aliases* (ex: `@styles/...`) utilizando a stack escolhida (Parcel + pnpm), com o objetivo de melhorar a legibilidade e manutenção do código.

Foram testadas múltiplas abordagens, incluindo a configuração nativa via `package.json` e a integração com o plugin da comunidade `parcel-resolver-tspaths`. Após uma série de testes controlados e depuração sistemática, que incluiu a limpeza completa de caches e dependências, concluiu-se o seguinte:

**Diagnóstico:** Existe uma incompatibilidade não documentada entre a versão do Parcel (v2.15.4), a estrutura de dependências do pnpm, e o resolvedor de aliases. O Parcel consistentemente falhou em inicializar o plugin de resolução, recorrendo ao seu resolvedor padrão que não suporta aliases.

**Decisão:** Como resultado, foi tomada a decisão técnica de aderir ao uso de imports relativos (`../`). Esta abordagem, embora mais verbosa, garante 100% de estabilidade, previsibilidade e manutenibilidade do build do projeto, que são princípios fundamentais para um ambiente de produção.

Esta jornada de depuração está documentada como um case prático de diagnóstico de ferramentas e tomada de decisão de arquitetura baseada em evidências.
