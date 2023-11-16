import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TouchableOpacity,FlatList} from 'react-native';
import { SelectProdutos } from './src/components/selectProdutos';
import { useEffect, useState } from 'react';
import { Item } from './src/components/itemDoOrcamento';

export default function App() {
  const [data, setData] = useState([])
  const [valorTotalProdutos,setValorTotalProdutos] = useState(0)
  const [totalProdutos,setTotalProdutos] = useState(0)

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


useEffect(
  ()=>{
    function atualizar(){
      let aux=0;
      data.forEach((element)=>{
        aux += element.total;
      })
      setTotalProdutos(aux);
    }
    atualizar()
},[data,Item])

  const Totais = ()=>{
    return(
      <View style={{backgroundColor:'#cff',padding:5,borderRadius:5}}>
        <Text style={{fontSize:20}}>
       total R$:{totalProdutos}  
        </Text>
      </View>
    );
  }
  const Enviar = ()=>{
    return(
        <TouchableOpacity style={{backgroundColor:'green',padding:10,margin:10,borderRadius:5}} onPress={()=> console.log(totalProdutos)}>
               <Text style={{color:'#FFF'}}>
                  enviar
               </Text>
         </TouchableOpacity>
    )
  }

  function handleQuantityChange(codigo, newQuantity) {
    const updatedData = data.map((item) => {
      if (item.codigo === codigo) {
        return { ...item, quantidade: newQuantity, total: newQuantity * item.preco };
      }
      return item;
    });
    setData(updatedData);
  }

  function handlePriceChange(codigo, newPrice) {
    const updatedData = data.map((item) => {
      if (item.codigo === codigo) {
        return { ...item, preco: newPrice, total: newPrice * item.quantidade };
      }
      return item;
    });
    setData(updatedData);
  }

const teste1 = {"codigo":11 ,"nome":"LANTERNA LANTERNA TAPA-SOL 124 SERIE 4TAPA-SOL 124 SERIE 4LANTERNA TAPA-SOL 124 SERIE 4","preco":11,"quantidade":0,"total":0}

  function selectedProducts(items:any){
      setData(items);
 }  
 
 return (
    <View style={styles.container}>
      <SelectProdutos options={produtos} onChange={selectedProducts}/>
        
        <FlatList
        data={data}
        renderItem={ ({item})=>(
       
           <Item item={item}
          onPriceChange={handlePriceChange}
          onQuantityChange={handleQuantityChange} 
          />
          )
        }
        />

      <View style={{flexDirection:'row' ,alignItems:'center',justifyContent:'space-between'}}>        
           <Totais/>
          <Enviar/>      
       </View>
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
