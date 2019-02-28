import React, { Component } from 'react';
/* Need to setup router to assign a path for each component*/
/*import Route and Link from react-router-dom package */
import { Route, Link } from 'react-router-dom';
import './App.css';
import Library from './components/Library/Library';
import TV from './components/TV/TV';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <main>
          <Route exact path='/' component={Library} />
          <Route path='/tv/:id' component={TV} />
        </main>
      </div>
    );
  }
}

export default App;
