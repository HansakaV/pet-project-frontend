import { createBrowserRouter } from "react-router-dom";
import ProjectsPage from "./pages/projectPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsPage />,
    errorElement: <h2>Something went wrong</h2>,
  },
]);

export default router;
