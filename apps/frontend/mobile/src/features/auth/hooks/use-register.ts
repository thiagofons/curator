import { useAuth } from "@/features/auth/hooks/use-auth";

export function useRegister() {
  const { register } = useAuth();

  // // O tRPC já traz o TanStack Query embutido!
  // return trpcClient.users..auth.register.useMutation({
  //   onSuccess: async (data) => {
  //     // data já vem 100% tipado do backend
  //     await signIn(data.token, data.user);
  //   },
  //   onError: (error) => {
  //     console.error("Erro no registro:", error.message);
  //   },
  // });
}
