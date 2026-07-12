# Reverter mudanças e deletar o que foi criado/alterado
```
git checkout -- . && git clean -fd 
```

# Roadmap consolidado (na ordem que você foi montando)
## Fase 1 — Fundação (o que já estamos fazendo)

1. CourseController + LessonController na API Laravel
2. Páginas v1 (useEffect) e v2 (React Query) consumindo essa API
3. useForm customizado, NProgress, toast de mensagens

## Fase 2 — Autenticação (próximo bloco, antes de avançar)
4. CRUD de usuários (register/login) — Sanctum SPA
5. Proteção de rota no front (rota privada redireciona se não autenticado)
6. Middleware auth:sanctum já protegendo Course/Lesson (que você já colocou nas rotas, mas ainda sem tela de login pra testar de verdade)

## Fase 3 — Segurança e autorização
7. Policies (quem pode editar/deletar o quê — ex: só o dono do curso edita)
8. Boas práticas de segurança geral (mass assignment, XSS, rate limiting, etc.)

## Fase 4 — Qualidade de dado e arquitetura
9. N+1 / Eager loading (with, load, whenLoaded) — com exemplo prático mostrando a query real disparada
10. Repository e Service — reintroduzido com justificativa concreta em cima do domínio já existente

## Fase 5 — Diferenciais de portfólio (os 3 priorizados)
11. SQL avançado (JOINs, agregações, WITH)
12. Swagger via Scramble
13. Error Handling (Handler global + padrão de resposta de erro)

## Fase 6 — Infra (quando fizer sentido)
14. Docker/Docker Compose
15. Coolify no VAIO