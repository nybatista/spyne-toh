import {Subject} from 'rxjs';
import {Channel} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';

export class ChannelToh extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TOH";
    props.sendCachedPayload = false;
    props.traits = [SpyneTohTraits];

    super(name, props);
  }


  onRouteChangeEvent(e){
    const {routeData} = e.payload;
    const {pageId, id} = routeData;
    let heroesArr = this.toh$GetHeroesData();
    const payload = Object.assign({}, {pageId, id, heroesArr});

    this.sendChannelPayload("CHANNEL_TOH_ROUTE_EVENT", payload);



  }

  onRegistered(){

    this.props.heroesData =

    this.getChannel("CHANNEL_ROUTE")
        .subscribe(this.onRouteChangeEvent.bind(this));


  }

  addRegisteredActions() {

    return [
        "CHANNEL_TOH_ROUTE_EVENT"
    ];
  }

  onViewStreamInfo(obj) {
    let data = obj.props();
  }

}

