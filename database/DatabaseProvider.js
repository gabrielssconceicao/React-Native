import {SQLiteProvider} from 'expo-sqlite'
import {createTables} from './createTables'
export default function DatabaseProvider({children}) {
  return <SQLiteProvider databaseName={"teste.db"} onInit={createTables}>{children}</SQLiteProvider>
}