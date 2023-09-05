const pokeApi = {}


// Function that converts the details of the pokemon coming from the API to the pokemon details that I created
function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon()
  pokemon.number = pokeDetail.id;
  pokemon.name = pokeDetail.name;

  const types = pokeDetail.types.map(typeSlot => typeSlot.type.name);
  const [type] = types;

  pokemon.types = types;
  pokemon.type = type;

  pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
  return pokemon;
}

pokeApi.getDetail = (pokemon) => {
  return fetch(pokemon.url)
          .then(res => res.json())
          .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
  return fetch(url)
    .then(res => res.json())
    .then(body => body.results)
    .then(pokemons => pokemons.map(pokeApi.getDetail))
    .then(detailRequests => Promise.all(detailRequests))
    .then(pokemonDetail => pokemonDetail)
    .catch(error => console.log(error));
}