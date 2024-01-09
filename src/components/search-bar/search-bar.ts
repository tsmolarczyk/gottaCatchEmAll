import {HttpClient, json} from 'aurelia-fetch-client';

export class SearchBar {
  static inject = [HttpClient];
  searchQuery = '';
  pokemons = [];


  constructor(private http: HttpClient) {
    http.configure(config => {
      config
        .useStandardConfiguration()
        .withBaseUrl('https://pokeapi.co/api/v2/');
    });
  }

  async performSearch() {
    if (this.searchQuery) {
      try {
        const response = await this.http.fetch(`pokemon/${this.searchQuery.toLowerCase()}*`);
        const data = await response.json();
        console.log(data);
        this.searchQuery = '';
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  }
  async updateAllPokemons() {
    try {
      const response = await this.http.fetch('pokemon?limit=1000');
      const data = await response.json();

      localStorage.setItem('pokemonData', JSON.stringify(data.results));

      this.pokemons = data.results;

      console.log('Updated all Pokémon data:', this.pokemons);
    } catch (error) {
      console.error('Error updating Pokémon data:', error);
    }
  }
}
