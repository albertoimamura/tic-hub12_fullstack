// Etapa 1: Modelos base

interface Categoria {
  id: number
  nome: string
}

interface Produto {
  id: number
  nome: string
  preco: number
  categoria: Categoria
}

// Etapa 2: Usuário

type TipoUsuario = "ADMINISTRADOR" | "CLIENTE"

class Usuario {
  constructor(
    public id: number,
    public username: string,
    public email: string,
    public role: TipoUsuario
  ) {}
}

// Etapa 3: Carrinho

interface ItemCarrinho {
  produto: Produto
  quantidade: number
}

class Carrinho {
  private itens: ItemCarrinho[] = []

  adicionarProduto(produto: Produto, quantidade: number = 1) {

    const item = this.itens.find(i => i.produto.id === produto.id)

    if (item) {
      item.quantidade += quantidade
    } else {
      this.itens.push({ produto: produto, quantidade: quantidade })
    }
  }

  getTotalItens(): number {
    return this.itens.reduce((total, item) => total + item.quantidade, 0)
  }

  getPrecoFinal(): number {
    return this.itens.reduce(
      (total, item) => total + item.produto.preco * item.quantidade,
      0
    )
  }
}

// Exemplo

const categoria: Categoria = { id: 1, nome: "Eletrônicos" }

const mouse: Produto = {
  id: 1,
  nome: "Mouse",
  preco: 50,
  categoria: categoria
}

const carrinho = new Carrinho()

carrinho.adicionarProduto(mouse, 2)
carrinho.adicionarProduto(mouse, 1)

console.log("Total de itens:", carrinho.getTotalItens())
console.log("Preço final:", carrinho.getPrecoFinal())
