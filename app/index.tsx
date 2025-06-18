import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View, StyleSheet, Pressable, Alert, ActivityIndicator, Image, ImageBackground, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Keyboard } from "react-native";
import { z } from "zod";
import { useCRUD } from "./conexao/useCrud";
import { useAuth } from "./context/auth";
import { Usuario } from "./interface/usuario";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const loginSchema = z.object({
  usunom: z.string().min(1, "Nome é obrigatório"),
  ususen: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export default function LoginScreen() {
  const { data: usuarios, loading, error, getAll } = useCRUD<Usuario>("usuario");
  const { login } = useAuth();
  const router = useRouter();

  const [usunom, setUsunom] = useState("");
  const [ususen, setUsusen] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    console.log("Error from useCRUD:", error);
    getAll();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      // Validação dos campos com Zod
      const validatedData = loginSchema.parse({ usunom, ususen });
      setValidationError(null);

      // Garantir que usuarios é um array
      const usersArray = Array.isArray(usuarios) ? usuarios : [];

      if (usersArray.length === 0) {
        throw new Error("Nenhum usuário cadastrado");
      }

      // Buscar usuário
      const usuarioEncontrado = usersArray.find(
        (user) => user.usunom === validatedData.usunom && user.ususen === validatedData.ususen
      );

      if (usuarioEncontrado) {
        await login(usuarioEncontrado);
        router.push("/principal"); // Corrigir o caminho para a rota absoluta
      } else {
        throw new Error("Usuário ou senha incorretos");
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        setValidationError(err.errors[0].message);
      } else {
        const message = err instanceof Error ? err.message : "Ocorreu um erro durante o login";
        Alert.alert("Erro", message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const errorMessage = error instanceof Error ? error.message : String(error) || "Erro ao carregar usuários";

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ImageBackground style={styles.container}
          source={require('C:/Users/Usuário/Documents/vscode/React/Timeoff-frontend/timeoff/assets/images/fundoapk1.png')}
          resizeMode="cover"
        >
          <Image
            source={require('C:/Users/Usuário/Documents/vscode/React/Timeoff-frontend/timeoff/assets/images/timeoff5.jpg')}
            style={{ width: 350, height: 350 }}
          ></Image>

          {validationError && <Text style={styles.errorText}>{validationError}</Text>}
          {error && <Text style={styles.errorText}>{errorMessage}</Text>}

          {/* Campo de Nome de Usuário */}
          <View style={styles.fieldContainer}>
            <Icon name="account" size={20} color="#003366" style={styles.fieldIcon} />
            <TextInput
              style={styles.fieldInput}
              placeholder="Nome de usuário"
              placeholderTextColor="#aaa"
              value={usunom}
              onChangeText={setUsunom}
              autoCapitalize="none"
              editable={!isLoggingIn}
            />
          </View>

          {/* Campo de Senha */}
          <View style={styles.fieldContainer}>
            <Icon name="lock" size={20} color="#003366" style={styles.fieldIcon} />
            <TextInput
              style={styles.fieldInput}
              placeholder="Senha"
              placeholderTextColor="#aaa"
              value={ususen}
              onChangeText={setUsusen}
              secureTextEntry
              editable={!isLoggingIn}
            />
          </View>

          {/* Botão de Login */}
          {isLoggingIn ? (
            <ActivityIndicator size="large" color="#003366" />
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.submitButton,
                {
                  backgroundColor: pressed ? "#0077B6" : "#003366",
                  opacity: pressed ? 0.7 : 1,
                },
              ]}
              onPress={handleLogin}
              disabled={loading || isLoggingIn}
            >
              <Text style={styles.submitButtonText}>Entrar</Text>
              <Icon name="login" size={20} color="#fff" style={styles.buttonIcon} />
            </Pressable>
          )}

        </ImageBackground>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#2C5282",
  },
  fieldContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#003366",
    height: 50,
  },
  fieldIcon: {
    marginRight: 10,
  },
  fieldInput: {
    flex: 1,
    color: "#003366",
    fontSize: 16,
    height: "100%",
    textAlignVertical: "center",
  },
  errorText: {
    color: "#e74c3c",
    textAlign: "center",
    marginBottom: 15,
    fontSize: 14,
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#fff",
    width: '100%',
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});