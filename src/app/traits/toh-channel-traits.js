import {SpyneTrait} from 'spyne';
import {HEROES} from '../mock-data';

export class TohChannelTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "tohChannel$";
    super(context, traitPrefix);
  }

  static tohChannel$SendBtnClickEvent(e){
    const { action } =e;
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
    if(String(eventVal) === "") return;

    const heroPayload = this.props.heroesData[eventType](eventVal, id);
    heroPayload['msg'] = this.tohChannel$GenerateMessage({eventType, id}, heroPayload);

    const heroAction = `CHANNEL_TOH_${eventType.toUpperCase()}_EVENT`;

    console.log("tohChannel$SendBtnClickEvent1", {action, eventType, heroAction, heroPayload})
    this.sendChannelPayload(heroAction, heroPayload);

  }

  static tohChannel$SendRouteChangeEvent(e){
    const {action} = e;
    const {routeData} = e.payload;
    const {pageId, id} = routeData;

    let heroesArr = this.tohChannel$GetPageData({pageId, id}, this.props.heroesData);
    const msg = this.tohChannel$GenerateMessage({eventType: 'fetch', id});

    const payload = Object.assign({}, {pageId, id, msg, heroesArr});

    console.log("tohChannel$SendRouteChangeEvent", {action, routeData, msg, payload})

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

    // message reflects TOTAL matches, not the appended delta — a narrowed
    // term ("B" -> "Bo") can match only already-displayed heroes, leaving
    // the delta empty while the search itself still has matches
    const searchPrefix = ()=>data.matchCount>=1 ? "found" : "no"
    const idStr = id===undefined ? '' : eventType === 'add' ? ` w/ id=${id}` : ` id=${id}`;
    const msgType =  eventType === 'search' ? `${searchPrefix()} heroes matching "${data.searchStr}"` : `${pastTense(eventType)} ${heroStr}${idStr}`;
    //console.log("GEN MSG ",{data, msgVals})
    return `HeroService: ${msgType}`;

  }



  static tohChannel$CreateHeroDataObj(){
    let _heroesArr = structuredClone(HEROES);
    const _lastHero = _heroesArr[_heroesArr.length - 1];
    let _heroesId = _lastHero !== undefined ? _lastHero.id + 1 : 1;

    let _prevSearchedHeroes = [];

    class HeroesData {

      constructor() {}

      getHero(id) {
        id = parseInt(id);
        return structuredClone(_heroesArr.filter(o => o.id === id)[0]);
      }

      getTopHeroes(){
        return structuredClone(_heroesArr.slice(0, 4));
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
        return structuredClone(newHero);
      }

      update(val, id){
        const obj = _heroesArr.filter(o => o.id === parseInt(id))[0]
        obj.name = val;
        return this.getHero(id);
      }

      delete(id){
        _heroesArr = _heroesArr.filter(o => o.id !== parseInt(id));
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
        const isNewMatch = o => _prevSearchedHeroes.find(p => p.id === o.id) === undefined;
        // foundHeroesArr is the DELTA vs the previous search — only heroes not
        // already in the results list, so the view appends instead of
        // re-rendering; matchCount reports the TOTAL matches for messaging
        const foundHeroesArr = structuredClone(searchItems.filter(isNewMatch));
        _prevSearchedHeroes = searchItems;
        return {foundHeroesArr, searchStr, matchCount: searchItems.length};

      }

      get heroes(){
        return structuredClone(_heroesArr);
      }
    }
    return new HeroesData();
  }







}

