import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { useEndereco } from '../hooks/useEnderecos';

const CalendarScreen = () => {
  const [items, setItems] = useState({});
  const { enderecos, loadEnderecos } = useEndereco();
  useEffect(loadEnderecos, [loadEnderecos]);

  useEffect(() => {
    // Função para agrupar endereços por data
    const groupedEnderecos = enderecos.reduce((acc, curr) => {
      const { data, endereco } = curr;

      // Se a data ainda não existir no acumulador, crie um array vazio para ela
      if (!acc[data]) {
        acc[data] = [];
      }

      // Adiciona o endereço ao array correspondente à data
      acc[data].push({ endereco });
      return acc;
    }, {});

    setItems(groupedEnderecos);
    console.log(groupedEnderecos)
  }, [enderecos]);

  //https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
  return (
    <View style={styles.container}>
      <Agenda
        items={items}
        renderItem={(item, firstItemInDay) => {
          console.log(item);
          console.log(firstItemInDay);
          return (
            <View style={styles.item}>
              <Text>{item.endereco}</Text>
            </View>
          );
        }}
        renderEmptyDate={() => (
          <View style={styles.emptyDate}>
            <Text>Sem endereços</Text>
          </View>
        )}
        renderEmptyData={() => (
          <View style={styles.emptyDate}>
            <Text>Nada encontrado</Text>
          </View>
        )}
        showClosingKnob={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  emptyDate: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default CalendarScreen;
