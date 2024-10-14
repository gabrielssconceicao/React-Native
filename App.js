import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './paginas/Login';
import Home from './paginas/Home';
import CalendarScreen from './paginas/CalendarScreen';
import MapScreen from './paginas/MapScreen';
import ClockScreen from './paginas/ClockScreen';
import Tarefas from './paginas/Tarefas';
import CadastroEndereco from './paginas/CadastroEndereco';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Tarefas">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Calendar"
            component={CalendarScreen}
            options={{ headerShown: true, title: 'Calendar' }}
          />
          <Stack.Screen
            name="Map"
            component={MapScreen}
            options={{ headerShown: true, title: 'Map' }}
          />
          <Stack.Screen
            name="Clock"
            component={ClockScreen}
            options={{ headerShown: true, title: 'Clock' }}
          />
          <Stack.Screen
            name="Tarefas"
            component={Tarefas}
            options={{ headerShown: false, title: 'Tarefas' }}
          />
          <Stack.Screen
            name="CadastroEndereco"
            component={CadastroEndereco}
            options={{ headerShown: false, title: 'CadastroEndereco' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
