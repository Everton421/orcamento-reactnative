import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { Produto } from "../../interfaces/produto";

export const Item = ( {item}) => {
    const [localQuantidade, setLocalQuantidade] = useState<number>(1);
    const [localTotalLiquido,setLocalTotalLiquido] = useState<number>(0);
    const [localTotal, setLocalTotal] = useState(0);

    const handleQuantidadeChange = (text) => {
      const numericValue = parseInt(text);
     if (!isNaN(numericValue)) {
            setLocalQuantidade(numericValue);
        }
    };
    useEffect(
        ()=>{
            function calcularTotalLiquido(item: Produto): void {
                item.QUANTIDADE = localQuantidade
                    setLocalTotalLiquido( item.QUANTIDADE * item.PRECO)
                    if(item.TOTALLIQUIDO ===0){
                        item.TOTALLIQUIDO=localTotalLiquido
                   }else{
                    item.TOTALLIQUIDO= item.PRECO *item.QUANTIDADE
                   }
                }
          calcularTotalLiquido(item)
        },[localQuantidade,item]
    )    

    return (

        <View style={styles.container}>
            <View style={styles.item}>

                <View style={styles.itemR}>
                    <Text >
                        Codigo: <Text style={{ fontWeight: 'bold' }}> {item.CODIGO} </Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }} > preço: {item.PRECO.toFixed(2)} </Text>
                 
                </View>

        <View style={{alignItems:"center",justifyContent:"space-between", flexDirection:"row",margin:5}}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png', }}
                />
            <Text style={{ fontWeight: 'bold',maxWidth:250 ,fontSize:15}} numberOfLines={3} >
                                    {item.DESCRICAO}
                                </Text>

                <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 2, width: 32}} >
                    <Text style={{ color: 'white' }}> X </Text>
                </TouchableOpacity>
        </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-evenly", margin: 3 }}>
                    <Text style={{ fontWeight: 'bold' }}  > quantidade: {localQuantidade} </Text>
                        <Text style={{ fontWeight: 'bold' }}> total:</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>
                    <TextInput
                        style={{ borderRadius: 7, textAlign: 'center', backgroundColor: '#FFF' }}
                        placeholder=" quantidade  "
                        value={localQuantidade}
                        onChangeText={handleQuantidadeChange}
                        keyboardType="numeric"
                    />
                        <Text style={{ fontWeight: 'bold' }}> R$:{localTotalLiquido.toFixed(2)}</Text>
                        
                </View>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    item: {
        margin: 5,
        padding: 5,
        borderWidth: 1.5,
        borderColor: '#009de2',
        borderRadius: 7,
        backgroundColor: '#eeE'
    },
    itemR: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        marginTop: 10,
    }, 
    logo: {
        width: 66,
        height: 58,
    }
})