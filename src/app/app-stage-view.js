import {ViewStream} from 'spyne';
import {SpyneTohTraits} from 'traits/spyne-toh-traits';

export class AppStageView extends ViewStream {

    constructor(props={}) {
        props.id = 'app-stage';
        props.traits = [SpyneTohTraits];
        super(props);
    }

    addActionListeners() {
        // return nexted array(s)
        return [];
    }

    broadcastEvents() {
        // return nexted array(s)
        return [
            ['CHANNEL_TOH_ROUTE_EVENT', "toh$OnRouteChangeEvent"]

        ];

    }

    onRendered() {
        this.addChannel("CHANNEL_ROUTE");

    }

}

