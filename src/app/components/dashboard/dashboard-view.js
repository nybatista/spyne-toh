import {ViewStream} from 'spyne';

export class DashboardView extends ViewStream {

    constructor(props={}) {
        props.id = "dashboard";
        props.template = require('./templates/dashboard.component.html');
        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [];
    }

    broadcastEvents() {
        // return nexted array(s)
        return [];
    }

    onRendered() {

    }

}

