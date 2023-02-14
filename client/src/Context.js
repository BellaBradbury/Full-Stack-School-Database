// MODULES
import React, { Component, useState } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';
import config from './Config';

// VARIABLES
const UserContext = React.createContext();
const CourseContext = React.createContext();

export const Provider = (props) => {
    // state  
    const data = new Data();
    const [user, setUser] = useState([]);
        // courses
        // errors

    // variables
    
    const {authenticatedUser} = user;
    const cookie = Cookies.get('authenticatedUser');
    
    // constructor() {
    //     super();
    //     this.data = new Data();
    //     this.cookie = Cookies.get('authenticatedUser');

    //     this.state = {
    //         authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
    //     };
    // }

    // render() {
    //     const {authenticatedUser} = this.state;
    //     const value = {
    //         authenticatedUser,
    //         data: this.data,
    //         actions: {
    //             signIn: this.signIn,
    //             signOut: this.signOut
    //         },
    //     };

    //     return (
    //         <Context.Provider value={value}>
    //             {this.props.children}
    //         </Context.Provider>
    //     );
    // }

    const signIn = async (username, password) => {
        const user = await data.getUser(username, password);
        if (user !== null) {
            setUser(() => {
                return {
                    authenticatedUser: user,
                };
            });

            const cookieOptions = {
                expires: 1
            };

            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
        }
        return user;
    }

    signOut = () => {
        setUser({authenticatedUser: null});
        Cookies.remove('authenticatedUser');
    }

    return (
        <Context.Consumer>
            {context => <Component {...props} context={context} />}
        </Context.Consumer>
    );
}

export const Consumer = Context.Consumer;

