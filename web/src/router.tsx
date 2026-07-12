import CoursesIndex from "@/pages/v1/courses";
import CoursesCreate from "@/pages/v1/courses/create";
import CoursesEdit from "@/pages/v1/courses/edit";
import CoursesShow from "@/pages/v1/courses/show";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/", element: <CoursesIndex /> },
  { path: "/courses", element: <CoursesIndex /> },
  { path: "/courses/create", element: <CoursesCreate /> },
  { path: "/courses/:id", element: <CoursesShow /> },
  { path: "/courses/:id/edit", element: <CoursesEdit /> },
]);
