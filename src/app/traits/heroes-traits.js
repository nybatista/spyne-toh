import {SpyneTrait} from 'spyne';
import {reject, propEq, difference} from 'ramda';
import {HEROES} from '../mock-data';

export class HeroesTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "heroes$";

    super(context, traitPrefix);
  }

  static heroes$HelloWorld(){
    return "Hello World";
  }

  static heroes$CreateDataObj(){

    let _heroesObj = HEROES;
    let _addedSearchHeros = [];

    class HeroesData {


      getHero(id) {
        return _heroesObj.filter(o => o.id === id)[0];
      }

      renameHero(id, val){
        _heroesObj.filter(o => o.id === id)[0].name = val;
      }

      removeHero(id){
         reject(propEq(id, 'id'))(_heroesObj);
      }

      searchHero(searchStr){
        const reducerFn = (acc, o)=>{
          if (new RegExp(searchStr).test(o.name)===true) {
            acc.push(o);
          }

          return acc;
        }
        return _heroesObj.reduce(reducerFn, []);


      }






      get heroes(){
        return _heroesObj;
      }





    }






  }

}

