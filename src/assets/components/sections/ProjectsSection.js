import projectsData from '../../data/projects.json';

export function renderProjectsSection() {
  const section = document.createElement('section');
  section.id = 'projects';
  section.className = 'section projects-section bg-white dark:bg-gray-900 transition-colors duration-300';
  section.innerHTML = `
    <div class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">${projectsData.title}</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${projectsData.projects.map(project => `
          <div class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-100 dark:border-gray-700">
            <h3 class="text-xl font-semibold mb-2 text-gray-800 dark:text-white">${project.name}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-3">${project.description}</p>
            <div class="flex justify-between text-sm">
              <span class="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">${project.type}</span>
              <span class="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded">${project.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
  return section;
}
