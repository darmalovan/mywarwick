import Immutable from 'immutable';
import localforage from 'localforage';
import log from 'loglevel';
import _ from 'lodash';

import { createSelector } from 'reselect';
import { registerReducer } from './reducers';
import { makeStream, takeFromStream } from './stream';

export const TILES_FETCH = 'tiles.fetch';
export const TILES_FETCH_SUCCESS = 'tiles.fetch.success';
export const TILES_FETCH_FAILURE = 'tiles.fetch.failure';

export const TILE_CONTENT_FETCH = 'tiles.content.fetch';
export const TILE_CONTENT_FETCH_SUCCESS = 'tiles.content.fetch.success';
export const TILE_CONTENT_FETCH_FAILURE = 'tiles.content.fetch.failure';

// Used for bringing back tile content from local storage
export const TILE_CONTENT_LOAD_ALL = 'tiles.content.load';

export const TILE_HIDE = 'tiles.hide';
export const TILE_RESIZE = 'tiles.resize';

export function fetchedTiles(tiles) {
  return {
    type: TILES_FETCH_SUCCESS,
    tiles
  };
}

export function loadedAllTileContent(content) {
  return {
    type: TILE_CONTENT_LOAD_ALL,
    content
  };
}

export function fetchedTileContent(tile, content) {
  return {
    type: TILE_CONTENT_FETCH_SUCCESS,
    tile,
    content,
    fetchedAt: new Date().getTime()
  };
}

export function failedTileContentFetch(tile, errors) {
  return {
    type: TILE_CONTENT_FETCH_FAILURE,
    tile,
    errors
  };
}

export function hideTile(tile) {
  return {
    type: TILE_HIDE,
    tile
  };
}

export function resizeTile(tile, size) {
  return {
    type: TILE_RESIZE,
    tile,
    size
  }
}

let initialState = Immutable.fromJS({
  fetching: false,
  fetched: false,
  failed: false,
  items: []
});

registerReducer('tiles', (state = initialState, action) => {
  switch (action.type) {
    case TILES_FETCH:
      return state.merge({
        fetching: true,
        fetched: false,
        failed: false
      });
    case TILES_FETCH_FAILURE:
      return state.merge({
        fetching: false,
        fetched: false,
        failed: true
      });
    case TILES_FETCH_SUCCESS:
      return state.merge({
        fetching: false,
        fetched: true,
        failed: false,
        items: Immutable.fromJS(action.tiles)
      });
    case TILE_HIDE:
      return state.update('items', items => (
        items.filterNot(tile => tile.get('id') === action.tile.id)
      ));
    case TILE_RESIZE:
      return state.update('items', items => {
        let index = items.findIndex(tile => tile.get('id') === action.tile.id);

        return items.update(index, tile => tile.set('size', action.size));
      });
    default:
      return state;
  }
});

registerReducer('tileContent', (state = Immutable.Map(), action) => {
  switch (action.type) {
    case TILE_CONTENT_FETCH: {
      let update = tile => tile.delete('errors').set('fetching', true);

      if (action.tile) {
        return state.update(action.tile, update(Immutable.Map()), update);
      } else {
        return state.map(update);
      }
    }
    case TILE_CONTENT_FETCH_SUCCESS: {
      let update = tile => tile.merge({
        fetching: false,
        fetchedAt: action.fetchedAt,
        content: action.content
      }).delete('errors');

      return state.update(action.tile, update(Immutable.Map()), update);
    }
    case TILE_CONTENT_FETCH_FAILURE: {
      let update = tile => tile.merge({
        fetching: false,
        errors: action.errors
      });

      if (action.tile) {
        return state.update(action.tile, Immutable.Map({fetching: false, errors: action.errors}), update);
      } else {
        return state.map(update);
      }
    }
    case TILE_CONTENT_LOAD_ALL:
      let merger = (prev, next) => {
        if (next.has('content') && !prev.has('content')) {
          return prev.merge({
            content: next.get('content'),
            fetchedAt: next.get('fetchedAt')
          });
        } else {
          return prev;
        }
      };

      return state.mergeWith(merger, action.content);
    default:
      return state;
  }
});
