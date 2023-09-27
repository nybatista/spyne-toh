import {TohPageTraits} from 'traits/toh-page-traits';
import {TohDataTraits} from 'traits/toh-data-traits';
import {HEROES} from '../../app/mock-data';

const {expect, assert} = require('chai');

describe('should test tour-of-heroes traits', () => {

  it('should return TOH Traits as function type', () => {
    expect(TohPageTraits).to.be.a('function');
  });

  it('should return data for the heroes page',()=>{
    const spyneData =  TohDataTraits.heroes$CreateDataObj();
      const pageHeroesData = TohPageTraits.toh$PageGetPageData({pageId:'heroes'}, spyneData);
      expect(pageHeroesData).to.deep.eq(HEROES);
  })

  it('should return data for the dashboard page', ()=>{
    const spyneData =  TohDataTraits.heroes$CreateDataObj();
    const pageDashboardData = TohPageTraits.toh$PageGetPageData({pageId:'dashboard'}, spyneData);
    expect(pageDashboardData).to.deep.eq([{"id":12,"name":"Dr. Nice"},{"id":13,"name":"Bombasto"},{"id":14,"name":"Celeritas"},{"id":15,"name":"Magneta"}]);
  })

  it('should return data for the details page', ()=>{
    const spyneData =  TohDataTraits.heroes$CreateDataObj();
    const pageDetailsData = TohPageTraits.toh$PageGetPageData({pageId:'detail', id:12}, spyneData);
    expect(pageDetailsData).to.deep.eq({id: 12, name: 'Dr. Nice', 'nameUpperCase': 'DR. NICE'});
  })

});


/**
 * TODO: fetched heroes (page heroes or dashboard)
 * fetched hero id=#
 * updated hero id=#
 * deleted hero id=#
 * added hero w/ id=#
 *
 * found heroes matching "a"
 * no heroes matching "a3"
 *
 *
 * */

describe('it should create message for any event', ()=>{

  it('should return fetched msg ',()=>{
    const heroesPageMsg = TohPageTraits.toh$PageGenerateMessage();
    expect(heroesPageMsg).to.eq('HeroService: fetched heroes')
  });

  it('should return updated msg ',()=>{
    const updatedMsg = TohPageTraits.toh$PageGenerateMessage(
        {eventType: 'update', id: 12});
    expect(updatedMsg).to.eq('HeroService: updated hero id=12')
  });

  it('should return deleted msg ',()=>{
    const deletedMsg = TohPageTraits.toh$PageGenerateMessage(
        {eventType: 'delete', id: 12});
    expect(deletedMsg).to.eq('HeroService: deleted hero id=12')
  });

  it('should return added msg ',()=>{
    const addedMsg = TohPageTraits.toh$PageGenerateMessage(
        {eventType: 'add', id: 21});
    expect(addedMsg).to.eq('HeroService: added hero w/ id=21')
  });

  it('should return search found msg ',()=>{
    const searchFoundMsg = TohPageTraits.toh$PageGenerateMessage(
        {eventType: 'search'},
        {heroesArr: [{id: 13, name: 'Bombasto'}], searchStr: 'ast'});
    expect(searchFoundMsg).to.eq('HeroService: found heroes matching "ast"')
  });

  it('should return search not found msg ',()=>{
    const searchFoundMsg = TohPageTraits.toh$PageGenerateMessage(
        {eventType: 'search'}, {heroesArr: [], searchStr: 'aste'});
    //console.log("search not found msg ",searchFoundMsg);
    expect(searchFoundMsg).to.eq('HeroService: no heroes matching "aste"')
  });

})
