import lottie from "lottie-web";
import animationData from "components/pokemon-details/pokeball-animation.json";

export class PokemonDetails {
  animation;
  showOtherContent = false;

  attached() {
    this.animation = lottie.loadAnimation({
      container: document.getElementById("lottie-container"),
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: animationData,
      path: "pokeball-animation.json",
    });

    setTimeout(() => {
      this.animation.stop();
      this.animation.destroy();
      this.showOtherContent = true;
    }, 3000);
  }

  detached() {
    this.animation?.destroy();
  }
}
