import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import { fetchCourse, updateCourse, type CoursePayload } from "@/api/courses";
import AppLayout from "@/components/app-layout";

export default function CoursesEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: course, isLoading } = useQuery({
    queryKey: ["courses", id],
    queryFn: () => fetchCourse(Number(id)),
  });

  const { data, setData, processing, errors, reset, submit } =
    useForm<CoursePayload>({
      title: "",
      description: "",
    });

  const updateMutation = useMutation({
    mutationFn: (payload: CoursePayload) => updateCourse(Number(id), payload),
  });

  useEffect(() => {
    if (course) {
      reset({ title: course.title, description: course.description });
    }
  }, [course]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit((formData) => updateMutation.mutateAsync(formData), {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["courses"] });
        navigate("/courses");
      },
    });
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Carregando curso...
      </div>
    );
  }

  return (
    <AppLayout breadcrumbs={[{ title: "Cursos", href: "/courses" }]}>
      <div className="mb-6">
        <Link
          to="/courses"
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Voltar
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          Editar curso
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Título
          </label>
          <input
            id="title"
            type="text"
            value={data.title}
            onChange={(e) => setData("title", e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-destructive">{errors.title}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Descrição
          </label>
          <textarea
            id="description"
            rows={4}
            value={data.description}
            onChange={(e) => setData("description", e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-destructive">
              {errors.description}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
        >
          {processing ? "Salvando..." : "Salvar"}
        </button>
      </form>
    </AppLayout>
  );
}
