import { View, Text, StyleSheet, Pressable } from "react-native";
import { useAuth } from "./context/auth";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useRouter } from "expo-router";
import SolicitacaoComponente from "./componente/solicitacao.componente";

export default function Principal() {
  const { user, logout } = useAuth();
  const router = useRouter();

  console.log("User object:", user); // Debug user object

  function cadastro() {
    router.push("/cadsol");
  }

  function sair() {
    logout();
    router.replace("/");
  }

  function listar() {
    router.push("/listsol");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>TimeOff</Text>
      <Text style={styles.subtitulo}>Bem Vindo {user?.usunom ?? "Usuário"}</Text>
      <View style={styles.quadro}>
        <SolicitacaoComponente /> {/* Removido o prop sodusu */}
      </View>
      <View style={styles.containerbotao}>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            {
              backgroundColor: pressed ? "#0077B6" : "#003366",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={cadastro}
        >
          <Icon name="plus" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.botaoTexto}>Cadastrar Solicitação</Text>
        </Pressable>
      </View>
      <View style={styles.containerbotao}>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            {
              backgroundColor: pressed ? "#0077B6" : "#003366",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={listar}
        >
          <Icon name="menu" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.botaoTexto}>Listar Solicitação</Text>
        </Pressable>
      </View>
      <View style={styles.containerbotao}>
        <Pressable
          style={({ pressed }) => [
            styles.botao,
            {
              backgroundColor: pressed ? "#0077B6" : "#003366",
              opacity: pressed ? 0.7 : 1,
            },
          ]}
          onPress={sair}
        >
          <Icon name="logout" size={20} color="#fff" style={styles.buttonIcon} />
          <Text style={styles.botaoTexto}>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#00B4D8",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  titulo: {
    color: "#fff",
    fontSize: 40,
  },
  subtitulo: {
    color: "#fff",
    fontSize: 20,
  },
  quadro: {
    width: "80%",
    height: "40%",
    backgroundColor: "#003366",
    borderRadius: 10,
  },
  containerbotao: {
    width: "80%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 5,
  },
  botao: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    elevation: 3,
    borderWidth: 1,
    borderColor: "#fff",
    gap:10,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});