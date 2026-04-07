import { useState } from "react";
import { useProjects } from "../hooks/useProject";

import ProjectsHeader from "../components/projects/projectHeader";
import ProjectCard from "../components/projects/projectCard";
import ProjectModal from "../components/projects/newProjectModel";
import ProjectsEmptyState from "../components/projects/projectEmptyState";

export default function ProjectsPage() {
  const {
    projects,
    loading,
    error,
    createProject,
    deleteProject,
  } = useProjects();

  


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    projectId: "",
    name: "",
    description: "",
  });
  

  const handleCreate = async () => {
    await createProject(formData);
    setFormData({ projectId: "", name: "", description: "" });
    setIsModalOpen(false);
  };

  

  return (
    <div className="min-h-screen bg-[#0f172a] p-8 md:p-12 overflow-x-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[5%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[10%] w-[35%] h-[35%] bg-cyan-500/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-12 animate-fade-in">
          <ProjectsHeader onCreate={() => setIsModalOpen(true)} />
        </header>

        {error && (
          <div className="glass-card border-red-500/30 p-4 rounded-xl text-red-400 mb-8 flex items-center gap-3 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40 gap-4">
            <div className="w-12 h-12 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-slate-500 text-sm font-medium">Fetching your workspace...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="glass-card p-12 rounded-3xl animate-fade-in">
            <ProjectsEmptyState />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ProjectCard
                key={p._id}
                project={p}
                index={i}
                onDelete={deleteProject}
              />
            ))}
          </div>
        )}

        <ProjectModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onCreate={handleCreate}
          formData={formData}
          setFormData={setFormData}
        />
      </div>
    </div>
  );
}

