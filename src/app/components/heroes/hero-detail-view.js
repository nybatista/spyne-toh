import {ViewStream, ChannelPayloadFilter} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';

export class HeroDetailView extends ViewStream {

    constructor(props={}) {
      props.id = "hero-detail";
      props.traits = [SpyneTohTraits];

      console.log("PROPS DATA IS ",props.data,' -- ',props.data.name);

      props.template = require('./templates/hero-detail.component.html')

        super(props);
    }

    addActionListeners() {
      // return nexted array(s)


      const actionListenersArr = [];
      actionListenersArr.push(this.toh$AddRouteActionListener());

      actionListenersArr.push(["CHANNEL_UI_CLICK_EVENT", "onGoBack", "#go-back"])
      return actionListenersArr;
    }

    onGoBack(e){
      window.history.go(-1);
      console.log('go back event ',e);
    }

    broadcastEvents() {
      // return nexted array(s)
      return [
          ['button', 'click']
      ];
    }

    onRendered() {
      this.toh$AddPageTraits();

      this.addChannel("CHANNEL_UI");

    }

}

