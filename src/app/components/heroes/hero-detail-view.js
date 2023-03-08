import {ViewStream} from 'spyne';

export class HeroDetailView extends ViewStream {

    constructor(props={}) {
      props.id = "hero-detail";
      props.template = require('./templates/hero-detail.component.html')

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

