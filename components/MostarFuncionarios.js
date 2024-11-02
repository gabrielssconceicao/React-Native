import { useState,useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import {useFuncionario} from '../database/useFuncionario'

export function MostarFuncionarios({ close }) {
  const [funcionarios, setFuncionarios] = useState([]);
  const useFuncionarios=useFuncionario();
  const handleMostrar = (funcionario) => {
    Alert.alert(
      'Detalhes do Funcionário',
      `Nome: ${funcionario.nome}\nProfissão: ${funcionario.profissao}\nSalário: ${funcionario.salario}\nObra: ${funcionario.obra}`
    );
    // pegar obras em que estão
  };
  useEffect(()=>{
    const getAll = async ()=>{
      try {

      const {result}= await useFuncionarios.list();
      setFuncionarios(result)
      } catch {
        Alert.alert(error)
      }
    }
    getAll()
  },[])
  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Funcionários Cadastrados</Text>
        {funcionarios.length === 0 ? (
          <Text>Nenhum funcionário cadastrado.</Text>
        ) : (
          <FlatList
            data={funcionarios}
            keyExtractor={(item) => item.nome}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleMostrar(item)}>
                <Text style={styles.funcionarioText}>{item.nome}</Text>
              </TouchableOpacity>
            )}
          />
        )}
        <TouchableOpacity style={styles.closeButton} onPress={close}>
          <Text style={styles.buttonText}>Fechar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  funcionarioText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  
});
