import { inject } from "aurelia-framework";
import "./pokemon-list.less";
import { Router } from "aurelia-router";
import { PokemonDataService } from "../../resources/pokemon-data-service";
import { Subscription } from "rxjs";

interface Pokemon {
  name: string;
}

@inject(PokemonDataService, Router)
export class PokemonList {
  pokemonsToDisplay: Pokemon[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private pokemonDataService: PokemonDataService,
    private router: Router,
  ) {
    const subscription = this.pokemonDataService.pokemons$.subscribe(
      (pokemons: Pokemon[]) => {
        this.pokemonsToDisplay = pokemons;
      },
    );
    this.subscriptions.push(subscription);
  }

  formatName(name: string): string {
    return name
      .replace(/-/g, " ")
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
      .join(" ");
  }

  clearPokemons(): void {
    this.pokemonsToDisplay = [];
  }

  showDetails(pokemon: Pokemon): void {
    this.router.navigateToRoute("details", { name: pokemon.name });
  }
}
