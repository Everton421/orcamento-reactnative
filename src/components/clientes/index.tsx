import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet,Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import { api } from "../../services/api";
import { useClienteContext } from "../../contexts/clienteProvider";

import { useProdutosContext } from '../../contexts/produtosOrcamento';

import { clientesFic } from "../dados/clientes";
import { Client } from "../../interfaces/cliente";

export const Cliente = () => {
  const [aux, setAux] = useState('');
  const [data, setData] = useState();
  const [clienteSelecionado, setClienteSelecionado] = useState();
  const [dados, setDados] = useState<any>([]);

const {cliente,atualizaCliente} = useClienteContext();


/********************************************************* 
  useEffect(
    () => {
      async function busca() {
        try {
          const response = await api.get('clientes')
          setDados(response.data)
          //console.log(response.data)
        } catch (err) {
          console.log(err);
        }
      }

      busca();
    }, []
  )
/********************************************************* 

*/

  function addCliente(value) {
    setClienteSelecionado(value);
    atualizaCliente(value)
    setAux('')
  }

  const ItemCliente = ({ value }) => {
    return (
      <TouchableOpacity onPress={() => addCliente(value)}
        style={{ backgroundColor: '#DDDE', margin: 5, paddingHorizontal: 50, paddingVertical: 20, borderRadius: 5 }}>
        <Text> <Text style={{ fontWeight: 'bold' }}> codigo:</Text> {value.CODIGO}</Text>
        <Text> <Text style={{ fontWeight: 'bold' }}>nome: </Text> {value.NOME}</Text>
      </TouchableOpacity>
    );
  };

  function teste(value) {
    setAux(value);
  }
  useEffect(() => {
    let a = dados.filter((item) => {
      return (
        item.nome?.toString().includes(aux) || item.codigo?.toString().includes(aux)
      );
    });
    setData(a);
  }, [aux]);

  return (
    <View>
      <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
        <TextInput
          style={{
            backgroundColor: '#FFF', borderRadius: 4,
            paddingHorizontal: 110, margin: 15,
            height: 45,borderColor:'black',borderWidth:1
          }}
          value={aux}
          onChangeText={(element) => teste(element)}
          placeholder="pesquisar"
          placeholderTextColor={'#009de2'}
        
        />

        {aux != '' ? (
          <FlatList
            data={clientesFic}
            renderItem={({ item }) => <ItemCliente value={item} />}
            keyExtractor={(item) => item.CODIGO.toString()}
          />
        ) : (
          null
        )}
      </View>


      {clienteSelecionado != null ?
        (
          <View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 5, backgroundColor: '#009de2', paddingVertical: 10, borderRadius: 5 }}>
              <Text style={{ fontWeight: 'bold',color:'white' }}>codigo:  {clienteSelecionado.CODIGO} </Text>
              <Text style={{ fontWeight: 'bold',color:'white' }} >cnpj: {clienteSelecionado.CPF} </Text>
              <Text style={{ fontWeight: 'bold',color:'white' }} >RG: {clienteSelecionado.RG}</Text>
            </View>
            <View style={{ backgroundColor: '#009de2', borderRadius: 5, margin: 5, paddingVertical: 10 }}>
              <Text style={{ fontWeight: 'bold',color:'white' }} >nome: {clienteSelecionado.NOME}</Text>
            </View>
          </View>

        )
        : (null)}
    </View>

  );
};

const styles = StyleSheet.create({});
