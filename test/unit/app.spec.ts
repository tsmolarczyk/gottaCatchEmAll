import { bootstrap } from "aurelia-bootstrapper";
import { StageComponent } from "aurelia-testing";
import { PLATFORM } from "aurelia-pal";

describe("Stage App Component", () => {
  let component;

  beforeEach(() => {
    component = StageComponent.withResources(PLATFORM.moduleName("app")).inView(
      "<app></app>",
    );
  });

  afterEach(() => component.dispose());

  it("should render the router view", (done) => {
    component
      .create(bootstrap)
      .then(() => {
        const routerViewElement =
          component.element.querySelector("router-view");
        expect(routerViewElement).toBeDefined();
        done();
      })
      .catch((e) => {
        done(e);
      });
  }, 10000);
});
