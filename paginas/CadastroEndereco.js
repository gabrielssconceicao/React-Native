import { useState } from 'react';
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
import { useEndereco } from '../hooks/useEnderecos';
import axios from 'axios';

const CadastroEndereco = () => {
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const { saveEnderecos } = useEndereco();
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState(null);

  const handleAddEndereco = () => {
    if (!dataString || !address) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newEndereco = {
      data: dataString,
      logradouro: address.logradouro,
      localidade: address.localidade,
      uf: address.uf,
    };
    saveEnderecos(newEndereco);
    Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');

    // Limpa os campos após o cadastro
    setCep('');
    setData(new Date());
    setDataString('');
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
    setDataString(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
  };

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (!response.data.erro) {
        setAddress(response.data);
      } else {
        alert('CEP inválido');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Endereço</Text>
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
      <TextInput
        placeholder="Digite o CEP"
        value={cep}
        onChangeText={setCep}
        keyboardType="numeric"
      />
      <Button title="Buscar Endereço" onPress={fetchAddress} />
      {address && (
        <View>
          <Text>Rua: {address.logradouro}</Text>
          <Text>Cidade: {address.localidade}</Text>
          <Text>Estado: {address.uf}</Text>
        </View>
      )}
      <Button title="Cadastrar Endereço" onPress={handleAddEndereco} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default CadastroEndereco;
