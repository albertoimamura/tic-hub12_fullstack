<script lang="ts">
import { defineComponent, PropType } from "vue"

/* MODELS */

interface Category {
  id: number
  title: string
}

class Product {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: Category
  ) {}
}

interface CartItem {
  product: Product
  quantity: number
}

class Cart {
  items: CartItem[] = []

  addItem(product: Product) {
    const item = this.items.find(i => i.product.id === product.id)

    if (item) {
      item.quantity++
    } else {
      this.items.push({ product, quantity: 1 })
    }
  }

  totalItems() {
    return this.items.reduce((t, i) => t + i.quantity, 0)
  }

  totalPrice() {
    return this.items.reduce((t, i) => t + i.product.price * i.quantity, 0)
  }
}

/* COMPONENTE PRODUTO */

const ProductCard = defineComponent({
  props: {
    product: {
      type: Object as PropType<Product>,
      required: true
    }
  },

  methods: {
    add() {
      this.$emit("add", this.product)
    }
  },

  template: `
  <div class="card">
    <h3>{{ product.name }}</h3>
    <p>{{ product.category.title }}</p>
    <p>R$ {{ product.price }}</p>
    <button @click="add">Adicionar</button>
  </div>
  `
})

/* APP */

export default defineComponent({

  components: { ProductCard },

  data() {

    const cat: Category = { id: 1, title: "Eletrônicos" }

    return {
      products: [
        new Product(1, "Notebook", 3000, cat),
        new Product(2, "Mouse", 80, cat),
        new Product(3, "Teclado", 150, cat)
      ],

      cart: new Cart()
    }
  },

  methods: {
    addToCart(product: Product) {
      this.cart.addItem(product)
    }
  }

})
</script>

<template>

<h1>Loja</h1>

<h2>Produtos</h2>

<ProductCard
  v-for="p in products"
  :key="p.id"
  :product="p"
  @add="addToCart"
/>

<hr>

<h2>Carrinho</h2>

<p>Total de itens: {{ cart.totalItems() }}</p>
<p>Total: R$ {{ cart.totalPrice() }}</p>

<ul>
  <li v-for="item in cart.items" :key="item.product.id">
    {{ item.product.name }} x {{ item.quantity }}
  </li>
</ul>

</template>

<style>
.card{
  border:1px solid #ccc;
  padding:10px;
  margin:10px;
  width:150px;
}
</style>
