import { Layout } from "lucide-react";

export default function ProjectsEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center animate-fade-in px-4">
      <div className="w-20 h-20 bg-indigo-500/10 rounded-3xl flex items-center justify-center text-indigo-400 mb-6 border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
        <Layout size={40} />
      </div>
      <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
        Your workspace is empty
      </h3>
      <p className="text-slate-400 max-w-sm leading-relaxed">
        It looks like you haven't created any projects yet. Launch your first project to start managing tasks with your team.
      </p>
      <div className="mt-8 flex gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/40" />
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/10" />
      </div>
    </div>
  );
}

