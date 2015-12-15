import store from './store';
import SocketDatapipe from './SocketDatapipe';

import fetch from 'isomorphic-fetch';
import { polyfill } from 'es6-promise';
polyfill();

import { userReceive } from './user';
import { NEWS_FETCH, NEWS_FETCH_SUCCESS, NEWS_FETCH_FAILURE } from './news';
import { TILES_FETCH, TILES_RECEIVE, TILES_FETCH_FAILURE, receivedTileData } from './tiles';
import { receivedActivity, fetchedActivities, receivedNotification, fetchedNotifications } from './notifications';

//                       //
//     MESSAGE SEND      //
//                       //

export function fetchWhoAmI() {
  SocketDatapipe.send({
    tileId: "1",
    data: {
      type: 'who-am-i'
    }
  });
}

export function fetchNews() {
  return dispatch => {
    dispatch({type: NEWS_FETCH});
    return fetch('/news/feed')
      .then(response => response.json())
      .then(json => {
        if (json.items !== undefined)
          dispatch({type: NEWS_FETCH_SUCCESS, items: json.items});
        else
          throw new Error('Invalid response returned from news feed');
      })
      .catch(err => dispatch({type: NEWS_FETCH_FAILURE}));
  }
}

function fetchWithCredentials(url) {
  return fetch(url, {
    credentials: 'same-origin'
  });
}

export function fetchTileData() {
  return dispatch => {
    dispatch({type: TILES_FETCH});

    return fetchWithCredentials('/api/tiles')
      .then(response => response.json())
      .then(json => dispatch(receivedTileData(json.data.tiles)))
      .catch(err => dispatch({type: TILES_FETCH_FAILURE}));
  }
}

import _ from 'lodash';

export function fetchActivities() {
  fetchWithCredentials('/api/streams/user')
    .then(response => response.json())
    .then(json => {
      let notifications = _.filter(json.data.activities, (a) => a.notification);
      let activities = _.filter(json.data.activities, (a) => !a.notification);

      store.dispatch(fetchedNotifications(notifications));
      store.dispatch(fetchedActivities(activities));
    });
}

//                       //
//    MESSAGE RECEIVE    //
//                       //

SocketDatapipe.getUpdateStream().subscribe((data) => {
  switch (data.type) {
    case 'activity':
      store.dispatch(data.activity.notification ? receivedNotification(data.activity) : receivedActivity(data.activity));
      break;
    case 'who-am-i':
      store.dispatch(userReceive(data['user-info']));
      break;
    default:
    // nowt
  }
});
