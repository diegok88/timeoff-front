import React from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Text } from "react-native";
import { useCRUD } from "./conexao/useCrud";
import { useAuth } from "./context/auth";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Solicitacao from './interface/solicitacao';
import { RootStackParamList } from './interface/navigation';
import DispensaComponente from './componente/dispensa.componente';

export default function ListarSolicitacao() {
    const { data: solicitacoes, loading, error, getByUsuarioId } = useCRUD<Solicitacao>("solicitacaodispensa");
    const { user } = useAuth();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    React.useEffect(() => {
        if (user?.usuide) {
            getByUsuarioId(user.usuide);
        }
    }, [user?.usuide]);

    const handlePressItem = (item: Solicitacao) => {
        navigation.navigate('detsol', { solicitacao: item });
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>Erro: {error.message}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={solicitacoes}
                keyExtractor={(item) => item.sodide.toString()}
                renderItem={({ item }) => (
                    <DispensaComponente 
                        item={item} 
                        onPress={handlePressItem} 
                    />
                )}
                contentContainerStyle={solicitacoes?.length === 0 && styles.emptyList}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Nenhuma solicitação encontrada</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00B4D8',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    },
    emptyList: {
        flex: 1,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
    },
});