const pokemonOl = document.querySelector(".pokemons");
const loadMoreButton = document.querySelector("#loadMoreButton");
const limit = 10;
let offset = 0;

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detail">
          <ol class="types">
            ${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join("")}
          </ol>
          <img src="${pokemon.photo}"
            alt="${pokemon.name}">
        </div>
      </li>
  `
}

function loadPokemonItems(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => pokemonOl.innerHTML += pokemons.map(convertPokemonToLi).join(""))
}

loadPokemonItems(offset, limit);

loadMoreButton.addEventListener('click', () => {
  offset += limit;
  loadPokemonItems(offset, limit);
})
