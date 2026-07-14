import CoursesIndex from "@/pages/courses";
import CoursesCreate from "@/pages/courses/create";
import CoursesEdit from "@/pages/courses/edit";
import CoursesShow from "@/pages/courses/show";
import LessonsIndex from "@/pages/lessons";
import LessonsCreate from "@/pages/lessons/create";
import LessonsEdit from "@/pages/lessons/edit";
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
