import { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  TextInput,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEndereco } from '../hooks/useEnderecos';
const CadastroEndereco = () => {
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [endereco, setEndereco] = useState('');
  const { saveEnderecos } = useEndereco();

  const handleAddEndereco = () => {
    if (!dataString || !endereco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const newEndereco = { data: dataString, endereco };
    saveEnderecos(newEndereco);
    Alert.alert('Sucesso', 'Endereço cadastrado com sucesso!');

    // Limpa os campos após o cadastro
    setEndereco('');
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
        style={styles.input}
        placeholder="Endereço"
        value={endereco}
        onChangeText={setEndereco}
      />
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
