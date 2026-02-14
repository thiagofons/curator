import { useAuthStore } from "@/store/authStore";
import { useNavigation } from "@react-navigation/native";
import { trpc } from "@repo/trpc"; // Seu cliente exportado

export const useLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigation = useNavigation();

  // O tRPC já te dá o 'isLoading', 'error', etc.
  return trpc.auth.login.useMutation({
    onSuccess: (data) => {
      // 1. Salva no estado global (Zustand)
      setAuth(data.user, data.token);

      // 2. Navega para a Home
      navigation.navigate("Main");
    },
    onError: (err) => {
      // Tratamento de erro centralizado para a feature de login
      alert(err.message);
    },
  });
};
