'use client';

import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority, Project } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SubtaskList } from './SubtaskList';
import { MOCK_USERS } from '@/lib/mockData';
import { Plus, Trash2 } from 'lucide-react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  projects: Project[];
  onSave: (task: Partial<Task>) => void;
  onDelete?: (taskId: number) => void;
  readonly?: boolean;
}

export function TaskModal({ isOpen, onClose, task, projects, onSave, onDelete, readonly = false }: TaskModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'todo' as TaskStatus,
    priority: 'medium' as TaskPriority,
    projectId: 1,
    assignedTo: undefined as number | undefined,
    subtasks: [] as Array<{ id: number; taskId: number; description: string; isCompleted: boolean }>
  });
  const [newSubtask, setNewSubtask] = useState('');

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        projectId: task.projectId,
        assignedTo: task.assignedTo,
        subtasks: task.subtasks
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'todo',
        priority: 'medium',
        projectId: projects[0]?.id || 1,
        assignedTo: undefined,
        subtasks: []
      });
    }
  }, [task, projects]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const assignedUser = MOCK_USERS.find(u => u.id === formData.assignedTo);
    const completed = formData.subtasks.filter(st => st.isCompleted).length;
    const progress = formData.subtasks.length > 0 
      ? Math.round((completed / formData.subtasks.length) * 100) 
      : 0;

    onSave({
      ...formData,
      assignedToName: assignedUser?.name,
      progress,
      ...(task && { id: task.id })
    });
    onClose();
  };

  const handleAddSubtask = () => {
    if (!newSubtask.trim()) return;

    const maxId = formData.subtasks.length > 0 
      ? Math.max(...formData.subtasks.map(st => st.id))
      : 0;

    setFormData({
      ...formData,
      subtasks: [
        ...formData.subtasks,
        {
          id: maxId + 1,
          taskId: task?.id || 0,
          description: newSubtask,
          isCompleted: false
        }
      ]
    });
    setNewSubtask('');
  };

  const handleToggleSubtask = (subtaskId: number) => {
    if (readonly) return;
    setFormData({
      ...formData,
      subtasks: formData.subtasks.map(st =>
        st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
      )
    });
  };

  const handleDeleteSubtask = (subtaskId: number) => {
    setFormData({
      ...formData,
      subtasks: formData.subtasks.filter(st => st.id !== subtaskId)
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={task ? 'Editar Tarefa' : 'Nova Tarefa'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              required
              disabled={readonly}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              rows={3}
              disabled={readonly}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Projeto *
            </label>
            <select
              required
              disabled={readonly}
              value={formData.projectId}
              onChange={(e) => setFormData({ ...formData, projectId: parseInt(e.target.value) })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            >
              {projects.map(project => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              required
              disabled={readonly}
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="todo">A Fazer</option>
              <option value="in_progress">Em Progresso</option>
              <option value="review">Em Revisão</option>
              <option value="done">Concluído</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prioridade *
            </label>
            <select
              required
              disabled={readonly}
              value={formData.priority}
              onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Responsável
            </label>
            <select
              disabled={readonly}
              value={formData.assignedTo || ''}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value ? parseInt(e.target.value) : undefined })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-gray-100"
            >
              <option value="">Sem responsável</option>
              {MOCK_USERS.filter(u => u.role === 'admin').map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Subtasks */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Subtarefas
          </label>
          
          {!readonly && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newSubtask}
                onChange={(e) => setNewSubtask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubtask())}
                placeholder="Adicionar nova subtarefa..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <Button type="button" onClick={handleAddSubtask} variant="secondary">
                <Plus size={20} />
              </Button>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            {formData.subtasks.length > 0 ? (
              <div className="space-y-2">
                {formData.subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={subtask.isCompleted}
                      onChange={() => handleToggleSubtask(subtask.id)}
                      disabled={readonly}
                      className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className={`flex-1 text-sm ${subtask.isCompleted ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {subtask.description}
                    </span>
                    {!readonly && (
                      <button
                        type="button"
                        onClick={() => handleDeleteSubtask(subtask.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">Nenhuma subtarefa</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4 border-t">
          {!readonly && (
            <>
              <Button type="submit" variant="primary" className="flex-1">
                {task ? 'Salvar Alterações' : 'Criar Tarefa'}
              </Button>
              {task && onDelete && (
                <Button type="button" variant="danger" onClick={() => {
                  if (confirm('Tem certeza que deseja excluir esta tarefa?')) {
                    onDelete(task.id);
                    onClose();
                  }
                }}>
                  Excluir
                </Button>
              )}
            </>
          )}
          <Button type="button" variant="secondary" onClick={onClose}>
            {readonly ? 'Fechar' : 'Cancelar'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
