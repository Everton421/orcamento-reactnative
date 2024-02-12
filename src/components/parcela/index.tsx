import React,{ useState,useEffect,useContext} from "react";
import { View,Text,Button ,TextInput, Modal, StyleSheet, TouchableOpacity} from "react-native";
import { useClienteContext } from '../../contexts/clienteProvider';
import { useProdutosContext } from '../../contexts/produtosOrcamento';
import { useOrcamentoContext } from "../../contexts/orcamentoProvider";
import { tiposDeRecebimento } from "../dados/tipoDeRecebimento";
import { FlatList } from "react-native-gesture-handler";



export const Parcelas = ()=>{

        const ItemListaRecebimento =  ({item})=>{
            const [ recebimentoSelecionado , setRecebimentoSelecionado ] = useState();
            
            function teste(){
                    setRecebimentoSelecionado(item)
                    setRecebimentoSelecionado(item)
                    console.log(recebimentoSelecionado)

            }
            return(
                <TouchableOpacity style={{width:280 ,height:50,backgroundColor:'blue', margin:10, borderRadius:10, alignItems:'center', justifyContent:'center'}}
                    onPress={(v)=>teste() }
                >
                    <Text style={{color:'#FFF', fontWeight:'bold' }}>
                        {item.NOME}
                    </Text>
                </TouchableOpacity>
            )
        }

        const ListaRecebimento = ()=>{
            return(
                        <FlatList 
                            data={tiposDeRecebimento}
                            renderItem={ ({item})=> <ItemListaRecebimento  item={ item } />}
                            keyExtractor={ item=> item.CODIGO}
                        />
            )
        }


                const ItemListaParcelas = ({parcela})=>{
                    const [visibele, setVisible] = useState(false);

                    return(
                        <View style={{ flexDirection:'row' }} >
                                <Text > sequencia: {parcela.sequencia}</Text>
                                      <Text> valor parcela: {parcela.valorParcela.toFixed(2)}</Text>
                                      

                                      <TouchableOpacity 
                                        style={{ backgroundColor:'red', borderRadius:10 ,alignItems:'center', width:'auto',margin:20}}
                                        onPress={()=> setVisible(true)} >
                                        <Text>PRESS</Text>
                                    </TouchableOpacity>

                                         <Modal
                                             animationType="slide"
                                             visible={visibele}
                                                 >
                                            <View style={styles.centeredView}>
                                                <View style={styles.modalView}>
                               
                                                  <TouchableOpacity style={{borderRadius:30,backgroundColor:'red', width:35,height:35,  alignItems:'center' ,justifyContent:'center'}}
                                                      onPress={()=> setVisible(false)}
                                                     >
                                                 <Text style={{fontWeight:'bold' , color:'#FFF'}}>
                                                     X
                                                  </Text>
                                                  </TouchableOpacity>

                                            {/** */}
                                                  <ListaRecebimento />
                                            {/** */}

                                                </View>
                                            </View>
                                         </Modal>
                        </View>
                      )   
                }

                const ListaParcelas = ({ lista }) => {
                    return (
                        <View>
                            <FlatList
                                data={lista}
                                renderItem={({ item }) => <ItemListaParcelas parcela={item} />} 
                            />
                        </View>
                    );
                };
           
                const handleRecebimentoSelect = (selectedValue) => {
                    console.log(selectedValue); // Log the selected value to the console
                };
        interface Parcela{
            sequencia:number
            formaDePagmanto: string,
            valorParcela: number
        }

       

    const { produtosOrcamento } = useProdutosContext();
    const { cliente, atualizaCliente } = useClienteContext();
    const {orcamento} = useOrcamentoContext();

    const [ qtdParcela, setQtdParcela ] = useState();    
    const [ parcelasGeradas, setParcelasGeradas ] = useState([]);
    const [valores , setValores] = useState();
        

    function atualizar (){
       // atualizaOrcamento(p)
        console.log(tiposDeRecebimento);

    }

     useEffect(
        ()=>{
            function atualiza(){
            let aux=0;
            produtosOrcamento.forEach((e)=>{
                aux+= e.total;
            })
            setValores(aux);
        }
        atualiza();

        function gerarParcelas(){
            if(qtdParcela != '' || qtdParcela != null ){
                
            let aux:Parcela[] = [];
                for(let i=1; i <= qtdParcela; i++ ){
                    let a = orcamento.totalGeral / qtdParcela  ;
                        let novaParcela:Parcela ={
                            sequencia:i,
                            formaDePagmanto:'',
                            valorParcela:a
                        }

                    aux.push(novaParcela)
                }
                setParcelasGeradas(aux)
            }
        }
        gerarParcelas();
        },[ qtdParcela]
    )

    return(


        <View style={{marginTop:30,backgroundColor: '#dcdcdd' }}>
                <View style={ {height:30, borderRadius:10, alignItems:'center'} } >
                    <Text style={{fontWeight:'bold' , color:'black'}}>
                      total orcamento: R${orcamento.totalGeral}
                    </Text>
                </View>

               <TextInput
                   style={{
                      backgroundColor: '#FFF', borderRadius: 4,
                      paddingHorizontal: 110, margin: 15,
                      height: 45,borderColor:'black',borderWidth:1
                   }}
                 placeholder="parcelas Ex. 2" 
                 keyboardType="numeric"
                 onChangeText={(v)=> setQtdParcela(v)}
                 value={qtdParcela}
               />
                

         <View>


                   <ListaParcelas lista={parcelasGeradas}/>


         <Button
         title="press"
         onPress={()=>  console.log(parcelasGeradas)
         }
         />

      
            
         </View>
        </View>

    )
}
const styles =StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        shadowColor: '#000',
        
    }
})
