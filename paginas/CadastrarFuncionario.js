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
import { useFuncionario } from '../database/useFuncionario';

const CadastarFuncionario = () => {
  const [nome, setNome] = useState('');
  const [salarioMensal, setSalarioMensal] = useState(0);
  const [salarioSemanal, setSalarioSemanal] = useState(0);
  const [profissao, setProfissao] = useState('');
  const {createFuncionario} = useFuncionario()
  const handleDisableBtn = () => {
    return !(nome && salarioMensal && salarioSemanal && profissao);
  };

  const create = async () => {
    const funcionario = { nome, salarioMensal, salarioSemanal, profissao };

    try {
      await createFuncionario(funcionario);
      Alert.alert('Sucesso', `Funcionario criada`);
    } catch (error) {
      Alert.alert(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Nome da Obra</Text>
        <Input
          placeholder={'Nome do Funcionario'}
          value={nome}
          onChangeText={setNome}
        />
      </View>
      <View>
        <Text>Salário Semanal</Text>
        <Input
          placeholder={'Salário Semanal'}
          value={setSalarioSemanal}
          onChangeText={setSalarioSemanal}
          keyboardType='numeric'
        />
      </View>
      <View>
        <Text>Salário Mensal</Text>
        <Input
          placeholder={'Salário Mensal'}
          value={setSalarioMensal}
          onChangeText={setSalarioMensal}
          keyboardType='numeric'
        />
      </View>
      <View>
        <Text>Profissão</Text>
        <Input
          placeholder={'Profissão'}
          value={profissao}
          onChangeText={setProfissao}
         
        />
      </View>
     
      <Button
        title="Cadastrar Funcionario"
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
  btn: {
    flex: 1,
    alignSelf: 'flex-end',
  },
});

export default CadastarFuncionario;
