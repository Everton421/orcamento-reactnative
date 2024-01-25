import { Produto } from "../../interfaces/produto";

const p1 :Produto= {
    CODIGO:1,
    DESCRICAO:"teste1",
    PRECO:10,
}

const p2 :Produto= {
    CODIGO:2,
    DESCRICAO:"teste2",
    PRECO:25,
}

const p3 :Produto= {
    CODIGO:3,
    DESCRICAO:"teste3",
    PRECO:15,
}

const p4 :Produto= {
    CODIGO:4,
    DESCRICAO:"teste4",
    PRECO:95,
}

export const produtosFic: Produto[] =  [p1,p2,p3,p4]