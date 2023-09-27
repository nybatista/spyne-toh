import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class HeroesView extends ViewStream {

    constructor(props={}) {
        props.id = "heroes";
        props.traits = [TohPageTraits];
        props.template = require('./templates/heroes.component.html');
        super(props);
    }

    addActionListeners() {
      // return nexted array(s)
      const actionListenersArr = [];
      actionListenersArr.push(this.toh$PageAddRouteActionListener());
      return actionListenersArr;
    }

    broadcastEvents() {
      // return nexted array(s)
      return [
          ['a', 'click'],
          ['button', 'click']
      ];
    }

    onRendered() {
      this.toh$PageAddPageTraits();

    }


}

