const PRODUCT_WIDTH = Number(document.styleSheets[1].cssRules[0].style.getPropertyValue("--product-width").split("px")[0])
const GAP = Number(document.styleSheets[1].cssRules[0].style.getPropertyValue("--product-gap").split("px")[0])

class Wrapper {
    static addRowsNumberChangeEvent() {
        const changeRowsNumberNode = document.getElementById("change-rows-number")

        let rowsArr = []
        let current = 0

        const breakpoints = [
            [5, [5, 4, 3]],
            [4, [4, 3, 2]],
            [3, [3, 2]],
            [2, [2, 1]],
            [1, [1]],
            [0, [1]]
        ]

        const setRowsNumber = (n) => document.styleSheets[1].cssRules[0].style.setProperty("--rows-number", n)

        for(const breakpoint of breakpoints) {
            if(window.innerWidth > (PRODUCT_WIDTH * breakpoint[0]) + (GAP * (breakpoint[0] + 1))) {
                setRowsNumber(breakpoint[0])

                const holder = document.createElement("button")

                for(let i = 0; i < (breakpoint[0] === 0 ? 1 : breakpoint[0]); i++) {
                    const div = document.createElement("div")

                    const blackTop = document.createElement("div")
                    const blackBottom = document.createElement("div")

                    div.appendChild(blackTop)
                    div.appendChild(blackBottom)

                    holder.appendChild(div)
                }
                
                changeRowsNumberNode.style.gridTemplateColumns = `repeat(${breakpoint[0] === 0 ? 1 : breakpoint[0]}, 12px)`
                changeRowsNumberNode.innerHTML = holder.innerHTML

                break
            }
        }

        changeRowsNumberNode.style.animation = "info-appear 0.5s ease-out"
        changeRowsNumberNode.style.animationFillMode = "forwards"

        window.addEventListener("resize", () => {
            for(const breakpoint of breakpoints) {
                if(window.innerWidth > (PRODUCT_WIDTH * breakpoint[0]) + (GAP * (breakpoint[0] + 1))) {
                    setRowsNumber(breakpoint[0])

                    const holder = document.createElement("button")

                    for(let i = 0; i < (breakpoint[0] === 0 ? 1 : breakpoint[0]); i++) {
                        const div = document.createElement("div")

                        const blackTop = document.createElement("div")
                        const blackBottom = document.createElement("div")

                        div.appendChild(blackTop)
                        div.appendChild(blackBottom)

                        holder.appendChild(div)
                    }
                    
                    changeRowsNumberNode.style.gridTemplateColumns = `repeat(${(breakpoint[0] === 0 ? 1 : breakpoint[0])}, 12px)`
                    changeRowsNumberNode.innerHTML = holder.innerHTML

                    break
                }
            }
        })

        document.getElementById("change-rows-number").addEventListener("click", () => {
            for(const breakpoint of breakpoints) {
                if(window.innerWidth > (PRODUCT_WIDTH * breakpoint[0]) + (GAP * (breakpoint[0] + 1))) {
                    rowsArr = breakpoint[1]
                    break
                }
            }

            current++
            if(current > rowsArr.length - 1) current = 0

            const holder = document.createElement("button")

            for(let i = 0; i < rowsArr[current]; i++) {
                const div = document.createElement("div")

                const blackTop = document.createElement("div")
                const blackBottom = document.createElement("div")

                div.appendChild(blackTop)
                div.appendChild(blackBottom)

                holder.appendChild(div)
            }
            
            changeRowsNumberNode.style.gridTemplateColumns = `repeat(${rowsArr[current]}, 12px)`
            changeRowsNumberNode.innerHTML = holder.innerHTML

            setRowsNumber(rowsArr[current])
        })
    }
}

export default Wrapper