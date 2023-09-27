import {SpyneTrait} from 'spyne';
import {HEROES} from '../mock-data';
import {PageDashboardView} from 'components/page-components/page-dashboard-view';
import {PageHeroesView} from 'components/page-components/page-heroes-view';
import {PageHeroView} from 'components/page-components/page-hero-view';
import {Page_404View} from 'components/page-components/page-404-view';

export class TohPageTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "tohPage$";

    super(context, traitPrefix);
  }


  static tohPage$AddPageTraits(e){
    this.addChannel("CHANNEL_TOH", true);

  }

  static tohPage$AddRouteActionListener(){
    return ["CHANNEL_TOH_ROUTE_EVENT", "disposeViewStream"]

  }

  static tohPage$OnRouteChangeEvent(e){
    const {payload} = e;
    const {pageId, id, heroesArr} = e.payload;

    const pageIdHash = {
      "dashboard" : PageDashboardView,
      "detail" : PageHeroView,
      "heroes" : PageHeroesView
    }

    const PageClass = pageIdHash[pageId] || Page_404View;

    //console.log("page id ",{PageClass,pageId, id},e);
    this.appendView(new PageClass({
      data: payload
    }));

  }


}

