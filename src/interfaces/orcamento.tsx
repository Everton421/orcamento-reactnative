
interface Produto {
  CODIGO:number
  DESCRICAO:string
  PRECO:number
  QUANTIDADE:number
  DESCONTO:number
  TOTALLIQUIDO:number 
  ESTOQUE?:number,
}

export  class Orcamento{

  produtos:Produto[]
  totalProdutos:number
  observacoes:string
  observacoes2:string
//  descontos:number
  totalGeral?:number
  qtde_parcelas:number
  //parcelas?:parcelas

    constructor(
      produtos:Produto[],
       observacoes:string,
        observacoes2:string, 
          qtde_parcelas:number       
        ){
       
        this.produtos = produtos
        this.observacoes=observacoes
        this.observacoes2 = observacoes2
    //    this.descontos=0
        this.totalProdutos = 0
        
        this.totalGeral =0;
          this.qtde_parcelas = qtde_parcelas
      
        produtos.forEach( (p)=>{
          this.totalProdutos += p.TOTALLIQUIDO
        })
        this.totalGeral =this.totalProdutos
      }

        


  }