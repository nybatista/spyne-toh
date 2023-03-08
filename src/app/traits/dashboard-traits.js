import {SpyneTrait} from 'spyne';

export class DashboardTraits extends SpyneTrait {

  constructor(context){
    let traitPrefix = "dashBoard$";
    
    super(context, traitPrefix);
  }
  
  static dashBoard$HelloWorld(){
    return "Hello World";
  }
  
}

