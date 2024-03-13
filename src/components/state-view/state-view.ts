import { autoinject } from "aurelia-framework";
import { connectTo, Store } from "aurelia-store";
import { State } from "../../state/state";
import { Subscription } from "rxjs";

@autoinject
@connectTo<State>()
export class StateView {
  public state: State;
  private subscription: Subscription;

  constructor(private store: Store<State>) {}

  bind() {
    this.subscription = this.store.state.subscribe(
      state => (this.state = state)
    );
  }

  unbind() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
