import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "@/hooks/useForm";
import { createLesson, type LessonPayload } from "@/api/lessons";
import AppLayout from "@/components/app-layout";

export default function LessonsCreate() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { data, setData, processing, errors, submit } = useForm<LessonPayload>({
    title: "",
    content: "",
    order: 0,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit((formData) => createLesson(Number(courseId), formData), {
      onSuccess: () => navigate(`/courses/${courseId}/lessons`),
    });
  }

  const breadcrumbs = [
    { title: "Cursos", href: "/courses" },
    { title: "Curso", href: `/courses/${courseId}` },
    { title: "Aulas", href: `/courses/${courseId}/lessons` },
    { title: "Nova aula", href: `/courses/${courseId}/lessons/create` },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <div className="mb-6">
        <Link
          to={`/courses/${courseId}/lessons`}
          className="text-sm text-muted-foreground hover:underline"
        >
          ← Voltar
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-foreground">
          Nova aula
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
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
            htmlFor="content"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Conteúdo
          </label>
          <textarea
            id="content"
            rows={5}
            value={data.content}
            onChange={(e) => setData("content", e.target.value)}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-destructive">{errors.content}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="order"
            className="mb-1 block text-sm font-medium text-foreground"
          >
            Ordem
          </label>
          <input
            id="order"
            type="number"
            value={data.order}
            onChange={(e) => setData("order", Number(e.target.value))}
            className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-foreground outline-none focus:border-ring"
          />
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
