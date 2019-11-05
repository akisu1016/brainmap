import React from 'react';
import ReactDom from 'react-dom';
import './css/index.css';
import store from './store';
import { Provider } from 'react-redux';
import App from './components/App.js';

class ViewContainer extends React.Component {
  render() {
      return(
            <Provider store={store}>
                <App />
            </Provider>
      );
  }
}

ReactDom.render(<ViewContainer />, document.getElementById('root'));