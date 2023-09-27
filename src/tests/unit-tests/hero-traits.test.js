const {expect, assert} = require('chai');
import {TohDataTraits} from 'traits/toh-data-traits';

describe('should test Hero Traits', () => {

  it('should return function from HeroTraits module', () => {
    expect(TohDataTraits).to.be.a('function');

  });


describe('should create a Heroes Object with various controls ',()=>{

  it('should return a Heroes Data object',()=>{
    const heroesData = TohDataTraits.tohData$CreateDataObj();
    expect(heroesData).to.be.a('object');

  })

  it('should add a new Hero',()=>{
    const heroesData = TohDataTraits.tohData$CreateDataObj();
    heroesData.addHero('ButterMan');
    expect(heroesData.getHero(21)).to.deep.eq({id: 21, name: 'ButterMan'});

  })

  it('should return a specific hero by id ',()=>{
    const heroesData = TohDataTraits.tohData$CreateDataObj();
    expect(heroesData.getHero(12)).to.deep.eq({id: 12, name: 'Dr. Nice'});
  })

  it('should rename a specific hero by id',()=>{
    const heroesData = TohDataTraits.tohData$CreateDataObj();
    heroesData.renameHero(12, 'New Name');
    expect(heroesData.getHero(12)).to.deep.eq({id: 12, name: 'New Name'});
  })

  it('should remove a specific hero by id',()=>{
    const heroesData = TohDataTraits.tohData$CreateDataObj();
    heroesData.removeHero(12);
    expect(heroesData.getHero(12)).to.be.undefined;
  })


  it('should search heroes by string',()=>{
    const heroesData = TohDataTraits.tohData$CreateDataObj();
    const search1 = heroesData.searchHero('ast');
    const search2 = heroesData.searchHero('as');
    const search3 = heroesData.searchHero('ast');
    const search4 = heroesData.searchHero('a');

/*    console.log('ast search 1 is ',search1);
    console.log('as search  2 is ',search2);
    console.log('ast search 3 is ',search3);
    console.log('ast search 4 is ',search4);*/

    expect(search1).to.deep.eq([{id: 13, name: 'Bombasto'}]);
    expect(search2).to.deep.eq([{id: 14, name: 'Celeritas'}]);
    expect(search3).to.deep.eq([{id: 13, name: 'Bombasto'}]);
    expect(search4).to.deep.eq([{id: 14, name: 'Celeritas'}, {id: 15, name: 'Magneta'}, {id: 16, name: 'RubberMan'}, {id: 17, name: 'Dynama'}, {id: 19, name: 'Magma'}, {id: 20, name: 'Tornado'}]);


  })





})

});
