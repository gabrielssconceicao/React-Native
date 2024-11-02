import { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { useObra } from '../database/useObra';
import { useFuncionario } from '../database/useFuncionario';
export function CadastarFuncionario({ close }) {
  const [nome, setNome] = useState('1');
  const [profissao, setProfissao] = useState('1');
  const [salario, setSalario] = useState(0);
  const [selectedObra, setSelectedObra] = useState(0);
  const [modalVisibleObra, setModalVisibleObra] = useState(false);
  const useObras = useObra();
  const useFuncionarios = useFuncionario();
  const [obras, setObras] = useState([]);

  const handleCadastro = async () => {
    if (nome && profissao && salario && selectedObra) {
      await useFuncionarios.createFuncionario(
        { nome, salario, profissao },
        selectedObra
      );
      Alert.alert('Funcionário Criado');
      close();
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  };

  useEffect(() => {
    const getAllObras = async () => {
      const { result } = await useObras.list();
      const transformedData = result.map((item) => ({
        label: item.nome,
        value: item.id,
      }));
      setObras(transformedData);
    };

    getAllObras();
  }, []);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Cadastro de Funcionários</Text>
        <TextInput
          placeholder="Nome"
          value={nome}
          onChangeText={setNome}
          style={styles.input}
          placeholderTextColor="#000" // Cor do texto do placeholder
        />
        <TextInput
          placeholder="Profissão"
          value={profissao}
          onChangeText={setProfissao}
          style={styles.input}
          placeholderTextColor="#000" // Cor do texto do placeholder
        />
        <TextInput
          placeholder="Salário"
          value={salario}
          onChangeText={setSalario}
          keyboardType="numeric"
          style={styles.input}
          placeholderTextColor="#000" // Cor do texto do placeholder
        />
        <TouchableOpacity
          style={styles.input}
          onPress={() => setModalVisibleObra(true)}>
          <Text style={styles.inputText}>
            {selectedObra
              ? `Obra Selecionada: ${selectedObra}`
              : 'Selecione uma Obra'}
          </Text>
        </TouchableOpacity>

        {/* Modal para selecionar a obra */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisibleObra}
          onRequestClose={() => setModalVisibleObra(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Selecione uma Obra</Text>
              <FlatList
                data={obras}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedObra(item.value);
                      setModalVisibleObra(false);
                    }}>
                    <Text style={styles.obraText}>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisibleObra(false)}>
                <Text style={styles.buttonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.greenButton} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    color: '#000', // Cor do texto do input
  },
  inputText: {
    fontSize: 16,
    color: '#000', // Cor do texto do placeholder
  },
  obraText: {
    padding: 10,
    fontSize: 16,
    color: '#007BFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  greenButton: {
    backgroundColor: '#28a745', // Cor verde
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});
