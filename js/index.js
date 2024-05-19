import Products from "./products/products.js"
import Wrapper from "./wrapper/wrapper.js"

async function main() {
    const products = new Products(await (await fetch("https://desafio.xlow.com.br/search")).json())
    await products.draw(() => document.querySelector("main").removeChild(document.getElementById("loading")))
    products.count()

    Wrapper.addRowsNumberChangeEvent()
}

main()