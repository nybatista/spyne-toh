import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';
import {DashboardHeroSearchView} from 'components/dashboard/dashboard-hero-search-view';

export class DashboardView extends ViewStream {

    constructor(props={}) {
        props.id = "dashboard";
        props.traits = [TohPageTraits]

        props.template = require('./templates/dashboard.component.html');
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
          ['a', 'click']
      ];
    }

    onRendered() {
      this.toh$PageAddPageTraits();
      this.appendView(new DashboardHeroSearchView(), "#app-hero-search")

    }

}

