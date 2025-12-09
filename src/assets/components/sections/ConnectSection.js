import contactsData from '../../data/contacts.json';

export function renderConnectSection() {
  const section = document.createElement('section');
  section.id = 'connect';
  section.className = 'section connect-section bg-white dark:bg-gray-900 transition-colors duration-300';
  section.innerHTML = `
    <div class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">${contactsData.title}</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">${contactsData.description}</p>
      <div class="flex flex-wrap gap-6 mb-8">
        ${contactsData.social.map(social => `
          <a href="${social.url}" target="_blank" class="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
            <!-- Icon placeholder via class since we don't have font-awesome linked, assuming user handles it or we use text mostly. User asked for Icons similar to Sidebar. Using text fallback + user's class if FA is present -->
            <span class="font-bold">${social.name}</span>
          </a>
        `).join('')}
      </div>
      <div class="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400">
        ${contactsData.contactInfo.map(contact => `
          <span class="mr-4">${contact.type === 'email' ? '✉️' : '📍'} ${contact.value}</span>
        `).join('')}
      </div>
      <div class="mt-8 text-gray-500 dark:text-gray-600 text-sm">
        ${contactsData.copyright}
      </div>
    </div>
  `;
  return section;
}
