import log from 'loglevel';
import { browserHistory } from 'react-router';
import $ from 'jquery';

let mq;
try {
  mq = require('modernizr').mq;
} catch (e) {
  log.warn('modernizr not present, using fallback.');
  mq = () => global.mqResult;
}

function isNative() {
  return ('navigator' in window) && navigator.userAgent.indexOf('MyWarwick/') > -1;
}

function isDesktop() {
  // We make the same 'native is mobile' assumption in bridge.js
  return !isNative() && mq('only all and (min-width: 768px)');
}
const isWideLayout = () => mq('only all and (min-width: 992px)');

const showBetaWarning = () => $('#app-container').attr('data-show-beta-warning') === 'true';

const initialState = {
  className: undefined,
  isWideLayout: false,
  colourTheme: 'default',
  native: false,
  showBetaWarning: false,
};

export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'ui.class':
      return { ...state, className: action.className };
    case 'ui.native':
      if (action.native !== state.native) return { ...state, native: action.native };
      return state;
    case 'ui.layout':
      return { ...state, isWideLayout: action.isWideLayout };
    case 'ui.theme':
      return { ...state, colourTheme: action.theme };
    case 'ui.showBetaWarning':
      return { ...state, showBetaWarning: action.showBetaWarning };
    default:
      return state;
  }
}

export function updateColourTheme(theme) {
  return {
    type: 'ui.theme',
    theme,
  };
}

export function updateUIContext() {
  return (dispatch, getState) => {
    const state = getState();
    const currentClassName = state.ui.className;

    if (currentClassName === undefined || isDesktop() !== (currentClassName === 'desktop')) {
      dispatch({
        type: 'ui.class',
        className: isDesktop() ? 'desktop' : 'mobile',
      });
    }

    if (isWideLayout() !== state.ui.isWideLayout) {
      dispatch({
        type: 'ui.layout',
        isWideLayout: isWideLayout(),
      });
    }

    dispatch({
      type: 'ui.native',
      native: isNative(),
    });

    dispatch({
      type: 'ui.showBetaWarning',
      showBetaWarning: showBetaWarning(),
    });
  };
}

export function scrollTopOnTabChange(scrollTops) {
  function isTopLevelUrl(location) {
    return (location.pathname.match(/\//g) || []).length === 1;
  }

  browserHistory.listen(location => {
    if (isTopLevelUrl(location)) {
      const path = window.location.pathname;
      const scrolltop = scrollTops[path] || 0;
      log.debug(`path: ${path} => scrollTop: ${scrolltop}`);
      $(window).scrollTop(scrolltop);
    }
  });
}

