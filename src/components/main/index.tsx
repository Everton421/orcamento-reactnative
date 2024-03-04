import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { api } from '../../services/api';
import { useProdutosContext } from '../../contexts/produtosOrcamento';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item, ListaItemOrcamento } from '../itemDoOrcamento';
import { useClienteContext } from '../../contexts/clienteProvider';
import { Orcamento } from '../../interfaces/orcamento';
import { useOrcamentoContext } from '../../contexts/orcamentoProvider';

export default function Main() {
  const [total, setTotal] = useState<number>();
  const {atualizaOrcamento, orcamento} = useOrcamentoContext();
  const { produtosOrcamento, atualizaProdutos, getTotal } = useProdutosContext();
  const { cliente, atualizaCliente } = useClienteContext();

  async function addOrcamento() {
    //await  api.post('teste',orcamento)
    const orca = new Orcamento(cliente, produtosOrcamento, '', '', 1)
    atualizaOrcamento(orca)
        if (JSON.stringify(cliente) === '{}') {
          console.log('Cliente não informado');
        } else {
          if (orca.produtos.length === 0) {
            console.log('produtos nao informado')
          }
        }
        setTotal(orca.totalProdutos)
  }

    useEffect(()=>{
          addOrcamento();

    },[produtosOrcamento])


  const Enviar = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, margin: 7, borderRadius: 5 }} onPress={()=> console.log(orcamento)}>

          <Text style={{ color: '#FFF' }}>
            gravar
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
   
    <SafeAreaView style={styles.container}>
   {/*   <View style={{ borderColor: '#ccc', borderWidth: 1 }}>

        <View style={{ margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Enviar />
        </View>
      </View>
    */}
      <ListaItemOrcamento item={produtosOrcamento} /> 
      <Enviar />

    {/*  <FlatList
        data={produtosOrcamento}
        renderItem={({ item }) => (
          <Item
            item={item}
          />

        )}
        keyExtractor={(i) => i.CODIGO}
      />

      */} 
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#dcdcdd',
    marginTop: 5
  },
});
