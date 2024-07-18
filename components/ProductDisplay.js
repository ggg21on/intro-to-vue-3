app.component('product-display', {
    props: {
      premium: {
        type: Boolean,
        required: true
      },
      details: {
        type: Array,
        required: true
      }
    },
    template: `
    <div class="product-display">
      <div class="product-container">
        <div class="product-image">
          <img
            :class="[ !inStock ? 'out-of-stock-img' : '' ]"
            :src="image"
          />
        </div>
        <div class="product-info">
          <h1>{{ title }}</h1>

          <p v-if="inventory > 10">Em Estoque</p>
          <p v-else-if="inventory <= 10 && inventory > 0">
            Quase esgotado!
          </p>
          <p v-else>Fora de Estoque</p>
          <p>Frete: {{ shipping }}</p>

          <p v-show="onSale">{{ title }} tá na promoção.</p>

          <ul v-for="detail, index in details" :key="index">
            <li>{{ detail }}</li>
          </ul>

          <div
            v-for="variant, index in variants"
            :key="variant.id"
            @mouseover="updateVariant(index)"
            class="color-circle"
            :style="{ backgroundColor: variant.color }"
          ></div>

          <button
            class="button"
            :class="{ disabledButton: !inStock }"
            :disabled="!inStock"
            @click="$emit('add-to-cart', variants[selectedVariant])"
          >
            Add to Cart
          </button>
          <button
            class="button"
            :class="{ disabledButton: cart <= 0 }"
            :disabled="cart <= 0"
            @click="$emit('remove-from-cart')"
          >
            Remove Item
          </button>

          <br />
          <a :href="url" target="_blank">Made by Ricardo André</a>
        </div>
      </div>
          
      <br />
      <br />
      <review-list v-if="reviews.length" :reviews="reviews" />
      <review-form @review-submitted="addReview" />
    </div>`,
    data() {
      return {
        product: 'Socks',
        brand: 'Vue Mastery',
        reviews: [], // Adicionei esta propriedade
        selectedVariant: 0,
        variants: [
          { id: 2234, color: 'green', image: './assets/socks_green.jpg', quantity: 50 },
          { id: 2235, color: 'blue', image: './assets/socks_blue.jpg', quantity: 0 }
        ]
      };
    },
    methods: {
      addToCart() {
        this.$emit('add-to-cart', this.variants[this.selectedVariant].id);
      },
      updateVariant(index) {
        this.selectedVariant = index;
      },
      addReview(review) {
        // Implemente sua lógica para lidar com a avaliação enviada aqui
        this.reviews.push(review); // Adicionei esta linha
      }
    },
    computed: {
      title() {
        return this.brand + ' ' + this.product;
      },
      image() {
        return this.variants[this.selectedVariant].image;
      },
      inStock() {
        return this.variants[this.selectedVariant].quantity;
      },
      shipping() {
        return this.premium ? 'Free' : '2.99';
      }
    }
  });
  