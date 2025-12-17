import { Plus } from "lucide-react";

interface Props {
  onCreate: () => void;
}

export default function ProjectsHeader({ onCreate }: Props) {
  return (
    <div className="mb-8 flex items-center justify-between animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold text-slate-800 mb-2">Projects</h1>
        <p className="text-slate-600">
          Manage your  All projects and collaborations
        </p>
      </div>

      <button
        onClick={onCreate}
        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg"
      >
        <Plus size={20} />
        New Project
      </button>
    </div>
  );
}
