import { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet, Text, FlatList, TextInput,Image } from "react-native";


export const ProdutosOrcamento = ({ data }) => {
    const [quantidade, setQuantidade] = useState(0);
    const [preco, setPreco] = useState(0);
    const [items, setItems] = useState(data);

    // Função para remover um item com base no índice
   
    const Item = ({ item}) => {
        const [localQuantidade, setLocalQuantidade] = useState(item.quantidade);
        const [localPreco, setLocalPreco] = useState(item.preco);
        const [totalProdutos, setTotalProdutos] = useState(item.total);

        const handleQuantidadeChange = (text) => {
            setLocalQuantidade(text);
          };
      
          const handlePrecoChange = (text) => {
            setLocalPreco(text);
            let valor = item.preco * localQuantidade
                setTotalProdutos( valor);
        };

          
       
     
        
        return (
            <View style={styles.container}>
                <View style={styles.item}>

                    <View style={styles.itemR}>
                        <Text >
                            Codigo: <Text style={{fontWeight:'bold'}}> {item.codigo} </Text>
                        </Text>
                        <Text style={{fontWeight:'bold'}} numberOfLines={2} >
                            {item.nome}
                        </Text>
                        
                         <TouchableOpacity 
                         style={{ backgroundColor: 'red', padding: 8,borderRadius:5 }}

                        >
                                <Text style={{color:'white'}}> X </Text>
                          </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly", margin: 5 }}>
                        <Text style={{fontWeight:'bold'}}  > {localQuantidade} </Text>
                        <Text style={{fontWeight:'bold'}} > R$:{localPreco}</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: "space-evenly" }}>

                                <TextInput
                                    style={{  borderRadius: 7, textAlign: 'center',backgroundColor:'#FFF' }}
                                    placeholder=" quantidade  "
                                    value={item.quantidade}
                                    onChangeText={handleQuantidadeChange}
                                    keyboardType="numeric"
                                        />

                                <TextInput
                                    style={{  borderRadius: 7, textAlign: 'center',backgroundColor:'#FFF' }}
                                    placeholder="   preço   "
                                    value={item.preco}
                                    onChangeText={handlePrecoChange}
                                    keyboardType="numeric"
                                />

                    </View>
                </View>
                <Text>{totalProdutos}</Text>
            </View>
        )
    }

    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <Item item={item} />
            }
        />
    )
}
const styles = StyleSheet.create({
    item: {
        margin: 5,
        padding: 5,
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderRadius: 7,
        backgroundColor:'#eeE'
    },
    itemR: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        marginTop: 10,
    },logo:{
        width: 66,
        height: 58,
    }
})