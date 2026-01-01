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
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-6xl mx-auto">
        <ProjectsHeader onCreate={() => setIsModalOpen(true)} />

        {error && <div className="text-red-600 mb-4">{error}</div>}

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : projects.length === 0 ? (
          <ProjectsEmptyState />
        ) : (
          <div className="grid gap-4">
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
