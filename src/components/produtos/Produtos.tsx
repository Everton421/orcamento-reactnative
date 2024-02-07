import React, { useEffect, useState, createContext } from 'react';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Button,Modal } from 'react-native';
import { api } from '../../services/api';
import { TextInput } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import { useProdutosContext } from '../../contexts/produtosOrcamento';
import { produtosFic } from '../dados/produtos';
import { Produto } from '../../interfaces/produto';


export const Produtos = () => {
  const [data, setData] = useState<Produto[]>([]);
  const [pesquisa, setPesquisa] = useState([]);
  const [selectedItem, setSelectedItem] = useState([])
   const [visible,setVisible] = useState(false)
 const {produtosDoOrcamento,atualizaProdutos} = useProdutosContext();



  function renderItem(item: Produto) {
    return (
      <TouchableOpacity style={[styles.item, {
        backgroundColor: selectedItem?.findIndex(i => i.CODIGO === item.CODIGO) != -1 ? '#009de2' : '#FFF'
      }]}
        onPress={() => toggleSelection(item)}>

        <Text
          style={[styles.txt, { fontWeight: selectedItem?.findIndex(i => i.CODIGO === item.CODIGO) != -1 ? 'bold' : null }]}
        >codigo: {item.CODIGO} </Text>
         <Text style={styles.txt}>  {item.DESCRICAO}</Text>

        
         <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <View style={{backgroundColor:'#FFF',padding:5,borderRadius:8}}>
          <Text style={{fontWeight:'bold'}}>R$: {item.PRECO.toFixed(2)}</Text>
          </View>
          {selectedItem?.findIndex(i => i.CODIGO === item.CODIGO) != -1 ?
          <AntDesign name="checkcircle" size={24} color="black" />
          : null}

         </View>
         
      </TouchableOpacity>
    )
  }

  function toggleSelection(item: any) {
    let index = selectedItem.findIndex(i => i?.CODIGO === item?.CODIGO);
    let arrSelect = [...selectedItem];
    if (index != -1) {
      arrSelect.splice(index, 1);
    } else {
      arrSelect.push(item)
    }
    setSelectedItem(arrSelect);
    atualizaProdutos(arrSelect)
  }
  useEffect(() => {
      const arrProd = produtosFic;
        setData(arrProd);

  }, [pesquisa]);

/******************************************************************/
/*  
useEffect(() => {
    async function busca() {
      try {
        const response = await api.get(`produtos/${pesquisa}`);
        setData(response.data); 
       // console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
    busca();
  }, [pesquisa]);
*/
  /******************************************************************/




  function adiciona(dado) {
    setPesquisa(dado);
  }
  function limpar(){
    atualizaProdutos([]);
    setSelectedItem([]);
  }

  return (
      <View style={styles.container}>
  

               <View style={{margin:10,flexDirection:'row',justifyContent:'space-between'}}>
                    <TextInput
                      style={styles.input}
                      placeholder='  pesquisar'
                      value={pesquisa}
                      onChangeText={(value) => adiciona(value)}
                      placeholderTextColor='#009de2'
                    />
                   <TouchableOpacity onPress={()=>limpar()}>
                      <View style={styles.limpar}>
                        <Text style={{color:'#FFF'}}>
                            limpar
                        </Text>
                      </View>
                    </TouchableOpacity>
                    
              </View>
                    <FlatList
                      data={data}
                      renderItem={({ item }) => renderItem(item)}
                      keyExtractor={(item) => item.CODIGO}
                    />
                  {/**
                    <Button
                      title='enviar'
                      onPress={() => console.log(selectedItem)}
                    />
                     */}

     
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 25,
    backgroundColor:'#dcdcdd'
  }
  ,
  item: {
    backgroundColor: '#f9c2ff', //#dcdcdd

    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius:5
  },
  title: {
    fontSize: 32,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 4,
    height: 35,
    width:210,
    textAlign:'justify',
    borderColor:'black',
    borderWidth:1
  },
  limpar:{
    borderRadius:5,
    backgroundColor:'red',
    width:50,
    height: 35,
    justifyContent:'center',
    alignItems:'center',
    marginEnd:1
  },
  txt:{
    fontWeight:'bold'
  }
});
