import {ViewStream} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';
import {AppStageView} from './app-stage-view';

export class AppView extends ViewStream {

  constructor(props = {}) {
    props.tagName='main';
    props.id='app-root';
    props.class='main';
    props.template = require('./components/templates/app.component.html');
    super(props);
  }

  addActionListeners() {
    // return nexted array(s)
    return [];
  }


  broadcastEvents() {
    // return nexted array(s)
    return [
        ['a', 'click']
    ];
  }




  onRendered() {
    this.appendView(new AppStageView());
  }

}
