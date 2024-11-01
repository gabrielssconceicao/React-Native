import { useSQLiteContext } from 'expo-sqlite';
export function useObraFuncionario() {
  const database = useSQLiteContext();

  async function relateFuncionarioObra(obraFuncionarioId) {
    const statement = await database.prepareAsync(
      'INSERT INTO Funcionario_Obra (funcionario_id, obra_id) VALUES ($funcionario_id, $obra_id)'
    );
    try {
      const result = await statement.executeAsync({
        $funcionario_id: obraFuncionarioId.funcionarioId,
        $obra_id: obraFuncionarioId.obraId     
      });

      const insertedRow = result.lastInsertRowId.toLocaleString();
      return { insertedRow };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  

  return {relateFuncionarioObra };
}
