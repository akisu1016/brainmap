import React from 'react';
import '../App.css';
import Item from './Item';

class Panel extends React.Component {
  render() {
    return(
      <div className="Panel">
        <Item />
      </div>
    );
  }
}

export default Panel;