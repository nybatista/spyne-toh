import {ViewStream} from 'spyne';
import {PageDashboardSearchItem} from 'components/page-components/page-dashboard-search-item';

export class PageDashboardSearchComponent extends ViewStream {

    constructor(props={}) {
        props.id = "search-component";
        props.template = require('./templates/page-dashboard-search.component.html');
        super(props);
    }

    addActionListeners() {
        return [
          ["CHANNEL_TOH_SEARCH_EVENT", "onSearchEvent"]
        ];
    }

    onSearchEvent(e){
      const {foundHeroesArr} = e.payload;
       const addItem = (data)=>this.appendView(new PageDashboardSearchItem({data}), '.search-result');
       foundHeroesArr.forEach(addItem);
    }


    broadcastEvents() {
        return [
            ['.input-toh', 'keyup']
        ];
    }

    onRendered() {
      this.addChannel("CHANNEL_TOH");

    }

}

