import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Pressable, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Picker } from '@react-native-picker/picker';
import { useCRUD } from './conexao/useCrud';
import TipoDispensa from './interface/tipoDispensa';
import { useAuth } from './context/auth';
import Solicitacao from './interface/solicitacao';

export default function CadastroSolicitacao() {
  const { user } = useAuth();
  const { data: tiposDispensa, loading, error, getAll } = useCRUD<TipoDispensa>("tipodispensa");
  const { create } = useCRUD<Solicitacao>("solicitacaodispensa");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [selectedTipo, setSelectedTipo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  const tiposOptions = [
    { label: 'Selecione um tipo', value: '', tidide: 0 },
    ...(tiposDispensa || []).map((tipo) => ({
      label: tipo.tiddes,
      value: tipo.tidide.toString(),
      tidide: tipo.tidide
    }))
  ];

  const formatDateToAPI = (date: Date) => {
    return date.toISOString(); // ou o formato específico que sua API espera
  };

  const handleSubmit = async () => {
    if (!selectedTipo || !quantidade || !startDate || !endDate) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    if (parseInt(quantidade) <= 0) {
      Alert.alert('Erro', 'A quantidade deve ser maior que zero');
      return;
    }

    if (startDate > endDate) {
      Alert.alert('Erro', 'A data de término não pode ser anterior à data de início');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const novaSolicitacao: Partial<Solicitacao> = {
        sodusu: user?.usuide || 0, // ID do usuário logado
        sodsup: user?.ususup || 0, // ID do supervisor (ajuste conforme sua estrutura)
        soddat: new Date(), // Data atual do cadastro
        sodtip: parseInt(selectedTipo),
        sodqtd: parseInt(quantidade),
        soddti: startDate,
        soddtt: endDate,
        sodsta: 'Pendente' // Status inicial
      };

      await create(novaSolicitacao);
      
      Alert.alert('Sucesso', 'Solicitação cadastrada com sucesso!');
      
      // Limpa os campos após o cadastro
      setSelectedTipo('');
      setQuantidade('');
      setStartDate(new Date());
      setEndDate(new Date());
      
    } catch (err) {
      console.error('Erro ao cadastrar solicitação:', err);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar a solicitação');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Carregando tipos de dispensa...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Erro ao carregar tipos de dispensa: {error.message}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Campo de seleção para Tipo */}
      <Text style={styles.label}>Tipo de Solicitação:</Text>
      <View style={styles.fieldContainer}>
        <Icon name="format-list-bulleted" size={20} color="#003366" style={styles.fieldIcon} />
        <Picker
          selectedValue={selectedTipo}
          style={styles.fieldInput}
          onValueChange={(itemValue) => setSelectedTipo(itemValue)}
        >
          {tiposOptions.map((item, index) => (
            <Picker.Item key={index} label={item.label} value={item.value} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Quantidade:</Text>
      <View style={styles.fieldContainer}>
        <Icon name="numeric" size={20} color="#003366" style={styles.fieldIcon} />
        <TextInput
          style={styles.fieldInput}
          keyboardType="numeric"
          placeholder="Digite a quantidade"
          placeholderTextColor="#aaa"
          value={quantidade}
          onChangeText={setQuantidade}
        />
      </View>

      <Text style={styles.label}>Data de início:</Text>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => setShowStartPicker(true)}
      >
        <Icon name="calendar" size={20} color="#003366" style={styles.fieldIcon} />
        <Text style={styles.fieldInput}>
          {startDate.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      {showStartPicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      <Text style={styles.label}>Data de término:</Text>
      <TouchableOpacity
        style={styles.fieldContainer}
        onPress={() => setShowEndPicker(true)}
      >
        <Icon name="calendar" size={20} color="#003366" style={styles.fieldIcon} />
        <Text style={styles.fieldInput}>
          {endDate.toLocaleDateString('pt-BR')}
        </Text>
      </TouchableOpacity>

      {showEndPicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          minimumDate={startDate}
          onChange={(event, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      {/* Botão de cadastro */}
      <Pressable
        style={({ pressed }) => [
          styles.submitButton,
          {
            backgroundColor: pressed ? '#0077B6' : '#003366',
            opacity: isSubmitting ? 0.7 : 1
          }
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? 'Enviando...' : 'Cadastrar Solicitação'}
        </Text>
        <Icon name="send-check" size={20} color="#fff" style={styles.buttonIcon} />
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00B4D8',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    marginBottom: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  fieldContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#003366',
    height: 50,
  },
  fieldIcon: {
    marginRight: 10,
  },
  fieldInput: {
    flex: 1,
    color: '#003366',
    fontSize: 16,
    height: '100%',
    textAlignVertical: 'center',
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0096C7',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    marginLeft: 5,
  },
});