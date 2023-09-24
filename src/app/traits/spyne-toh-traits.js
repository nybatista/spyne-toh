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


  static toh$GetPageData(pageInfo={pageId:"heroes"}, heroesData=this.props.heroesData){
    const {pageId, id} = pageInfo;
    //console.log("get page data ",{pageId, id, heroesData}, typeof heroesData.getTopHeroes)
    const _dataHashObj = {
      heroes: ()=>heroesData.heroes,
      dashboard: ()=>heroesData.getTopHeroes(),
      detail: ()=>{
        const o = heroesData.getHero(id);
        console.log('o is ',o);
        o['nameUpperCase'] = String(o.name).toUpperCase();
        return o;
      }
    }

    return _dataHashObj[pageId]();
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

    //console.log("page id ",{PageClass,pageId, id},e);
    this.appendView(new PageClass({
      data: payload
    }));

  }


  static toh$GetHeroesData(){
   return HEROES;
  }

}

