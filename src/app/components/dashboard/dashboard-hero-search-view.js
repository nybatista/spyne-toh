import {ViewStream} from 'spyne';

export class DashboardHeroSearchView extends ViewStream {

    constructor(props={}) {
        props.id = "search-component";
        props.template = require('./templates/dashboard-hero-search.component.html');

        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [];
    }

    broadcastEvents() {
        // return nexted array(s)
        return [
            ['.input-toh', 'keyup']
        ];
    }

    onRendered() {

    }

}

