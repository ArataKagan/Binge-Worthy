import React, { Component } from 'react';
/* Need to setup router to assign a path for each component*/
/*import Route and Link from react-router-dom package */
import { Route, Link } from 'react-router-dom';
import './App.css';
import Library from './components/Library/Library';
import TV from './components/TV/TV';
import NavBar from './components/NavBar/NavBar';
import SearchResult from './components/SearchResult/SearchResult';

class App extends Component {
  render() {
    return (
      <div className="App" >
        <nav>
          <NavBar />
        </ nav>
        <main>
          <Route exact path='/' component={Library} />
          <Route exact path='/tv/:id' component={TV} />
          <Route exact path='/tv/results/:keyword' component={SearchResult} />
        </main>
      </div>
    );
  }
}

export default App;
