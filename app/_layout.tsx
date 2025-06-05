// app/_layout.tsx
import { Stack } from "expo-router";
import { AuthProvider } from "./context/authcontext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        {/* Tela de Login */}
        <Stack.Screen
          name="index"
          options={{
            title: "Login",
            headerShown: false,
          }}
        />

        {/* Tela Principal/Menu */}
        <Stack.Screen
          name="principal"
          options={{
            title: "Menu Principal",
            headerBackTitle: "Sair", // Fixed typo
          }}
        />

        {/* Tela de Cadastro */}
        <Stack.Screen
          name="cadsol"
          options={{
            title: "Nova Solicitação",
            headerBackTitle: "Voltar",
          }}
        />

        {/* Tela de Listagem */}
        <Stack.Screen
          name="listsol"
          options={{
            title: "Minhas Solicitações",
            headerBackTitle: "Voltar",
          }}
        />

        {/* Tela de Detalhes */}
        <Stack.Screen
          name="detsol"
          options={{
            title: "Detalhes da Solicitação",
            headerBackTitle: "Voltar",
          }}
        />
      </Stack>
    </AuthProvider>
  );
}