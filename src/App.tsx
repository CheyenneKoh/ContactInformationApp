import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {QueryClientProvider} from 'react-query';
import {AppStackParamList} from './models/Navigation';
import {ContactInformation} from './screens/ContactInformation';
import {ContactsList} from './screens/ContactsList';
import {queryClient} from './services/QueryClientService';

const Stack = createNativeStackNavigator<AppStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ContactsList"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="ContactsList" component={ContactsList} />
            <Stack.Screen
              name="ContactInformation"
              component={ContactInformation}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;
