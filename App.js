import * as React from 'react';
import { Button, View, Text, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TelaInicial from './src/pages/TelaInicial';
import PrimeiroAcesso from './src/pages/PrimeiroAcesso';
import HomeLogado from './src/pages/HomeLogado';
import Home from './src/pages/Home';
import FlashMessage from 'react-native-flash-message';
import MaisOpcoes from './src/pages/MaisOpcoes'


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

function Logado({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
    <HomeLogado navigation={navigation} />
    <FlashMessage position="top" animated={true} />
  </View>
    
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
function MaisOpts({ navigation }) {
  return (
    <MaisOpcoes navigation={navigation} />
  );
}
const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer  >
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={HomeDeslogado} initialParams={{ primAcess: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="HomeLogado" component={Logado} />
        <Stack.Screen name="MaisOpcoes" component={MaisOpts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;