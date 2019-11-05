import React from 'react';
import { connect } from 'react-redux';

import Submit from '../conponent/Submit.js';
import { addList } from '../action/action.js';
import { store } from '../index.js';

function mapStateToProps(state) {
  return{
    idea: []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    handleClick: (text) => { 
      dispatch(addList(text))
      console.log(store.getState()) 
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit)