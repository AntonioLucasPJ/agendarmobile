import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native'
import { TelaHome } from './src/screens/Home/index.jsx';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Routes from './src/routes/routes.js';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/contexts/auth.js';
import { SingupProvider } from './src/contexts/user.jsx';
import { LoginProvider } from './src/contexts/login.jsx';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <LoginProvider>
          <SingupProvider>
            <Routes></Routes>
          </SingupProvider>
        </LoginProvider>
      </AuthProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',

  },
});
