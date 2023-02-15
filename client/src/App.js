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
import UpdateCourse from './components/UpdateCourse';
import Error from './components/Error';
import Forbidden from './components/Forbidden';

import withContext from './Context';
import PrivateRoute from './PrivateRoute';

const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseCreateWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const CourseUpdateWithContext = withContext(UpdateCourse);
const ForbiddenWithContext = withContext(Forbidden);

function App() {
    return(
        <Router>
            <div>
                <HeaderWithContext />
                <Routes>
                    <Route exact path='/' element={Courses} />
                    <Route path='/courses/:id' element={CourseDetailWithContext} />
                    <Route path='/signUp' element={UserSignUpWithContext} />
                    <Route path='/signIn' element={UserSignInWithContext} />
                    <Route path='/signOut' element={UserSignOutWithContext} />
                    <Route element={PrivateRoute}>
                        <Route path='/courses/create' element={CourseCreateWithContext} />
                        <Route path='/courses/:id/update' element={CourseUpdateWithContext} />
                    </Route>
                    <Route path='/notfound' element={NotFound} />
                    <Route path='*' element={NotFound} />
                    <Route path='/forbidden' element={ForbiddenWithContext} />
                    <Route path='/error' element={Error} />
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
