import React, { PropTypes } from 'react';

import { localMoment } from '../../dateFormatter';
import moment from 'moment-timezone';
import GroupedList from '../ui/GroupedList';
import Tile from './Tile';

import _ from 'lodash';

const DEFAULT_MAX_ITEMS = 4;

const groupItemsForAgendaTile = {

  description: 'by-date--agenda',

  groupForItem(item, now = localMoment()) {
    const date = localMoment(item.props.start).startOf('day');

    if (date.isSame(now, 'day')) {
      return 0; // today
    } else if (date.isSame(now.clone().add(1, 'day'), 'day')) {
      return 1; // tomorrow
    }
    return date.unix();
  },

  titleForGroup(group) {
    if (group < 2) {
      return [
        'Today',
        'Tomorrow',
      ][group];
    }
    return moment.unix(group).tz('Europe/London').format('ddd DD/MM/YY');
  },
};

export default class AgendaTile extends Tile {

  getBody(content) {
    const maxItemsToDisplay = this.props.maxItemsToDisplay ?
      this.props.maxItemsToDisplay : DEFAULT_MAX_ITEMS;
    const itemsToDisplay = this.isZoomed() ?
      content.items : _.take(content.items, maxItemsToDisplay);

    const events = itemsToDisplay.map(event =>
      <AgendaTileItem key={event.id} onClickLink={ this.onClickLink.bind(this) } {...event}/>);

    return (
      <GroupedList groupBy={groupItemsForAgendaTile}>
        {events}
      </GroupedList>
    );
  }

  onClickLink(e) {
    e.stopPropagation();
    if (this.props.editingAny) {
      e.preventDefault();
    }
  }
}

class AgendaTileItem extends React.Component {

  render() {
    const { title, start, href, onClickLink } = this.props;
    return (
      <li className="agenda-item">
        { href ?
          <a href={ href } target="_blank" onClick={ onClickLink }>
            <span title={ title } className="agenda-item__title">{ title }</span>
          </a> :
          <span title={ title } className="agenda-item__title">{ title }</span>
        }
        <span className="agenda-item__date">{localMoment(start).format('HH:mm')}</span>
      </li>
    );
  }
}

AgendaTileItem.propTypes = {
  id: PropTypes.string,
  start: PropTypes.string,
  end: PropTypes.string,
  title: PropTypes.string,
  location: PropTypes.string,
  href: PropTypes.string,
  onClickLink: PropTypes.func,
};
