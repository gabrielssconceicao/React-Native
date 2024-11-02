import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, FlatList } from 'react-native';
import {CadastarFuncionario} from '../components/CadastrarFuncionario'
const Workers = () => {
  const [modalVisibleCadastro, setModalVisibleCadastro] = useState(false);
  const [modalVisibleMostrar, setModalVisibleMostrar] = useState(false);
  const [modalVisibleDemissao, setModalVisibleDemissao] = useState(false);
  
  const [modalVisibleConfirmacaoExclusao, setModalVisibleConfirmacaoExclusao] = useState(false);
  
  const [funcionarios, setFuncionarios] = useState([]);
  const [funcionarioSelecionado, setFuncionarioSelecionado] = useState(null);

  const handleMostrar = (funcionario) => {
    Alert.alert(
      'Detalhes do Funcionário',
      `Nome: ${funcionario.nome}\nProfissão: ${funcionario.profissao}\nSalário: ${funcionario.salario}\nObra: ${funcionario.obra}`
    );
  };

  const handleDemissao = (funcionario) => {
    setFuncionarioSelecionado(funcionario);
    setModalVisibleConfirmacaoExclusao(true);
  };

  const confirmDelete = () => {
    if (funcionarioSelecionado) {
      setFuncionarios(funcionarios.filter(funcionario => funcionario.nome !== funcionarioSelecionado.nome));
      Alert.alert('Funcionário excluído', `Funcionário: ${funcionarioSelecionado.nome} foi demitido.`);
      setFuncionarioSelecionado(null);
    }
    setModalVisibleConfirmacaoExclusao(false);
    setModalVisibleDemissao(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.circleButton} 
        onPress={() => setModalVisibleCadastro(true)}
      >
        <Text style={styles.buttonText}>Cadastrar Funcionários</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.circleButton} 
        onPress={() => setModalVisibleMostrar(true)}
      >
        <Text style={styles.buttonText}>Mostrar Funcionários</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={[styles.circleButton, styles.demitirButton]} 
        onPress={() => setModalVisibleDemissao(true)}
      >
        <Text style={styles.buttonText}>Demissão</Text>
      </TouchableOpacity>

      {/* Modal para Cadastro de Funcionários */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleCadastro}
        onRequestClose={() => setModalVisibleCadastro(false)}
      >
        <CadastarFuncionario close={() => setModalVisibleCadastro(false)}/>
      </Modal>

      {/* Modal para Mostrar Funcionários */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleMostrar}
        onRequestClose={() => setModalVisibleMostrar(false)}
      >
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
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisibleMostrar(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal para Demissão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleDemissao}
        onRequestClose={() => setModalVisibleDemissao(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecionar Funcionário para Demissão</Text>
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
              onPress={() => setModalVisibleDemissao(false)}
            >
              <Text style={styles.buttonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de Confirmação de Exclusão */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisibleConfirmacaoExclusao}
        onRequestClose={() => setModalVisibleConfirmacaoExclusao(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmação de Demissão</Text>
            <Text>Deseja excluir o funcionário {funcionarioSelecionado?.nome}?</Text>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmDelete}>
              <Text style={styles.buttonText}>Excluir</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => setModalVisibleConfirmacaoExclusao(false)}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F9F9F9',
  },
  circleButton: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  demitirButton: {
    backgroundColor: '#FF4D4D',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
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
  closeButton: {
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButton: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Workers;