import { openDatabaseAsync, SQLiteDatabase} from 'expo-sqlite';
export async function createTables(database: SQLiteDatabase) {
  try {
    await database.execAsync(`DROP TABLE IF EXISTS Obra`);
    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Obra (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nome TEXT ,
          data TEXT ,
          cep TEXT ,
          numero INTEGER ,
          complemento TEXT,
          rua TEXT ,
          bairro TEXT ,
          cidade TEXT ,
          latitude REAL ,
          longitude REAL 
      );
  `);
  } catch (error) {
    throw error
  } 
}
