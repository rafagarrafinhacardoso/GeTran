import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/pages/TelaInicial';
import Home from './src/pages/Home';
import Login from './src/pages/Login';


function HomeDeslogado({ navigation }) {
  return (
    <TelaInicial navigation={navigation} />
  );
}

function HomeLogado({ navigation }) {
  return (
    <Home navigation={navigation} />
  );
}


function Logar({ navigation }) {
  return (
    <Login navigation={navigation} />
  );
}


function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Sc2reen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={HomeDeslogado} />
        <Stack.Screen name="Login" component={Logar} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="HomeLogado" component={HomeLogado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;