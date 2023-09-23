const {expect, assert} = require('chai');
import {HeroesTraits} from 'traits/heroes-traits';

describe('should test Hero Traits', () => {

  it('should return function from HeroTraits module', () => {
    expect(HeroesTraits).to.be.a('function');

  });


describe('should create a Heroes Object with various controls ',()=>{

  it('should return a Heroes Data object',()=>{

    const heroesData = HeroesTraits.heroes$HelloWorld();


  })




})

});
