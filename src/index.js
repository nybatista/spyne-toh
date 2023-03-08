import'./scss/main.scss';
import {SpyneApp, Channel} from 'spyne';
import {AppView} from './app/app-view';
import {ChannelToh} from 'channels/channel-toh.js';


const config = {
  'debug': true,
  'channels': {
    WINDOW: {
      listenForScroll: true,
      listenForOrientation: true,
      debounceMSTimeForScroll: 50,
    },

    'ROUTE': {
      "type": "slash",
      "isHash": false,
      "isHidden": false,
      "add404s": true,
      "routes": {
        "routePath": {
          "routeName": "pageId",
          "home": "^$",
          "dashboard" : "dashboard",
          "heroes" : "heroes",
           "detail": {
            "routePath": {
              "routeName": "id"
            }
          }
        }
      }
    }
  },
};






SpyneApp.init(config);
SpyneApp.registerChannel(new ChannelToh());

if (process.env.NODE_ENV === 'development') {
  const {SpynePluginConsole} = require('spyne-plugin-console');
  new SpynePluginConsole({position: ['bottom', 'right'], minimize: true});
}

new AppView().prependToDom(document.body);
