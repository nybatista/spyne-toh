import {SpyneTrait} from 'spyne';
import {reject, clone, propEq, difference, compose, defaultTo, isEmpty, inc, last, pluck} from 'ramda';
import {HEROES} from '../mock-data';

export class TohChannelTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "tohChannel$";
    super(context, traitPrefix);
  }

  static tohChannel$SendBtnClickEvent(e){
    const {eventType, id} = e.payload;
    const getParentInputVal = ()=>e.srcElement.el.parentElement.querySelector('input').value;

    const eventTypeHash = {
      "add"    : ()=>getParentInputVal(),
      "update" : ()=>getParentInputVal(),
      "search" : ()=>e.srcElement.el.value,
      "delete" : ()=>e.payload.id
    }

    const eventVal = eventTypeHash[eventType]();

    // Do nothing if eventVal is empty
    if(isEmpty(eventVal)) return;

    const heroPayload = this.props.heroesData[eventType](eventVal, id);
    heroPayload['msg'] = this.tohChannel$GenerateMessage({eventType, id}, heroPayload);

    const heroAction = `CHANNEL_TOH_${eventType.toUpperCase()}_EVENT`;
    this.sendChannelPayload(heroAction, heroPayload);

  }

  static tohChannel$SendRouteChangeEvent(e){
    const {routeData} = e.payload;
    const {pageId, id} = routeData;

    let heroesArr = this.tohChannel$GetPageData({pageId, id}, this.props.heroesData);
    const msg = this.tohChannel$GenerateMessage({eventType: 'fetch', id});

    const payload = Object.assign({}, {pageId, id, msg, heroesArr});
    this.sendChannelPayload("CHANNEL_TOH_ROUTE_EVENT", payload);
  }


  static tohChannel$GetPageData(pageInfo = {pageId: 'heroes'}, heroesData = this.props.heroesData){
    const {pageId, id} = pageInfo;
    const _dataHashObj = {
      heroes: ()=>heroesData.heroes,
      dashboard: ()=>heroesData.getTopHeroes(),
      detail: ()=>{
        const o = heroesData.getHero(id);
        o['nameUpperCase'] = String(o.name).toUpperCase();
        return o;
      },
      404: ()=>({})
    }
    return _dataHashObj[pageId]();
  }

  static tohChannel$GenerateMessage(msgVals = {eventType: 'fetch'}, data){
    const {eventType, id} = msgVals;
    const heroStr = id!==undefined ? "hero" : "heroes";
    const pastTense = s => s.replace(/^(\w+?)(e*?)$/, "$1ed")

    const searchPrefix = ()=>data.foundHeroesArr.length>=1 ? "found" : "no"
    const idStr = id===undefined ? '' : eventType === 'add' ? ` w/ id=${id}` : ` id=${id}`;
    const msgType =  eventType === 'search' ? `${searchPrefix()} heroes matching "${data.searchStr}"` : `${pastTense(eventType)} ${heroStr}${idStr}`;

    return `HeroService: ${msgType}`;

  }



  static tohChannel$CreateHeroDataObj(){
    let _heroesArr = clone(HEROES);
    let _heroesId = compose(defaultTo(1), inc, last, pluck(['id']))(_heroesArr);

    let _prevSearchedHeroes = [];

    class HeroesData {

      constructor() {}

      getHero(id) {
        id = parseInt(id);
        return clone(_heroesArr.filter(o => o.id === id)[0]);
      }

      getTopHeroes(){
        return clone(_heroesArr.slice(0, 4));
      }

      add(name) {
        // Check if the new hero name already exists in the _heroesArr
        let existingHeroNames = _heroesArr.map(hero => hero.name);
        let nextNum = 1;
        let newName = name;

        // If name exists, append -nextNum until a unique name is found
        while (existingHeroNames.includes(newName)) {
          newName = `${name}-${nextNum}`;
          nextNum++;
        }

        const id = _heroesId++;
        const newHero = { id, name: newName };
        _heroesArr.push(newHero);
        return clone(newHero);
      }

      update(val, id){
        const obj = _heroesArr.filter(o => o.id === parseInt(id))[0]
        obj.name = val;
        return this.getHero(id);
      }

      delete(id){
        _heroesArr = reject(propEq(parseInt(id), 'id'))(_heroesArr);
        return {id};
      }

      search(searchStr){
        const reducerFn = (acc, o)=>{
          if (new RegExp(searchStr).test(o.name)===true) {
            acc.push(o);
          }
          return acc;
        }
        const searchItems = searchStr === "" ? [] : _heroesArr.reduce(reducerFn, []);
        const foundHeroesArr = clone(difference(searchItems, _prevSearchedHeroes));
        _prevSearchedHeroes = searchItems;
        return {foundHeroesArr, searchStr};

      }

      get heroes(){
        return clone(_heroesArr);
      }
    }
    return new HeroesData();
  }







}

