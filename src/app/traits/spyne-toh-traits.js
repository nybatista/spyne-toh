import {SpyneTrait} from 'spyne';
import {HEROES} from '../mock-data';
import {DashboardView} from 'components/dashboard/dashboard-view';
import {HeroesView} from 'components/heroes/heroes-view';
import {HeroDetailView} from 'components/heroes/hero-detail-view';
import {Page_404View} from 'components/page-404-view';

export class SpyneTohTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "toh$";

    super(context, traitPrefix);
  }


  static toh$AddPageTraits(e){
    this.addChannel("CHANNEL_TOH", true);

  }

  static toh$AddRouteActionListener(){
    return ["CHANNEL_TOH_ROUTE_EVENT", "disposeViewStream"]

  }

  static toh$OnRouteChangeEvent(e){
    const {payload} = e;
    const {pageId, id, heroesArr} = e.payload;

    const pageIdHash = {
      "dashboard" : DashboardView,
      "detail" : HeroDetailView,
      "heroes" : HeroesView
    }

    const PageClass = pageIdHash[pageId] || Page_404View;

    console.log("page id ",{pageId, id},e);
    this.appendView(new PageClass({
      data: payload
    }));

  }


  static toh$GetHeroesData(){
   return HEROES;
  }

}

