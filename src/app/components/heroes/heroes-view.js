import {ViewStream} from 'spyne';

export class HeroesView extends ViewStream {

    constructor(props={}) {
        props.id = "heroes";
        props.template = require('./templates/heroes.component.html');
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

