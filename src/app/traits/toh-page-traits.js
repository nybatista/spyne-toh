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


  static tohPage$GetPageData(
      pageInfo = {pageId: 'heroes'}, heroesData = this.props.heroesData){
    const {pageId, id} = pageInfo;
    //console.log("get page data ",{pageId, id, heroesData}, typeof heroesData.getTopHeroes)
    const _dataHashObj = {
      heroes: ()=>heroesData.heroes,
      dashboard: ()=>heroesData.getTopHeroes(),
      detail: ()=>{
        const o = heroesData.getHero(id);
        o['nameUpperCase'] = String(o.name).toUpperCase();
        return o;
      }
    }

    return _dataHashObj[pageId]();
  }

  static tohPage$GenerateMessage(msgVals = {eventType: 'fetch'}, data){
    const {eventType, id} = msgVals;
    const heroStr = id!==undefined ? "hero" : "heroes";
    const pastTense = s => s.replace(/^(\w+?)(e*?)$/, "$1ed")

    const searchPrefix = ()=>data.heroesArr.length>=1 ? "found" : "no"
    const idStr = id===undefined ? '' : eventType === 'add' ? ` w/ id=${id}` : ` id=${id}`;
    const msgType =  eventType === 'search' ? `${searchPrefix()} heroes matching "${data.searchStr}"` : `${pastTense(eventType)} ${heroStr}${idStr}`;

    return `HeroService: ${msgType}`;

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


  static tohPage$GetHeroesData(){
   return HEROES;
  }

}

