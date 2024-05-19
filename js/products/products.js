import Product from "/js/products/product.js"

class Products {
    constructor(products) {
        this.products = products
    }

    async draw(callback) {
        const holder = document.createElement("section")
        const wrapper = document.getElementById("products-wrapper")

        const arr = []

        for(let i = 0; i < this.products.length; i++) {
            const [item] = await (await fetch(`https://desafio.xlow.com.br/search/${this.products[i].productId}`)).json()
            
            const productInstance = new Product({ ...item, index: i})
            productInstance.addInWrapper(holder)

            arr.push(productInstance)
        }

        callback()
        wrapper.innerHTML += holder.innerHTML

        for(const product of arr) {
            product.addImagesWrapperEvents()
            product.addImagesEvents()
        }
    }

    async count() {
        const countProducts = document.getElementById("count-products")

        const initialDt = 40
        let length = 0

        const increase = (dt) => {
            setTimeout(() => {
                length++
                countProducts.textContent = length + " produtos"

                if(length + 1 <= this.products.length) increase(initialDt + (length * 2))
            }, dt)
        }

        countProducts.style.animation = "info-appear 0.5s ease-out"
        countProducts.style.animationFillMode = "forwards"

        increase(0)
    }
}

export default Products