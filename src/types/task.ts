export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Subtask {
  id: number;
  taskId: number;
  description: string;
  isCompleted: boolean;
}

export interface Task {
  id: number;
  projectId: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  createdBy: number;
  createdByName: string;
  assignedTo?: number;
  assignedToName?: string;
  progress: number;
  subtasks: Subtask[];
  createdAt: string;
  updatedAt: string;
}
