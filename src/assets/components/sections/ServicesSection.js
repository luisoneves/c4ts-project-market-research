import servicesData from '../../data/services.json';

export function renderServicesSection() {
  const section = document.createElement('section');
  section.id = 'services';
  section.className = 'section services-section bg-gray-50 dark:bg-gray-800 transition-colors duration-300';
  section.innerHTML = `
    <div class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">${servicesData.title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${servicesData.services.map(service => `
          <div class="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">${service.title}</h3>
            <p class="text-gray-600 dark:text-gray-300 mb-4">${service.description}</p>
            <button class="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              ${service.cta}
            </button>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return section;
}
