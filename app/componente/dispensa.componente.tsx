import React from 'react';
import { Pressable, View, Text, StyleSheet } from "react-native";
import Solicitacao from '../interface/solicitacao';

interface DispensaComponenteProps {
    item: Solicitacao;
    onPress: (item: Solicitacao) => void;
}

export default function DispensaComponente({ item, onPress }: DispensaComponenteProps) {
    return (
        <Pressable 
            style={styles.container}
            onPress={() => onPress(item)}
        >
            <Text style={styles.text}>ID: {item.sodide}</Text>
            <Text style={styles.text}>Tipo: {item.tipoDispensa?.tiddes || 'Tipo não especificado'}</Text>
            <Text style={styles.text}>Status: {item.sodsta}</Text>
            <Text style={styles.text}>Data da Solicitação: {new Date(item.soddat).toLocaleDateString()}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        margin: 10,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 16,
        marginVertical: 2,
    }
});