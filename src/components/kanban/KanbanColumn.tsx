'use client';

import { Task, TaskStatus } from '@/types';
import TaskCard from './TaskCard';

interface KanbanColumnProps {
  title: string;
  status: TaskStatus;
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
  onDrop?: (taskId: number, newStatus: TaskStatus) => void;
  isDraggable?: boolean;
  color: string;
}

export default function KanbanColumn({
  title,
  status,
  tasks,
  onTaskClick,
  onDrop,
  isDraggable = true,
  color
}: KanbanColumnProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!isDraggable || !onDrop) return;

    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    if (taskId) {
      onDrop(taskId, status);
    }
  };

  return (
    <div className="flex flex-col min-w-[280px] flex-1">
      {/* Column Header */}
      <div className={`${color} rounded-t-lg px-4 py-3 border-b-4`}>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white text-sm uppercase tracking-wide">
            {title}
          </h3>
          <span className="bg-white bg-opacity-30 text-white text-xs font-bold px-2 py-1 rounded-full">
            {tasks.length}
          </span>
        </div>
      </div>

      {/* Column Content */}
      <div
        className="flex-1 bg-gray-50 rounded-b-lg p-4 min-h-[200px]"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="text-center text-gray-400 text-sm py-8">
            Nenhuma tarefa
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onTaskClick={onTaskClick}
                isDraggable={isDraggable}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
