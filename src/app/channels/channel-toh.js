import {Subject} from 'rxjs';
import {Channel, ChannelPayloadFilter} from 'spyne';
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
    const msg = this.toh$GenerateMessage({eventType:'fetch', id});
    const payload = Object.assign({}, {pageId, id, msg, heroesArr});

    this.sendChannelPayload("CHANNEL_TOH_ROUTE_EVENT", payload);



  }

  onRegistered(){


    this.getChannel("CHANNEL_ROUTE")
        .subscribe(this.onRouteChangeEvent.bind(this));


    const onTOHBtn = (e)=>{

      /**
       *
       * TODO: Move to trait
       * match event type to method type -- update tests with new method names
       * create method to generate correct action label
       *
       * */


      const {eventType, id} = e.payload;
      const getParentInputVal = ()=>e.srcElement.el.parentElement.querySelector('input').value;

      const eventTypeHash = {
        "add"    : ()=> getParentInputVal(),
        "update" : ()=>getParentInputVal(),
        "search" : ()=>e.srcElement.el.value,
        "delete" : ()=>e.payload.id
      }

      const eventVal = eventTypeHash[eventType]();


      console.log({eventType,eventVal,id, e});


    }

    const pl = new ChannelPayloadFilter({selector: [".btn-toh", ".input-toh"]})

    this.getChannel("CHANNEL_UI", pl)
        .subscribe(onTOHBtn);


  }

  addRegisteredActions() {

    return [
      "CHANNEL_TOH_ROUTE_EVENT",
      "CHANNEL_TOH_UPDATE_EVENT",
      "CHANNEL_TOH_DELETE_EVENT",
      "CHANNEL_TOH_ADD_EVENT",
      "CHANNEL_TOH_SEARCH_EVENT"
    ];
  }

  onViewStreamInfo(obj) {
    let data = obj.props();
  }

}

