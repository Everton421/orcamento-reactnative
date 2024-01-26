import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Button } from 'react-native';
import { useEffect, useState, useContext } from 'react';
import { api } from '../../services/api';
import { useProdutosContext } from '../../contexts/produtosOrcamento';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Item } from '../itemDoOrcamento';
import { useClienteContext } from '../../contexts/clienteProvider';
import { Orcamento } from '../../interfaces/orcamento';

export default function Main() {
  const [data, setData] = useState([])
  const [valorTotalProdutos, setValorTotalProdutos] = useState(0)
  const [totalProdutos, setTotalProdutos] = useState(0)
  const [produtos, setProdutos] = useState([])
  const [total, setTotal] = useState(0);
  //const [orcamento, setOrcamento] = useState<Orcamento>();


  const { produtosOrcamento, atualizaProdutos } = useProdutosContext();

  const { cliente, atualizaCliente } = useClienteContext();

 async function addOrcamento() {
  //await  api.post('teste',orcamento)
  if(produtosOrcamento != undefined  || produtosOrcamento != null ){

    const orca = new Orcamento(produtosOrcamento,'','',1)
      
      console.log(orca)
      }else{
        console.log("produtos vazio")
      }
  }

/* 
  useEffect(
    () => {
      function atualizar() {
        let aux = 0;
        produtosOrcamento.forEach((element: any) => {
          aux += element.total;
          
        })
        setTotalProdutos(aux);
        //console.log(aux)
        setOrcamento(
          {
            produtos: produtosOrcamento,
            cliente: cliente,
            descontos:2,
            observacoes:'',
            observacoes2:'',
            totalProdutos:totalProdutos
          }
        )
      }
      atualizar()
    }, [produtosOrcamento, Item, totalProdutos, cliente])
*/

  const Enviar = () => {
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, margin: 7, borderRadius: 5 }} onPress={addOrcamento}>
          <Text style={{ color: '#FFF' }}>
            gravar
          </Text>
        </TouchableOpacity>
      </View>
    )
  }



  return (

    <SafeAreaView style={styles.container}>
      <View style={{ borderColor: '#ccc', borderWidth: 1 }}>

        <View style={{ margin: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Enviar />
        </View>
      </View>

        <FlatList
          data={produtosOrcamento}
          renderItem={({ item }) => (
            <Item
              item={item}
            />
            
          )}
          keyExtractor={(i)=> i.CODIGO}
          />

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 5
  },
});
