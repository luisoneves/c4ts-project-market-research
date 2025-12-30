import React from 'react';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import { Task, TaskStatus } from '@/types';
import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
  onDragEnd?: (result: DropResult) => void;
  onTaskClick?: (task: Task) => void;
  isDragDisabled?: boolean;
}

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'A Fazer' },
  { status: 'in_progress', title: 'Em Progresso' },
  { status: 'review', title: 'Em Revisão' },
  { status: 'done', title: 'Concluído' }
];

export function KanbanBoard({ tasks, onDragEnd, onTaskClick, isDragDisabled = false }: KanbanBoardProps) {
  const tasksByStatus = columns.reduce((acc, col) => {
    acc[col.status] = tasks.filter(task => task.status === col.status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleDragEnd = (result: DropResult) => {
    if (!onDragEnd || isDragDisabled) return;
    onDragEnd(result);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
        {columns.map(column => (
          <KanbanColumn
            key={column.status}
            status={column.status}
            title={column.title}
            tasks={tasksByStatus[column.status] || []}
            onTaskClick={onTaskClick}
            isDragDisabled={isDragDisabled}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
