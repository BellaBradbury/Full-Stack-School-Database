// FUNCTIONS & MODULES
import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';

// STYLESHEETS
import './styles/global.css';
import './styles/reset.css';

// COMPONENTS
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

// FUNCTIONS TO USE WITH COMPONENTS
import withContext from './Context';
import PrivateRoute from './PrivateRoute';

// COMPONENTS WITH CONTEXT
const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CourseCreateWithContext = withContext(CreateCourse);
const CourseDetailWithContext = withContext(CourseDetail);
const CourseUpdateWithContext = withContext(UpdateCourse);
const ForbiddenWithContext = withContext(Forbidden);

// APP STRUCTURE OF ROUTES & COMPONENTS
function App() {
    return(
        <Router>
            <HeaderWithContext />
            <main>
                <Switch>
                    <Route exact path='/' component={Courses} />
                    <Route path='/signUp' component={UserSignUpWithContext} />
                    <Route path='/signIn' component={UserSignInWithContext} />
                    <Route path='/signOut' component={UserSignOutWithContext} />
                    <PrivateRoute path='/courses/create' component={CourseCreateWithContext} />
                    <PrivateRoute path='/courses/:id/update' component={CourseUpdateWithContext} />
                    <Route path='/courses/:id' component={CourseDetailWithContext} />
                    <Route path='/notfound' component={NotFound} />
                    <Route path='/forbidden' component={ForbiddenWithContext} />
                    <Route path='/error' component={Error} />
                    <Route path='*' component={NotFound} />
                </Switch>
            </main>
        </Router>
    );
};

export default App;