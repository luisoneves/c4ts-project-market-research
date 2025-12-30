'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth';
import { StorageService } from '@/lib/storage';
import { Task, Project } from '@/types';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import TaskDetailModal from '@/components/kanban/TaskDetailModal';
import { LogOut, Filter } from 'lucide-react';
import Image from 'next/image';

export default function DashboardClientPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    // Check authentication
    if (!AuthService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'client') {
      router.push('/login');
      return;
    }

    setUser(currentUser);

    // Initialize data
    StorageService.initData();
    loadData(currentUser.id);
  }, [router]);

  const loadData = (clientId: number) => {
    // Load only projects for this client
    const clientProjects = StorageService.getProjectsByClientId(clientId);
    setProjects(clientProjects);

    // Load only tasks for client's projects
    const allTasks = StorageService.getTasks();
    const projectIds = clientProjects.map(p => p.id);
    const clientTasks = allTasks.filter(t => projectIds.includes(t.projectId));
    setTasks(clientTasks);
  };

  const handleLogout = () => {
    AuthService.logout();
    router.push('/login');
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const filteredTasks = selectedProject === 'all'
    ? tasks
    : tasks.filter(t => t.projectId === selectedProject);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 relative">
                <Image
                  src="/assets/logo/logo.svg"
                  alt="C4TS Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Meus Projetos</h1>
                <p className="text-sm text-gray-600">Bem-vindo, {user.name}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Toolbar */}
        <div className="mb-6 flex items-center gap-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">Todos os Projetos</option>
            {projects.map(project => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Projects Info */}
        {projects.length > 0 && (
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow p-4 border-l-4 border-purple-500">
                <h3 className="font-semibold text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    project.status === 'active' ? 'bg-green-100 text-green-800' :
                    project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status === 'active' ? 'Ativo' : 
                     project.status === 'completed' ? 'Concluído' : 'Em Espera'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-gray-500">
            <p className="text-sm text-gray-600">A Fazer</p>
            <p className="text-2xl font-bold text-gray-900">
              {filteredTasks.filter(t => t.status === 'todo').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
            <p className="text-sm text-gray-600">Em Progresso</p>
            <p className="text-2xl font-bold text-blue-600">
              {filteredTasks.filter(t => t.status === 'in_progress').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500">
            <p className="text-sm text-gray-600">Em Revisão</p>
            <p className="text-2xl font-bold text-yellow-600">
              {filteredTasks.filter(t => t.status === 'review').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4 border-l-4 border-green-500">
            <p className="text-sm text-gray-600">Concluído</p>
            <p className="text-2xl font-bold text-green-600">
              {filteredTasks.filter(t => t.status === 'done').length}
            </p>
          </div>
        </div>

        {/* Kanban Board - Read Only */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          {filteredTasks.length > 0 ? (
            <KanbanBoard
              tasks={filteredTasks}
              onTaskClick={handleTaskClick}
              isDraggable={false}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Nenhuma tarefa encontrada</p>
              <p className="text-gray-400 text-sm mt-2">
                Suas tarefas aparecerão aqui quando forem criadas
              </p>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Modo de visualização:</strong> Você pode visualizar o progresso das tarefas, 
            mas não pode criar, editar ou mover tarefas. Entre em contato com a equipe para alterações.
          </p>
        </div>
      </main>

      {/* Task Detail Modal - Read Only */}
      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        readonly={true}
      />
    </div>
  );
}
