import { QueryClient } from "@tanstack/react-query";

// config pra forçar react query a sempre buscar dado fresco
// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       staleTime: 0,
//       refetchOnMount: "always",
//     },
//   },
// });

export const queryClient = new QueryClient({});
