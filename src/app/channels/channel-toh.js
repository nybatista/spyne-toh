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
    const btnsFilter = new ChannelPayloadFilter({selector: ".btn-toh"})

    // Every keyup dispatched a search — including keys that cannot change
    // the term: Shift (fired on the capital letter that starts most
    // searches), arrows, Tab. Each re-search of the same term had an empty
    // delta, logging a spurious 'no heroes matching' message. Accept only
    // keyups that alter the term: printable characters (key.length === 1)
    // plus Backspace and Delete, so corrections still re-search.
    const searchKeyFilter = new ChannelPayloadFilter({
      selector: ".input-toh",
      event: (ev) => ev !== undefined &&
        (String(ev.key).length === 1 || ["Backspace", "Delete"].includes(ev.key))
    });

    this.getChannel("CHANNEL_UI", btnsFilter)
      .subscribe(this.tohChannel$SendBtnClickEvent.bind(this));

    this.getChannel("CHANNEL_UI", searchKeyFilter)
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

