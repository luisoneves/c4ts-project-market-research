'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task, Project } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { StorageService } from '@/lib/storage';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { TaskModal } from '@/components/kanban/TaskModal';
import { Button } from '@/components/ui/Button';
import { LogOut, Filter } from 'lucide-react';

export default function DashboardClientPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterProject, setFilterProject] = useState<number | 'all'>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && user.role !== 'client') {
      router.push('/dashboard-admin');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'client') {
      const clientTasks = StorageService.getTasksByClientId(user.id);
      const clientProjects = StorageService.getProjectsByClientId(user.id);
      setTasks(clientTasks);
      setProjects(clientProjects);
      setFilteredTasks(clientTasks);
    }
  }, [user]);

  useEffect(() => {
    let filtered = [...tasks];

    if (filterProject !== 'all') {
      filtered = filtered.filter(t => t.projectId === filterProject);
    }

    setFilteredTasks(filtered);
  }, [tasks, filterProject]);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'client') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Meus Projetos</h1>
              <p className="text-sm text-gray-600 mt-1">Bem-vindo, {user.name}!</p>
            </div>
            <Button onClick={logout} variant="secondary" size="md">
              <LogOut size={20} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      {/* Projects Summary */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 rounded-lg p-4 text-white">
              <p className="text-sm opacity-90">Total de Projetos</p>
              <p className="text-3xl font-bold mt-1">{projects.length}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg p-4 text-white">
              <p className="text-sm opacity-90">Tarefas em Progresso</p>
              <p className="text-3xl font-bold mt-1">
                {tasks.filter(t => t.status === 'in_progress').length}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-lg p-4 text-white">
              <p className="text-sm opacity-90">Tarefas Concluídas</p>
              <p className="text-3xl font-bold mt-1">
                {tasks.filter(t => t.status === 'done').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Filter size={20} className="text-gray-600" />
            <div className="flex gap-4 flex-1">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Projeto:</label>
                <select
                  value={filterProject}
                  onChange={(e) => setFilterProject(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Todos</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ml-auto text-sm text-gray-600">
                Total: {filteredTasks.length} tarefas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board (Read-only) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <p className="text-sm text-blue-800">
            ℹ️ <strong>Visualização:</strong> Você pode visualizar o progresso das suas tarefas, mas apenas os administradores podem editar.
          </p>
        </div>

        <div className="h-[calc(100vh-400px)]">
          <KanbanBoard
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
            isDragDisabled={true}
          />
        </div>
      </main>

      {/* Task Modal (Read-only) */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        projects={projects}
        onSave={() => {}}
        readonly={true}
      />
    </div>
  );
}
