import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useFuncionario } from '../database/useFuncionario';
import { useObra } from '../database/useObra';
import { useObraFuncionario } from '../database/useObraFuncionario';
import { useNavigation } from '@react-navigation/native';

const Workers = () => {
  const [selectedObra, setSelectedObra] = useState(null);
  const [selectedEquipe, setSelectedEquipe] = useState(null);
  const [selectedPeoes, setSelectedPeoes] = useState(null);
  const navigation = useNavigation();
  const [obras, setObras] = useState([]);
  const [funcionarios, setFuncionarios] = useState([]);
  const useFuncinonarios = useFuncionario();
  const useObras = useObra();
  const useObraFuncionarios = useObraFuncionario()
  useEffect(() => {
    const getAll = async () => {
      const obrasResult = await useObras.list();
      const funcionariosResult = await useFuncinonarios.list();
      const reducedObras = obrasResult.result.reduce((acc, obra) => {
        acc.push({ label: obra.nome, value: obra.id });
        return acc;
      }, []);
      const reducedFuncionarios = funcionariosResult.result.reduce(
        (acc, func) => {
          acc.push({ label: func.nome, value: func.id });
          return acc;
        },
        []
      );
      setObras(reducedObras);
      setFuncionarios(reducedFuncionarios);
    };
    getAll();
  }, []);

  // const equipes = [
  //   { label: 'Fraklin', value: 'equipeA' },
  //   { label: 'Zé', value: 'equipeB' },
  //   { label: 'Miguel', value: 'equipeC' },
  // ];

  const peoes = [
    { label: 'Peão X', value: 'peaoX' },
    { label: 'Peão Y', value: 'peaoY' },
    { label: 'Peão Z', value: 'peaoZ' },
  ];

  const handleSubmit = async () => {
    const obraFuncionarioId = { funcionarioId: selectedObra, obraId: selectedEquipe };
    try {
      await useObraFuncionarios.relateFuncionarioObra(obraFuncionarioId)
      Alert.alert('funcionario adiocionado a obra')
    } catch (e){
      Alert.alert(e)
    }
  };

  const handleNavigate = () => {
    navigation.navigate('CadastroFuncionario');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Selecione suas opções</Text>

      <RNPickerSelect
        placeholder={{ label: 'Selecione uma obra...', value: null }}
        items={obras}
        onValueChange={(value) => setSelectedObra(value)}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        placeholder={{ label: 'Selecione uma equipe...', value: null }}
        items={funcionarios}
        onValueChange={(value) => setSelectedEquipe(value)}
        style={pickerSelectStyles}
      />

      <RNPickerSelect
        placeholder={{ label: 'Selecione um peão...', value: null }}
        items={peoes}
        onValueChange={(value) => setSelectedPeoes(value)}
        style={pickerSelectStyles}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleNavigate}>
        <Text style={styles.buttonText}>Cadastar Funcionario</Text>
      </TouchableOpacity>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  inputAndroid: {
    fontSize: 16,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Workers;
