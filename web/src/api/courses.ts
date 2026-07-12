import { api } from "@/lib/api-client";

export interface Course {
  id: number;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface CoursePayload {
  title: string;
  description: string;
}

export async function fetchCourses(): Promise<Course[]> {
  const { data } = await api.get("/api/courses");
  return data.data;
}

export async function fetchCourse(id: number): Promise<Course> {
  const { data } = await api.get(`/api/courses/${id}`);
  return data.data;
}

export async function createCourse(payload: CoursePayload): Promise<Course> {
  const { data } = await api.post("/api/courses", payload);
  return data.data;
}

export async function updateCourse(
  id: number,
  payload: CoursePayload,
): Promise<Course> {
  const { data } = await api.put(`/api/courses/${id}`, payload);
  return data.data;
}

export async function deleteCourse(id: number): Promise<void> {
  await api.delete(`/api/courses/${id}`);
}
