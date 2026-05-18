import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import { TelaHome } from './src/screens/Home/index.jsx';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes/routes.js';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/auth.js';
import { SingupProvider } from './src/contexts/user.jsx';
export default function App() {
  return (
    <NavigationContainer>
      <SingupProvider>
        <AuthProvider>
          <Routes></Routes>
        </AuthProvider>
      </SingupProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

  },
});
