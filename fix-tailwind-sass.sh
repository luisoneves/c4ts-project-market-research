#!/bin/bash
set -euo pipefail

echo "🧹 Limpando cache do Parcel..."
rm -rf .parcel-cache

echo "📄 Criando src/main.css com @import \"tailwindcss\"..."
cat > src/main.css <<'EOF'
@import "tailwindcss";
EOF

echo "✏️  Atualizando src/main.js para usar main.css..."
cat > src/main.js <<'EOF'
// 🎨 Estilos globais (Tailwind primeiro, SCSS depois)
import './main.css';                  // ✅ Tailwind via PostCSS
import './assets/styles/main.scss';   // ✅ Seu SCSS personalizado

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
EOF

echo "✂️  Removendo @tailwind do src/assets/styles/main.scss..."
# Mantém só os @use e seu CSS personalizado
awk '
  !/^@tailwind/ && !/^\/\*.*tailwind.*\*\// && !/^\/\/.*tailwind/
' src/assets/styles/main.scss > /tmp/main.scss.tmp && \
mv /tmp/main.scss.tmp src/assets/styles/main.scss

# Garante que não sobrou nenhuma linha vazia no início
sed -i '/^[[:space:]]*$/d' src/assets/styles/main.scss

echo "✅ Pronto! Agora execute:"
echo "   bun run dev"
