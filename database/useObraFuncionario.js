import { useSQLiteContext } from 'expo-sqlite';
export function useObraFuncionario() {
  const database = useSQLiteContext();

  async function relateFuncionarioObra(funcionarioId, obraId) {
    const checkStatement = await database.prepareAsync(
      'SELECT *  FROM Funcionario_Obra  WHERE funcionario_id = $funcionarioId AND obra_id = $obraId'
    );

    try {
      // Verifica se a relação já existe
      const checkResult = await checkStatement.executeAsync({
        $funcionarioId: funcionarioId,
        $obraId: obraId,
      });
      const exists = await checkResult.getAllAsync();

      if (exists.length !== 0) {
       
        return { result: 'Relação já existe.' };
      }

      //Se não existir, insere a nova relação
      const insertStatement = await database.prepareAsync(
        'INSERT INTO Funcionario_Obra (funcionario_id, obra_id) VALUES ($funcionarioIdd, $obraIdd)'
      );

      await insertStatement.executeAsync({
        $funcionarioIdd: funcionarioId,
        $obraIdd: obraId,
      });

     
      return;
    } catch (error) {
      throw error;
    } finally {
      await checkStatement.finalizeAsync();
    }
  }

  // async function relateFuncionarioObra(obraFuncionarioId) {
  //   const statement = await database.prepareAsync(
  //     'INSERT INTO Funcionario_Obra (funcionario_id, obra_id) VALUES ($funcionario_id, $obra_id)'
  //   );
  //   try {
  //     const result = await statement.executeAsync({
  //       $funcionario_id: obraFuncionarioId.funcionarioId,
  //       $obra_id: obraFuncionarioId.obraId,
  //     });
  //     console.log(result);
  //     const insertedRow = result.lastInsertRowId.toLocaleString();
  //     return { insertedRow };
  //   } catch (error) {
  //     throw error;
  //   } finally {
  //     await statement.finalizeAsync();
  //   }
  // }

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
