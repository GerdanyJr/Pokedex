const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImg = document.querySelector('.pokemon_image');
const prevButton = document.querySelector('.btn-prev');
const nextButton = document.querySelector('.btn-next');

const form = document.querySelector('.form');
let searchPokemon = 1;

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    searchPokemon = form.querySelector('input[type="search"]').value.toLowerCase();
    renderPokemon(searchPokemon);
});

const fetchPokemon = async (pokemon) => {
    const apiResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (apiResponse.status === 200) {
        return await apiResponse.json();
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        const src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"].front_default;
        pokemonImg.src = (src != undefined) ? src : data["sprites"].front_default;
        form.value = '';
    } else {
        pokemonName.innerHTML = '<span style="font-size=clamp(10px,5vh,18px); text-transform:none;">Quem é esse pokemon?</span>';
        pokemonNumber.innerHTML = "?";
        pokemonImg.src = "https://66.media.tumblr.com/0caee7e4146a8a74e6a740d656ecb85d/tumblr_mnakva6Dds1rfjowdo1_500.gif";
        return;
    }

}

prevButton.addEventListener('click', () => {
    searchPokemon = ((searchPokemon - 1) > 0) ? searchPokemon - 1 : searchPokemon;
    renderPokemon(searchPokemon);
});

nextButton.addEventListener('click', () => {
    searchPokemon++;
    renderPokemon(searchPokemon);
});
renderPokemon(searchPokemon);