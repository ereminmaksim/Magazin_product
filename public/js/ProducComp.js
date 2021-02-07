Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalog.json',
            products: [],
            filtered: [],
            // imgCatalog: 'https://placehold.it/200x200',
        }
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i')
            this.filtered = this.products.filter(el => regexp.test(el.product_name))
        }
    },
    mounted() {
        this.$parent.getJson(`/api/products`)
            .then(data => {
                console.log(data)

                /***************************************/

                /**
                 * Обращение к API + добавлены картинки в самом файле, перебор внутри папки img
                 */

                this.filtered = this.products = data
                console.log(this.products)

                /***************************************/

                /**
                 * Обращение локально (подвязался к картинкам через id_product), перебор внутри папки img
                 */
                // this.$parent.getJson(`${API + this.catalogUrl}`) - обращение к объектам - catalog.json!!!
                /*     for (let el of data) {
                        el.imgCatalog = `img/${el.id_product}.jpg`
                        this.products.push(el)
                        this.filtered.push(el)
                    } */
            })
    },


    template: `<div class="products">
                <product v-for="item of filtered" 
                :key="item.id_product" 
                :img = "item.imgCatalog"
                :product="item"
                @add-product="$parent.$refs.cart.addProduct"></product>
               </div>`

})
Vue.component('product', {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        }
    },

    template: `
    <div class="product-item">
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{product.product_name}}</h3>
                    <p>{{product.price}}₽</p>
                    <button class="buy-btn" @click="cartAPI.addProduct(product)">Купить</button>
<!-- 1                    <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>-->
<!-- 2                    <button class="buy-btn" @click="$parent.$parent.$refs.cart.addProduct(product)">Купить</button>-->
                </div>
            </div>
    `
})
