import {View,Text,StyleSheet,Image} from 'react-native';
export const HomeScrenn = ()=>{
    return(
        <View>
          
            <Image
            style={styles.logo}
            source={require('../../imgs/drawable-xxxhdpi-icon-120x120.png')}
            />
        </View>
    )
}
const styles = StyleSheet.create({
container:{
    alignItems:'center',
    justifyContent:'center'
},logo:{
    width:70,
    height:70
}
})
//drawable-xxxhdpi-icon-120x120.png'