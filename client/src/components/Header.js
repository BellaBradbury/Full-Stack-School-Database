import React, {useContext} from 'react';
import { NavLink } from 'react-router-dom';

import { UserContext } from '../Context';

const Header = () => {
    const authUser = useContext(UserContext);

    return(
        <header>
            <div className='wrap header--flex'>
                <h1 className='header--logo'><NavLink to="/courses">Courses</NavLink></h1>
                <nav>
                    {authUser ? (
                        <React.Fragment>
                            <ul className='header--signedin'>
                                <li>Welcome, {authUser.name}!</li>
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
};

export default Header;