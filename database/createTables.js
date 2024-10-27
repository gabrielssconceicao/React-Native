import { type SQLiteDatabase } from 'expo-sqlite';
export async function createTables(database: SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS Obra (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nome TEXT NOT NULL,
      data TEXT NOT NULL,
      rua TEXT NOT NULL,
      cidade TEXT NOT NULL,
      bairro TEXT NOT NULL,
      latitude REAL,
      longitude REAL
    );
  `);
}
