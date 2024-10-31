import { View, Text, StyleSheet, Button } from 'react-native';
export function Obra({ obra }) {
  return (
    <View key={obra.id} style={styles.card}>
      <Text style={styles.cardName}>{obra.nome}</Text>
      <Text style={styles.cardDate}>{obra.data}</Text>
      <Button title="Apagar" color="#e74c3c" />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 200, 
    height: 100, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  cardDate: {
    fontSize: 14,
    color: '#888',
  },
});
