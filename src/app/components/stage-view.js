import {ViewStream} from 'spyne';
import {TohPageTraits} from 'traits/toh-page-traits';

export class StageView extends ViewStream {

    constructor(props={}) {
        props.id = 'app-stage';
        props.traits = [TohPageTraits];
        props.channels = ["CHANNEL_TOH"]
        super(props);
    }

    addActionListeners() {
        return [
          ['CHANNEL_TOH_ROUTE_EVENT', "tohPage$OnRouteChangeEvent"]
        ];
    }

    broadcastEvents() {
        return [];
    }

    onRendered() {


    }

}

