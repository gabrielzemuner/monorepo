import { deleteCourse, fetchCourses } from "@/api/courses";
import AppLayout from "@/components/app-layout";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

export default function CoursesIndex() {
  const queryClient = useQueryClient();

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: fetchCourses,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
  });

  function handleDelete(id: number) {
    if (!confirm("Tem certeza que deseja excluir este curso?")) return;
    deleteMutation.mutate(id);
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Carregando cursos...
      </div>
    );

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-destructive">
          Não foi possível carregar os cursos.
        </p>
      </div>
    );
  }

  return (
    <AppLayout breadcrumbs={[{ title: "Cursos", href: "/courses" }]}>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-foreground">Cursos</h1>
        <Link
          to="/courses/create"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Novo curso
        </Link>
      </div>

      {courses?.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border py-16 text-center text-muted-foreground">
          Nenhum curso cadastrado ainda.
        </div>
      ) : (
        <ul className="divide-y divide-border rounded-lg border border-border">
          {courses?.map((course) => (
            <li
              key={course.id}
              className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-accent"
            >
              <div className="min-w-0">
                <Link
                  to={`/courses/${course.id}`}
                  className="block truncate font-medium text-foreground hover:underline"
                >
                  {course.title}
                </Link>
                <p className="truncate text-sm text-muted-foreground">
                  {course.description}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  to={`/courses/${course.id}/edit`}
                  className="rounded-md px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent"
                >
                  Editar
                </Link>
                <button
                  onClick={() => handleDelete(course.id)}
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
