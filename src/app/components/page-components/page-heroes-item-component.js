import {ViewStream, ChannelPayloadFilter} from 'spyne';

export class PageHeroesItemComponent extends ViewStream {

    constructor(props={}) {
        props.tagName = "li";
        props.className = `hero-item hero-item-{{props.data.id}}`;
        props.template = require('./templates/page-heroes-item-component.tmpl.html');
        super(props);
    }

    addActionListeners() {
      const idPayloadFilter = new ChannelPayloadFilter({
        payload: v=>parseInt(v.id) === parseInt(this.props.data.id)
      })
        return [
          ["CHANNEL_TOH_DELETE_EVENT", "disposeViewStream", idPayloadFilter]
        ];
    }

    broadcastEvents() {
        return [
          ['a', 'click'],
          ['button', 'click']
        ];
    }

    onRendered() {
        this.addChannel("CHANNEL_TOH");
    }

}

