import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ProjectsPage from "./pages/projectPage";
import BoardPage from "./pages/BoardPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <ProjectsPage />,
      },
      {
        path: "/project/:projectId",
        element: <BoardPage />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  }
]);

export default function AppRouter() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
