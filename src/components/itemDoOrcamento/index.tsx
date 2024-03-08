import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Image } from 'react-native';
import { Produto } from "../../interfaces/produto";

export const ListaItemOrcamento = ({ item }) => {
    const [totalGeral, setTotalGeral] = useState<number | undefined >();
    const handleTotalLiquidoChange = (updatedItem) => {
        // Atualiza o valor total geral quando um item é atualizado
        let novoTotalGeral = 0;
        item.forEach((i) => {
            novoTotalGeral += i.TOTALLIQUIDO
        })
        setTotalGeral(novoTotalGeral);
    };

    return (
        <View>
             <View style={{ borderColor: '#ccc', borderWidth: 1  ,backgroundColor:'#FFF', borderRadius:5}}>
                <View style={{ margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                   <Text style={{fontWeight:'bold'}}>total: R${totalGeral}</Text> 
                </View>
            </View>
            <FlatList
                data={item}
                renderItem={({ item }) => <Item item={item} handleTotalLiquidoChange={handleTotalLiquidoChange} />}
            />
        </View>
    )

}

export const Item = ({ item, handleTotalLiquidoChange }) => {
    const [localQuantidade, setLocalQuantidade] = useState<number>(1);
    const [localTotalLiquido, setLocalTotalLiquido] = useState<number>(0);
    const [localDesconto,setLocalDesconto] = useState(0);

    const handleQuantidadeChange = (text) => {
        const numericValue = parseInt(text);
        if (!isNaN(numericValue)) {
            setLocalQuantidade(numericValue);
        }
    };
const calculaDesconto = (value)=>{
        const desconto = parseFloat(value)
        if(!isNaN(value)){
            setLocalDesconto(desconto);
        }
    }

    useEffect(() => {
        function calcularTotalLiquido(item): void {
            item.QUANTIDADE = localQuantidade;
            item.DESCONTO = localDesconto;

            const total = (item.preco - localDesconto) * localQuantidade;

            setLocalTotalLiquido(total);
            
            item.TOTALLIQUIDO = total;
            handleTotalLiquidoChange(item); // Chama a função para atualizar o valor total geral
        }
        calcularTotalLiquido(item);
    }, [localQuantidade,localDesconto]);

    return (
        <View style={styles.container}>
            <View style={styles.item}>
                <View style={styles.itemR}>
                    <Text >
                        Codigo: <Text style={{ fontWeight: 'bold' }}> {item.codigo} </Text>
                    </Text>
                    <Text style={{ fontWeight: 'bold' }} > preço: {item.preco?.toFixed(2)} </Text>
                </View>
                <View style={{ alignItems: "center", justifyContent: "space-between", flexDirection: "row", margin: 5 }}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: 'https://reactnative.dev/img/tiny_logo.png',
                        }}
                    />
                    <Text style={{ fontWeight: 'bold', maxWidth: 250, fontSize: 15 }} numberOfLines={3} >
                        {item.DESCRICAO}
                    </Text>

                    <TouchableOpacity style={{ backgroundColor: 'red', padding: 5, borderRadius: 2, width: 32 }} >
                        <Text style={{ color: 'white' }}> X </Text>
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-evenly", margin: 3 }}>
                    <Text style={{ fontWeight: 'bold' }}  > quantidade: {localQuantidade} </Text>
                    <Text style={{ fontWeight: 'bold' }}  > desconto:  {localDesconto}</Text>

                    <Text style={{ fontWeight: 'bold' }}> total:</Text>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>
                    <TextInput
                        style={{ borderRadius: 7, textAlign: 'center', backgroundColor: '#FFF' }}
                        placeholder=" quantidade  "
                        onChangeText={handleQuantidadeChange}
                        keyboardType="numeric"
                    />
                     <TextInput
                        style={{ borderRadius: 7, textAlign: 'center', backgroundColor: '#FFF' }}
                        placeholder=" desconto  "
                        onChangeText={calculaDesconto}
                        value={localDesconto}
                        defaultValue="0"
                        keyboardType="numeric"
                    />
                    <Text style={{ fontWeight: 'bold' }}> R$:{localTotalLiquido?.toFixed(2)}</Text>

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
        backgroundColor: '#EEE'
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
