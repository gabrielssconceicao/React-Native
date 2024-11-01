import { useSQLiteContext } from 'expo-sqlite';
export function useObraFuncionario() {
  const database = useSQLiteContext();

  /*
  
  async function relateFuncionarioObra(obraFuncionarioId) {
    const checkStatement = await database.prepareAsync(`
      SELECT COUNT(*) AS count 
      FROM Funcionario_Obra 
      WHERE funcionario_id = $funcionario_id AND obra_id = $obra_id
    `);

    try {
      // Verifica se a relação já existe
      const checkResult = await checkStatement.executeAsync({
        $funcionario_id: obraFuncionarioId.funcionarioId,
        $obra_id: obraFuncionarioId.obraId,
      });
      
      const exists = checkResult[0].count > 0;

      if (exists) {
        console.log('Relação já existe entre o funcionário e a obra.');
        return { message: 'Relação já existe.' };
      }

      // Se não existir, insere a nova relação
      const insertStatement = await database.prepareAsync(
        'INSERT INTO Funcionario_Obra (funcionario_id, obra_id) VALUES ($funcionario_id, $obra_id)'
      );
      
      const insertResult = await insertStatement.executeAsync({
        $funcionario_id: obraFuncionarioId.funcionarioId,
        $obra_id: obraFuncionarioId.obraId,
      });
      
      console.log(insertResult);
      const insertedRow = insertResult.lastInsertRowId.toLocaleString();
      return { insertedRow };

    } catch (error) {
      throw error;
    } finally {
      await checkStatement.finalizeAsync();
    }
  }
  
  */

  async function relateFuncionarioObra(obraFuncionarioId) {
    const statement = await database.prepareAsync(
      'INSERT INTO Funcionario_Obra (funcionario_id, obra_id) VALUES ($funcionario_id, $obra_id)'
    );
    try {
      const result = await statement.executeAsync({
        $funcionario_id: obraFuncionarioId.funcionarioId,
        $obra_id: obraFuncionarioId.obraId,
      });
      console.log(result);
      const insertedRow = result.lastInsertRowId.toLocaleString();
      return { insertedRow };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function getAll() {
    try {
      const result = await database.getAllAsync(`
  SELECT 
    Funcionarios.nome AS funcionario_nome, 
    Obra.nome AS obra_nome 
  FROM 
    Funcionario_Obra
  INNER JOIN 
    Funcionarios ON Funcionario_Obra.funcionario_id = Funcionarios.id
  INNER JOIN 
    Obra ON Funcionario_Obra.obra_id = Obra.id;
`);

      for (const row of result) {
        console.log(row);
      }
    } catch (e) {
      throw e;
    }
  }

  return { relateFuncionarioObra, getAll };
}
