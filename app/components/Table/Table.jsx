'use strict';

import './_Table.scss';

import React from 'react';

export default class Table extends React.Component {

  render () {
    return (
      <table>
        {this.props.data.map(this.renderRow)}
      </table>
    );
  }

  renderRow (row) {
    let rowValue;
    if (row.enableHTML) {
      rowValue = (<td dangerouslySetInnerHTML={{__html: row.value}}></td>);
    } else {
      rowValue = (<td>{row.value}</td>);
    }
    return (
      <tr key={row.displayKey}>
        <td>{row.displayKey}</td>
        {rowValue}
      </tr>
    );
  }
}

Table.propTypes = {
  data: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};
