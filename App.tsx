
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DrawerRoutes } from './src/routes/drawer';
import 'react-native-gesture-handler';
import { ProdutosProvider } from './src/contexts/produtosOrcamento';
import { NativeBaseProvider } from 'native-base';

export default function App() {

 return (
  <NativeBaseProvider>

        <DrawerRoutes/>
        
        </NativeBaseProvider>

  );
}

