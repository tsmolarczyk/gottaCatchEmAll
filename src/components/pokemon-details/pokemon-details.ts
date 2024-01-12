import lottie from "lottie-web";
import { HttpClient } from "aurelia-fetch-client";
import animationData from "../../../static/pokeball-animation.json";
import "./pokemon-details.less";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";

@inject(HttpClient, Router)
export class PokemonDetails {
  pokemonName = "";
  pokemonData = null;
  animation;
  showOtherContent = false;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  async activate(params) {
    if (params.name) {
      this.pokemonName = params.name;
      await this.fetchPokemonData(this.pokemonName);
    }
  }
  async fetchPokemonData(pokemonName = this.pokemonName) {
    if (!pokemonName) {
      console.error("No pokemon name provided");
      return;
    }

    try {
      const response = await this.http.fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName}`,
      );
      this.pokemonData = await response.json();
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
    }
  }

  toStatName(statName: string): string {
    return statName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  async attached() {
    console.log("attached method called");
    if (this.pokemonName) {
      await this.fetchPokemonData(this.pokemonName);
    }

    const container = document.getElementById("lottie-container");
    container.style.width = "20%";
    container.style.height = "auto";
    container.style.margin = "150px auto";

    this.animation = lottie.loadAnimation({
      container: container,
      renderer: "svg",
      loop: false,
      autoplay: true,
      animationData: animationData,
    });

    this.animation.addEventListener("complete", () => {
      this.showOtherContent = true;
      this.animation.destroy();
      container.style.display = "none";
    });
  }

  detached() {
    this.animation?.destroy();
  }
  returnHome() {
    this.router.navigateToRoute("home");
    console.log("Details for:");
  }
}
