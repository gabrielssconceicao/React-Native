import { useSQLiteContext } from 'expo-sqlite';
export function useFuncionario() {
  const database = useSQLiteContext();

  async function createFuncionario(funcionario) {
    
      const statement = await database.prepareAsync(
        'INSERT INTO Funcionarios (nome, salario_semanal, salario_mensal, profissao) VALUES ($nome, $salario_semanal, $salario_mensal, $profissao)'
      );
    try {
      await statement.executeAsync({
        $nome: funcionario.nome,
        $salario_semanal: funcionario.salarioSemanal,
        $salario_mensal: funcionario.salarioMensal,
        $profissao: funcionario.profissao
      });

      // const insertedRow = result.lastInsertRowId.toLocaleString();
      // return { insertedRow };
      
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
