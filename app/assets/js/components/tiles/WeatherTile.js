import React from 'react';

import TileContent from './TileContent';
import Skycon from '../ui/Skycon';
import moment from 'moment';

function formatIconString(str) {
  return str.toUpperCase().replace(/-/g, '_');
}

function formatWeatherTime(d) {
  const date = moment.unix(d);
  const now = moment();
  return date.isSame(now, 'hour') ? 'Now' : date.format('ha');
}

export default class WeatherTile extends TileContent {

  static canZoom() {
    return true;
  }

  mapToItems(itemsToDisplay) {
    return itemsToDisplay.map(item => (
        <div key={item.id} className="tile__item">
          <span className="tile__callout">{`${Math.round(item.temp)}°`}</span>
          <Skycon className="skycon" icon={formatIconString(item.icon)}/>
              <span className="tile__text">
                {`${formatWeatherTime(item.time)}: ${item.text}`}
              </span>
        </div>
      )
    );
  }

  mapToTableRow(itemsToDisplay) {
    return itemsToDisplay.map(item => (
      <div className="col-xs-2 table__item" key={item.id}>
        <Skycon className="skycon--small" icon={formatIconString(item.icon)}/>
        <span className="tile__callout">{`${Math.round(item.temp)}°`}</span>
        <span className="tile__text">{formatWeatherTime(item.time)}</span>
      </div>
    ));
  }

  getLargeBody() {
    const { content } = this.props;

    return (
      <div>
        {this.mapToTableRow(content.items)}
      </div>
    );
  }

  getSmallBody() {
    const { content } = this.props;

    return (
      <div>
        {this.mapToItems([content.items[0]])}
      </div>
    );
  }
}
