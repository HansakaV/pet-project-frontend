import { createBrowserRouter } from "react-router-dom";
import ProjectsPage from "./pages/projectPage";
import LoginPage from "./pages/loginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProjectsPage />,
    errorElement: <h2>Something went wrong</h2>,
  },
]);

export default router;
