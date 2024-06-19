const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");

const image = document.getElementById("sprite");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

const displayItems = [image, pokemonName, pokemonId, weight, height, types];
const statsElements = [hp, attack, defense, specialAttack, specialDefense, speed];
const typeColors = {
  grass: "#4fce87", // bright green
  poison: "#BC57BD", // magenta
  fire: "#F08030", // orange
  flying: "#A890F0", // lavender
  water: "#618be6", // baby blue
  bug: "#c6ee11", // lime
  normal: "lightgrey",
  electric: "#f4c328", //amber
  ground: "#bc9263", // light brown 
  fairy: "pink",
  ice: "#a8cfdd", // light blue
  steel: "#B8B8D0", //silver
  ghost: "#8B7DA2", // grey-purple
  psychic: "#F85888", // bright pink
  dark: "#9B7C72", // brown
  rock: "#BBA66F", // very light brown
  fighting: "#D8433B", // red
  dragon: "#4ABBBB" // teal
};

const fetchData = async (nameOrId) => {
  try {
    const res = await fetch(pokemonUrl.concat(`/${nameOrId.toLowerCase()}`));
    const data = await res.json();
    displayPokemon(data);
  } catch (err) {
    alert("Pokémon not found");
    clearDisplay();
    console.log(err);
  } 
}

class Pokemon {
  constructor ({id, name, height, weight, types, sprites, stats}) {
    this.id = id;
    this.name = name.toUpperCase();
    this.height = height;
    this.weight = weight;
    this.sprite = sprites.front_default;
    this.types = types.map((type) => type.type.name.toUpperCase());
    this.stats = new Object();
    stats.map((stat) => {
      this.stats[stat.stat.name] = stat.base_stat;
    })
  }

  setImage (img) {
    img.classList.remove("hidden");
    img.src = this.sprite;
    img.alt = this.name;
  }
}

const clearDisplay = () => {
  displayItems.forEach((item) => {
    item.innerHTML = "";
  });
  statsElements.forEach((item) => {
    item.innerHTML = "";
  });
  image.classList.add("hidden");
}

const displayPokemon = (pokemonData) => {
  const pokemon = new Pokemon(pokemonData);
  //console.log(pokemon);
  // display area
  pokemonName.textContent = pokemon.name;
  pokemonId.textContent = `#${pokemon.id}`;
  height.textContent = `Height: ${pokemon.height}`;
  weight.textContent = `Weight: ${pokemon.weight}`;
  types.innerHTML = "";
  pokemon.types.forEach((type) => {
    types.innerHTML += `<span class="type" id="${type}">${type}</span>`;
    const element = document.getElementById(type);
    const color = typeColors[type.toLowerCase()];
    element.style.background = color;
    element.style.border = `2px outset ${color}`;
  });
  pokemon.setImage(image);

  // stats
  for (const element of statsElements) {
    element.textContent = pokemon.stats[element.id];
  }
}

searchBtn.addEventListener('click', () => 
  fetchData(searchInput.value)
);
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchData(searchInput.value)
  }
});