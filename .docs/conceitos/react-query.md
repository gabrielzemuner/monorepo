# React Query — conceitos

## queryKey
- Não é cache — é um identificador (endereço/gaveta) pro dado.
- useQuery({ queryKey: ["courses"] }) = "gaveta: lista de cursos"
- useQuery({ queryKey: ["courses", 5] }) = "gaveta: curso específico nº5"
- Cache é uma CONSEQUÊNCIA de ter chave — não é a mesma coisa.

## useQuery vs useMutation
- useQuery = LER dado (GET). Roda sozinho ao montar. Tem queryKey.
- useMutation = MUDAR dado (POST/PUT/DELETE). Só roda quando eu chamo. Sem queryKey.

## mutate vs mutateAsync
- mutate() = dispara e não dá pra usar await nele
- mutateAsync() = dispara e devolve Promise, dá pra usar com await
- Uso mutateAsync quando preciso "encaixar" dentro de um fluxo async/await já existente (como o meu useForm)

## invalidateQueries
- Depois de criar/editar/deletar (uma mutation), preciso avisar o React Query
  que a "gaveta" antiga não vale mais.
- queryClient.invalidateQueries({ queryKey: ["courses"] })
- Isso faz qualquer useQuery que usa essa chave buscar de novo automaticamente.
- É o substituto do "loadCourses()" manual que eu chamava na v1 depois de deletar.