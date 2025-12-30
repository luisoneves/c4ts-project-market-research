'use client';

import { Task, TaskStatus } from '@/types';
import KanbanColumn from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onStatusChange?: (taskId: number, newStatus: TaskStatus) => void;
  isDraggable?: boolean;
}

const columns = [
  { status: 'todo' as TaskStatus, title: 'A Fazer', color: 'bg-gray-500' },
  { status: 'in_progress' as TaskStatus, title: 'Em Progresso', color: 'bg-blue-500' },
  { status: 'review' as TaskStatus, title: 'Em Revisão', color: 'bg-yellow-500' },
  { status: 'done' as TaskStatus, title: 'Concluído', color: 'bg-green-500' }
];

export default function KanbanBoard({
  tasks,
  onTaskClick,
  onStatusChange,
  isDraggable = true
}: KanbanBoardProps) {
  const handleDrop = (taskId: number, newStatus: TaskStatus) => {
    onStatusChange?.(taskId, newStatus);
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTasks = tasks.filter(task => task.status === column.status);
        
        return (
          <KanbanColumn
            key={column.status}
            title={column.title}
            status={column.status}
            tasks={columnTasks}
            onTaskClick={onTaskClick}
            onDrop={isDraggable ? handleDrop : undefined}
            isDraggable={isDraggable}
            color={column.color}
          />
        );
      })}
    </div>
  );
}
