import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  TextInput,
  SafeAreaView,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { fetchAddress } from '../utils/fetchCep';
import { useObraDatabase } from '../database/useObraDatabase';
const CadastroEndereco = () => {
  // State variables
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [cep, setCep] = useState('');
  const [fullAdress, setFullAdress] = useState(null);

  const { create } = useObraDatabase();
  // Handlers
  const resetFields = () => {
    setCep('');
    setData(new Date());
    setDataString('');
  };

  const showDatepicker = () => setShowPicker(true);

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
    setDataString(currentDate.toISOString().split('T')[0]);
  };

  const handleDisable = () => {
    return !(cep && dataString && fullAdress);
  };

  const handleCep = async () => {
    try {
      console.log(cep);
      const { adress } = await fetchAddress(cep);
      console.log(adress);
      setFullAdress(adress);
    } catch (error) {
      Alert.alert('Erro', 'Erro ao buscar cep');
    }
  };

  const cadastrar = async () => {
    const obra = {
      data: dataString,
      nome: 'Teste',
      rua: fullAdress.logradouro,
      cidade: fullAdress.localidade,
      bairro: fullAdress.bairro,
      latitude: 2.4,
      longitude: 2.4,
    };
    try {
      const { insertedRow } = await create(obra);
      Alert.alert('Criado', `Obra id:${insertedRow} criada`);
    } catch (error) {
      Alert.alert('Erro', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Endereço</Text>

      {/* Date Picker */}
      <Button
        title={dataString ? `Data: ${dataString}` : 'Selecionar Data'}
        onPress={showDatepicker}
      />
      {showPicker && (
        <DateTimePicker
          value={data}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={onChangeDate}
        />
      )}
      <Text>Data selecionada: {dataString}</Text>

      {/* CEP Input */}
      <TextInput
        placeholder="Digite o CEP"
        onChangeText={setCep}
        value={cep}
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Buscar Endereço" onPress={handleCep} />

      {/* Address Details */}
      {fullAdress && (
        <View>
          <Text>Rua: {fullAdress.logradouro}</Text>
          <Text>Cidade: {fullAdress.localidade}</Text>
          <Text>Estado: {fullAdress.uf}</Text>
        </View>
      )}

      {/* Submit Button */}
      <Button
        title="Cadastrar Endereço"
        onPress={cadastrar}
        disabled={handleDisable()}
      />
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 5,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    padding: 3,
    borderColor: '#ccc',
    borderRadius: 4,
    borderWidth: 2,
    paddingLeft: 12,
    marginBottom: 10,
  },
});

export default CadastroEndereco;
