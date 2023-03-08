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

    const pageIdHash = {


    }

    const {pageId, id} = e.payload;
    console.log("page id ",{pageId, id},e);

  }


  static toh$GetHeroesData(){
   return HEROES;
  }

}

