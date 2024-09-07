import'./scss/main.scss';
import {SpyneApp} from 'spyne';
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
      "type": "query",
      "isHash": false,
      "isHidden": false,
      "add404s": true,
      "routes": {
        "routePath": {
          "routeName": "pageId",
          "dashboard" : "dashboard|^$|index.html",
          "heroes" : "heroes",
           "detail": {
            "routePath": {
              "routeName": "id",
              "\d+" : "\\d+"
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
  const addConsole = ()=>new SpynePluginConsole({position: ['bottom', 'right'], minimize: true});
  window.setTimeout(addConsole, 1000);
}

new AppView().prependToDom(document.body);
