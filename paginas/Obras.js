import { useState,useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
 
} from 'react-native';

import { useObraDatabase } from '../database/useObraDatabase';
import {Obra} from '../components/Obra' 
export default function Obras() {
  const [obras, setObras] = useState([]);

  const {list} = useObraDatabase();
  useEffect(()=>{
    const getObras = async()=>{
      const {result} =await list();
      setObras(result);
      console.log(result)
    }

    getObras();
  },[]);
  
  return (
    <View style={styles.container}>
      <View style={styles.containerTarefas}>
        <FlatList
          data={obras}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <Obra obra={item} />}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    paddingTop: 50,
    paddingLeft: 20,
    paddingRight: 20,
    position: 'relative',
    gap: 20,
  },
  containerTarefas: {
    flex: 1,
    width: '100%',
    gap: 30,
  },
  addTarefa: {
    position: 'absolute',
    bottom: 50,
    right: 50,
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBtn: {
    position: 'absolute',
    bottom: 50,
    left: 50,
    backgroundColor: '#fff',
    borderRadius: 40,
    width: 80,
    height: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
