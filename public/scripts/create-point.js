//pegar os Estados
function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    //pega os estados da API
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        // .then( (res) => { return res.json() })  // (mesma coisa abaixo)
        //transforma em JSON
        .then(res => res.json())
        //funcao que vai receber todos os estados
        .then(states => {
            //pegue um estado dos 27 estados
            for (const state of states) {
                //inserir no HTML as options com o id do estado e o nome do estado em cada option
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}
//chama a funcao
populateUFs()

//pegar as Cidades
function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")
    
    //traz o select[name=uf] (id)
    // console.log(event.target.value)
    const ufValue = event.target.value

    //numero do estado selecionado
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text


    //obtendo o valor do id da UF e pegando as cidades da API
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    //limpar o campo das cidades
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    //bloqueia o campo
    citySelect.disabled = true

     //pega as cidades
     fetch(url)
     // .then( (res) => { return res.json() })  // (mesma coisa abaixo)
     //transforma em JSON
     .then(res => res.json())
     //funcao que vai receber todas as cidades
     .then(cities => {

         //pegue uma cidade de varias cidades
         for (const city of cities) {
             //inserir no HTML as options com o nome da cidade e estado
             citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
         }

         citySelect.disabled = false
     })
}

//quando mudar executa a função e altera a cidade
document.querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//itens de coleta
//pegar todos os li
const itemsToCollect = document.querySelectorAll(".items-grid li")    

//para cada item selecionado, retorna uma callback function para executar somente quando for clicado
for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
}

//pega os itens que coleta
const collectedItems = document.querySelector("input[name=items]")

//para colocar valores aqui dentro
let selectedItems = []

//chega na função depois de clicar
function handleSelectedItem(event) {
    const itemLi = event.target

    //adicionar ou remover (toggle) classe
    itemLi.classList.toggle("selected")
    
    
    //pega o id do li clicado
    const itemId = event.target.dataset.id

    // console.log('ITEM ID: ', itemId)


    //verificar se existem itens selecionados (alreadySelected) se sim, 
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound
    })

    

    //se já estiver selecionado
    if( alreadySelected >= 0 ) {
        //tirar da selecao
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        //colocar o valor dos itens filtrados
        selectedItems = filteredItems
    } else {
        //se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    // console.log('selectedItems: ', selectedItems)

    //atualizar o campo escondido (hidden) com os itens selecionados
    collectedItems.value = selectedItems
    
    

}