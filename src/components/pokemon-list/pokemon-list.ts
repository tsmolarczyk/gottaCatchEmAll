import { EventAggregator } from "aurelia-event-aggregator";
import { inject } from "aurelia-framework";
import "./pokemon-list.less";
import { Router } from "aurelia-router";

@inject(EventAggregator, Router)
export class PokemonList {
  pokemonsToDisplay: object[];
  searchPerformed = false;

  constructor(
    private ea: EventAggregator,
    private router: Router,
  ) {
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
    // this.router.navigateToRoute("pokemonDetails", { name: pokemon.name });
    this.router.navigateToRoute("details");
    console.log("Details for:", pokemon.name);
  }
}
