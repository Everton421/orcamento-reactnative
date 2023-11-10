import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity,FlatList} from 'react-native';
import { SelectProdutos } from './src/selectProdutos';
import { useEffect, useState } from 'react';
import { Item } from './src/components/itemDoOrcamento';
import { Totais } from './src/components/totaisOrcamento';

export default function App() {
  const [data, setData] = useState([])
  const [valorTotalProdutos,setValorTotalProdutos] = useState(0)
 const produtos = [
  {"codigo": 1 ,"nome":"LAMPADA 67 12V 10W","preco":11,"quantidade":0,"total":0},
  {"codigo":2 ,"nome":"LAMPADA 67 12V 10W","preco":11,"quantidade":0,"total":0},
  {"codigo":3 ,"nome":"LAMPADA 67 12V 10W","preco":11,"quantidade":0,"total":0},
  {"codigo":4 ,"nome":"LAMPADA 67 12V 10W","preco":11,"quantidade":0,"total":0},
  {"codigo":5 ,"nome":"VELA IG. FORD FIESTA/KA 1.0/1.3 ENDURA/RANGER","preco":11,"quantidade":0,"total":0},
  {"codigo":6 ,"nome":"RET.COMP. AR OM355","preco":11,"quantidade":0,"total":0},
  {"codigo":7 ,"nome":"RET.COMP. AR OM355","preco":11,"quantidade":0,"total":0},
  {"codigo":8 ,"nome":"RET.COMP. AR OM355","preco":11,"quantidade":0,"total":0},
  {"codigo":9 ,"nome":"M-361-S CABO IG. ESCORT 1.8 16V (ZETEC)TO","preco":11,"quantidade":0,"total":0},
  {"codigo":10 ,"nome":"LANTERNA TAPA-SOL 124 SERIE 4","preco":11,"quantidade":0,"total":0},
  {"codigo":11 ,"nome":"LANTERNA TAPA-SOL 124 SERIE 4","preco":11,"quantidade":0,"total":0},
 ]  

const teste = {"codigo":11 ,"nome":"LANTERNA LANTERNA TAPA-SOL 124 SERIE 4TAPA-SOL 124 SERIE 4LANTERNA TAPA-SOL 124 SERIE 4","preco":11,"quantidade":0,"total":0}

  function selectedProducts(items:any){
      setData(items);
 }  


  return (
    <View style={styles.container}>
      <SelectProdutos options={produtos} onChange={selectedProducts}/>
        
        <FlatList
        data={data}
        renderItem={({item})=> <Item item={item}/>}
        />
    
   
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
