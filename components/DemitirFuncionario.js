import { useState, useEffect } from 'react';
import {Alert, View, Text, FlatList, TouchableOpacity, Modal,StyleSheet } from 'react-native';
import { useFuncionario } from '../database/useFuncionario';
export function DemitirFuncionario({close}) {
  const [modalVisibleConfirmacaoExclusao, setModalVisibleConfirmacaoExclusao] =
    useState(false);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState({})
  const [funcionarios, setFuncionarios] = useState([]);
  const useFuncionarios = useFuncionario();
  const handleDemissao = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModalVisibleConfirmacaoExclusao(true);
  };

  const confirmDelete = () => {
    if (funcionarioSelecionado) {
      setFuncionarios(
        funcionarios.filter(
          (funcionario) => funcionario.nome !== funcionarioSelecionado.nome
        )
      );
      Alert.alert(
        'Funcionário excluído',
        `Funcionário: ${funcionarioSelecionado.nome} foi demitido.`
      );
      setFuncionarioSelecionado({});
    }
    setModalVisibleConfirmacaoExclusao(false);
    close();
  };

  useEffect(() => {
    const getAll = async () => {
      try {
        const { result } = await useFuncionarios.list();
        setFuncionarios(result);
      } catch {
        Alert.alert(error);
      }
    };
    getAll();
  }, []);

  return (
    <>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            Selecionar Funcionário para Demissão
          </Text>
          {funcionarios.length === 0 ? (
            <Text>Nenhum funcionário cadastrado.</Text>
          ) : (
            <FlatList
              data={funcionarios}
              keyExtractor={(item) => item.nome}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleDemissao(item)}>
                  <Text style={styles.funcionarioText}>{item.nome}</Text>
                </TouchableOpacity>
              )}
            />
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={close}>
            <Text style={styles.buttonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Modal de Confirmação de Exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConfirmacaoExclusao}
        onRequestClose={() => setModalVisibleConfirmacaoExclusao(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmação de Demissão</Text>
            <Text>
              Deseja excluir o funcionário {funcionarioSelecionado?.nome}?
            </Text>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={confirmDelete}>
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisibleConfirmacaoExclusao(false)}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
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
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  funcionarioText: {
    padding: 10,
    fontSize: 16,
    color: '#333',
  },
  confirmButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
})
