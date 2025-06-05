import React from 'react';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from './interface/navigation';

export default function DetalhesSolicitacao() {
    const route = useRoute<RouteProp<RootStackParamList, 'detsol'>>();
    
    // Verificação de segurança
    if (!route.params?.solicitacao) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Erro: Dados da solicitação não encontrados.</Text>
            </View>
        );
    }

    const { solicitacao } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Detalhes da Solicitação</Text>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>ID:</Text>
                    <Text style={styles.value}>{solicitacao.sodide}</Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Tipo:</Text>
                    <Text style={styles.value}>{solicitacao.tipoDispensa?.tiddes}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Quantidade de dias:</Text>
                    <Text style={styles.value}>{solicitacao.sodqtd}</Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Data Início:</Text>
                    <Text style={styles.value}>{new Date(solicitacao.soddti).toLocaleDateString()}</Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Data Término:</Text>
                    <Text style={styles.value}>{new Date(solicitacao.soddtt).toLocaleDateString()}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.label}>Data da Solicitação:</Text>
                    <Text style={styles.value}>{new Date(solicitacao.soddat).toLocaleDateString()}</Text>
                </View>
                
                <View style={styles.detailRow}>
                    <Text style={styles.label}>Status:</Text>
                    <Text style={styles.value}>{solicitacao.sodsta}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00B4D8',
        padding: 16,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});