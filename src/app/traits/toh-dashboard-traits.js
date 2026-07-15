import { SpyneTrait } from 'spyne';
import {PageDashboardSearchItem} from 'components/page-components/page-dashboard-search-item';

export class TohDashboardTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'tohDashboard$';
    super(context, traitPrefix);
  }

  static tohDashboard$OnSearchEvent(e) {
    const {foundHeroesArr} = e.payload;
    const addItem = (data)=>this.appendView(new PageDashboardSearchItem({data}), '.search-result');
    foundHeroesArr.forEach(addItem);
  }

}
