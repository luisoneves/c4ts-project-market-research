'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus, Project } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { StorageService } from '@/lib/storage';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';
import { TaskModal } from '@/components/kanban/TaskModal';
import { Button } from '@/components/ui/Button';
import { LogOut, Plus, Filter } from 'lucide-react';

export default function DashboardAdminPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterProject, setFilterProject] = useState<number | 'all'>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    } else if (user && user.role !== 'admin') {
      router.push('/dashboard-client');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.role === 'admin') {
      const allTasks = StorageService.getTasks();
      const allProjects = StorageService.getProjects();
      setTasks(allTasks);
      setProjects(allProjects);
      setFilteredTasks(allTasks);
    }
  }, [user]);

  useEffect(() => {
    let filtered = [...tasks];

    if (filterProject !== 'all') {
      filtered = filtered.filter(t => t.projectId === filterProject);
    }

    if (filterPriority !== 'all') {
      filtered = filtered.filter(t => t.priority === filterPriority);
    }

    setFilteredTasks(filtered);
  }, [tasks, filterProject, filterPriority]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const taskId = parseInt(result.draggableId.replace('task-', ''));
    const newStatus = result.destination.droppableId as TaskStatus;

    const updatedTask = StorageService.updateTaskStatus(taskId, newStatus);
    
    if (updatedTask) {
      setTasks(StorageService.getTasks());
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleNewTask = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (taskData: Partial<Task>) => {
    if (selectedTask) {
      // Update existing task
      StorageService.updateTask(selectedTask.id, taskData);
    } else {
      // Create new task
      if (user) {
        StorageService.createTask({
          projectId: taskData.projectId!,
          title: taskData.title!,
          description: taskData.description || '',
          status: taskData.status || 'todo',
          priority: taskData.priority || 'medium',
          createdBy: user.id,
          createdByName: user.name,
          assignedTo: taskData.assignedTo,
          assignedToName: taskData.assignedToName,
          progress: taskData.progress || 0,
          subtasks: taskData.subtasks || []
        });
      }
    }

    setTasks(StorageService.getTasks());
    setIsModalOpen(false);
    setSelectedTask(null);
  };

  const handleDeleteTask = (taskId: number) => {
    StorageService.deleteTask(taskId);
    setTasks(StorageService.getTasks());
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-sm text-gray-600 mt-1">Bem-vindo, {user.name}!</p>
            </div>
            <div className="flex items-center gap-3">
              <Button onClick={handleNewTask} variant="primary" size="md">
                <Plus size={20} className="mr-2" />
                Nova Tarefa
              </Button>
              <Button onClick={logout} variant="secondary" size="md">
                <LogOut size={20} className="mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

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

              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">Prioridade:</label>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value)}
                  className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Todas</option>
                  <option value="high">Alta</option>
                  <option value="medium">Média</option>
                  <option value="low">Baixa</option>
                </select>
              </div>

              <div className="ml-auto text-sm text-gray-600">
                Total: {filteredTasks.length} tarefas
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="h-[calc(100vh-280px)]">
          <KanbanBoard
            tasks={filteredTasks}
            onDragEnd={handleDragEnd}
            onTaskClick={handleTaskClick}
          />
        </div>
      </main>

      {/* Task Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTask(null);
        }}
        task={selectedTask}
        projects={projects}
        onSave={handleSaveTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}
