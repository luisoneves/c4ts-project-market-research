'use client';

import { Task } from '@/types';
import { CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
  isDraggable?: boolean;
}

const priorityColors = {
  low: 'bg-green-100 text-green-800 border-green-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200'
};

const priorityIcons = {
  low: <CheckCircle2 className="w-4 h-4" />,
  medium: <Clock className="w-4 h-4" />,
  high: <AlertCircle className="w-4 h-4" />
};

export default function TaskCard({ task, onTaskClick, isDraggable = true }: TaskCardProps) {
  const completedSubtasks = task.subtasks.filter(st => st.isCompleted).length;
  const totalSubtasks = task.subtasks.length;

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 p-4 mb-3 transition-all hover:shadow-lg ${
        isDraggable ? 'cursor-move' : 'cursor-default'
      } ${onTaskClick ? 'hover:border-purple-300' : ''}`}
      onClick={() => onTaskClick?.(task)}
      draggable={isDraggable}
      onDragStart={(e) => {
        if (isDraggable) {
          e.dataTransfer.setData('taskId', task.id.toString());
        }
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-gray-900 text-sm flex-1 pr-2">
          {task.title}
        </h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${priorityColors[task.priority]}`}>
          {priorityIcons[task.priority]}
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-gray-600 mb-3 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Progress Bar */}
      {totalSubtasks > 0 && (
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Progresso</span>
            <span className="text-xs font-semibold text-purple-600">{task.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${task.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Subtasks count */}
      {totalSubtasks > 0 && (
        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
          <Circle className="w-3 h-3" />
          <span>
            {completedSubtasks}/{totalSubtasks} subtarefas
          </span>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {task.assignedToName && (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-semibold">
              {task.assignedToName.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-600 truncate max-w-[120px]">
              {task.assignedToName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
