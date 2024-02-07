import React,{ createContext, useContext, useState} from 'react';
import { Orcamento } from '../interfaces/orcamento';
import { parcelas } from '../interfaces/parcelas';

    export const orcamentoContext = createContext({}); 

    export const OrcamentoProvider = ({children})=>{
        const [orcamento, setOrcamento] = useState<Orcamento>();

            const atualizaOrcamento=(v)=>{
                setOrcamento(v)
            }
           
            const atualizaParcelas = (novasParcelas) => {
                // Verifique se o objeto de orçamento está definido
                if (orcamento) {
                  // Atualize as parcelas dentro do objeto de orçamento
                  const novoOrcamento = { ...orcamento, parcelas: novasParcelas };
                  setOrcamento(novoOrcamento);
                }
              }
            return(
                    <orcamentoContext.Provider value={{orcamento,atualizaOrcamento,atualizaParcelas}}>
                        {children}
                    </orcamentoContext.Provider>
            )
    }

    export const useOrcamentoContext=()=>{
        return( useContext(orcamentoContext))
    }

  