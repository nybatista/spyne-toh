import {ViewStream, ChannelPayloadFilter} from 'spyne';

export class PageDashboardSearchItem extends ViewStream {

    constructor(props={}) {
        props.tagName = "li";
        props.template = require('./templates/page-dashboard-search-item.tmpl.html');
        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        const checkForMatch = (pl)=>{
          const {searchStr} = pl;
          const re = new RegExp(searchStr, "g");
          const match = re.test(this.props.data.name);

          return match === false || searchStr === "";
        }

        const reFalseMatchPayloadFilter = new ChannelPayloadFilter({

          payload: checkForMatch

        });

        return [
            ["CHANNEL_TOH_SEARCH_EVENT", "disposeViewStream", reFalseMatchPayloadFilter]
        ];
    }

    broadcastEvents() {
        // return nexted array(s)
        return [
            ['a', 'click']
        ];
    }

    onRendered() {
      this.addChannel("CHANNEL_TOH");
    }

}

