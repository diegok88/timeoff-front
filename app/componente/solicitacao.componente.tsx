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

  // Derivar sodusu do user
  const sodusu = user && typeof user.usuide === "number" ? user.usuide : 0;

  useEffect(() => {
    const fetchStatusCount = async () => {
      if (!sodusu) {
        // Se sodusu for 0 (usuário não logado), definir erro
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

    fetchStatusCount();
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
    width: "100%",
    height: "auto",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    gap: 20,
    backgroundColor: "#003366",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 8,
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
    color: "#fff",
    fontSize: 40,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#fff",
    fontSize: 24,
    textAlign: "left",
    flex: 1,
  },
  aceito: {
    width: 30,
    height: 30,
    backgroundColor: "green",
    borderRadius: 15,
  },
  pendente: {
    width: 30,
    height: 30,
    backgroundColor: "yellow",
    borderRadius: 15,
  },
  recusado: {
    width: 30,
    height: 30,
    backgroundColor: "red",
    borderRadius: 15,
  },
});