import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '@/types';
import { TaskCard } from './TaskCard';
import clsx from 'clsx';

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  isDragDisabled?: boolean;
}

const statusColors = {
  todo: 'bg-gray-100 border-gray-300',
  in_progress: 'bg-blue-50 border-blue-300',
  review: 'bg-yellow-50 border-yellow-300',
  done: 'bg-green-50 border-green-300'
};

export function KanbanColumn({ status, title, tasks, onTaskClick, isDragDisabled = false }: KanbanColumnProps) {
  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg">
      {/* Column Header */}
      <div className={clsx('p-4 rounded-t-lg border-t-4', statusColors[status])}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-700">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Tasks List */}
      <Droppable droppableId={status}>
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={clsx(
              'flex-1 p-4 overflow-y-auto min-h-[200px]',
              snapshot.isDraggingOver && 'bg-purple-50'
            )}
          >
            {tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onClick={() => onTaskClick?.(task)}
                isDragDisabled={isDragDisabled}
              />
            ))}
            {provided.placeholder}
            
            {tasks.length === 0 && !snapshot.isDraggingOver && (
              <div className="text-center text-gray-400 py-8">
                <p className="text-sm">Nenhuma tarefa</p>
              </div>
            )}
          </div>
        )}
      </Droppable>
    </div>
  );
}
