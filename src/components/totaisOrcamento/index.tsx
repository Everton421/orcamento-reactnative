import React,{useEffect, useState}from "react";
import {View, Text}from 'react-native'


export const Totais = ({data})=>{
const [valorTotalProdutos,setValorTotalProdutos] = useState(0)

  useEffect( ()=>{
  function testeProdutos(){
    let total:any =0;
    data.forEach((item)=>{
      total += item.total;
      setValorTotalProdutos(total);
      } 
    )
    console.log(valorTotalProdutos)
  }


},[data])

    return(
        <View style={{backgroundColor:'red', height:15}}>
            <Text>
                {valorTotalProdutos}
            </Text>
        </View>
    )
}