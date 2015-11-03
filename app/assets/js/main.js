import log from 'loglevel';
// only 'warn' otherwise
log.enableAll(false);

import $ from 'jquery';

import localforage from 'localforage';

import React from 'react';
import ReactDOM from 'react-dom';

import attachFastClick from 'fastclick';

import Application from './components/Application';
import UtilityBar from './components/ui/UtilityBar';

import store from './store';
window.Store = store;
import { navigate } from './actions';

import { Provider } from 'react-redux';

import './update';

import './notifications';
import './notifications-glue';

(()=> {

    localforage.config({
        name: 'Start'
    });

    // String replaced by Gulp build.
    const BUILD_TIME = "$$BUILDTIME$$";

    log.info("Scripts built at:", BUILD_TIME);

})();

var currentPath = '/';

$(function () {

    attachFastClick(document.body);

    currentPath = window.location.pathname.match(/(\/[^/]*)/)[0];
    store.dispatch(navigate(currentPath));

    ReactDOM.render(<UtilityBar name="nobody" />, document.getElementById('utility-bar-container'));
    ReactDOM.render(
        <Provider store={store}>
            <Application />
        </Provider>,
        document.getElementById('app-container'));

    window.addEventListener('popstate', function () {
        currentPath = window.location.pathname;
        store.dispatch(navigate(window.location.pathname));
    });

});

store.subscribe(() => {
    log.debug('Store updated', store.getState().toJS());
});

store.subscribe(() => {
    var path = store.getState().get('path');

    if (path != currentPath) {
        currentPath = path;

        if (window.history.pushState) {
            window.history.pushState(null, null, currentPath);
        }

    }
});

// temporary - print out authentication info from the websocket.
import SocketDatapipe from './SocketDatapipe';
SocketDatapipe.getUpdateStream().subscribe((data) => {
    if (data.type === 'who-am-i') {
        log.info("Who am I?", data['user-info']);
    }
})
