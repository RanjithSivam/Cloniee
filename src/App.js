import React from 'react';
import Home from './component/Home';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Route path="/" component={Home}></Route>
    </Router>
  );
}

export default App;
