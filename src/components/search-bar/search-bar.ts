import { HttpClient } from "aurelia-fetch-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { inject } from "aurelia-framework";
import "./search-bar.less";
@inject(HttpClient, EventAggregator)
export class SearchBar {
  static inject = [HttpClient];
  searchQuery = "";
  pokemonsToDisplay = [];
  allColorsOfPokemons = [
    "black",
    "blue",
    "brown",
    "gray",
    "green",
    "pink",
    "purple",
    "red",
    "white",
    "yellow",
  ];

  constructor(
    private http: HttpClient,
    private ea: EventAggregator,
  ) {
    this.fetchPokemons();
  }

  fetchPokemons() {
    this.pokemonsToDisplay = [];

    const pokemonsInStorage = localStorage.getItem("pokemons");

    if (!pokemonsInStorage) {
      this.http
        .fetch("https://pokeapi.co/api/v2/pokemon?limit=1500")
        .then((response) => response.json())
        .then((data) => {
          localStorage.setItem("pokemons", JSON.stringify(data.results));
          if (this.searchQuery !== "") {
            this.processPokemons(data.results);
          }
        })
        .catch((error) => {
          console.error("Error occurs:", error);
        });
    } else {
      if (this.searchQuery !== "") {
        this.processPokemons(JSON.parse(pokemonsInStorage));
      }
    }
  }

  async processPokemons(allPokemons) {
    let pokemonsToFilter = [...allPokemons];

    if (this.isColorQuery(this.searchQuery)) {
      const colorPokemons = await this.fetchPokemonsByColor(
        this.searchQuery.toLowerCase(),
      );
      pokemonsToFilter = [...colorPokemons];
    }

    if (!this.isColorQuery(this.searchQuery)) {
      pokemonsToFilter = pokemonsToFilter.filter((pokemon) =>
        pokemon.name.includes(this.searchQuery),
      );
    }

    const uniquePokemons = Array.from(
      new Set(pokemonsToFilter.map((p) => p.name)),
    ).map((name) => {
      return pokemonsToFilter.find((p) => p.name === name);
    });

    this.filterAndDisplayPokemons(uniquePokemons);
  }

  filterAndDisplayPokemons(pokemons) {
    Promise.all(
      pokemons.map((pokemon) =>
        this.http.fetch(pokemon.url).then((response) => response.json()),
      ),
    ).then((detailsArray) => {
      this.pokemonsToDisplay = detailsArray
        .filter((details) => details.sprites && details.sprites.front_default)
        .map((details) => ({
          name: details.name,
          imageUrl: details.sprites.front_default,
        }));
      this.ea.publish("pokemonData", this.pokemonsToDisplay);
    });
  }

  isColorQuery(query) {
    return this.allColorsOfPokemons.includes(query.toLowerCase());
  }

  clearList() {
    this.searchQuery = "";
    this.ea.publish("clearPokemonsList", {});
  }
  async fetchPokemonsByColor(color) {
    const response = await this.http.fetch(
      `https://pokeapi.co/api/v2/pokemon-color/${color}`,
    );
    const data = await response.json();
    // TODO:add color search
    console.log("red pokemons", data);
    return data.pokemon_species;
  }
}
