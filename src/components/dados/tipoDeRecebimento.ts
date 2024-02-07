import { TipoReceb } from "../../interfaces/tipoDeRecebimento";

const a:TipoReceb = {
    CODIGO:1,
    NOME:'dinheiro'
}


const b:TipoReceb = {
    CODIGO:2,
    NOME:'boleto'
}


const c:TipoReceb = {
    CODIGO:3,
    NOME:'pix'
}

export const tiposDeRecebimento = [ a,b,c]