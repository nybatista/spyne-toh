import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class PageHeroesView extends ViewStream {

    constructor(props={}) {
        props.id = "heroes";
        props.traits = [TohPageTraits];
        props.template = require('./templates/page-heroes.component.html');
        super(props);
    }

    addActionListeners() {
      return [
        ["CHANNEL_TOH_ADD_EVENT", "tohPage$AddHeroItem" ],
        this.tohPage$AddRouteActionListener()
      ];
    }

    broadcastEvents() {
      return [
          ['button.add-button', 'click']
      ];
    }

    onRendered() {
      this.tohPage$AddPageTraits();
      this.props.data.heroesArr.forEach(this.tohPage$AddHeroItem.bind(this));


    }


}

