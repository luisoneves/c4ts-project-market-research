// 🎨 Estilos globais (Tailwind primeiro, SCSS depois)
import './main.css'; // ✅ Tailwind via PostCSS
import './assets/styles/main.scss'; // ✅ Seu SCSS personalizado

// 🧩 Metatags dinâmicas
import { MetaTags } from './assets/components/meta/MetaTags.js';
document.head.innerHTML += MetaTags();

// 🧩 Componentes Estruturais
import { renderSidebar } from './assets/components/Sidebar.js';
import { renderMainContent } from './assets/components/MainContent.js';

// Função para montar o layout da aplicação
function App() {
  const appContainer = document.getElementById('app');
  if (!appContainer) {
    console.error('Elemento #app não encontrado no DOM.');
    return;
  }

  // Clear container
  appContainer.innerHTML = '';

  // Append Components
  appContainer.appendChild(renderSidebar());
  appContainer.appendChild(renderMainContent());
}

// Inicializa a aplicação
App();
