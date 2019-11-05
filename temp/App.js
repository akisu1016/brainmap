import React from 'react';
import './App.css';

import Panel from './conponent/Panel';
import Submit from './container/Submit';
import List from './conponent/List';

function App() {
  return (
    <div className="App">
      <h1>Hello React</h1>
      <Panel />
      <Submit />
      <List />
    </div>
  );
}

export default App;
