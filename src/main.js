// 🎨 Estilos globais (Tailwind primeiro, SCSS depois)
import './main.css'; // ✅ Tailwind via PostCSS
import './assets/styles/main.scss'; // ✅ Seu SCSS personalizado

// 🧩 Metatags dinâmicas
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
  appContainer.innerHTML = `${Sidebar()}${MainContent()}`;
}

// Inicializa a aplicação
App();
