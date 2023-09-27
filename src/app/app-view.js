import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';
import {AppStageView} from 'components/app-stage-view';
import {MessagesView} from 'components/messages-view';

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
    this.appendView(new AppStageView());
    this.appendView(new MessagesView());
  }

}
