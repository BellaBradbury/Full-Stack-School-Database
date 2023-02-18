// FUNCTIONS & MODULES
import React from 'react';
import { NavLink } from 'react-router-dom';

// HEADER UPDATES BASED ON USER AUTHENTICATION
export default class Header extends React.PureComponent {
    // courses link always available, sign in or out links based on current authorization
    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;

        return(
            <header>
                <div className='wrap header--flex'>
                    <h1 className='header--logo'><NavLink to="/courses">Courses</NavLink></h1>
                    <nav>
                        {authUser ? (
                            <React.Fragment>
                                <ul className='header--signedin'>
                                    <li>Welcome, {authUser.firstName}!</li>
                                    <li><NavLink to='/signout'>Sign Out</NavLink></li>
                                </ul>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <ul className='header--signedout'>
                                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                                    <li><NavLink to="/signin">Sign In</NavLink></li>
                                </ul>
                            </React.Fragment>
                        )}
                    </nav>
                </div>
            </header>
        );
    }
};