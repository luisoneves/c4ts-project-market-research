// src/assets/components/MainContent.js

import { renderServicesSection } from './sections/ServicesSection.js';
import { renderProjectsSection } from './sections/ProjectsSection.js';
import { renderStudioSection } from './sections/StudioSection.js';
import { renderQuestionsSection } from './sections/QuestionsSection.js';
import { renderConnectSection } from './sections/ConnectSection.js';

export function renderMainContent() {
  const main = document.createElement('main');
  // Changed w-2/3 to generic and flexible, keeping grid layout but ensuring responsiveness
  // The sidebar is fixed w-80 (320px). Main content needs margin-left 320px.
  main.className = 'ml-80 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300';

  // Append sections
  main.appendChild(renderStudioSection());
  main.appendChild(renderServicesSection()); // "Como podemos te ajudar"
  main.appendChild(renderProjectsSection()); // "Nossos projetos"
  main.appendChild(renderQuestionsSection()); // "Formulário"
  main.appendChild(renderConnectSection()); // "Contato"

  return main;
}
