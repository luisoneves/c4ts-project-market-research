'use client';

import { Task } from '@/types';
import { X, Calendar, User, Edit } from 'lucide-react';
import SubtaskList from './SubtaskList';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onToggleSubtask?: (taskId: number, subtaskId: number) => void;
  onEdit?: (task: Task) => void;
  readonly?: boolean;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800'
};

const statusLabels = {
  todo: 'A Fazer',
  in_progress: 'Em Progresso',
  review: 'Em Revisão',
  done: 'Concluído'
};

export default function TaskDetailModal({
  isOpen,
  onClose,
  task,
  onToggleSubtask,
  onEdit,
  readonly = false
}: TaskDetailModalProps) {
  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-4 flex justify-between items-center rounded-t-2xl">
          <h2 className="text-xl font-bold">Detalhes da Tarefa</h2>
          <div className="flex gap-2">
            {!readonly && onEdit && (
              <button
                onClick={() => {
                  onEdit(task);
                  onClose();
                }}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
                title="Editar tarefa"
              >
                <Edit className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900">{task.title}</h3>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${priorityColors[task.priority]}`}>
              Prioridade: {task.priority}
            </span>
            <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {statusLabels[task.status]}
            </span>
          </div>

          {/* Description */}
          {task.description && (
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Descrição</h4>
              <p className="text-gray-600">{task.description}</p>
            </div>
          )}

          {/* Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-sm font-semibold text-gray-700">Progresso</h4>
              <span className="text-sm font-semibold text-purple-600">{task.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>

          {/* Assigned To */}
          <div className="grid grid-cols-2 gap-4">
            {task.assignedToName && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Atribuído para</h4>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold">
                    {task.assignedToName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-gray-700">{task.assignedToName}</span>
                </div>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Criado por</h4>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-gray-500" />
                <span className="text-gray-700">{task.createdByName}</span>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Criado em</h4>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(task.createdAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Atualizado em</h4>
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {new Date(task.updatedAt).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          {/* Subtasks */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Subtarefas ({task.subtasks.filter(st => st.isCompleted).length}/{task.subtasks.length})
            </h4>
            <SubtaskList
              subtasks={task.subtasks}
              onToggle={!readonly && onToggleSubtask ? (subtaskId) => onToggleSubtask(task.id, subtaskId) : undefined}
              readonly={readonly}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
