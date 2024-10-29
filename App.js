import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './paginas/Login';
import Home from './paginas/Home';
import CalendarScreen from './paginas/CalendarScreen';
import MapScreen from './paginas/MapScreen';
import ClockScreen from './paginas/ClockScreen';
import Obras from './paginas/Obras';
import CadastrarObra from './paginas/CadastrarObra';
import CadastrarFuncionario from './paginas/CadastrarFuncionario';
import DatabaseProvider from './database/DatabaseProvider'

const Stack = createStackNavigator();

const App = () => {
  return (

     <DatabaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
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
            name="Calendário"
            component={CalendarScreen}
            options={{ headerShown: true, title: 'Calendário' }}
          />
          <Stack.Screen
            name="Mapa"
            component={MapScreen}
            options={{ headerShown: true, title: 'Mapa' }}
          />
          <Stack.Screen
            name="Clock"
            component={ClockScreen}
            options={{ headerShown: true, title: 'Clock' }}
          />
          <Stack.Screen
            name="Obras"
            component={Obras}
            options={{ headerShown: true, title: 'Obras' }}
          />
          <Stack.Screen
            name="CadastrarObra"
            component={CadastrarFuncionario}
            options={{ headerShown: true, title: 'CadastrarObra' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DatabaseProvider>
  );
};

export default App;
