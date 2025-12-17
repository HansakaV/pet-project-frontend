import { FolderOpen } from "lucide-react";

export default function ProjectsEmptyState() {
  return (
    <div className="text-center py-20 animate-fade-in">
      <FolderOpen size={64} className="mx-auto text-slate-300 mb-4" />
      <h3 className="text-xl font-semibold text-slate-600 mb-2">
        No projects yet
      </h3>
      <p className="text-slate-500">
        Create your first project to get started
      </p>
    </div>
  );
}
