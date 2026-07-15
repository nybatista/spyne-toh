import { SpyneTrait, DomElement } from 'spyne';

export class TohMessagesTraits extends SpyneTrait {
  constructor(context) {
    let traitPrefix = 'tohMessages$';
    super(context, traitPrefix);
  }

  static tohMessages$OnClearMsgs(e) {
    this.props.msgHolder$.el.textContent = "";
  }

  static tohMessages$OnChannelRoute(e) {
    const {msg} = e.payload;
    this.props.msgHolder$.el.appendChild(new DomElement({data: msg}).render());
  }
}
