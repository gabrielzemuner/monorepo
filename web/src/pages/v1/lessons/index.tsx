import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchLessons, deleteLesson, type Lesson } from "@/api/lessons";
import AppLayout from "@/components/app-layout";

export default function LessonsIndex() {
  const { courseId } = useParams();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadLessons() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchLessons(Number(courseId));
      setLessons(data);
    } catch {
      setError("Não foi possível carregar as aulas.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLessons();
  }, [courseId]);

  async function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir esta aula?")) return;
    await deleteLesson(id);
    loadLessons();
  }

  const breadcrumbs = [
    { title: "Cursos", href: "/courses" },
    { title: "Curso", href: `/courses/${courseId}` },
    { title: "Aulas", href: `/courses/${courseId}/lessons` },
  ];

  if (loading) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          Carregando aulas...
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <div className="px-6 py-10">
          <p className="max-w-3xl rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive">
            {error}
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <Link
            to="/courses"
            className="text-sm text-muted-foreground hover:underline"
          >
            ← Cursos
          </Link>
          <h1 className="mt-2 text-2xl font-semibold text-foreground">Aulas</h1>
        </div>
        <Link
          to={`/courses/${courseId}/lessons/create`}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Nova aula
        </Link>
      </div>

      {lessons.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
          Nenhuma aula cadastrada ainda.
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {lessons.map((lesson) => (
            <li
              key={lesson.id}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-accent"
            >
              <div className="min-w-0">
                <span className="text-xs text-muted-foreground">
                  #{lesson.order}
                </span>
                <Link
                  to={`/courses/${courseId}/lessons/${lesson.id}`}
                  className="block truncate font-medium text-foreground hover:underline"
                >
                  {lesson.title}
                </Link>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  to={`/courses/${courseId}/lessons/${lesson.id}/edit`}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(lesson.id)}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-destructive hover:bg-destructive/10"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </AppLayout>
  );
}
