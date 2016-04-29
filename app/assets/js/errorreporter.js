/**
 * Catches Javascript errors and sends them to the
 * server for reporting purposes.
 */

import fetch from 'isomorphic-fetch';
import log from 'loglevel';
import _ from 'lodash';

let errors = [];
let postErrorsThrottled;

function postErrors() {
  const errorsToPost = errors;

  fetch('/api/errors/js', {
    credentials: 'same-origin',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(errorsToPost),
  }).then(() => {
    log.info('Errors posted to server');
    errors = errors.slice(errorsToPost.length);
  }).catch((e) => {
    log.warn('Failed to post errors to server', e);
    postErrorsThrottled();
  });
}

postErrorsThrottled = _.throttle(postErrors, 5000); // eslint-disable-line prefer-const

function onError(message, source, line, column, error) {
  errors = errors.concat({
    time: new Date().getTime(),
    message,
    source,
    line,
    column,
    stack: error.stack || error,
  });

  postErrorsThrottled();
}

export default function init() {
  window.onerror = onError;
}
