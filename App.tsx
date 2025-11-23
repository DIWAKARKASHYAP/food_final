import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import AppNavigator from "./navigation/AppNavigator";
import './global.css';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
   return(
         // <SafeAreaProvider>
            <AppNavigator />
         // {/* </SafeAreaProvider> */}
      
   ) 
}
