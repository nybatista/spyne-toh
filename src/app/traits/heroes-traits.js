import {SpyneTrait} from 'spyne';

export class HeroesTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "heroes$";
    
    super(context, traitPrefix);
  }
  
  static heroes$HelloWorld(){
    return "Hello World";
  }
  
}

