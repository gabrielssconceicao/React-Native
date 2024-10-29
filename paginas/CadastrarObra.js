import { useState } from 'react';
import {
  StyleSheet,
  Text,
  Button,
  Alert,
  SafeAreaView,
  View,
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

const CadastrarObra = () => {
  const [data, setData] = useState(new Date());
  const [dataString, setDataString] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const [cep, setCep] = useState('');
  const [fullAdress, setFullAdress] = useState(null);
  const [numero, setNumero] = useState('');
  const [complemento, setComplemento] = useState('');
  const [nome, setNome] = useState('');
  const {createObra} = useObra();
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
    return !(cep && dataString && fullAdress && numero  && nome);
  };

  const create = async () => {
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
      <View>
        <Text>Nome da Obra</Text>
        <Input
          placeholder={'Nome da obra'}
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View>
        <Text>Data selecionada: {dataString}</Text>
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
      </View>
      <View style={styles.cep}>
        <Input
          placeholder="Digite o CEP"
          value={cep}
          onChangeText={setCep}
          keyboardType="numeric"
        />

        {fullAdress && (
          <View style={{ display: 'flex', gap: 5 }}>
            <Input placeholder="Rua" value={fullAdress.logradouro} />
            <Input placeholder="Bairro" value={fullAdress.bairro} />
            <View
              style={{
                gap: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
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
          </View>
        )}
        <Button title="Buscar Endereço" onPress={handleCep} />
      </View>
      <Button
        title="Cadastrar Endereço"
        onPress={create}
        style={styles.btn}
        disabled={handleDisableBtn()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    gap: 5,
    backgroundColor: '#fff',
  },
  cep: {
    flex: 1,
    gap: 15,
  },
  btn: {
    flex: 1,
    alignSelf: 'flex-end',
  },
});

export default CadastrarObra;
