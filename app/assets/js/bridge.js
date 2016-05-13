/**
 * API for native (iOS) app.
 */

import $ from 'jquery';
import * as stream from './stream';
import { push } from 'react-router-redux';
import { displayUpdateProgress } from './state/update';

/**
 * Factory method for bridge so you can create an instance
 * with different dependencies.
 */
export default function init(opts) {
  const { store, tiles } = opts;

  let appState = {};

  window.Start = {

    APP: {},

    navigate(path) {
      // click event to dismiss active tooltips
      document.dispatchEvent(new Event('click'));
      store.dispatch(push(path));
    },


    appToForeground() {
      store.dispatch(tiles.fetchTileContent());
      store.dispatch(displayUpdateProgress);
    },

    registerForAPNs(deviceToken) {
      fetch('/api/push/apns/subscribe', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deviceToken }),
      });
    },

  };

  function update(state) {
    appState = {
      ...appState,
      ...state,
    };
    window.Start.APP = appState;
    window.location = 'start://';
  }

  function setAppCached() {
    update({
      isAppCached: true,
    });
  }

  if (window.navigator.userAgent.indexOf('Start/') >= 0) {
    $('html').addClass('app standalone');

    store.subscribe(() => {
      const state = store.getState();

      update({
        unreadNotificationCount:
          stream.getNumItemsSince(
            state.notifications,
            state.notificationsLastRead
          ),
        // FIXME - remove this once app has been updated to have no unreadActivityCount
        unreadActivityCount: 0,
        unreadNewsCount: 0,
        currentPath: window.location.pathname,
        isUserLoggedIn: state.user.data.usercode !== undefined,
        tabBarHidden: state.ui.className !== 'mobile',
      });
    });

    if ('applicationCache' in window) {
      window.applicationCache.addEventListener('cached', setAppCached);
      window.applicationCache.addEventListener('noupdate', setAppCached);
      window.applicationCache.addEventListener('updateready', setAppCached);

      if (window.applicationCache.status === window.applicationCache.IDLE) {
        setAppCached();
      }
    }
  }
}
