import {SpyneTrait} from 'spyne';
import {HEROES} from '../mock-data';
import {PageDashboardView} from 'components/page-components/page-dashboard-view';
import {PageHeroesView} from 'components/page-components/page-heroes-view';
import {PageHeroesItemComponent} from 'components/page-components/page-heroes-item-component';
import {PageHeroView} from 'components/page-components/page-hero-view';
import {Page_404View} from 'components/page-components/page-404-view';

export class TohPageTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "tohPage$";

    super(context, traitPrefix);
  }

  static tohPage$UpdateDetailsHeroLabel(e, props=this.props){
    const inputStr = e.srcElement.el.value;
    this.props.el$('#hero h2').el.innerText = `${String(inputStr).toUpperCase()} Details`;
  }
  static tohPage$UpdateSave(e, props=this.props){
    window.history.go(-1)
  }
  static tohPage$DeleteHero(e, props=this.props){
    const {id} = e.payload;
    const el = this.props.el$(`.hero-item-${id}`).el.remove();
    console.log("EL IS ", el)
   ;
  }

  static tohPage$AddHeroItem(data, props=this.props){
    data = data.payload || data;
    this.appendView(new PageHeroesItemComponent({data}), "ul.heroes");
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

