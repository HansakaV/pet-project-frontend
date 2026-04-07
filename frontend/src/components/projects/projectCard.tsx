import { Trash2, ExternalLink, Layout, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type Project from "../../types/project";

interface Props {
  project: Project;
  index: number;
  onDelete: (id: string) => void;
}

export default function ProjectCard({ project, index, onDelete }: Props) {
  const navigate = useNavigate();

  return (
    <div 
      className="glass-card group p-6 rounded-2xl hover:border-indigo-500/50 transition-all duration-500 animate-fade-in relative overflow-hidden"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Decorative background glow */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors duration-500" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 group-hover:scale-110 transition-transform duration-500">
            <Layout size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white text-xl group-hover:text-indigo-300 transition-colors mr-2">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest mt-1">
              <span>PROJECT ID</span>
              <span className="px-1.5 py-0.5 bg-slate-800 rounded">{project.projectId || project._id.slice(-6)}</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-slate-400 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[40px] relative z-10 transition-colors group-hover:text-slate-300">
        {project.description || "No description provided for this project."}
      </p>

      <div className="flex items-center justify-between pt-4 border-t border-white/5 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Calendar size={14} />
          <span>Created recently</span>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => onDelete(project._id)}
            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
            title="Delete Project"
          >
            <Trash2 size={18} />
          </button>
          
          <button
            onClick={() => navigate(`/project/${project._id}`)}
            className="btn-primary py-2 px-4 text-xs group/btn"
          >
            Open Board
            <ExternalLink size={14} className="group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}

