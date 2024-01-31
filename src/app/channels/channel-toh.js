import {Channel, ChannelPayloadFilter} from 'spyne';
import {TohChannelTraits} from 'traits/toh-channel-traits';

export class ChannelToh extends Channel{

  constructor(name, props={}) {
    name="CHANNEL_TOH";
    props.sendCachedPayload = true;
    props.traits = [TohChannelTraits];
    props.heroesData = TohChannelTraits.tohChannel$CreateHeroDataObj();
    super(name, props);
  }

  onRegistered(){
    const btnsFilter = new ChannelPayloadFilter({selector: [".btn-toh", ".input-toh"]})

    this.getChannel("CHANNEL_UI", btnsFilter)
      .subscribe(this.tohChannel$SendBtnClickEvent.bind(this));

    this.getChannel("CHANNEL_ROUTE")
      .subscribe(this.tohChannel$SendRouteChangeEvent.bind(this));
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



}

