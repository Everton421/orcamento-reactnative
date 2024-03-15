import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import AcertoCamera from "./acertoCamera";
import { acertoProduto } from "./acertoProduto";

const tab = createBottomTabNavigator();

export const tabRoutesAcerto =()=>{
    return(
        <tab.Navigator>
            
            <tab.Screen 
            options={{headerShown:false}}
            name="ler codigo"
            component={AcertoCamera}
            />
            
            <tab.Screen 
            options={{headerShown:false}}
                name="prod"
                component={acertoProduto}
            />
        
        </tab.Navigator>


    )
}
