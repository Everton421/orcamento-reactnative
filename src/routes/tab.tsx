
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Main from '../components/main';
import { Cliente } from '../components/clientes';
import { Parcelas } from '../components/parcela';
import { Login } from '../components/login';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import { Produtos} from '../components/produtos/Produtos';
import { ProdutosProvider } from '../contexts/produtosOrcamento';
import { ClienteProvider } from '../contexts/clienteProvider';
const Tab = createBottomTabNavigator();

export const TabRoutes=()=>{
return(
  <ClienteProvider>
   <ProdutosProvider>
        <Tab.Navigator>
      {/*  <Tab.Screen options={{headerShown: false}} name='login' component={Login}/>*/ }
        
          <Tab.Screen  options={{headerShown: false,tabBarHideOnKeyboard:true,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="barschart" size={24} color="black" />
          ),
          tabBarLabelStyle:{fontSize:15,color:'black'}
          }} name='totais'  component={Main}/>

          <Tab.Screen options={{headerShown: false ,tabBarHideOnKeyboard:true,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="credit-card" size={27} color="black" />
          ),
          tabBarLabelStyle:{fontSize:15,color:'black'}
           }} name='produtos' component={Produtos}/>

          <Tab.Screen 
          options={{headerShown: false ,  tabBarHideOnKeyboard:true ,tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={27} color="black" />
          ), 
          tabBarLabelStyle:{fontSize:15,color:'black'}
        }}
              name='cliente' component={Cliente} />
          
          <Tab.Screen options={{headerShown: false ,tabBarHideOnKeyboard:true,
          tabBarIcon: ({ color, size }) => (
            <Entypo name="credit-card" size={27} color="black" />
          ),
          tabBarLabelStyle:{fontSize:15,color:'black'}
           }} name='parcelas' component={Parcelas}/>

        </Tab.Navigator>
   </ProdutosProvider>
   </ClienteProvider>
)
}