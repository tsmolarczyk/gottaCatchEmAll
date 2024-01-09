import { bindable, bindingMode } from 'aurelia-framework';

export class PokemonList {
  @bindable({ defaultBindingMode: bindingMode.oneWay }) pokemons: any[];

  showDetails(pokemon) {
    // TODO: logic for details
    console.log('Details for:', pokemon.name);
  }
}
