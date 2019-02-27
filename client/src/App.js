import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Landing from './components/Landing';
import TV from './components/TV';

class App extends Component {
  render() {
    return (
      <div className="App">
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/tv" component={TV} />
        </main>
      </div>
    );
  }
}

export default App;
