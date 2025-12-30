import React from 'react';
import clsx from 'clsx';

interface SubtaskListProps {
  subtasks: Array<{
    id: number;
    description: string;
    isCompleted: boolean;
  }>;
  onToggle?: (subtaskId: number) => void;
  readonly?: boolean;
}

export function SubtaskList({ subtasks, onToggle, readonly = false }: SubtaskListProps) {
  const completed = subtasks.filter(st => st.isCompleted).length;
  const total = subtasks.length;

  if (subtasks.length === 0) {
    return <p className="text-sm text-gray-500 italic">Nenhuma subtarefa</p>;
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">Subtarefas</span>
        <span className="text-xs text-gray-500">{completed}/{total} concluídas</span>
      </div>
      <div className="space-y-1.5">
        {subtasks.map((subtask) => (
          <label
            key={subtask.id}
            className={clsx(
              'flex items-start gap-2 p-2 rounded transition-colors',
              !readonly && 'hover:bg-gray-50 cursor-pointer'
            )}
          >
            <input
              type="checkbox"
              checked={subtask.isCompleted}
              onChange={() => onToggle?.(subtask.id)}
              disabled={readonly}
              className={clsx(
                'mt-0.5 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500',
                readonly && 'cursor-not-allowed'
              )}
            />
            <span
              className={clsx(
                'text-sm flex-1',
                subtask.isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'
              )}
            >
              {subtask.description}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
