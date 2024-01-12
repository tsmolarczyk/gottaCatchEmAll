import { FrameworkConfiguration } from "aurelia-framework";
import { PLATFORM } from "aurelia-pal";

export function configure(config: FrameworkConfiguration): void {
  config.globalResources(
    PLATFORM.moduleName("../components/search-bar/search-bar"),
  );
  config.globalResources(
    PLATFORM.moduleName("../components/pokemon-list/pokemon-list"),
  );
}
