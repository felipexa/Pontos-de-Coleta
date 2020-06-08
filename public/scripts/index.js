const buttonSearch = document.querySelector("#page-home main a")
const modal = document.querySelector("#modal")
const close = document.querySelector("#modal .header a")

//quando clicar no botão pesquisar
//evento de click com uma função anonima para removar a classe hide
buttonSearch.addEventListener("click", () => {
    //remover a classe hide (vai aparecer)
    modal.classList.remove("hide")
})

//quando clicar em fechar 
close.addEventListener("click", () => {
    //vai adicionar a classe hide (vai desaparecer)
    modal.classList.add("hide")
})

