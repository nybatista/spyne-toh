import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class StageView extends ViewStream {

    constructor(props={}) {
        props.id = 'app-stage';
        props.traits = [TohPageTraits];
        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [
          ['CHANNEL_TOH_ROUTE_EVENT', "tohPage$OnRouteChangeEvent"]
        ];
    }

    broadcastEvents() {
        return [];
    }

    onRendered() {
        this.addChannel("CHANNEL_TOH");

    }

}

