import { inject } from "aurelia-framework";
import "./pokemon-list.less";
import { Router } from "aurelia-router";
import { PokemonDataService } from "../../resources/pokemon-data-service";
import { Subscription } from "rxjs";

@inject(PokemonDataService, Router)
export class PokemonList {
  pokemonsToDisplay: object[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private pokemonDataService: PokemonDataService,
    private router: Router,
  ) {
    const subscription = this.pokemonDataService.pokemons$.subscribe(
      (pokemons) => {
        this.pokemonsToDisplay = pokemons;
      },
    );
    this.subscriptions.push(subscription);
  }
  detached() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
    this.router.navigateToRoute("details", { name: pokemon.name });
  }
}
