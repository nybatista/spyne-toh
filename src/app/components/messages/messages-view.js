import {ViewStream} from 'spyne';

export class MessagesView extends ViewStream {

    constructor(props={}) {
        props.id = "messages";
        props.template = require('./templates/messages.component.html');

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

