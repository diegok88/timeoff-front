import { Stack } from "expo-router";
import { AuthProvider } from "./context/authcontext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#f5f5f5",
          },
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "Login", headerShown: false }} />
        <Stack.Screen name="principal" options={{ title: "Menu Principal", headerBackTitle: "Sair" }} />
        <Stack.Screen name="cadsol" options={{ title: "Nova Solicitação", headerBackTitle: "Voltar" }} />
        <Stack.Screen name="listsol" options={{ title: "Minhas Solicitações", headerBackTitle: "Voltar" }} />
        <Stack.Screen name="detsol" options={{ title: "Detalhes da Solicitação", headerBackTitle: "Voltar" }} />
      </Stack>
    </AuthProvider>
  );
}