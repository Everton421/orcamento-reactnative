import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';


export const Item = ({ item }) => {
    const [localQuantidade, setLocalQuantidade] = useState(1);
    const [localPreco, setLocalPreco] = useState(item.preco);
    const [totalProdutos, setTotalProdutos] = useState(item.total);

    const handleQuantidadeChange = (text: number) => {
        setLocalQuantidade(text);
    };

    const handlePrecoChange = (text: number) => {
        setLocalPreco(text);
        let valor = Number(item.preco) * Number(localQuantidade)
        setTotalProdutos(valor);
    };

    useEffect(
        ()=>{
                const total = localPreco * localQuantidade
                 item.quantidade = localQuantidade;
            item.preco = localPreco;
            setTotalProdutos(total);
        },[localPreco,localQuantidade]
    )    

    return (

        <View style={styles.container}>
            <View style={styles.item}>

                <View style={styles.itemR}>
                    <Text >
                        Codigo: <Text style={{ fontWeight: 'bold' }}> {item.codigo} </Text>
                    </Text>
                 
                </View>

        <View style={{alignItems:"center",justifyContent:"space-between", flexDirection:"row",margin:5}}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://reactnative.dev/img/tiny_logo.png', }}
                />
            <Text style={{ fontWeight: 'bold',maxWidth:250 ,fontSize:15}} numberOfLines={3} >
                                    {item.nome}
                                </Text>

                <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 2, width: 32}} >
                    <Text style={{ color: 'white' }}> X </Text>
                </TouchableOpacity>
        </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-evenly", margin: 3 }}>
                    <Text style={{ fontWeight: 'bold' }}  > quantidade:{localQuantidade} </Text>
                    <Text style={{ fontWeight: 'bold' }} > R$:{localPreco}</Text>
                        <Text style={{ fontWeight: 'bold' }}> total:</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>
                    <TextInput
                        style={{ borderRadius: 7, textAlign: 'center', backgroundColor: '#FFF' }}
                        placeholder=" quantidade  "
                        value={localQuantidade.toString()}
                        onChangeText={handleQuantidadeChange}
                        keyboardType="numeric"
                        defaultValue={item.quantidade}
                    />
                    <TextInput
                        style={{ borderRadius: 7, textAlign: 'center', backgroundColor: '#FFF' }}
                        placeholder="   preço   "
                        value={localPreco.toString()}
                        onChangeText={handlePrecoChange}
                        keyboardType="numeric"
                        defaultValue={item.preco}
                    />
                        <Text style={{ fontWeight: 'bold' }}> R$:{totalProdutos}</Text>
                        

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
        borderColor: '#1dc5ec',
        borderRadius: 7,
        backgroundColor: '#eeE'
    },
    itemR: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        marginTop: 10,
    }, logo: {
        width: 66,
        height: 58,
    }
})