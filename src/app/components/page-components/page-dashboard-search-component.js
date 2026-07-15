import {ViewStream} from 'spyne';
import { TohDashboardTraits } from '../../traits/toh-dashboard-traits';

export class PageDashboardSearchComponent extends ViewStream {

    constructor(props={}) {
        props.id = "search-component";
        props.traits = [TohDashboardTraits];
        props.channels = ["CHANNEL_TOH"]
        props.template = require('./templates/page-dashboard-search.component.html');
        super(props);
    }

    addActionListeners() {
        return [
          ["CHANNEL_TOH_SEARCH_EVENT", "tohDashboard$OnSearchEvent"]
        ];
    }


    broadcastEvents() {
        return [
            ['.input-toh', 'keyup']
        ];
    }

    onRendered() {

    }

}

