import $ from 'jquery';
import Immutable from 'immutable';
import store from './store';
import * as stream from './stream';

let appState = Immutable.Map();

function update(state) {
  appState = appState.merge(state);
  window.APP = appState.toJS();
  window.location = 'start://';
}

function setAppCached() {
  update({
    isAppCached: true,
  });
}

if (window.navigator.userAgent.indexOf('Start/1.0') >= 0) {
  $('html').addClass('app standalone');

  store.subscribe(() => {
    const state = store.getState();

    update({
      unreadNotificationCount:
        stream.getNumItemsSince(
          state.get('notifications'),
          state.get('notifications-lastRead')
        ),
      // FIXME - remove this once app has been updated to have no unreadActivityCount
      unreadActivityCount: 0,
      unreadNewsCount: 0,
      currentPath: state.get('path'),
      isUserLoggedIn: state.getIn(['user', 'data', 'usercode']) !== undefined,
      tabBarHidden: state.getIn(['ui', 'className']) !== 'mobile',
    });

    if ('applicationCache' in window) {
      window.applicationCache.addEventListener('cached', setAppCached);
      window.applicationCache.addEventListener('noupdate', setAppCached);
      window.applicationCache.addEventListener('updateready', setAppCached);

      if (window.applicationCache.status === window.applicationCache.IDLE) {
        setAppCached();
      }
    }
  });
}
