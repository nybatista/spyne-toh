import {ViewStream} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';
import {DashboardHeroSearchView} from 'components/dashboard/dashboard-hero-search-view';

export class DashboardView extends ViewStream {

    constructor(props={}) {
        props.id = "dashboard";
        props.traits = [SpyneTohTraits]

        props.template = require('./templates/dashboard.component.html');
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
      return [
          ['a', 'click']
      ];
    }

    onRendered() {
      this.toh$AddPageTraits();
      this.appendView(new DashboardHeroSearchView(), "#app-hero-search")

    }

}

