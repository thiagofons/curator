import { useAuth } from "@/features/auth/hooks/use-auth";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, View } from "react-native";

export default function AppLayout() {
  const { session, isLoading } = useAuth();

  // Enquanto verifica o token no SecureStore/Storage
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // Se não houver sessão, expulsa para o grupo de autenticação
  if (!session) {
    return <Redirect href="/(auth)/login" />;
  }

  // Se estiver logado, renderiza as telas internas (Tabs, Home, etc)
  return <Stack screenOptions={{ headerShown: false }} />;
}
