import { useAuth } from "@/features/auth/hooks/use-auth";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { session } = useAuth();

  // Se já estiver logado, manda para a Home direto
  if (session) {
    return <Redirect href="/(app)/(tabs)" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
