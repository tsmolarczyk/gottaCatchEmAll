import { EventAggregator } from "aurelia-event-aggregator";
import { inject } from "aurelia-framework";
import "./pokemon-list.less";

@inject(EventAggregator)
export class PokemonList {
  pokemonsToDisplay: object[];
  searchPerformed = false;

  constructor(private ea: EventAggregator) {
    ea.subscribe("pokemonData", (data) => {
      this.pokemonsToDisplay = data;
    });
    ea.subscribe("clearPokemonsList", () => {
      this.clearPokemons();
    });
  }

  formatName(name: string) {
    return name
      .replace(/-/g, " ")
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(" ");
  }
  clearPokemons() {
    this.pokemonsToDisplay = [];
  }

  showDetails(pokemon) {
    console.log("Details for:", pokemon.name);
  }
}
