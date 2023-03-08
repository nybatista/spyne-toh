import {ViewStream} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';

export class HeroesView extends ViewStream {

    constructor(props={}) {
        props.id = "heroes";
        props.traits = [SpyneTohTraits];
        props.template = require('./templates/heroes.component.html');
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

