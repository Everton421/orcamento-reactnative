import React,{ createContext, useContext, useState} from 'react';

const produtosDoOrcamento = createContext({});

    export const ProdutosProvider=({children})=>{
        const [produtosOrcamento,setProdutosOrcamento] = useState([]);

        const atualizaProdutos=(v)=>{
            setProdutosOrcamento(v)
        }

        return(
            <produtosDoOrcamento.Provider value={{produtosOrcamento,atualizaProdutos}} >
                {children}
            </produtosDoOrcamento.Provider>
        )
    }

    export const useProdutosContext=()=>{
        return ( useContext(produtosDoOrcamento))
    }