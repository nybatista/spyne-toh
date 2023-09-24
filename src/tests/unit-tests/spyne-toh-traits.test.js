import {SpyneTohTraits} from 'traits/spyne-toh-traits';
import {HeroesTraits} from 'traits/heroes-traits';
import {HEROES} from '../../app/mock-data';

const {expect, assert} = require('chai');

describe('should test tour-of-heroes traits', () => {

  it('should return TOH Traits as function type', () => {
    expect(SpyneTohTraits).to.be.a('function');
  });

  it('should return data for the heroes page',()=>{
    const spyneData =  HeroesTraits.heroes$CreateDataObj();
      const pageHeroesData = SpyneTohTraits.toh$GetPageData({pageId:'heroes'}, spyneData);
      expect(pageHeroesData).to.deep.eq(HEROES);
  })

  it('should return data for the dashboard page', ()=>{
    const spyneData =  HeroesTraits.heroes$CreateDataObj();
    const pageDashboardData = SpyneTohTraits.toh$GetPageData({pageId:'dashboard'}, spyneData);
    expect(pageDashboardData).to.deep.eq([{"id":12,"name":"Dr. Nice"},{"id":13,"name":"Bombasto"},{"id":14,"name":"Celeritas"},{"id":15,"name":"Magneta"}]);
  })

  it('should return data for the details page', ()=>{
    const spyneData =  HeroesTraits.heroes$CreateDataObj();
    const pageDetailsData = SpyneTohTraits.toh$GetPageData({pageId:'detail', id:12}, spyneData);
    expect(pageDetailsData).to.deep.eq({id: 12, name: 'Dr. Nice', 'nameUpperCase': 'DR. NICE'});
  })

});

describe('it should create message for any event', ()=>{

  it('should return fetched msg ',()=>{
    const heroesPageMsg = SpyneTohTraits.toh$GenerateMessage();
    expect(heroesPageMsg).to.eq('HeroService: fetched hero')
  });

  it('should return updated msg ',()=>{
    const updatedMsg = SpyneTohTraits.toh$GenerateMessage({eventType: 'update', id:12});
    expect(updatedMsg).to.eq('HeroService: updated hero id=12')
  });

  it('should return deleted msg ',()=>{
    const deletedMsg = SpyneTohTraits.toh$GenerateMessage({eventType: 'delete', id:12});
    expect(deletedMsg).to.eq('HeroService: deleted hero id=12')
  });

  it('should return added msg ',()=>{
    const addedMsg = SpyneTohTraits.toh$GenerateMessage({eventType: 'add', id:21});
    expect(addedMsg).to.eq('HeroService: added hero w/ id=21')
  });

  it('should return search found msg ',()=>{
    const searchFoundMsg = SpyneTohTraits.toh$GenerateMessage({eventType: 'search'}, {heroesArr: [{id: 13, name: 'Bombasto'}], searchStr: "ast"});
    expect(searchFoundMsg).to.eq('HeroService: found heroes matching "ast"')
  });

  it('should return search not found msg ',()=>{
    const searchFoundMsg = SpyneTohTraits.toh$GenerateMessage({eventType: 'search'}, {heroesArr: [], searchStr: "aste"});
    //console.log("search not found msg ",searchFoundMsg);
    expect(searchFoundMsg).to.eq('HeroService: no heroes matching "aste"')
  });

})
