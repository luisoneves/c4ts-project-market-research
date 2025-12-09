import studioData from '../../data/studio.json';

export function renderStudioSection() {
  const section = document.createElement('section');
  section.id = 'studio';
  section.className = 'section studio-section bg-white dark:bg-gray-900 transition-colors duration-300';
  section.innerHTML = `
    <div class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">${studioData.title}</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-6">${studioData.tagline}</p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${studioData.description.map(paragraph => `<p class="text-gray-700 dark:text-gray-400">${paragraph}</p>`).join('')}
      </div>
      <div class="mt-8">
        <h3 class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Nossos Valores</h3>
        <ul class="list-disc pl-6 space-y-2">
          ${studioData.values.map(value => `<li class="text-gray-700 dark:text-gray-400">${value}</li>`).join('')}
        </ul>
      </div>
    </div>
  `;
  return section;
}
