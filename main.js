const app = Vue.createApp({
  data() {
    return {
      cart: [],
      // outras propriedades
    }
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    }
    // outros métodos
  }
});
