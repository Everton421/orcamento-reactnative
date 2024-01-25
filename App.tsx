
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { DrawerRoutes } from './src/routes/drawer';
const Tab = createBottomTabNavigator();
import 'react-native-gesture-handler';
import { ProdutosProvider } from './src/contexts/produtosOrcamento';


export default function App() {

 return (
        <DrawerRoutes/>

  );
}

