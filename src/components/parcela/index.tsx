import React,{ useState,useEffect,useContext} from "react";
import { View,Text,Button } from "react-native";
import { useClienteContext } from '../../contexts/clienteProvider';
import { useProdutosContext } from '../../contexts/produtosOrcamento';
import { useOrcamentoContext } from "../../contexts/orcamentoProvider";
import { parcelas } from "../../interfaces/parcelas";
import { tiposDeRecebimento } from "../dados/tipoDeRecebimento";

export const Parcelas = ()=>{
const [valores , setValores] = useState();

const { produtosOrcamento } = useProdutosContext();
const { cliente, atualizaCliente } = useClienteContext();
const {orcamento} = useOrcamentoContext();
    
const p: parcelas = {
        formaDePagmanto:'avista',
        valorParcela:15
    }

    function atualizar (){
       // atualizaOrcamento(p)
        console.log(orcamento)
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
        },[]
    )

    return(
        <View style={{margin:25}}>
         
        <Button
        title="press"
        onPress={()=> atualizar()}
        />

        <View>
            <Text>
             total:R$ {orcamento.totalGeral}
            </Text>
        </View>
        </View>
    )
}
