import { useState, useCallback } from 'react';
import { generateTestAddresses } from '../helpers/gerarTarefas';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@enderecos';

export function useEndereco() {
  const [enderecos, setEnderecos] = useState([]);

  // Função para carregar endereços do AsyncStorage
  const loadEnderecos = useCallback(async () => {
    try {
      const storedEnderecos = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedEnderecos !== null) {
        setEnderecos(JSON.parse(storedEnderecos)); // Carrega os endereços salvos
      } else {
        const newEnderecos = generateTestAddresses(20);
        setEnderecos(newEnderecos);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEnderecos)); // Salva os endereços gerados
      }
    } catch (error) {
      console.error('Erro ao carregar ou salvar endereços', error);
    }
  }, []);

  // Função para salvar novos endereços manualmente
  const saveEnderecos = useCallback(async (newEnderecos) => {
    try {
      setEnderecos(newEnderecos);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newEnderecos)); // Salva os novos endereços no AsyncStorage
    } catch (error) {
      console.error('Erro ao salvar endereços', error);
    }
  }, []);

  // Função para remover um endereço pelo índice
  const deleteEndereco = useCallback(
    async (index) => {
      try {
        const updatedEnderecos = enderecos.filter((_, i) => i !== index); // Remove o endereço no índice dado
        setEnderecos(updatedEnderecos);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedEnderecos)); // Atualiza o AsyncStorage
      } catch (error) {
        console.error('Erro ao apagar endereço', error);
      }
    },
    [enderecos]
  );

  

  return { enderecos, loadEnderecos, saveEnderecos, deleteEndereco };
}
