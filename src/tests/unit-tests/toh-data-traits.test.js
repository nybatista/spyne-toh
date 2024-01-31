const {expect, assert} = require('chai');
import {TohChannelTraits} from 'traits/toh-channel-traits';
import {HEROES} from '../../app/mock-data';

describe('should test Hero Traits', () => {

  it('should return function from HeroTraits module', () => {
    expect(TohChannelTraits).to.be.a('function');

  });


describe('should create a Heroes Object with various controls ',()=>{

  it('should return a Heroes Data object',()=>{
    const heroesData = TohChannelTraits.tohData$CreateDataObj();
    expect(heroesData).to.be.a('object');

  })

  it('should add a new Hero',()=>{
    const heroesData = TohChannelTraits.tohData$CreateDataObj();
    heroesData.add('ButterMan');
    expect(heroesData.getHero(21)).to.deep.eq({id: 21, name: 'ButterMan'});

  })

  it('should return a specific hero by id ',()=>{
    const heroesData = TohChannelTraits.tohData$CreateDataObj();
    expect(heroesData.getHero(12)).to.deep.eq({id: 12, name: 'Dr. Nice'});
  })

  it('should rename a specific hero by id',()=>{
    const heroesData = TohChannelTraits.tohData$CreateDataObj();
    heroesData.update('New Name', 12);
    expect(heroesData.getHero(12)).to.deep.eq({id: 12, name: 'New Name'});
  })

  it('should remove a specific hero by id',()=>{
    const heroesData = TohChannelTraits.tohData$CreateDataObj();
    heroesData.delete(12);
    //console.log("HEROES DATA HEROES ",heroesData.heroes);
    expect(heroesData.getHero(12)).to.be.undefined;
  })


  it('should search heroes by string',()=>{
    const heroesData = TohChannelTraits.tohData$CreateDataObj();
    const search1 = heroesData.search('ast');
    const search2 = heroesData.search('as');
    const search3 = heroesData.search('ast');
    const search4 = heroesData.search('a');

/*    console.log('ast search 1 is ',search1);
    console.log('as search  2 is ',search2);
    console.log('ast search 3 is ',search3);
    console.log('ast search 4 is ',search4);*/

    expect(search1.foundHeroesArr).to.deep.eq([{id: 13, name: 'Bombasto'}]);
    expect(search2.foundHeroesArr).to.deep.eq([{id: 14, name: 'Celeritas'}]);
    expect(search3.foundHeroesArr).to.deep.eq([]);
    expect(search4.foundHeroesArr).to.deep.eq([{id: 14, name: 'Celeritas'}, {id: 15, name: 'Magneta'}, {id: 16, name: 'RubberMan'}, {id: 17, name: 'Dynama'}, {id: 19, name: 'Magma'}, {id: 20, name: 'Tornado'}]);


  })





})


  describe('should test tour-of-heroes traits', () => {

    it('should return TOH Traits as function type', () => {
      expect(TohChannelTraits).to.be.a('function');
    });

    it('should return data for the heroes page',()=>{
      const spyneData =  TohChannelTraits.tohData$CreateDataObj();
      const pageHeroesData = TohChannelTraits.tohChannel$GetPageData(
          {pageId: 'heroes'}, spyneData);
      expect(pageHeroesData).to.deep.eq(HEROES);
    })

    it('should return data for the dashboard page', ()=>{
      const spyneData =  TohChannelTraits.tohData$CreateDataObj();
      const pageDashboardData = TohChannelTraits.tohChannel$GetPageData(
          {pageId: 'dashboard'}, spyneData);
      expect(pageDashboardData).to.deep.eq([{"id":12,"name":"Dr. Nice"},{"id":13,"name":"Bombasto"},{"id":14,"name":"Celeritas"},{"id":15,"name":"Magneta"}]);
    })

    it('should return data for the details page', ()=>{
      const spyneData =  TohChannelTraits.tohData$CreateDataObj();
      const pageDetailsData = TohChannelTraits.tohChannel$GetPageData(
          {pageId: 'detail', id: 12}, spyneData);
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
      const heroesPageMsg = TohChannelTraits.tohData$GenerateMessage();
      expect(heroesPageMsg).to.eq('HeroService: fetched heroes')
    });

    it('should return updated msg ',()=>{
      const updatedMsg = TohChannelTraits.tohData$GenerateMessage(
          {eventType: 'update', id: 12});
      expect(updatedMsg).to.eq('HeroService: updated hero id=12')
    });

    it('should return deleted msg ',()=>{
      const deletedMsg = TohChannelTraits.tohData$GenerateMessage(
          {eventType: 'delete', id: 12});
      expect(deletedMsg).to.eq('HeroService: deleted hero id=12')
    });

    it('should return added msg ',()=>{
      const addedMsg = TohChannelTraits.tohData$GenerateMessage(
          {eventType: 'add', id: 21});
      expect(addedMsg).to.eq('HeroService: added hero w/ id=21')
    });

    it('should return search found msg ',()=>{
      const searchFoundMsg = TohChannelTraits.tohData$GenerateMessage(
          {eventType: 'search'},
          {foundHeroesArr: [{id: 13, name: 'Bombasto'}], searchStr: 'ast'});
      expect(searchFoundMsg).to.eq('HeroService: found heroes matching "ast"')
    });

    it('should return search not found msg ',()=>{
      const searchFoundMsg = TohChannelTraits.tohData$GenerateMessage(
          {eventType: 'search'}, {foundHeroesArr: [], searchStr: 'aste'});
      //console.log("search not found msg ",searchFoundMsg);
      expect(searchFoundMsg).to.eq('HeroService: no heroes matching "aste"')
    });

  })



});
