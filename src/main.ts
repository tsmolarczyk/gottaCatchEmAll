import { Aurelia } from "aurelia-framework";
import environment from "../config/environment.json";
import { PLATFORM } from "aurelia-pal";
import { HttpClient } from "aurelia-fetch-client";
import { initialState } from "./state/state";
import { Store } from "aurelia-store";

import "./resources/index";

export function configure(aurelia: Aurelia): void {
  aurelia.use
    .standardConfiguration()
    .feature(PLATFORM.moduleName("resources/index"));

  aurelia.use.plugin(PLATFORM.moduleName("aurelia-store"), { initialState });

  aurelia.use.developmentLogging(environment.debug ? "debug" : "warn");

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName("aurelia-testing"));
  }

  const httpClient = aurelia.container.get(HttpClient);
  httpClient.configure((config) => {
    config.useStandardConfiguration().withBaseUrl("https://pokeapi.co/api/v2/");
  });

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName("app")));
}
