import {ViewStream} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';

export class HeroDetailView extends ViewStream {

    constructor(props={}) {
      props.id = "hero-detail";
      props.traits = [SpyneTohTraits]

      props.template = require('./templates/hero-detail.component.html')

        super(props);
    }

    addActionListeners() {
      // return nexted array(s)
      const actionListenersArr = [];
      actionListenersArr.push(this.toh$AddRouteActionListener());
      return actionListenersArr;
    }

    broadcastEvents() {
      // return nexted array(s)
      return [];
    }

    onRendered() {
      this.toh$AddPageTraits();

    }

}

