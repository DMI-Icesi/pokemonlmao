//Api fetch pikapiiiiiiiiiiiiiiiiii
async function fetchPokemonAPI(id) {
    const urlPokemon = 'https://pokeapi.co/api/v2/pokemon/' + id;
    const urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/' + id;
    const responsePokemon = await fetch(urlPokemon);
    const responseSpecies = await fetch(urlSpecies);
    const pokemon = await responsePokemon.json();
    const species = await responseSpecies.json();

    setupInfo(pokemon, id, species);

    slideInPokemonInfo();
        
    if(window.innerWidth < 1100){
        openPokemonResponsiveInfo();
    };
};

//Abrir la info del pokemon
function openInformation(id) {
    document.getElementById('current-pokemon-empty').classList.add('hide');

    if(window.innerWidth > 1100){
        slideOutPokemonInfo();

        setTimeout(function(){
            fetchPokemonAPI(id);
            updateCurrentPokemonImage(id);
        }, 350);
    } else {
        fetchPokemonAPI(id);
        updateCurrentPokemonImage(id);
    };
};

//Función que muestra la información de los pokemones
function setupInfo(pokemon, id, species) {
    document.getElementById('poke-info').classList.remove('hide');
    document.getElementById('current-pokemon-id').innerHTML = 'N° ' + pokemon.id;
    document.getElementById('current-pokemon-name').innerHTML = fachaFacha(pokemon.name);
    document.getElementById('current-pokemon-types').innerHTML = getTypeContainers(pokemons[id - 1].types);
    document.getElementById('current-pokemon-height').innerHTML = pokemon.height / 10 + 'm';
    document.getElementById('current-pokemon-weight').innerHTML = pokemon.weight / 10 + 'kg';

    for(i = 0; i < species.flavor_text_entries.length; i++) {
        if(species.flavor_text_entries[i].language.name == 'en'){
            document.getElementById('current-pokemon-description').innerHTML = fachaFacha(species.flavor_text_entries[i].flavor_text.replace('', ' '));
            break;
        };
    };
};

//Pokemon imagen
function updateCurrentPokemonImage(id) {

    const currentPokemonImage = document.getElementById('poke-imagen');
    const img = new Image();

    img.onload = function() {
        currentPokemonImage.src = this.src;
        currentPokemonImage.style.height = this.height * 3 + 'px';
    };

    if(id >= 650) {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/' + id + '.png';
    } else {
        img.src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/' + id + '.gif';
    };
};

//Mostrar info
function slideOutPokemonInfo(){
    document.getElementById('current-pokemon-container').classList.remove('slide-in');
    document.getElementById('current-pokemon-container').classList.add('slide-out');
};

function slideInPokemonInfo(){
    document.getElementById('current-pokemon-container').classList.add('slide-in');
    document.getElementById('current-pokemon-container').classList.remove('slide-out');
};

//Un bug q se arreglo 
window.addEventListener('resize', function(){
    if(document.getElementById('current-pokemon-container').classList.contains('slide-out')){
        document.getElementById('current-pokemon-container').classList.replace('slide-out', 'slide-in');
    };

    if(window.innerWidth > 1100) {
        document.getElementsByTagName('html')[0].style.overflow = 'unset';
    };
});