import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Button, Text, View,TouchableOpacity,StyleSheet ,TextInput, Modal, Touchable} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { Alert } from 'react-native';


export const acertoProduto = ()=>{
    const [produtos, setProdutos]= useState<any>();
    const [selectedItem, setSelectedItem] = useState()
    const [pesquisa, setPesquisa] = useState();
    const [ visible, setVisible ]= useState(false);
    const [novoSaldo, setNovoSaldo] = useState(0);
    const [setor, setSetor] = useState();
    const [selectedSetor, setSelectedSetor] = useState();

    const Item=( {item} )=>{
        return(
            <View>
                <Text>
                    {item.codigo}
                </Text>
            </View>

        )
    }

    function closeModal(){
        setVisible(false);
       setSelectedSetor(undefined);

    }
    async function postSaldo(){
        try{
            const res = await api.post(`/acerto/`,selectedSetor);
            Alert.alert(`produto ${selectedSetor.produto} atualizado com successo ` )
            console.log(res.data)

        }catch(err){
            console.log(err);
        }
    }
 
    function renderItem(item:any) {
        function atualizaSaldo(v:any){
                    setNovoSaldo(v);
                    let aux = parseInt(v)
                    selectedSetor.estoque = aux;
                    //item.estoque = v;
              }
        return (
            <TouchableOpacity style={styles.item}
                onPress={() => toggleSelection(item)}
                onPressIn={()=>setSelectedItem(item) }
                >

            <Text
            
            >codigo: {item.codigo} </Text>
             <Text style={styles.txt}>  {item.descricao}</Text>
    
            
             <View style={{flexDirection:'row', justifyContent:'space-evenly'}}>
              <View style={{backgroundColor:'#FFF',padding:5,borderRadius:8}}>
              <Text style={{fontWeight:'bold'}}>saldo: {item.estoque}</Text>
              </View>
            
            <Modal
                    visible={visible}
                >
                <View style={{paddingHorizontal:3}}>
                   
                   <TouchableOpacity onPress={()=> closeModal()} style={{backgroundColor:'red',width:50, alignItems:'center',borderRadius:5, marginTop:5}}>
                        <Text>voltar</Text>
                    </TouchableOpacity>
                   
                   <View style={{backgroundColor:'#cCC',borderRadius:5 ,width:'auto',margin:3}}>     
                            <Text style={{fontWeight:'bold'}}>
                            CODIGO: {selectedItem?.codigo}
                            </Text>

                            <Text>
                                {selectedItem?.descricao}
                            </Text>
                   </View>

                    

                { selectedSetor !== undefined ? 
                   
                    <View >
                            <View style={{flexDirection:'row',justifyContent:'space-between', marginTop:10}}>
                                <Text style={{fontSize:15,fontWeight:'bold'}} >setor: {selectedSetor.nome}</Text>
                                <Text style={{fontSize:15,fontWeight:'bold'}} >saldo: {selectedSetor.estoque}</Text>
                            </View>
                            
                                <View>
                                    <Text>
                                        novo saldo {novoSaldo}
                                    </Text>
                                </View>

                         <View style={{alignItems:'center'}}>
                               <TextInput style={{borderWidth:1, marginTop:5,borderRadius:5, width:'80%',paddingHorizontal:5 }}
                                 onChangeText={(v)=> atualizaSaldo(v)}
                                placeholder="ex. 5"
                                />
                        </View>
                   </View>
                     
                     :
                      <View >
                            <View style={{alignItems:'center'}} >
                                <Text>selecione um setor</Text>
                            </View>
                        <View >
                                <FlatList
                                data={setor}
                                renderItem={ ({item})=>changeSetor(item) }
                                />
                        </View>
                        </View>
                }

                    <Button
                    onPress={()=> postSaldo()}
                    title="press"
                    />

                </View>
            </Modal>
             </View>
             
          </TouchableOpacity>
        )
      }
function changeSetor(item){
    return(
        <TouchableOpacity onPress={()=>setSelectedSetor(item)} style={{backgroundColor:'#CFF',margin:2,padding:5,borderRadius:5}}> 
            <Text style={{fontWeight:'bold'}}>
                {item.nome}
            </Text>
        </TouchableOpacity>
    )
}

      function toggleSelection(item: any) {
        setVisible(true);
        }
    
      function adicionaPesquisa(dado) {
        setPesquisa(dado);
      }

useEffect(
    ()=>{

         async  function busca(){
          try{
            const aux = await api.get(`/produtos/${pesquisa}`);
                setProdutos(aux.data);
                //console.log(aux.data);
          } catch(err){
            console.log(err)
          }     

          if(produtos)  {
            try{    
                const response = await api.get(`/setor/${selectedItem.codigo}`) 
                setSetor(response.data);
            }catch(err){
                console.log(err);
            }
          }
        }
busca();


    },[ pesquisa ,selectedItem]
)



    return(
        <SafeAreaView >
           <TextInput
                      style={styles.input}
                      placeholder='  pesquisar'
                      value={pesquisa}
                      onChangeText={(value) => adicionaPesquisa(value)}
                      placeholderTextColor='#009de2'
                    />

            <FlatList
            data={produtos}
            renderItem={ ( {item} )=> renderItem(item) }
            />
            
         <Button
            title="press"
//            onPress={()=> postSaldo(produtos)}
            onPress={()=> console.log(setor)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    txt:{
        fontWeight:'bold'
      },
      item: {
        backgroundColor: '#f9c2ff', //#dcdcdd
    
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius:5
         },  
      input: {
        backgroundColor: '#FFF',
         borderRadius: 4,
        paddingHorizontal: 70,
         marginTop:3,
        borderColor:'black',
        borderWidth:1,
        marginBottom:10
    },
})