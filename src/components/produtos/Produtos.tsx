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
  const [pesquisa, setPesquisa] = useState();
  const [selectedItem, setSelectedItem] = useState([])
   const [visible,setVisible] = useState(false)
 const {produtosDoOrcamento,atualizaProdutos} = useProdutosContext();



  function renderItem(item: Produto) {
    return (
      <TouchableOpacity style={[styles.item, {
        backgroundColor: selectedItem?.findIndex(i => i.codigo === item.codigo) != -1 ? '#009de2' : '#FFF'
      }]}
        onPress={() => toggleSelection(item)}>

        <Text
          style={[styles.txt, { fontWeight: selectedItem?.findIndex(i => i.codigo === item.codigo) != -1 ? 'bold' : null }]}
        >codigo: {item.codigo} </Text>
         <Text style={styles.txt}>  {item.descricao}</Text>

        
         <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
          <View style={{backgroundColor:'#FFF',padding:5,borderRadius:8}}>
          <Text style={{fontWeight:'bold'}}>R$: {item.preco}</Text>
          </View>
          {selectedItem?.findIndex(i => i.codigo === item.codigo) != -1 ?
          <AntDesign name="checkcircle" size={24} color="black" />
          : null}

         </View>
         
      </TouchableOpacity>
    )
  }

  function toggleSelection(item: any) {
    let index = selectedItem.findIndex(i => i?.codigo === item?.codigo);
    let arrSelect = [...selectedItem];
    if (index != -1) {
      arrSelect.splice(index, 1);
    } else {
      arrSelect.push(item)
    }
    setSelectedItem(arrSelect);
    atualizaProdutos(arrSelect)
  }


/******************************************************************/
 
useEffect(() => {
    async function busca() {
      try {
        const response = await api.get(`produto/${pesquisa}`);
        setData(response.data); 
      //  console.log(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    busca();

    if(pesquisa === null || pesquisa === ''){
        setPesquisa(undefined);
    }
  }, [pesquisa]);

  /******************************************************************/




  function adiciona(dado) {
    setPesquisa(dado);
  }
  function limpar(){
    atualizaProdutos([]);
    setSelectedItem([]);
    setPesquisa(undefined);
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
                      keyExtractor={(item) => item.codigo}
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
    backgroundColor: '#FFF', borderRadius: 4,
    paddingHorizontal: 70, marginTop:3,
    borderColor:'black',borderWidth:1
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
