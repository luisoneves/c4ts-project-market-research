'use client';

import { Subtask } from '@/types';
import { Check } from 'lucide-react';

interface SubtaskListProps {
  subtasks: Subtask[];
  onToggle?: (subtaskId: number) => void;
  readonly?: boolean;
}

export default function SubtaskList({ subtasks, onToggle, readonly = false }: SubtaskListProps) {
  if (subtasks.length === 0) {
    return (
      <div className="text-sm text-gray-500 text-center py-4">
        Nenhuma subtarefa
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {subtasks.map((subtask) => (
        <div
          key={subtask.id}
          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
            subtask.isCompleted
              ? 'bg-green-50 border-green-200'
              : 'bg-gray-50 border-gray-200'
          } ${!readonly && onToggle ? 'hover:bg-gray-100 cursor-pointer' : ''}`}
          onClick={() => !readonly && onToggle?.(subtask.id)}
        >
          {/* Checkbox */}
          <div
            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              subtask.isCompleted
                ? 'bg-green-500 border-green-500'
                : 'bg-white border-gray-300'
            }`}
          >
            {subtask.isCompleted && <Check className="w-3 h-3 text-white" />}
          </div>

          {/* Description */}
          <span
            className={`text-sm flex-1 ${
              subtask.isCompleted
                ? 'line-through text-gray-500'
                : 'text-gray-700'
            }`}
          >
            {subtask.description}
          </span>
        </div>
      ))}
    </div>
  );
}
