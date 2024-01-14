import { HttpClient } from "aurelia-fetch-client";
import { EventAggregator } from "aurelia-event-aggregator";
import { inject } from "aurelia-framework";
import "./search-bar.less";
import { PokemonDataService } from "../../resources/pokemon-data-service";

@inject(HttpClient, EventAggregator, PokemonDataService)
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
  isResultFound = true;

  constructor(
    private http: HttpClient,
    private ea: EventAggregator,
    private pokemonDataService: PokemonDataService,
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
    const formattedQuery = this.searchQuery.replace(/\s+/g, "-");

    if (this.isColorQuery(formattedQuery)) {
      pokemonsToFilter = await this.fetchPokemonsByColor(
        formattedQuery.toLowerCase(),
      );
    } else {
      pokemonsToFilter = pokemonsToFilter.filter(
        (pokemon) => pokemon.name && pokemon.name.includes(formattedQuery),
      );
    }

    const uniquePokemons = Array.from(
      new Set(pokemonsToFilter.map((p) => p.name)),
    ).map((name) => pokemonsToFilter.find((p) => p.name === name));

    // Przekaż wyniki do metody wyświetlającej.
    this.filterAndDisplayPokemons(uniquePokemons);
  }

  filterAndDisplayPokemons(pokemons) {
    this.pokemonsToDisplay = pokemons.map((pokemon) => ({
      name: pokemon.name,
      imageUrl: null,
    }));

    this.pokemonDataService.updatePokemons(this.pokemonsToDisplay);
    this.isResultFound = this.pokemonsToDisplay.length > 0;
  }

  isColorQuery(query) {
    return this.allColorsOfPokemons.includes(query.toLowerCase());
  }

  clearList() {
    this.searchQuery = "";
    this.pokemonsToDisplay = [];
    this.pokemonDataService.clearPokemonsInView();
    this.isResultFound = true;
  }

  async fetchPokemonsByColor(color) {
    const response = await this.http.fetch(
      `https://pokeapi.co/api/v2/pokemon-color/${color}`,
    );
    const data = await response.json();
    this.pokemonDataService.updatePokemons(data.pokemon_species);

    return data.pokemon_species;
  }
}
