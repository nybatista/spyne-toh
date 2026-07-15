import {ViewStream, ChannelPayloadFilter} from 'spyne';
import { TohMessagesTraits} from '../traits/toh-messages-traits';

export class StageMessagesComponent extends ViewStream {

    constructor(props={}) {
        props.id = "messages";
        props.traits = [TohMessagesTraits];
        props.template = require('./templates/messages.component.html');
        super(props);
    }

    addActionListeners() {
        return [
            ["CHANNEL_TOH_.*_EVENT", "tohMessages$OnChannelRoute"],
            ["CHANNEL_UI_CLICK_EVENT", "tohMessages$OnClearMsgs", ".clear"]
        ];
    }

    broadcastEvents() {
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

