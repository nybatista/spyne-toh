import {SpyneTrait} from 'spyne';
import {reject, clone, propEq, difference, compose, inc, last, pluck} from 'ramda';
import {HEROES} from '../mock-data';

export class TohDataTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "tohData$";

    super(context, traitPrefix);
  }



  static tohData$GetPageData(pageInfo = {pageId: 'heroes'}, heroesData = this.props.heroesData){
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

  static tohData$GenerateMessage(msgVals = {eventType: 'fetch'}, data){
    const {eventType, id} = msgVals;
    const heroStr = id!==undefined ? "hero" : "heroes";
    const pastTense = s => s.replace(/^(\w+?)(e*?)$/, "$1ed")

    const searchPrefix = ()=>data.heroesArr.length>=1 ? "found" : "no"
    const idStr = id===undefined ? '' : eventType === 'add' ? ` w/ id=${id}` : ` id=${id}`;
    const msgType =  eventType === 'search' ? `${searchPrefix()} heroes matching "${data.searchStr}"` : `${pastTense(eventType)} ${heroStr}${idStr}`;

    return `HeroService: ${msgType}`;

  }




  static tohData$CreateDataObj(){

    let _heroesArr = clone(HEROES);
    let _prevSearchedHeroes = [];

    class HeroesData {


      getHero(id) {
        id = parseInt(id);
        return clone(_heroesArr.filter(o => o.id === id)[0]);
      }

      getTopHeroes(){
        return _heroesArr.slice(0, 4);
      }

      addHero(name){
        const id = compose(inc, last, pluck(['id']))(_heroesArr);
        _heroesArr.push({id,name});
      }

      renameHero(id, val){
        _heroesArr.filter(o => o.id === id)[0].name = val;
      }

      removeHero(id){
         _heroesArr = reject(propEq(id, 'id'))(_heroesArr);
      }

      searchHero(searchStr){
        const reducerFn = (acc, o)=>{
          if (new RegExp(searchStr).test(o.name)===true) {
            acc.push(o);
          }

          return acc;
        }
        const searchItems = _heroesArr.reduce(reducerFn, []);

        const results = clone(difference(searchItems, _prevSearchedHeroes));
        _prevSearchedHeroes = results;

        return results;

      }






      get heroes(){
        return _heroesArr;
      }





    }



      return new HeroesData();


  }

}

