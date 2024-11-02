import { useSQLiteContext } from 'expo-sqlite';
import {useObraFuncionario} from './useObraFuncionario'
export function useFuncionario() {
  const database = useSQLiteContext();
  const {relateFuncionarioObra} = useObraFuncionario()
  async function createFuncionario(funcionario, obraId) {
    
      const statement = await database.prepareAsync(
        'INSERT INTO Funcionarios (nome, salario, profissao) VALUES ($nome, $salario, $profissao)'
      );
    try {
      const result = await statement.executeAsync({
        $nome: funcionario.nome,
        $salario: funcionario.salario,
        $profissao: funcionario.profissao
      });

      const insertedRow = result.lastInsertRowId;
      await relateFuncionarioObra(insertedRow,obraId)
       return;
      
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function list() {
    const query = 'SELECT * FROM Funcionarios';
    try {
      const result = await database.getAllAsync(query);
      return { result };
    } catch (error) {
      throw error;
    }
  }

  return { createFuncionario, list };
}
