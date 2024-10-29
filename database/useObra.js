import { useSQLiteContext } from 'expo-sqlite';
export function useObra() {
  const database = useSQLiteContext();

  async function createObra(obra) {
    
      const statement = await database.prepareAsync(
        'INSERT INTO Obra (nome, data, cep, numero, complemento, rua, bairro, cidade, latitude, longitude) VALUES ($nome, $data, $cep, $numero, $complemento, $rua, $bairro, $cidade, $latitude, $longitude)'
      );
    try {
      const result = await statement.executeAsync({
        $nome: obra.nome,
        $data: obra.data,
        $cep: obra.cep,
        $numero: obra.numero,
        $complemento: obra.complemento,
        $rua: obra.rua,
        $bairro: obra.bairro,
        $cidade: obra.cidade,
        $latitude: obra.latitude,
        $longitude: obra.longitude,
      });

      const insertedRow = result.lastInsertRowId.toLocaleString();
      return { insertedRow };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function list() {
    const query = 'SELECT * FROM Obra';
    try {
      const result = await database.getAllAsync(query);
      return { result };
    } catch (error) {
      throw error;
    }
  }

  return { createObra, list };
}
