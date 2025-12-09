import questionsData from '../../data/questions.json';

export function renderQuestionsSection() {
  const section = document.createElement('section');
  section.id = 'questions';
  section.className = 'section questions-section bg-gray-50 dark:bg-gray-800 transition-colors duration-300';
  section.innerHTML = `
    <div class="container mx-auto px-6 py-12">
      <h2 class="text-3xl font-bold mb-4 text-gray-900 dark:text-white">${questionsData.title}</h2>
      <p class="text-lg text-gray-600 dark:text-gray-300 mb-8">${questionsData.subtitle}</p>
      <form action="${questionsData.formAction}" method="POST" class="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
        ${questionsData.fields.map(field => {
    const labelClass = "block mb-2 text-gray-700 dark:text-gray-200";
    const inputClass = "w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none";

    if (field.type === 'select') {
      return `
              <label class="block mb-4">
                <span class="${labelClass}">${field.label}</span>
                <select name="${field.name}" ${field.required ? 'required' : ''} class="${inputClass}">
                  ${field.options.map(opt => `<option value="${opt.toLowerCase()}">${opt}</option>`).join('')}
                </select>
              </label>
            `;
    } else if (field.type === 'textarea') {
      return `
              <label class="block mb-4">
                <span class="${labelClass}">${field.label}</span>
                <textarea name="${field.name}" class="${inputClass}" rows="3" ${field.required ? 'required' : ''}></textarea>
              </label>
            `;
    } else {
      return `
              <label class="block mb-4">
                <span class="${labelClass}">${field.label}</span>
                <input type="${field.type}" name="${field.name}" placeholder="${field.placeholder || ''}" ${field.required ? 'required' : ''} class="${inputClass}" />
              </label>
            `;
    }
  }).join('')}
        <button type="submit" class="bg-green-600 dark:bg-green-500 text-white px-6 py-3 rounded hover:bg-green-700 dark:hover:bg-green-600 w-full transition-colors font-semibold">
          ${questionsData.submitLabel}
        </button>
      </form>
    </div>
  `;
  return section;
}
