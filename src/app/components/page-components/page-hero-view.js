import {ViewStream, ChannelPayloadFilter} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class PageHeroView extends ViewStream {

    constructor(props={}) {
      props.id = "hero-detail";
      props.traits = [TohPageTraits];

      console.log("PROPS DATA IS ",props.data,' -- ',props.data.name);

      props.template = require('./templates/page-hero-detail.component.html')

        super(props);
    }

    addActionListeners() {
      // return nexted array(s)


      const actionListenersArr = [];
      actionListenersArr.push(this.tohPage$AddRouteActionListener());

      actionListenersArr.push(["CHANNEL_UI_CLICK_EVENT", "onGoBack"]);
      actionListenersArr.push(["CHANNEL_UI_INPUT_EVENT", "tohPage$UpdateDetailsHeroLabel" ])
      actionListenersArr.push(["CHANNEL_TOH_UPDATE_EVENT", "tohPage$UpdateSave" ])
      return actionListenersArr;
    }

    onGoBack(e){
      window.history.go(-1);
      console.log('go back event ',e);
    }

    broadcastEvents() {
      // return nexted array(s)
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

