import {ViewStream, ChannelPayloadFilter} from 'spyne';
import { TohMessagesTraits } from '../../traits/toh-messages-traits';

export class PageDashboardSearchItem extends ViewStream {

    constructor(props={}) {
        props.tagName = "li";
        props.traits = [TohMessagesTraits];
        props.channels = ["CHANNEL_TOH"]
        props.template = require('./templates/page-dashboard-search-item.tmpl.html');
        super(props);
    }

    addActionListeners() {
        const reFalseMatchPayloadFilter = new ChannelPayloadFilter({
          payload: (p)=>this.props.data.name.includes(p.searchStr) === false || p.searchStr === ""
        });

        return [
            ["CHANNEL_TOH_SEARCH_EVENT", "disposeViewStream", reFalseMatchPayloadFilter]
        ];
    }

    broadcastEvents() {
        return [
            ['a', 'click']
        ];
    }

    onRendered() {

    }

}

