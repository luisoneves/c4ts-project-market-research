import { User, Project, Task } from '@/types';

export const MOCK_USERS: User[] = [
  {
    id: 1,
    name: 'Luis Neves',
    email: 'luis@c4ts.com',
    password: '123456',
    role: 'admin'
  },
  {
    id: 2,
    name: 'Pedro Corgnatti',
    email: 'pedro@c4ts.com',
    password: '123456',
    role: 'admin'
  },
  {
    id: 3,
    name: 'Nicholas Fernandes',
    email: 'nicholas@c4ts.com',
    password: '123456',
    role: 'admin'
  },
  {
    id: 4,
    name: 'Naka',
    email: 'naka@cliente.com',
    password: '123456',
    role: 'client'
  }
];

export const MOCK_PROJECTS: Project[] = [
  {
    id: 1,
    name: 'Projeto Website Naka',
    description: 'Desenvolvimento de website institucional completo',
    clientId: 4,
    clientName: 'Naka',
    status: 'active',
    createdAt: new Date('2025-01-15').toISOString()
  },
  {
    id: 2,
    name: 'Sistema ERP Empresa X',
    description: 'Sistema de gestão empresarial',
    clientId: 4,
    clientName: 'Naka',
    status: 'active',
    createdAt: new Date('2025-02-01').toISOString()
  }
];

export const MOCK_TASKS: Task[] = [
  {
    id: 1,
    projectId: 1,
    title: 'Design da Homepage',
    description: 'Criar layout responsivo da página inicial com identidade visual moderna',
    status: 'in_progress',
    priority: 'high',
    createdBy: 1,
    createdByName: 'Luis Neves',
    assignedTo: 1,
    assignedToName: 'Luis Neves',
    progress: 60,
    subtasks: [
      { id: 1, taskId: 1, description: 'Criar wireframes', isCompleted: true },
      { id: 2, taskId: 1, description: 'Definir paleta de cores', isCompleted: true },
      { id: 3, taskId: 1, description: 'Desenvolver protótipo no Figma', isCompleted: true },
      { id: 4, taskId: 1, description: 'Revisar com cliente', isCompleted: false },
      { id: 5, taskId: 1, description: 'Ajustes finais', isCompleted: false }
    ],
    createdAt: new Date('2025-01-16').toISOString(),
    updatedAt: new Date('2025-01-20').toISOString()
  },
  {
    id: 2,
    projectId: 1,
    title: 'Implementar Backend API',
    description: 'Configurar API REST com autenticação e endpoints necessários',
    status: 'todo',
    priority: 'high',
    createdBy: 2,
    createdByName: 'Pedro Corgnatti',
    assignedTo: 2,
    assignedToName: 'Pedro Corgnatti',
    progress: 0,
    subtasks: [
      { id: 6, taskId: 2, description: 'Configurar Express.js', isCompleted: false },
      { id: 7, taskId: 2, description: 'Implementar autenticação JWT', isCompleted: false },
      { id: 8, taskId: 2, description: 'Criar endpoints de usuários', isCompleted: false },
      { id: 9, taskId: 2, description: 'Documentar API', isCompleted: false }
    ],
    createdAt: new Date('2025-01-17').toISOString(),
    updatedAt: new Date('2025-01-17').toISOString()
  },
  {
    id: 3,
    projectId: 1,
    title: 'Testes e QA',
    description: 'Realizar testes de qualidade e correção de bugs',
    status: 'todo',
    priority: 'medium',
    createdBy: 3,
    createdByName: 'Nicholas Fernandes',
    assignedTo: 3,
    assignedToName: 'Nicholas Fernandes',
    progress: 0,
    subtasks: [
      { id: 10, taskId: 3, description: 'Testes unitários', isCompleted: false },
      { id: 11, taskId: 3, description: 'Testes de integração', isCompleted: false },
      { id: 12, taskId: 3, description: 'Testes E2E', isCompleted: false }
    ],
    createdAt: new Date('2025-01-18').toISOString(),
    updatedAt: new Date('2025-01-18').toISOString()
  },
  {
    id: 4,
    projectId: 1,
    title: 'Deploy em Produção',
    description: 'Configurar CI/CD e fazer deploy na Vercel',
    status: 'done',
    priority: 'high',
    createdBy: 1,
    createdByName: 'Luis Neves',
    progress: 100,
    subtasks: [
      { id: 13, taskId: 4, description: 'Configurar Vercel', isCompleted: true },
      { id: 14, taskId: 4, description: 'Configurar variáveis de ambiente', isCompleted: true },
      { id: 15, taskId: 4, description: 'Deploy inicial', isCompleted: true }
    ],
    createdAt: new Date('2025-01-10').toISOString(),
    updatedAt: new Date('2025-01-12').toISOString()
  }
];
