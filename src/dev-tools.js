// dev-tools.js
import { SpyneApp } from 'spyne';
import { SpynePluginConsole } from 'spyne-plugin-console';


export const devToolsReady = new Promise((resolve) => {

  SpyneApp.registerPlugin(
      new SpynePluginConsole({
        position: ['bottom', 'left'],
        minimize: false,
      }),
  );

  /**
   * Resolve once CMS wiring is complete.
   * If the plugin exposes a lifecycle hook later,
   * this can be replaced without touching consumers.
   */
  requestAnimationFrame(() => {
    resolve();
  });
});
