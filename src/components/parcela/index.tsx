import React,{ useState,useEffect,useContext} from "react";
import { View,Text,Button } from "react-native";
import { useClienteContext } from '../../contexts/clienteProvider';
import { useProdutosContext } from '../../contexts/produtosOrcamento';

export const Parcelas = ()=>{
const [valores , setValores] = useState();

const {produtosDoOrcamento,atualizaProdutos} = useProdutosContext();
const { cliente, atualizaCliente } = useClienteContext();

  /*  useEffect(
        ()=>{
            function atualiza(){
            let aux=0;
            produtosDoOrcamento.forEach((e)=>{
                aux+= e.total;
            })
            setValores(aux);
        }
        atualiza();
        },[]
    )*/

    return(
        <View>
         
        <Button
        title="press"
        onPress={()=> console.log(produtosDoOrcamento)}
        />
        </View>
    )
}
