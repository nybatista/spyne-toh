import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';
import {PageDashboardSearchComponent} from 'components/page-components/page-dashboard-search-component';

export class PageDashboardView extends ViewStream {

    constructor(props={}) {
        props.id = "dashboard";
        props.traits = [TohPageTraits];
        props.template = require('./templates/page-dashboard.component.html');
        super(props);
    }

    addActionListeners() {
        return [
          this.tohPage$AddRouteActionListener()
        ]
    }

    broadcastEvents() {
      return [
          ['a', 'click']
      ];
    }

    onRendered() {
      this.tohPage$AddPageTraits();
      this.appendView(new PageDashboardSearchComponent(), "#hero-search");

    }

}

