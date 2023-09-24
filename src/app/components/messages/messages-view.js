import {ViewStream, DomElement} from 'spyne';

export class MessagesView extends ViewStream {

    constructor(props={}) {
        props.id = "messages";
        props.template = require('./templates/messages.component.html');

        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [
            ["CHANNEL_TOH_ROUTE_EVENT", "onChannelRoute"]
        ];
    }

    onChannelRoute(e){
      const {msg} = e.payload;

      this.props.el$("#msg-holder").el.appendChild(new DomElement({data: msg}).render());

      console.log("channel route is ",e);
    }

    broadcastEvents() {
        // return nexted array(s)
        return [];
    }

    onRendered() {

      this.addChannel("CHANNEL_TOH");

    }

}

