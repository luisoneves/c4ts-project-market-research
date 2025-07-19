// src/assets/components/MainContent.js

import { ServicesSection } from './sections/ServicesSection.js';
import { ProjectsSection } from './sections/ProjectsSection.js';
import { StudioSection } from './sections/StudioSection.js';
import { QuestionsSection } from './sections/QuestionsSection.js';
import { ConnectSection } from './sections/ConnectSection.js';

export function MainContent() {
  return `
    <main class="w-2/3 grid grid-cols-2 gap-0">
      ${ServicesSection()}
      ${ProjectsSection()}
      ${StudioSection()}
      ${QuestionsSection()}
      ${ConnectSection()}
    </main>
  `;
}
