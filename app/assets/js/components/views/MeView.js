import React from 'react';
import ReactDOM from 'react-dom';
import ReactComponent from 'react/lib/ReactComponent';
import ReactTransitionGroup from 'react/lib/ReactTransitionGroup';

import * as TILES from '../tiles';

import _ from 'lodash';

import jQuery from 'jquery';
import $ from 'jquery.transit';

import Immutable from 'immutable';
import { connect } from 'react-redux';

import { registerReducer } from '../../reducers';
import { fetchTilesConfig, fetchTilesContent } from '../../serverpipe';

const ZOOM_ANIMATION_DURATION = 500;

const TILE_ZOOM_IN = 'me.zoom-in';
const TILE_ZOOM_OUT = 'me.zoom-out';

function zoomInOn(tile) {
  return {
    type: TILE_ZOOM_IN,
    tile: tile.id
  };
}

function zoomOut() {
  return {
    type: TILE_ZOOM_OUT
  };
}

var tileZoomAnimating = false;

class MeView extends ReactComponent {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(fetchTilesConfig());
    this.props.dispatch(fetchTilesContent());
  }

  onTileClick(tile) {
    if (tile.href) {
      window.open(tile.href);
    } else if (!this.props.zoomedTile) {
      this.props.dispatch(zoomInOn(tile));
    }
  }

  onTileDismiss() {
    if (!tileZoomAnimating)
      this.props.dispatch(zoomOut());
  }

  renderTile(props, zoomed = false) {
    let tileComponent = TILES[props.tileType];
    if (tileComponent === undefined) {
      console.error("No component available for tile type " + props.tileType);
      return null;
    }

    let id = props.id;
    let content = this.props.tileContent[id];
    let errors = this.props.tileErrors[id];
    let ref = zoomed ? id + '-zoomed' : id;

    let config = Object.assign({}, props, {
      zoomed: zoomed,
      content: content,
      errors: errors,
      key: ref,
      ref: ref,
      originalRef: id
    });

    config.onDismiss = () => this.onTileDismiss();
    config.onExpand = () => this.onTileClick(config);
    config.componentWillEnter = callback => this.componentWillEnter(config, callback);
    config.componentWillLeave = callback => this.componentWillLeave(config, callback);

    return React.createElement(tileComponent, config);
  }

  animateTileZoomOut(tileComponent, zoomComponent, callback) {
    let $tile = $(ReactDOM.findDOMNode(tileComponent.refs.tile)),
      $zoom = $(ReactDOM.findDOMNode(zoomComponent.refs.tile));

    let scaleX = $tile.outerWidth() / ($zoom.outerWidth() - 5);
    let scaleY = $tile.outerHeight() / $zoom.outerHeight();

    let x = $zoom.offset().left - $tile.offset().left;
    let y = $zoom.offset().top - $tile.offset().top;

    $tile.css({
      x: x,
      y: y,
      transformOriginX: 0,
      transformOriginY: 0,
      zIndex: 1001,
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY,
      opacity: 0,
      visibility: ''
    }).transition({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1
    }, ZOOM_ANIMATION_DURATION, function () {
      $tile.css({
        transformOriginX: '',
        transformOriginY: '',
        zIndex: ''
      });
    });

    $zoom.css({
      transformOriginX: 0,
      transformOriginY: 0,
      zIndex: 1002
    }).transition({
      x: -x,
      y: -y,
      scaleX: scaleX,
      scaleY: scaleY
    }, ZOOM_ANIMATION_DURATION, function () {
      tileZoomAnimating = false;
      callback();
    });
  }

  animateTileZoom(tileComponent, zoomComponent, callback) {
    let $tile = $(ReactDOM.findDOMNode(tileComponent.refs.tile)),
      $zoom = $(ReactDOM.findDOMNode(zoomComponent.refs.tile));

    $zoom.parent().show();

    let scaleX = $tile.outerWidth() / ($zoom.outerWidth() - 5);
    let scaleY = $tile.outerHeight() / $zoom.outerHeight();

    let x = $zoom.offset().left - $tile.offset().left;
    let y = $zoom.offset().top - $tile.offset().top;

    $tile.stop().css({
      transformOriginX: 0,
      transformOriginY: 0,
      zIndex: 99
    }).transition({
      x: x,
      y: y,
      scaleX: 1 / scaleX,
      scaleY: 1 / scaleY
    }, ZOOM_ANIMATION_DURATION, function () {
      $tile.css({
        zIndex: '',
        transformOriginX: '',
        transformOriginY: '',
        x: '',
        y: '',
        transform: '',
        visibility: 'hidden'
      });
      tileZoomAnimating = false;
      callback();
    });

    $zoom.stop().show().css({
      transformOriginX: 0,
      transformOriginY: 0,
      x: -x,
      y: -y,
      scaleX: scaleX,
      scaleY: scaleY,
      opacity: 0
    }).transition({
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      opacity: 1
    }, ZOOM_ANIMATION_DURATION);
  }

  componentWillEnter(props, callback) {
    if (props.zoomed) {
      let tileComponent = this.refs.group.refs['.$' + props.originalRef];
      let zoomComponent = this.refs.group.refs['.$' + props.ref];

      tileZoomAnimating = true;

      $(ReactDOM.findDOMNode(zoomComponent)).hide();

      // have to do this otherwise the zoomComponent doesn't have its sizing information
      setTimeout(() => this.animateTileZoom(tileComponent, zoomComponent, callback), 0);
    } else {
      callback();
    }
  }

  componentWillLeave(props, callback) {
    if (props.zoomed) {
      let tileComponent = this.refs.group.refs['.$' + props.originalRef];
      let zoomComponent = this.refs.group.refs['.$' + props.ref];

      tileZoomAnimating = true;

      $(tileComponent.refs.tile).css({
        visibility: 'hidden'
      });

      // have to do this otherwise the tileComponent doesn't have its sizing information
      setTimeout(() => this.animateTileZoomOut(tileComponent, zoomComponent, callback), 0);
    } else {
      callback();
    }
  }

  renderTiles() {
    let zoomedTileKey = this.props.zoomedTile;

    let tiles = this.props.tiles.map((tile) => this.renderTile(tile));

    if (zoomedTileKey) {
      let zoomedTile = _.find(this.props.tiles, (tile) => tile.id == zoomedTileKey);
      tiles.push(this.renderTile(zoomedTile, true));
    }

    return (
      <div>
        { zoomedTileKey ?
          <div className="tile-zoom-backdrop" onClick={this.onTileDismiss.bind(this)}></div>
          : null}
        <ReactTransitionGroup ref="group">
          {tiles}
        </ReactTransitionGroup>
      </div>
    );
  }

  render() {
    return <div className="row">{this.renderTiles()}</div>;
  }

}

let initialState = Immutable.Map({
  zoomedTile: null
});

registerReducer('me', (state = initialState, action) => {
  switch (action.type) {
    case TILE_ZOOM_IN:
      return state.merge({
        zoomedTile: action.tile
      });
    case TILE_ZOOM_OUT:
      return state.merge({
        zoomedTile: null
      });
    default:
      return state;
  }
});

let select = (state) => ({
  zoomedTile: state.get('me').get('zoomedTile'),
  tiles: state.get('tiles').get('items').toJS(),
  tileContent: state.get('tileContent').get('content').toJS(),
  tileErrors: state.get('tileContent').get('errors').toJS()
});

export default connect(select)(MeView);
