/*document
    .querySelector('select[name=uf]')
    .addEventListener('change', ()=>{
        console.log('mudei1')
    })

fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(function(res){return res.json()})
    .then((data=>{console.log(data)}))*/

// promisse praa pegar o estado UF
function populacao(){
    const ufSelecte = document.querySelector('select[name=uf]')

    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
        .then( res => res.json() )
        .then( states => {
            for (city of states){
                ufSelecte.innerHTML += `<option value='${city.id}'>${city.nome}</option>`
            }
            
        } )
}
//CHAMADA DA FUNCAO POPULAO QUE PEGA OS ESTADOS
populacao()

// FUNCAO QUE PEGA AS CIDADES NO SELECTED
function getCities(event){
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML ='<option>Selecione a cidade</option>'
    citySelect.disabled = true


    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for(const city of cities){
                citySelect.innerHTML +=  `<option value='${city.nome}'>${city.nome}</option>`
            }

            citySelect.disabled = false

        })
}

document
    .querySelector('select[name=uf]')
    .addEventListener('change', getCities)

// items de coleta
// pega items de coleta
const itemsToCollect = document.querySelectorAll('.items-grid li')


//  FOR para ativa o event o click pra chamar a funcao  //
//  selecionat items  //
for (const item of itemsToCollect){
    item.addEventListener('click', handleSelectedItem)
}

const collectedItems = document.querySelector('input[name=items]')

let = selectedItems = []

// funçao que seleciona o lixo que vai ser reciclado
function handleSelectedItem(event){
    const itemLi = event.target
    //add ou remove uma classe on javascript

    const itemId = event.target.dataset.id
    itemLi.classList.toggle('selected')

    //VERIFICAR SE EXISTEM ITENS SELECIONADOS
    //PEGAR OS ITENS SELECIONADOS
    // depois do evento click pega o id do item e ver se 
    // ele estar reamente no array ->''** SelectedItens**''<-
    //ira retorna um true or false

    const AlredySelected = selectedItems.findIndex( item =>{
        const itemFound = item == itemId
        return itemFound    
    })

    //SE JA ESTIVER SELECIONADO, TIRAR DA SELEÇAO

    if(AlredySelected >= 0){
        //tirar da seleçao
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else{
        //SE NAO ESTIVER SELECIONADO TIRAR DA SELEÇAO
        selectedItems.push(itemId)
    }
    console.log(selectedItems)


    // ATUALIZAR OS CAMPOS ESCONDIDOS
    // COM OS ITEMS SELECIONADOS
    collectedItems.value = selectedItems

}
