import CoursesIndex from "@/pages/v1/courses";
import CoursesCreate from "@/pages/v1/courses/create";
import CoursesEdit from "@/pages/v1/courses/edit";
import CoursesShow from "@/pages/v1/courses/show";
import LessonsIndex from "@/pages/v1/lessons";
import LessonsCreate from "@/pages/v1/lessons/create";
import LessonsEdit from "@/pages/v1/lessons/edit";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  { path: "/", element: <CoursesIndex /> },
  { path: "/courses", element: <CoursesIndex /> },
  { path: "/courses/create", element: <CoursesCreate /> },
  { path: "/courses/:id", element: <CoursesShow /> },
  { path: "/courses/:id/edit", element: <CoursesEdit /> },
  { path: "/courses/:courseId/lessons", element: <LessonsIndex /> },
  { path: "/courses/:courseId/lessons/create", element: <LessonsCreate /> },
  { path: "/courses/:courseId/lessons/:id/edit", element: <LessonsEdit /> },
]);
