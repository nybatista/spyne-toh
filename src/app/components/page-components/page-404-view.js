import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class Page_404View extends ViewStream {

    constructor(props={}) {
        props.id = 'page-404';
        props.data = "404";
        props.traits = [TohPageTraits]
        props.style = "font-size: 100px;"
        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
       const actionListenersArr = [];
       actionListenersArr.push(this.tohPage$AddRouteActionListener());
        return actionListenersArr;
    }

    broadcastEvents() {
        // return nexted array(s)
        return [];
    }

    onRendered() {
      this.tohPage$AddPageTraits();

    }

}

