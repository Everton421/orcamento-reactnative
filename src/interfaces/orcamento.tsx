import { Cliente } from "./cliente"
import { parcelas } from "./parcelas"

interface Produto {
  CODIGO:number
  DESCRICAO:string
  PRECO:number
  QUANTIDADE:number
  DESCONTO:number
  TOTALLIQUIDO:number 
  TOTALBRUTO:number 
  ESTOQUE?:number,
}

export  class Orcamento{
  cliente:Cliente
  produtos:Produto[]
  totalProdutos:number
  observacoes:string
  observacoes2:string
  descontos:number
  totalGeral?:number
  totalSemDesconto:number
  qtde_parcelas:number
  parcelas:parcelas

    constructor(
      cliente:Cliente,
       produtos:Produto[],
        observacoes:string,
         observacoes2:string, 
           qtde_parcelas:number       
         ){
            this.cliente = cliente
              this.produtos = produtos
              this.observacoes=observacoes
              this.observacoes2 = observacoes2
              this.totalProdutos = 0
              this.totalSemDesconto=0;
              this.descontos = 0

              this.parcelas = { formaDePagmanto:'dinheiro', valorParcela:0, qtde:1}
               this.totalGeral =0;
          
        this.qtde_parcelas = qtde_parcelas
        let aux=0;
            produtos.forEach( (p)=>{
              aux += p.PRECO * p.QUANTIDADE;
              this.totalProdutos +=aux
              this.descontos += p.DESCONTO
            })
        this.totalSemDesconto = aux;
        this.totalGeral = this.totalProdutos
      } 

        


  }