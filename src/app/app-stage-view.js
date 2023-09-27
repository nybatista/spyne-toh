import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class AppStageView extends ViewStream {

    constructor(props={}) {
        props.id = 'app-stage';
        props.traits = [TohPageTraits];
        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [
          ['CHANNEL_TOH_ROUTE_EVENT', "toh$PageOnRouteChangeEvent"]
        ];
    }

    broadcastEvents() {
        // return nexted array(s)
        return [

        ];

    }

    onRendered() {
        this.addChannel("CHANNEL_TOH");

    }

}

