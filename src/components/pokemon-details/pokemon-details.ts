import lottie from "lottie-web";
import { HttpClient } from "aurelia-fetch-client";
import animationData from "../../../static/pokeball-animation.json";
import "./pokemon-details.less";
import { inject } from "aurelia-framework";
import { Router } from "aurelia-router";
import { PokemonDataService } from "../../resources/pokemon-data-service";

@inject(HttpClient, Router, PokemonDataService)
export class PokemonDetails {
  pokemonName: string = "";
  pokemonData: PokemonDetails | null = null;
  animation;
  showOtherContent: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private pokemonDataService: PokemonDataService,
  ) {}

  activate(params: { name: string }): void {
    if (params.name) {
      this.pokemonName = params.name;
      this.pokemonDataService
        .fetchPokemonDetails(this.pokemonName)
        .then((pokemonData: PokemonDetails) => {
          this.pokemonData = pokemonData;
        })
        .catch((error: Error) => {
          console.error("Error fetching pokemon details:", error);
        });
    }
  }

  toFormattedName(name: string): string {
    return name
      .replace(/-/g, " ")
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  toStatName(statName: string): string {
    return statName
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  async attached() {
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
  }
}
