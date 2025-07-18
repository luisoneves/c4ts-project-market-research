// Importa os estilos
import './assets/styles/tailwindcss.css';
import './assets/styles/main.scss';

// Seleciona o ponto de montagem
const app = document.getElementById('app');

// Cria o conteúdo
app.innerHTML = `
  <h1 class="text-3xl font-bold text-blue-600 underline">
    Parcel Vanilla App
  </h1>
  <p>Edit <code>src/index.html</code> to get started!</p>
  <h2 class="text-xl text-blue-600 underline mt-4">
    Hello Tailwind!
  </h2>
`;
