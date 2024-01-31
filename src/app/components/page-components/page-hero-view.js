import {ViewStream, ChannelPayloadFilter} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class PageHeroView extends ViewStream {

    constructor(props={}) {
      props.id = "hero-detail";
      props.traits = [TohPageTraits];


      props.template = require('./templates/page-hero-detail.component.html')

        super(props);
    }

    addActionListeners() {
      return [
        ["CHANNEL_UI_CLICK_EVENT", "tohPage$UpdateSave", "#go-back"],
        ["CHANNEL_UI_INPUT_EVENT", "tohPage$UpdateDetailsHeroLabel"],
        ["CHANNEL_TOH_UPDATE_EVENT", "tohPage$UpdateSave" ],
        this.tohPage$AddRouteActionListener()
      ];
    }

    onGoBack(e){
      window.history.go(-1);
    }

    broadcastEvents() {
      return [
        ['button', 'click'],
        ['#hero-name', 'input']
      ];
    }

    onRendered() {
      this.tohPage$AddPageTraits();
      this.addChannel("CHANNEL_UI");
    }

}

