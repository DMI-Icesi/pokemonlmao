let currentlyShowingAmount = 0;
let maxIndex = 29;
let currentList = [];

const arraydeobjetos = {
    
};

//Actualiza lista
function actualizarLista() {
    if (currentlyShowingAmount <= maxIndex) {
        renderPokemonListItem(currentlyShowingAmount);
    };
};

//Renderizar
function renderPokemonListItem(index) {
    if (currentList[index]) {
        document.getElementById('pokedex-list-render-container').insertAdjacentHTML('beforeend', `<div onclick="openInformation(${currentList[index].id})" class="pokemon-render-result-container container center column">
    <img class="search-pokemon-image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentList[index].id}.png">
    <informacion class="bold font-size-12">N° ${currentList[index].id}</infor><h3>${fachaFacha(currentList[index].name)}</h3>${getTypeContainers(currentList[index].types)}</div>`);

        currentlyShowingAmount += 1;

        actualizarLista();
    };
};

//Get de containers para la info
function getTypeContainers(typesArray) {
    let htmlToReturn = '<div class="row">';

    for (let i = 0; i < typesArray.length; i++) {
        htmlToReturn += `<div class="type-container" style="background: ${arraydeobjetos[typesArray[i]]};">${fachaFacha(typesArray[i])}</div>`;
    };

    return htmlToReturn + '</div>';
};

function fachaFacha(string) {
    let splitStr = string.toLowerCase().split('-');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    };
    return splitStr.join(' ');
};