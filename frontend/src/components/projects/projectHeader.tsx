import { Plus, LayoutGrid, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  onCreate: () => void;
}

export default function ProjectsHeader({ onCreate }: Props) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="hidden md:flex p-3 bg-indigo-500/10 rounded-2xl text-indigo-400 shadow-inner">
          <LayoutGrid size={28} />
        </div>
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight">
            Projects <span className="text-indigo-500">Board</span>
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-slate-400 font-medium flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Manage and track your active workspaces
            </p>
            <div className="h-4 w-px bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2 text-slate-300 text-sm font-medium">
              <UserIcon size={14} className="text-indigo-400" />
              {user?.name}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={handleLogout}
          className="p-3 hover:bg-red-500/10 rounded-xl text-slate-400 hover:text-red-400 transition-all border border-transparent hover:border-red-500/20"
          title="Logout"
        >
          <LogOut size={24} />
        </button>
        <button
          onClick={onCreate}
          className="btn-primary py-3 px-8 text-lg"
        >
          <Plus size={24} />
          Create Project
        </button>
      </div>
    </div>
  );
}


