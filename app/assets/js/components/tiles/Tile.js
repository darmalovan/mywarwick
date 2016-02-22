/* eslint react/prop-types: 0, react/sort-comp: 0 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import { localMoment } from '../../dateFormatter.js';
import classNames from 'classnames';

import { EDITING_ANIMATION_DURATION } from '../views/MeView';

import $ from 'jquery';

const SIZE_CLASSES = {
  small: 'col-xs-6 col-sm-6 col-md-3',
  wide: 'col-xs-12 col-sm-12 col-md-6',
  large: 'col-xs-12 col-sm-12 col-md-6',
};

const LONG_PRESS_DURATION_MS = 500;

export default class Tile extends Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
    this.onClickExpand = this.onClickExpand.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
  }

  contentOrDefault(content, contentFunction) {
    const defaultText = (content.defaultText === undefined) ?
      'Nothing to show.' : content.defaultText;
    if (!content.items || content.items.length === 0) {
      return <span>{defaultText}</span>;
    }
    return contentFunction.call(this, content);
  }

  getBodyInternal(content) {
    return this.contentOrDefault(content, this.getBody);
  }

  /* eslint-disable no-unused-vars */
  getBody(content) {
    throw new TypeError('Must implement getBody');
  }
  /* eslint-enable no-unused-vars */

  canZoom() {
    return false;
  }

  shouldDisplayExpandIcon() {
    return this.props.editing ? false : this.canZoom();
  }

  isZoomed() {
    return this.props.zoomed;
  }

  getZoomedBodyInternal(content) {
    return this.contentOrDefault(content, this.getZoomedBody);
  }

  getZoomedBody(content) {
    return this.getBody(content);
  }

  componentWillEnter(callback) {
    if ('componentWillEnter' in this.props) {
      this.props.componentWillEnter(callback);
    }
  }

  componentWillLeave(callback) {
    if ('componentWillLeave' in this.props) {
      this.props.componentWillLeave(callback);
    }
  }

  getIcon() {
    const { fetching, errors, icon } = this.props;

    if (fetching) {
      return 'fa-refresh fa-spin';
    } else if (errors) {
      return 'fa-exclamation-triangle';
    } else if (icon) {
      return `fa-${icon}`;
    }
    return 'fa-question-circle';
  }

  getIconTitle() {
    const { errors, fetchedAt } = this.props;

    if (errors) {
      return `Last updated ${localMoment(fetchedAt).calendar()}. ${errors[0].message}`;
    }
  }

  onTouchStart(e) {
    if (!this.props.editing && !this.isZoomed()) {
      if (e.changedTouches) {
        const touch = e.changedTouches[0];
        this.startX = touch.clientX;
        this.startY = touch.clientY;
      }

      this.timeout = setTimeout(this.props.onBeginEditing, LONG_PRESS_DURATION_MS);
    }
  }

  onTouchMove(e) {
    if (!this.props.editing && this.startX !== null) {
      const touch = e.changedTouches[0];

      if (Math.abs(touch.clientX - this.startX) > 10
        || Math.abs(touch.clientY - this.startY) > 10) {
        this.release();
      }
    }
  }

  release() {
    this.timeout = clearTimeout(this.timeout);
    this.startX = null;
    this.startY = null;
  }

  onTouchEnd() {
    if (!this.props.editing && !this.isZoomed() && this.timeout) {
      this.release();
    }
  }

  onClickExpand(e) {
    this.release();

    this.props.onZoomIn(e);
  }

  onClick() {
    const { content, editingAny } = this.props;

    if (!editingAny && content && content.href) {
      if (window.navigator.userAgent.indexOf('Start/') >= 0) {
        window.location = content.href;
      } else {
        window.open(content.href);
      }
    }
  }

  componentDidUpdate(prevProps) {
    const nowEditing = this.props.editing;
    const wasEditing = prevProps.editing;

    if (nowEditing && !wasEditing) {
      this.animateToScale(1.15);
    } else if (wasEditing && !nowEditing) {
      this.animateToScale(1);
    }
  }

  animateToScale(scale) {
    const $tile = $(ReactDOM.findDOMNode(this.refs.tile));

    $tile.stop().transition({ scale }, EDITING_ANIMATION_DURATION, 'snap');
  }

  render() {
    const { type, title, size, colour, content, editing, zoomed } = this.props;

    const icon = (<i
      className={`tile__icon fa fa-fw ${this.getIcon()}`} ref="icon" title={ this.getIconTitle() }
      data-toggle="tooltip"
    > </i>);

    const sizeClass = SIZE_CLASSES[size];
    const outerClassName = classNames(sizeClass, 'tile__container', { 'tile--zoomed': zoomed });
    const zoomIcon = () => {
      if (this.isZoomed()) {
        return <i className="fa fa-times tile__dismiss" onClick={this.props.onZoomOut}> </i>;
      } else if (this.shouldDisplayExpandIcon()) {
        return <i className="fa fa-expand tile__expand" onClick={this.onClickExpand}> </i>;
      }
      return null;
    };

    return (
      <div className={outerClassName}>
        <article
          className={
            classNames(
              'tile', `tile--${type}`, `tile--${size}`, `colour-${colour}`,
              {
                'tile--editing': editing,
                'tile--clickable': content && content.href,
              }
            )
          }
          onTouchStart={ this.onTouchStart }
          onTouchMove={ this.onTouchMove }
          onTouchEnd={ this.onTouchEnd }
          onTouchCancel={ this.onTouchEnd }
          onMouseDown={ this.onTouchStart }
          onMouseUp={ this.onTouchEnd }
          onMouseOut={ this.onTouchEnd }
          onClick={ this.onClick }
          ref="tile"
        >
          <div
            className="tile__edit-control top-left"
            onClick={ this.props.onHide }
            title="Hide tile"
          >
            <i className="fa fa-fw fa-minus"> </i>
          </div>
          <div
            className="tile__edit-control bottom-right"
            onClick={ this.props.onResize }
            title={`Make tile ${size === 'small' ? 'bigger' : 'smaller'}`}
          >
            <i className="fa fa-fw fa-arrow-up"> </i>
          </div>
          <div className="tile__wrap">
            <header>
              <h1>
                {icon}
                <span className="tile__title">
                  {title}
                </span>
              </h1>
              { zoomIcon() }
            </header>
            <div className="tile__body">
              { this.getOuterBody() }
            </div>
          </div>
        </article>
      </div>
    );
  }

  getOuterBody() {
    const { content, zoomed } = this.props;

    if (content) {
      return zoomed ? this.getZoomedBodyInternal(content) : this.getBodyInternal(content);
    }
  }

}
