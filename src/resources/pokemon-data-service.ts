import { BehaviorSubject } from "rxjs";
import { HttpClient } from "aurelia-fetch-client";
import { inject } from "aurelia-framework";

interface PokemonSpecies {
  name: string;
}
@inject(HttpClient)
export class PokemonDataService {
  private pokemonsSubject = new BehaviorSubject([]);
  pokemons$ = this.pokemonsSubject.asObservable();

  constructor(private http: HttpClient) {}

  updatePokemons(pokemons) {
    this.pokemonsSubject.next(pokemons);
  }

  async fetchPokemonDetails(name) {
    let currentData = this.pokemonsSubject.value.find((p) => p.name === name);

    if (!currentData || !currentData.stats) {
      const response = await this.http.fetch(`pokemon/${name}`);
      currentData = await response.json();

      const speciesResponse = await this.http.fetch(currentData.species.url);
      const speciesData = await speciesResponse.json();

      currentData.description = speciesData.flavor_text_entries.find(
        (entry) => entry.language.name === "en",
      )?.flavor_text;

      this.updatePokemonDetails(currentData);
    }
    return currentData;
  }

  updatePokemonDetails(pokemonDetails) {
    const pokemons = this.pokemonsSubject.value;
    const index = pokemons.findIndex((p) => p.name === pokemonDetails.name);
    if (index !== -1) {
      pokemons[index] = pokemonDetails;
    } else {
      pokemons.push(pokemonDetails);
    }
    this.pokemonsSubject.next(pokemons);
  }

  clearPokemonsInView() {
    this.pokemonsSubject.next([]);
  }
  async fetchPokemonsByColor(color: string): Promise<PokemonSpecies[]> {
    const response = await this.http.fetch(`pokemon-color/${color}`);
    const data = await response.json();
    this.updatePokemons(data.pokemon_species);
    return data.pokemon_species;
  }
}

