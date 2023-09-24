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

  it('should return data for the dedtails page', ()=>{
    const spyneData =  HeroesTraits.heroes$CreateDataObj();
    const pageDetailsData = SpyneTohTraits.toh$GetPageData({pageId:'detail', id:12}, spyneData);
    expect(pageDetailsData).to.deep.eq({id: 12, name: 'Dr. Nice'});
  })

});
