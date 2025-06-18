import { View, Text, StyleSheet } from "react-native";
import SolQtd from "../interface/solqtd";
import { useCRUD } from "../conexao/useCrud";
import { useEffect, useState } from "react";
import { useAuth } from "../context/auth"; // Importar useAuth

export default function SolicitacaoComponente() {
  const { user } = useAuth(); // Obter user diretamente do contexto
  const { countByStatus } = useCRUD("solicitacaodispensa");
  const [statusCount, setStatusCount] = useState<SolQtd>({
    aceito: 0,
    pendente: 0,
    recusado: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const sodusu = user && typeof user.usuide === "number" ? user.usuide : 0;

  const fetchStatusCount = async () => {
    if (!sodusu) {
      setError("Usuário não autenticado");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response: SolQtd = await countByStatus(sodusu);
      console.log("Resposta completa da API:", response);

      // Validar resposta
      const validatedResponse: SolQtd = {
        aceito: Number(response.aceito) || 0,
        pendente: Number(response.pendente) || 0,
        recusado: Number(response.recusado) || 0,
      };

      setStatusCount(validatedResponse);
      setError(null);
    } catch (err: any) {
      console.error("Erro ao processar resposta:", err);
      setError("Erro ao carregar dados");
      setStatusCount({
        aceito: 0,
        pendente: 0,
        recusado: 0,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatusCount();
    const intevalId = setInterval(fetchStatusCount, 15000);
    return () => clearInterval(intevalId)

  }, [sodusu]);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: "red" }]}>
          Por favor, faça login para ver as solicitações
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Carregando...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={[styles.titulo, { color: "red" }]}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Solicitações</Text>

      <View style={styles.container2}>
        <View style={styles.aceito}></View>
        <Text style={styles.subtitulo}>Aceito: {String(statusCount.aceito)}</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.pendente}></View>
        <Text style={styles.subtitulo}>Pendente: {String(statusCount.pendente)}</Text>
      </View>

      <View style={styles.container2}>
        <View style={styles.recusado}></View>
        <Text style={styles.subtitulo}>Recusado: {String(statusCount.recusado)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%", // Largura um pouco menor para destacar
    height: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20, // Padding maior
    gap: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Fundo branco semi-transparente
    borderWidth: 2,
    borderColor: "#FFFFFF", // Borda branca sólida
    borderRadius: 8, // Bordas mais arredondadas
    shadowColor: "#000", // Sombra para profundidade
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8, // Para Android
    marginVertical: 10,
  },
  container2: {
    width: "100%",
    height: "auto",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 15,
  },
  titulo: {
    color: "#003366", // Azul escuro para contraste
    fontSize: 32, // Tamanho um pouco menor
    textAlign: "center",
    marginBottom: 10,
    fontWeight: "bold",
    textShadowColor: "rgba(255, 255, 255, 0.5)", // Sombra no texto
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitulo: {
    color: "#003366", // Azul escuro
    fontSize: 22,
    textAlign: "left",
    flex: 1,
    fontWeight: "600", // Peso intermediário
  },
  aceito: {
    width: 35, // Tamanho aumentado
    height: 35,
    backgroundColor: "#4CAF50", // Verde mais vibrante
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: "#FFFFFF", // Borda branca
  },
  pendente: {
    width: 35,
    height: 35,
    backgroundColor: "#FFC107", // Amarelo mais vibrante
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  recusado: {
    width: 35,
    height: 35,
    backgroundColor: "#F44336", // Vermelho mais vibrante
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
});