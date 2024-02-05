import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";
import "./search-bar.less";
import { PokemonDataService } from "../../resources/pokemon-data-service";

interface Pokemon {
  name: string;
  imageUrl: string | null;
}

interface PokemonSpecies {
  name: string;
}

@inject(
  HttpClient,
  PokemonDataService,
)
export class SearchBar {
  searchQuery: string = "";
  pokemonsToDisplay: Pokemon[] = [];
  allColorsOfPokemons: string[] = [
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
  isResultFound: boolean = true;

  constructor(
    private http: HttpClient,
    private pokemonDataService: PokemonDataService,
  ) {
    this.fetchPokemons();
  }

  async fetchPokemons(): Promise<void> {
    this.pokemonsToDisplay = [];
    const pokemonsInStorage = localStorage.getItem("pokemons");

    if (!pokemonsInStorage) {
      try {
        const response = await this.http.fetch("pokemon?limit=1500");
        const data = await response.json();
        localStorage.setItem("pokemons", JSON.stringify(data.results));
        if (this.searchQuery !== "") {
          await this.processPokemons(data.results);
        }
      } catch (error) {
        console.error("Error occurs:", error);
      }
    } else {
      if (this.searchQuery !== "") {
        this.processPokemons(JSON.parse(pokemonsInStorage));
      }
    }
  }

  async processPokemons(allPokemons: PokemonSpecies[]): Promise<void> {
    let pokemonsToFilter = [...allPokemons];
    const formattedQuery = this.searchQuery.replace(/\s+/g, "-").toLowerCase();

    if (this.isColorQuery(formattedQuery)) {
      pokemonsToFilter = await this.pokemonDataService.fetchPokemonsByColor(
        formattedQuery.toLowerCase(),
      );
    } else {
      pokemonsToFilter = pokemonsToFilter.filter(
        (pokemon) => pokemon.name && pokemon.name.includes(formattedQuery),
      );
    }

    this.filterAndDisplayPokemons(pokemonsToFilter);
  }
  filterAndDisplayPokemons(pokemons: PokemonSpecies[]): void {
    this.pokemonsToDisplay = pokemons.map(
      (pokemon: PokemonSpecies): { imageUrl: null; name: string } => ({
        name: pokemon.name,
        imageUrl: null,
      }),
    );

    this.pokemonDataService.updatePokemons(this.pokemonsToDisplay);
    this.isResultFound = this.pokemonsToDisplay.length > 0;
  }

  isColorQuery(query: string): boolean {
    return this.allColorsOfPokemons.includes(query.toLowerCase());
  }

  clearList(): void {
    this.searchQuery = "";
    this.pokemonsToDisplay = [];
    this.pokemonDataService.clearPokemonsInView();
    this.isResultFound = true;
  }}
