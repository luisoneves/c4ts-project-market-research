// 🎨 Estilos globais
import './assets/styles/tailwindcss.css';
import './assets/styles/main.scss';

// 🧩 Metatags dinâmicas
// CORRIGIDO: Removi o /meta/ do caminho
import { MetaTags } from './assets/components/meta/MetaTags.js';
document.head.innerHTML += MetaTags();

// 🧩 Componentes Estruturais
import { Sidebar } from './assets/components/Sidebar.js';
import { MainContent } from './assets/components/MainContent.js';

// Função para montar o layout da aplicação
function App() {
  const appContainer = document.getElementById('app');

  if (!appContainer) {
    console.error('Elemento #app não encontrado no DOM.');
    return;
  }

  // Injeta os componentes principais
  appContainer.innerHTML = `
    ${Sidebar()}
    ${MainContent()}
  `;
}

// Inicializa a aplicação
App();
