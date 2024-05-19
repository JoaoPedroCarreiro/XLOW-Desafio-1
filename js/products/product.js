const IMAGE_WIDTH = Number(document.styleSheets[1].cssRules[0].style.getPropertyValue("--image-width").split("px")[0])
const PRODUCT_WIDTH = Number(document.styleSheets[1].cssRules[0].style.getPropertyValue("--product-width").split("px")[0])

class Product {
    constructor(product) {
        this.product = product

        this.node = document.createElement("div")
        this.node.className = "product"

        this.node.style.animation = `product-appear 0.5s ease ${product.index / 5}s`
        this.node.style.animationFillMode = "forwards"

        this.node.innerHTML = `
            <img id="image-url-${product.productId}" class="product-image" src="${product.items[0].images[0].imageUrl}" alt=${product.productName}>
            <div class="product-name-wrapper">
                <p class="product-name" title="${product.productName}">${product.productName}</p>
            </div>
            <div id="images-wrapper-${product.productId}" class="product-images-wrapper" ${product.items.length * IMAGE_WIDTH > PRODUCT_WIDTH ? "style='align-self: start'" : ""}>
                ${(() => {
                    let html = ""

                    for(const item of product.items) {
                        html += `
                            <button id="btn-${item.nameComplete}" title="${item.nameComplete}">
                                <img src="${item.images[0].imageUrl}" alt="${item.nameComplete}">
                            </button>\n
                        `
                    }

                    return html
                })()}
            </div>
            <div class="product-prices-wrapper">
                <p
                    class="product-discount"
                    ${product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount === product.items[0].sellers[0].commertialOffer.Price ? "hidden" : ""}
                >
                    R$ ${product.items[0].sellers[0].commertialOffer.PriceWithoutDiscount.toFixed(2)}
                </p>
                <p class="product-price">
                    R$ ${product.items[0].sellers[0].commertialOffer.Price.toFixed(2)}
                </p>
            </div>
            <a class="product-buy" href="#">COMPRAR</a>
        `
    }

    addInWrapper(wrapper) {
        wrapper.appendChild(this.node)
    }

    addImagesWrapperEvents() {
        const wrapper = document.getElementById(`images-wrapper-${this.product.productId}`)

        let canMove = false

        const down = ev => {
            ev.preventDefault()
            canMove = true
        }

        const move = ev => {
            ev.preventDefault()
            if(canMove) ev.currentTarget.scrollLeft -= ev.movementX
        }

        const up = ev => {
            ev.preventDefault()
            canMove = false
        }

        wrapper.addEventListener("mousedown", down)

        wrapper.addEventListener("mousemove", move)

        wrapper.addEventListener("mouseup", up)
        wrapper.addEventListener("mouseleave", up)
    }

    addImagesEvents() {
        for(const item of this.product.items) {
            const btn = document.getElementById(`btn-${item.nameComplete}`)

            let pressed = false
            let canChange = true

            const down = () => {
                pressed = true
            }

            const move = () => {
                if(pressed) canChange = false
            }

            const up = () => {
                pressed = false

                if(canChange) document.getElementById(`image-url-${this.product.productId}`).src = item.images[0].imageUrl

                canChange = true
            }

            btn.addEventListener("mousedown", down)
            btn.addEventListener("mousemove", move)
            btn.addEventListener("mouseup", up)
        }
    }
}

export default Product