import { api } from "@/lib/api-client";

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  content: string;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface LessonPayload {
  title: string;
  content: string;
  order: number;
}

export async function fetchLessons(courseId: number): Promise<Lesson[]> {
  const { data } = await api.get(`/api/courses/${courseId}/lessons`);
  return data.data;
}

export async function fetchLesson(id: number): Promise<Lesson> {
  const { data } = await api.get(`/api/lessons/${id}`);
  return data.data;
}

export async function createLesson(
  courseId: number,
  payload: LessonPayload,
): Promise<Lesson> {
  const { data } = await api.post(`/api/courses/${courseId}/lessons`, payload);
  return data.data;
}

export async function updateLesson(
  id: number,
  payload: LessonPayload,
): Promise<Lesson> {
  const { data } = await api.put(`/api/lessons/${id}`, payload);
  return data.data;
}

export async function deleteLesson(id: number): Promise<void> {
  await api.delete(`/api/lessons/${id}`);
}
