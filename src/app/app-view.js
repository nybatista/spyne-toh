import {ViewStream} from 'spyne';
import {StageView} from 'components/stage-view';
import {StageMessagesComponent} from 'components/stage-messages-component';

export class AppView extends ViewStream {

  constructor(props = {}) {
    props.tagName='main';
    props.id='app-root';
    props.class='main';
    props.template = require('./components/templates/app.component.html');
    super(props);
  }

  addActionListeners() {
    return [];
  }

  broadcastEvents() {
    return [
        ['a', 'click']
    ];
  }

  onRendered() {
    this.appendView(new StageView());
    this.appendView(new StageMessagesComponent());
  }

}
