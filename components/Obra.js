import { View, Text, StyleSheet } from 'react-native';
export function Obra({obra}) {
  return (
    <View style={styles.container}>
      <Text>{obra.nome}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10
  }
});
