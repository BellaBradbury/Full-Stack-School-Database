import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Routes
} from 'react-router-dom';

import Header from './components/Header';
import Courses from './components/Courses';
import NotFound from './components/NotFound';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse'

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseCreateWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const CourseUpdateWithContext = withContext(UpdateCourse);

function App() {
    return(
        <Router>
            <div>
                <HeaderWithContext />
                <Routes>
                    <Route exact path='/' component={Courses} />
                    <Route path='/courses/:id' component={CourseDetailWithContext} />
                    <Route path='/signUp' component={UserSignUpWithContext} />
                    <Route path='/signIn' component={UserSignInWithContext} />
                    <Route path='/signOut' component={UserSignOutWithContext} />
                    <PrivateRoute path='/courses/create' component={CourseCreateWithContext} />
                    <PrivateRoute path='/courses/:id/update' component={CourseUpdateWithContext} />
                    <Route path='/notfound' component={NotFound} />
                    <Route path='*' component={NotFound} />
                    <Route path='/forbidden' />
                    <Route path='/error' />
                </Routes>
            </div>
        </Router>
    );
};

export default App;






// import logo from './logo.svg';
// import './App.css';
// import React, { useState } from 'react';
// import axios from 'axios';



// // import Header from './components/Header';
// // import UserSignOut from './components/UserSignOut';

// const App = () => {
//   const [courses, setCourses] = useState();

//   axios.get('http://localhost:5000/api/courses')
//        .then( response => {
//           setCourses(response.data);
//           console.log(response.data);
//        })
//        .catch(error => {
//         console.log('Error fetching and parsing request', error);
//        });

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
