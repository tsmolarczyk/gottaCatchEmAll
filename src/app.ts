import { Router } from "aurelia-router";
import { PLATFORM } from "aurelia-framework";
import "./global.less";

export class App {
  router: Router;
  configureRouter(config, router) {
    config.map([
      {
        route: ["", "home"],
        name: "home",
        moduleId: PLATFORM.moduleName("components/home-view/home-view"),
        nav: true,
        title: "Search for Pokemon",
      },
      {
        route: "details",
        name: "details",
        moduleId: PLATFORM.moduleName(
          "components/pokemon-details/pokemon-details",
        ),
        nav: true,
        title: "Details",
      },
    ]);

    this.router = router;
  }
}
