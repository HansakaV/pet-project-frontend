import { X, Layout, Type, AlignLeft, Hash } from "lucide-react";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm animate-fade-in" 
        onClick={onClose} 
      />
      
      {/* Modal Card */}
      <div className="glass-card w-full max-w-md rounded-2xl overflow-hidden animate-fade-in relative z-10 border-indigo-500/20">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
              <Layout size={20} />
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Create Workspace</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">
              <Hash size={12} className="text-indigo-400" />
              Project Identifier
            </label>
            <input
              placeholder="e.g. PR-001"
              value={formData.projectId}
              onChange={(e) =>
                setFormData({ ...formData, projectId: e.target.value })
              }
              className="glass-input w-full"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">
              <Type size={12} className="text-indigo-400" />
              Project Name
            </label>
            <input
              placeholder="Enter workspace name..."
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="glass-input w-full"
            />
          </div>

          <div className="space-y-1.5">
            <label className="flex items-center gap-2 text-xs font-semibold text-slate-400 uppercase tracking-widest ml-1">
              <AlignLeft size={12} className="text-indigo-400" />
              Detailed Summary
            </label>
            <textarea
              placeholder="Describe the goals and scope..."
              rows={4}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="glass-input w-full resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 p-6 pt-0">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Discard
          </button>
          <button
            onClick={onCreate}
            className="btn-primary flex-1 whitespace-nowrap"
          >
            Launch Project
          </button>
        </div>
      </div>
    </div>
  );
}

