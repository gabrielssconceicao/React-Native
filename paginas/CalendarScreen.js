import React, { useState } from 'react';
import { View, StyleSheet, Alert, Text } from 'react-native';
import { Agenda } from 'react-native-calendars';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState();
  const today = new Date();

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    Alert.alert('Selected Date', `You selected ${day.dateString}`);
  };
  //https://www.npmjs.com/package/react-native-calendars/v/1.1286.0
  return (
    <View style={styles.container}>
      <Agenda
        items={{
          '2024-10-11': [{ name: 'item 1 - any js object' }],
          '2024-10-12': [{ name: 'item 2 - any js object', height: 80 }],
          '2024-10-13': [],
          '2024-10-14': [
            { name: 'item 3 - any js object' },
            { name: 'any js object' },
          ],
        }}
        renderItem={(item, firstItemInDay) => {
          return (
            <View style={{ backgroundColor: '#f00', flex: 1 }}>
              <Text>{item.name}</Text>
            </View>
          );
        }}
        renderEmptyDate={() => {
          return <Text>Vazio</Text>;
        }}
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
});

export default CalendarScreen;
