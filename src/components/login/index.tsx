import { useState } from "react"
import { View,TextInput,TouchableOpacity,Text,StyleSheet } from "react-native"

    const users=[
        {"usuario":"teste", "senha":"123"},
        {"usuario":"teste1", "senha":"123"},
        {"usuario":"teste2", "senha":"123"},
        {"usuario":"teste3", "senha":"123"},

    ]

export const Login = ()=>{
    const [data, setData] = useState();
    return(
        <View style={styles.container}>
            <TextInput 
            value={data}
            onChangeText={(data)=> setData(data)}
            style={{borderColor:'black',borderWidth:1,maxWidth:250,height:35,borderRadius:5}}
           />
            <TouchableOpacity style={{backgroundColor:'#fdd',padding:10}} onPress={()=> console.log(data)} >
                    <Text>
                        enviar
                    </Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        marginTop:50,

    }
})