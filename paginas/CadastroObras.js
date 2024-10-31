import { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  SafeAreaView,
  View,
  TouchableOpacity,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Input } from '../components/Input';
import { useObra } from '../database/useObra';
import axios from 'axios';
// Função para buscar coordenadas via Nominatim
const fetchCoordinates = async (address) => {
  const encodedAddress = encodeURIComponent(address);
  const response = await axios.get(
    `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&addressdetails=1`
  );
  if (response.data.length > 0) {
    console.log(response.data);
    const location = response.data[0];
    return {
      latitude: parseFloat(location.lat),
      longitude: parseFloat(location.lon),
    };
  } else {
    console.error('Endereço não encontrado');
    return null;
  }
};

const CadastroObras = () => {
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [cep, setCep] = useState('');
  const [fullAdress, setFullAdress] = useState({});
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [nome, setNome] = useState('');
  const { createObra } = useObra();
  const showDatepicker = () => {
    setShowPicker(true);
  };

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowPicker(false);
    setData(currentDate);
    setDataString(currentDate.toISOString().split('T')[0]); // Formato YYYY-MM-DD
  };

  const handleCep = async () => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      console.log(response);
      setFullAdress(response.data);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleDisableBtn = () => {
    return !(cep && dataString && fullAdress && numero && nome);
  };

  const handleAddEndereco = async () => {
    const obra = {
      nome,
      data: dataString,
      cep,
      numero,
      complemento,
      cidade: fullAdress.localidade,
      rua: fullAdress.logradouro,
      bairro: fullAdress.bairro,
      latitude: 3.54,
      longitude: 4.65,
    };
    try {
      const { insertedRow } = await createObra(obra);
      Alert.alert('Sucesso', `Obra  criada`);
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Cadastro de Endereço</Text>
      <View>
        <Input
          placeholder={'Nome da obra'}
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View>
        <Text style={styles.dateText}>Data selecionada: {dataString}</Text>
        <TouchableOpacity style={styles.dateButton} onPress={showDatepicker}>
          <Text style={styles.dateButtonText}>
            {dataString ? `Data: ${dataString}` : 'Selecionar Data'}
          </Text>
        </TouchableOpacity>
        {showPicker && (
          <DateTimePicker
            value={data}
            mode="date"
            is24Hour={true}
            display="default"
            onChange={onChangeDate}
          />
        )}
      </View>
      <View style={styles.cepContainer}>
        <Input
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
        />

        <View style={{ display: 'flex', gap: 5 }}>
          <Input
            placeholder="Rua"
            value={fullAdress.logradouro}
            onChangeText={(text) => {
              const prev = { ...fullAdress };
              prev.logradouro = text;
              setFullAdress(prev);
            }}
          />
          <Input
            placeholder="Bairro"
            value={fullAdress.bairro}
            onChangeText={(text) => {
              const prev = { ...fullAdress };
              prev.bairro = text;
              setFullAdress(prev);
            }}
          />
          <Input
            placeholder="Número"
            value={numero}
            onChangeText={setNumero}
            keyboardType="numeric"
          />
          <Input
            placeholder="Complemento"
            value={complemento}
            onChangeText={setComplemento}
          />
        </View>

        <Button title="Buscar Endereço" onPress={handleCep} />
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          handleDisableBtn() && styles.submitButtonDisabled, // Apply disabled style if button is disabled
        ]}
        onPress={handleAddEndereco}
        disabled={handleDisableBtn()}>
        <Text style={styles.submitButtonText}>Cadastrar Endereço</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  cepContainer: {
    flex: 1,
    gap: 15,
  },
  dateButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'flex-end',
    width: '100%'
  },
  submitButtonDisabled: {
    backgroundColor: '#1e7e34',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
const styles2 = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  addressContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
});
export default CadastroObras;