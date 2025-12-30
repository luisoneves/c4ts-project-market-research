'use client';

import { useState, useEffect } from 'react';
import { Task, TaskPriority, TaskStatus, Project } from '@/types';
import { X, Plus, Trash2 } from 'lucide-react';
import SubtaskList from './SubtaskList';
import { MOCK_USERS } from '@/lib/mockData';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Partial<Task>) => void;
  onDelete?: (taskId: number) => void;
  task?: Task | null;
  projects: Project[];
  currentUserId: number;
}

export default function TaskModal({
  isOpen,
  onClose,
  onSave,
  onDelete,
  task,
  projects,
  currentUserId
}: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectId, setProjectId] = useState<number>(projects[0]?.id || 1);
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [assignedTo, setAssignedTo] = useState<number | undefined>(undefined);
  const [subtaskInput, setSubtaskInput] = useState('');

  const adminUsers = MOCK_USERS.filter(u => u.role === 'admin');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setProjectId(task.projectId);
      setStatus(task.status);
      setPriority(task.priority);
      setAssignedTo(task.assignedTo);
    } else {
      // Reset form for new task
      setTitle('');
      setDescription('');
      setProjectId(projects[0]?.id || 1);
      setStatus('todo');
      setPriority('medium');
      setAssignedTo(undefined);
    }
  }, [task, projects, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const assignedUser = adminUsers.find(u => u.id === assignedTo);

    const taskData: Partial<Task> = {
      ...(task && { id: task.id }),
      title,
      description,
      projectId,
      status,
      priority,
      assignedTo,
      assignedToName: assignedUser?.name,
      ...(task && { subtasks: task.subtasks }),
      ...(task && { progress: task.progress }),
      ...(!task && {
        createdBy: currentUserId,
        createdByName: MOCK_USERS.find(u => u.id === currentUserId)?.name || '',
        subtasks: [],
        progress: 0
      })
    };

    onSave(taskData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold">
            {task ? 'Editar Tarefa' : 'Nova Tarefa'}
          </h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows={3}
            />
          </div>

          {/* Project */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Projeto *
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status and Priority */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status *
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="todo">A Fazer</option>
                <option value="in_progress">Em Progresso</option>
                <option value="review">Em Revisão</option>
                <option value="done">Concluído</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prioridade *
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          {/* Assigned To */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Atribuído para
            </label>
            <select
              value={assignedTo || ''}
              onChange={(e) => setAssignedTo(e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="">Não atribuído</option>
              {adminUsers.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {/* Subtasks (only show for existing tasks) */}
          {task && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subtarefas
              </label>
              <SubtaskList
                subtasks={task.subtasks}
                readonly={true}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center pt-4 border-t">
            {task && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Tem certeza que deseja deletar esta tarefa?')) {
                    onDelete(task.id);
                    onClose();
                  }
                }}
                className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition flex items-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Deletar
              </button>
            ) : (
              <div></div>
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition"
              >
                {task ? 'Salvar' : 'Criar'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
