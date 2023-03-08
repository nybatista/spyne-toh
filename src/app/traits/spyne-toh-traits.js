import {SpyneTrait} from 'spyne';
import {HEROES} from '../mock-data';
import {clone} from 'ramda';

export class SpyneTohTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "toh$";

    super(context, traitPrefix);
  }

  static toh$OnRouteChangeEvent(e){
    const {pageId, id} = e.payload;
    console.log("page id ",{pageId, id},e);

  }


  static toh$GetHeroesData(){
   return HEROES;
  }

}

