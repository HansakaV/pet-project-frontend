import { useState,useEffect } from 'react';
import { X } from 'lucide-react';
import type Task from '../../types/task';

interface TaskFormModalProps {
  projectId: string;
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: () => void;
  TaskFromData: {
    title: string;
    description: string;
    status: Task['status'];
    projectId: string;
  };
  setTaskFormData: (data: any) => void;
}

export default function TaskFormModal({
  projectId,
  isOpen,
  onClose,
  onCreateTask,
  TaskFromData,
  setTaskFormData,
}: TaskFormModalProps) {

  useEffect(() => {
    setTaskFormData({
      ...TaskFromData,
      projectId,
    });
  }, [projectId]);

  
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  if (!isOpen) return null;

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskFormData({ ...TaskFromData, [name]: value });
  };

  const handleSubmit = () => {
    const newErrors: typeof errors = {};

    if (!TaskFromData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!TaskFromData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onCreateTask();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Create Task</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title *</label>
            <input
              name="title"
              value={TaskFromData.title}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description *
            </label>
            <textarea
              name="description"
              rows={4}
              value={TaskFromData.description}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.description && (
              <p className="text-sm text-red-500">{errors.description}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              name="status"
              value={TaskFromData.status}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 border rounded-lg py-2"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 text-white rounded-lg py-2"
            >
              Create Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
