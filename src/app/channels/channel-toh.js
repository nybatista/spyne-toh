import {Subject} from 'rxjs';
import {Channel} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';
import {HeroesTraits} from 'traits/heroes-traits';

export class ChannelToh extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TOH";
    props.sendCachedPayload = true;
    props.traits = [SpyneTohTraits, HeroesTraits];
    props.tourOfHeroesData = HeroesTraits.heroes$CreateDataObj();


    /**
     * TODO: fetched heroes (page heroes or dashboard)
     * fetched hero id=#
     * updated hero id=#
     * deleted hero id=#
     * added hero w/ id=#
     *
     * found heroes matching "a"
     * no heroes matching "a3"
     *
     *
     * */

    super(name, props);
  }


  onRouteChangeEvent(e){
    const {routeData} = e.payload;
    const {pageId, id} = routeData;
    let heroesArr = this.props.tourOfHeroesData.heroes;
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

