import {ViewStream} from 'spyne';

export class PageHeroesItemComponent extends ViewStream {

    constructor(props={}) {
        props.tagName = "li";
        props.className = `hero-item hero-item-{{props.data.id}}`;
        props.template = require('./templates/page-heroes-item-component.tmpl.html');
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

