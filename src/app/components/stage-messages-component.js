import {ViewStream, DomElement, ChannelPayloadFilter} from 'spyne';

export class StageMessagesComponent extends ViewStream {

    constructor(props={}) {
        props.id = "messages";
        props.template = require('./templates/messages.component.html');

        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [
            ["CHANNEL_TOH_ROUTE_EVENT", "onChannelRoute"],
            ["CHANNEL_UI_CLICK_EVENT", "onClearMsgs", ".clear"]
        ];
    }

    onClearMsgs(e){

      this.props.msgHolder$.el.innerHTML = "";

    }

    onChannelRoute(e){
      const {msg} = e.payload;

      this.props.msgHolder$.el.appendChild(new DomElement({data: msg}).render());

    }

    broadcastEvents() {
        // return nexted array(s)
        return [
            ['.clear', 'click']
        ];
    }

    onRendered() {
      this.props.msgHolder$ = this.props.el$("#msg-holder");
      this.addChannel("CHANNEL_TOH");
      this.addChannel("CHANNEL_UI");

    }

}

