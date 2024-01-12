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

  async fetchPokemonData() {
    console.log("details fetch");
    try {
      const response = await this.http.fetch(
        `https://pokeapi.co/api/v2/pokemon/pikachu`,
      );
      this.pokemonData = await response.json();
      console.log("this.pokemonData", this.pokemonData);
    } catch (error) {
      console.error("Error fetching pokemon data:", error);
    }
  }

  renderPokemonStats() {
    const statsHtml = this.pokemonData.stats
      .map((stat) => {
        const statName = stat.stat.name.replace(/-/g, " ");
        return `<div class="stat-item">
        <strong>${statName.toUpperCase()}:</strong> <span class="stat-value">${
          stat.base_stat
        }</span>
      </div>`;
      })
      .join("");
  }

  async attached() {
    console.log("attached method called");
    await this.fetchPokemonData();

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
      this.renderPokemonStats();
      this.animation.destroy();
      container.style.display = "none";
    });
  }

  detached() {
    this.animation?.destroy();
  }
  returnHome() {
    // this.router.navigateToRoute("pokemonDetails", { name: pokemon.name });
    this.router.navigateToRoute("home");
    console.log("Details for:");
  }
}
