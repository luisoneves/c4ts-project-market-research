'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthService } from '@/lib/auth';
import { StorageService } from '@/lib/storage';
import { Task, Project, TaskStatus } from '@/types';
import KanbanBoard from '@/components/kanban/KanbanBoard';
import TaskModal from '@/components/kanban/TaskModal';
import TaskDetailModal from '@/components/kanban/TaskDetailModal';
import { LogOut, Plus, Filter } from 'lucide-react';
import Image from 'next/image';

export default function DashboardAdminPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | 'all'>('all');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    // Check authentication
    if (!AuthService.isAuthenticated()) {
      router.push('/login');
      return;
    }

    const currentUser = AuthService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      router.push('/login');
      return;
    }

    setUser(currentUser);

    // Initialize data
    StorageService.initData();
    loadData();
  }, [router]);

  const loadData = () => {
    setProjects(StorageService.getProjects());
    setTasks(StorageService.getTasks());
  };

  const handleLogout = () => {
    AuthService.logout();
    router.push('/login');
  };

  const handleStatusChange = (taskId: number, newStatus: TaskStatus) => {
    StorageService.updateTaskStatus(taskId, newStatus);
    loadData();
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (taskData.id) {
      // Update existing task
      StorageService.updateTask(taskData.id, taskData);
    } else {
      // Create new task
      StorageService.createTask(taskData as any);
    }
    loadData();
    setEditingTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    StorageService.deleteTask(taskId);
    loadData();
  };

  const handleToggleSubtask = (taskId: number, subtaskId: number) => {
    StorageService.toggleSubtask(taskId, subtaskId);
    loadData();
    // Update selected task for detail modal
    const updatedTask = StorageService.getTaskById(taskId);
    if (updatedTask) {
      setSelectedTask(updatedTask);
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
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
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
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
        <div className="mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex items-center gap-4">
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

          <button
            onClick={() => {
              setEditingTask(null);
              setIsTaskModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition shadow-lg hover:shadow-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Nova Tarefa</span>
          </button>
        </div>

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

        {/* Kanban Board */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <KanbanBoard
            tasks={filteredTasks}
            onTaskClick={handleTaskClick}
            onStatusChange={handleStatusChange}
            isDraggable={true}
          />
        </div>
      </main>

      {/* Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
        task={editingTask}
        projects={projects}
        currentUserId={user.id}
      />

      <TaskDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        onToggleSubtask={handleToggleSubtask}
        onEdit={handleEditTask}
        readonly={false}
      />
    </div>
  );
}
