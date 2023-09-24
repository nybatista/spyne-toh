import {Subject} from 'rxjs';
import {Channel} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';
import {HeroesTraits} from 'traits/heroes-traits';

export class ChannelToh extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TOH";
    props.sendCachedPayload = true;
    props.traits = [SpyneTohTraits, HeroesTraits];
    props.heroesData = HeroesTraits.heroes$CreateDataObj();



    super(name, props);
  }


  onRouteChangeEvent(e){
    const {routeData} = e.payload;
    const {pageId, id} = routeData;

    console.log("ROUTE DATA ",{routeData, pageId, id}, e);
    let heroesArr = this.toh$GetPageData({pageId, id}, this.props.heroesData);
    const msg = this.toh$GenerateMessage({eventType:'route', id});
    const payload = Object.assign({}, {pageId, id, heroesArr});

    this.sendChannelPayload("CHANNEL_TOH_ROUTE_EVENT", payload);



  }

  onRegistered(){


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

