import { X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onCreate: () => void;
  formData: {
    projectId: string;
    name: string;
    description: string;
  };
  setFormData: (data: any) => void;
}

export default function ProjectModal({
  open,
  onClose,
  onCreate,
  formData,
  setFormData,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scale-in">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold">Create Project</h2>
          <button onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <input
            placeholder="Project ID"
            value={formData.projectId}
            onChange={(e) =>
              setFormData({ ...formData, projectId: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2"
          />

          <input
            placeholder="Project Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2"
          />

          <textarea
            placeholder="Description"
            rows={4}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="flex gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>
          <button
            onClick={onCreate}
            className="flex-1 bg-blue-600 text-white rounded-lg py-2"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
