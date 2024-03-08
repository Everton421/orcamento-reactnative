import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { TabRoutes } from './tab';
import { HomeScrenn } from '../components/home';
import Acerto from '../components/acerto';

const Drawer = createDrawerNavigator();

export  const DrawerRoutes = ()=>{
    return(
        <NavigationContainer>
            <Drawer.Navigator>
            <Drawer.Screen   name='Home' component={HomeScrenn} />
                <Drawer.Screen options={{headerShown:false}} name='orçamento' component={TabRoutes} />
                <Drawer.Screen options={{headerShown:false}} name='acerto' component={Acerto} />

            </Drawer.Navigator>
        </NavigationContainer>
    )
}