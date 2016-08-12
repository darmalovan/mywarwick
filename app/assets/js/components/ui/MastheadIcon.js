import React from 'react';
import ReactComponent from 'react/lib/ReactComponent';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import classNames from 'classnames';

import Popover from './Popover';

const formatBadgeCount = (n) => (n > 99 ? '99+' : n);

export default class MastheadIcon extends ReactComponent {

  constructor(props) {
    super(props);

    this.boundClickOffPopover = this.clickOffPopover.bind(this);
    this.onClick = this.onClick.bind(this);

    this.state = {
      popover: false,
    };
  }

  onClick(e) {
    e.preventDefault();

    if (this.state.popover) {
      this.dismissPopover();
    } else if (!this.props.isDisabled) {
      this.presentPopover();
    }
  }

  clickOffPopover(e) {
    const node = $(ReactDOM.findDOMNode(this));

    if (node.has(e.target).length === 0) {
      this.dismissPopover();
    }
  }

  presentPopover() {
    this.setState({
      popover: true,
    });

    $(document).on('click', this.boundClickOffPopover);
  }

  dismissPopover() {
    this.setState({
      popover: false,
    });

    $(document).off('click', this.boundClickOffPopover);
  }

  onMore(e) {
    this.dismissPopover();
    this.props.onMore(e);
  }

  render() {
    return (
      <span className={ classNames({ disabled: this.props.isDisabled }) }>
        <a
          href="#"
          onClick={ this.props.onClick || this.onClick }
          ref="icon"
          className={classNames({
            'masthead-popover-icon': true,
            'popover-active': this.state.popover,
          })}
        >
          <i className={classNames('fa', `fa-${this.props.icon}`)}>
            { (this.props.badge > 0) ?
              <span className="badge">{formatBadgeCount(this.props.badge)}</span> :
              null
            }
          </i>
        </a>
        { this.state.popover ?
          <Popover
            arrow attachTo={this.refs.icon} placement="bottom" height={300} width={300} top={-10}
            title={this.props.popoverTitle}
            onMore={this.props.onMore ? this.onMore.bind(this) : null}
          >
            {this.props.children}
          </Popover>
          : null }
      </span>
    );
  }

}
