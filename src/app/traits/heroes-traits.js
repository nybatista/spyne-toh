import {SpyneTrait} from 'spyne';
import {reject, clone, propEq, difference, compose, inc, last, pluck} from 'ramda';
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

