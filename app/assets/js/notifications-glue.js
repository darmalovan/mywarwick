import localforage from 'localforage';
import { createSelector } from 'reselect';

import SocketDatapipe from './SocketDatapipe';
import store from './store';

localforage.getItem('notifications', function (err, value) {
    if (err) {
        console.error('problem reading notifications from local storage: ' + err);
    } else {
        if (value != null) {
            store.dispatch(fetchedNotifications(value));
        }
    }
});

const notificationsSelector = (state) => state.get('notifications');

const persistNotificationsSelect = createSelector([notificationsSelector], (notifications) => {
    // Persist the current set of notifications to local storage on change
    console.log('notifications changed; persisting');
    localforage.setItem('notifications', notifications.toJS());
});

store.subscribe(() => persistNotificationsSelect(store.getState()));

//TODO I'm sure this should happen somewhere more sensible
SocketDatapipe.send({
    tileId: "1",
    data: {
        type: "fetch-notifications" // since last login
    }
});
