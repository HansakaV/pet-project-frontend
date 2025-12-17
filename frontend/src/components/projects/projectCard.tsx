import { Trash2, FolderOpen } from "lucide-react";
import type  Project  from "../../types/project";

interface Props {
  project: Project;
  index: number;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, index, onDelete }: Props) {
  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-6 border animate-slide-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex justify-between">
        <div>
          <div className="flex gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <FolderOpen size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <p className="text-sm text-slate-500">
                ID: {project.projectId}
              </p>
            </div>
          </div>

          {project.description && (
            <p className="text-slate-600 ml-13">
              {project.description}
            </p>
          )}
        </div>

        <button
          onClick={() => onDelete(project._id)}
          className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
        >
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  );
}
