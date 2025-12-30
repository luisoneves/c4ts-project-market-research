// src/types/project.ts
export interface Project {
  id: number;
  name: string;
  description: string;
  clientId: number;
  clientName: string;
  status: 'active' | 'completed' | 'on-hold';
  createdAt: string;
}
