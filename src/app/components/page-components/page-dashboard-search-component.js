import {ViewStream} from 'spyne';

export class PageDashboardSearchComponent extends ViewStream {

    constructor(props={}) {
        props.id = "search-component";
        props.template = require('./templates/page-dashboard-search.component.html');

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

