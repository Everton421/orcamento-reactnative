import React,{createContext, useContext, useState} from 'react';

const clienteDoOrcamento = createContext({});

export const ClienteProvider=({children})=>{

    const [ cliente, setCliente ] = useState({})

    const atualizaCliente = (v)=>{
        setCliente(v);
    }

return(
    <clienteDoOrcamento.Provider value={{cliente,atualizaCliente}}>
        {children}
    </clienteDoOrcamento.Provider>
);
}
export const useClienteContext=()=>{
    return(useContext(clienteDoOrcamento)    )
}