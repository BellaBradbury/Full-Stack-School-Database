import React from 'react';
import { NavLink } from 'react-router-dom';

export default class Header extends React.PureComponent {
    render() {
        const {context} = this.props;
        const authUser = context.authenticatedUser;

        return(
            <header>
                <div className='wrap header--flex'>
                <h1 className='header--logo'><NavLink to="/">Courses</NavLink></h1>
                    <nav>
                        <ul className='header--signedout'>
                            {authUser ? (
                                <React.Fragment>
                                    <li><span>Welcome, {authUser.name}!</span></li>
                                    <li><NavLink to='/signout'>Sign Out</NavLink></li>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    <li><NavLink to="/signup">Sign Up</NavLink></li>
                                    <li><NavLink to="/signin">Sign In</NavLink></li>
                                </React.Fragment>
                            )}
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
};

