import { fetchCourse, type Course } from "@/api/courses";
import AppLayout from "@/components/app-layout";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CoursesShow() {
  const { id } = useParams();

  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCourse() {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchCourse(Number(id));
        setCourse(data);
      } catch {
        setError("Não foi possível carregar o curso.");
      } finally {
        setLoading(false);
      }
    }

    loadCourse();
  }, [id]);

  if (loading) {
    return (
      <AppLayout breadcrumbs={[{ title: "Cursos", href: "/courses" }]}>
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          Carregando curso...
        </div>
      </AppLayout>
    );
  }

  if (error || !course) {
    return (
      <AppLayout breadcrumbs={[{ title: "Cursos", href: "/courses" }]}>
        <div className="px-6 py-10">
          <p className="max-w-xl rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive">
            {error ?? "Curso não encontrado."}
          </p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout
      breadcrumbs={[
        { title: "Cursos", href: "/courses" },
        { title: course.title, href: `/courses/${course.id}` },
      ]}
    >
      <Link
        to="/courses"
        className="text-sm text-muted-foreground hover:underline"
      >
        ← Voltar
      </Link>

      <div className="mt-4 rounded-lg border border-border p-6">
        <h1 className="text-2xl font-semibold text-foreground">
          {course.title}
        </h1>
        <p className="mt-2 text-muted-foreground">{course.description}</p>

        <div className="mt-6 flex gap-2">
          <Link
            to={`/courses/${course.id}/lessons`}
            className="rounded-md border border-input px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Ver aulas
          </Link>
          <Link
            to={`/courses/${course.id}/edit`}
            className="rounded-md border border-input px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
          >
            Editar
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
