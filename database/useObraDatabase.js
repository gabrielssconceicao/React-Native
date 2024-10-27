import { useSQLiteContext } from 'expo-sqlite';
export function useObraDatabase() {
  const database = useSQLiteContext();

  async function create(obra) {
    const statement = await database.prepareAsync(
      'INSERT INTO Obra (nome,data, rua, cidade, bairro, latitude, longitude) VALUES ($nome,$data $rua, $cidade, $bairro, $latitude, $longitude)'
    );

    try {
      const result = await statement.executeAsync({
        $nome: obra.nome,
        $data: obra.data,
        $rua: obra.rua,
        $cidade: obra.cidade,
        $bairro: obra.bairro,
        $latitude: obra.latitude,
        $longitude: obra.longitude,
      });

      const insertedRow = result.lastInsertRowId.toLocaleString();
      return {insertedRow}
    } catch (error) {
      console.error('Error inserting obra:', error);
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function list() {
    const query = "SELECT * FROM Obra"
    try {
      const result = await database.getAllAsync(query)
      return {result}
    } catch (error) {
      throw error
    } 
  }

  return { create, list };
}
