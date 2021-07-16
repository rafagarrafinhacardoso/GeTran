import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/pages/TelaInicial';
import PrimeiroAcesso from './src/pages/PrimeiroAcesso';
import MaisOpcoes from './src/pages/MaisOpcoes'
import Home from './src/pages/Home';
import FlashMessage from 'react-native-flash-message';

function HomeDeslogado({ route, navigation }) {
  const { primAcess } = route.params;
  return (
    <View style={{ flex: 1 }}>
      {!primAcess &&
        <TelaInicial navigation={navigation} />
      }
      {primAcess &&
        <PrimeiroAcesso navigation={navigation} />
      }
      <FlashMessage position="bottom" animated={true} />
    </View>
  );
}

function HomeLogado({ navigation }) {
  return (
    <Home navigation={navigation} />
  );
}

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text >Home</Text>
      </TouchableOpacity>
    </View>
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={HomeDeslogado} initialParams={{ primAcess: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="HomeLogado" component={HomeLogado} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;