import React,{ createContext, useContext, useState} from 'react';

const produtosDoOrcamento = createContext({});

    export const ProdutosProvider=({children})=>{
        const [produtosOrcamento,setProdutosOrcamento] = useState([]);

        const atualizaProdutos=(v)=>{
            setProdutosOrcamento(v)
        }
     
        function getTotal(){
            let aux=0;    
                
            produtosOrcamento.forEach( (p)=>{
                     aux +=  p.TOTALLIQUIDO;
                })
                console.log(aux);
              //  return aux;
            }
        return(
            <produtosDoOrcamento.Provider value={{produtosOrcamento,atualizaProdutos,getTotal}} >
                {children}
            </produtosDoOrcamento.Provider>
        )
    }

    export const useProdutosContext=()=>{
        return ( useContext(produtosDoOrcamento))
    }