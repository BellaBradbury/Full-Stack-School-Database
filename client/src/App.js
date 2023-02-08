import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

// import Header from './components/Header';
// import UserSignOut from './components/UserSignOut';

const App = () => {
  const [courses, setCourses] = useState();

  axios.get('http://localhost:5000/api/courses')
       .then( response => {
          setCourses(response.data);
          console.log(response.data);
       })
       .catch(error => {
        console.log('Error fetching and parsing request', error);
       });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
