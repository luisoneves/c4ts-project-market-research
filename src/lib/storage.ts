import { Project, Task, Subtask } from '@/types';
import { MOCK_PROJECTS, MOCK_TASKS } from './mockData';

const PROJECTS_KEY = 'c4ts_projects';
const TASKS_KEY = 'c4ts_tasks';

export class StorageService {
  /**
   * Initialize data if not exists
   * ✅ Chamado no useEffect do layout.client.tsx
   */
  static initData(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(PROJECTS_KEY)) {
      localStorage.setItem(PROJECTS_KEY, JSON.stringify(MOCK_PROJECTS));
    }

    if (!localStorage.getItem(TASKS_KEY)) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(MOCK_TASKS));
    }
  }

  // ========== Projects ==========
  static getProjects(): Project[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getProjectsByClientId(clientId: number): Project[] {
    return this.getProjects().filter(p => p.clientId === clientId);
  }

  static getProjectById(id: number): Project | null {
    return this.getProjects().find(p => p.id === id) || null;
  }

  static createProject(project: Omit<Project, 'id' | 'createdAt'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...project,
      id: Math.max(0, ...projects.map(p => p.id)) + 1,
      createdAt: new Date().toISOString()
    };
    projects.push(newProject);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
    return newProject;
  }

  // ========== Tasks ==========
  static getTasks(): Task[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  }

  static getTasksByProjectId(projectId: number): Task[] {
    return this.getTasks().filter(t => t.projectId === projectId);
  }

  static getTasksByClientId(clientId: number): Task[] {
    const projects = this.getProjectsByClientId(clientId);
    const projectIds = projects.map(p => p.id);
    return this.getTasks().filter(t => projectIds.includes(t.projectId));
  }

  static getTaskById(id: number): Task | null {
    return this.getTasks().find(t => t.id === id) || null;
  }

  static createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Task {
    const tasks = this.getTasks();
    const newTask: Task = {
      ...task,
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return newTask;
  }

  static updateTask(id: number, updates: Partial<Task>): Task | null {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === id);
    
    if (index === -1) return null;

    tasks[index] = {
      ...tasks[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return tasks[index];
  }

  static updateTaskStatus(id: number, status: Task['status']): Task | null {
    return this.updateTask(id, { status });
  }

  static toggleSubtask(taskId: number, subtaskId: number): Task | null {
    const task = this.getTaskById(taskId);
    if (!task) return null;

    const subtasks = task.subtasks.map(st =>
      st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
    );

    const completed = subtasks.filter(st => st.isCompleted).length;
    const progress = subtasks.length > 0 
      ? Math.round((completed / subtasks.length) * 100) 
      : 0;

    return this.updateTask(taskId, { subtasks, progress });
  }

  static addSubtask(taskId: number, description: string): Task | null {
    const task = this.getTaskById(taskId);
    if (!task) return null;

    const newSubtask: Subtask = {
      id: Math.max(0, ...task.subtasks.map(st => st.id)) + 1,
      taskId,
      description,
      isCompleted: false
    };

    const subtasks = [...task.subtasks, newSubtask];
    const completed = subtasks.filter(st => st.isCompleted).length;
    const progress = Math.round((completed / subtasks.length) * 100);

    return this.updateTask(taskId, { subtasks, progress });
  }

  static deleteTask(id: number): boolean {
    const tasks = this.getTasks().filter(t => t.id !== id);
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    return true;
  }

  static clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(TASKS_KEY);
  }
}
