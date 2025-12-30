import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Task } from '@/types';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import clsx from 'clsx';

interface TaskCardProps {
  task: Task;
  index: number;
  onClick?: () => void;
  isDragDisabled?: boolean;
}

export function TaskCard({ task, index, onClick, isDragDisabled = false }: TaskCardProps) {
  const priorityStyles = {
    high: 'border-l-4 border-red-500',
    medium: 'border-l-4 border-yellow-500',
    low: 'border-l-4 border-green-500'
  };

  const priorityBadges = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  return (
    <Draggable draggableId={`task-${task.id}`} index={index} isDragDisabled={isDragDisabled}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card
            className={clsx(
              'p-4 mb-3',
              priorityStyles[task.priority],
              snapshot.isDragging && 'shadow-2xl rotate-2',
              onClick && 'cursor-pointer'
            )}
            onClick={onClick}
          >
            <div className="space-y-3">
              {/* Title and Priority */}
              <div className="flex items-start justify-between gap-2">
                <h4 className="font-semibold text-gray-900 text-sm leading-tight flex-1">
                  {task.title}
                </h4>
                <span
                  className={clsx(
                    'px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap',
                    priorityBadges[task.priority]
                  )}
                >
                  {task.priority === 'high' ? 'Alta' : task.priority === 'medium' ? 'Média' : 'Baixa'}
                </span>
              </div>

              {/* Description */}
              {task.description && (
                <p className="text-xs text-gray-600 line-clamp-2">{task.description}</p>
              )}

              {/* Progress */}
              <ProgressBar progress={task.progress} showLabel size="sm" />

              {/* Assigned To */}
              {task.assignedToName && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-700 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-semibold">
                      {task.assignedToName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600">{task.assignedToName}</span>
                </div>
              )}

              {/* Subtasks count */}
              {task.subtasks.length > 0 && (
                <div className="text-xs text-gray-500">
                  📋 {task.subtasks.filter(st => st.isCompleted).length}/{task.subtasks.length} subtarefas
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </Draggable>
  );
}
