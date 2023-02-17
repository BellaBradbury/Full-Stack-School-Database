// IMPORTED FUNCTIONS & MODULES
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// VARIABLES
const Context = React.createContext();

export class Provider extends Component { 
    constructor() {
        super();
        this.data = new Data();
        this.cookie = Cookies.get('authenticatedUser');

        this.state = {
            authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
        };
    }

    render() {
        const {authenticatedUser} = this.state;
        const value = {
            authenticatedUser,
            data: this.data,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut,
                signUp: this.signUp,
                createCourse: this.createCourse,
                updateCourse: this.updateCourse,
                deleteCourse: this.deleteCourse
            },
        };

        return (
            <Context.Provider value={value}>
                {this.props.children}
            </Context.Provider>
        );
    }

    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
            user.password = password;

            const cookieOptions = {
                expires: 1
            };
            
            Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
        }
        return user;
    }

    signOut = () => {
        this.setState(() => {
            return {authenticatedUser: null};
        });
        Cookies.remove('authenticatedUser');
        console.log('User has been signed out!');
    }

    signUp = async (firstName, lastName, emailAddress, password) => {
        const userInfo = {
            firstName,
            lastName,
            emailAddress,
            password
        };

        const user = await this.data.createUser(userInfo);
        if (user !== null) {
            this.setState(() => {
                return {
                    authenticatedUser: user,
                };
            });
        }
    }

    createCourse = async (course, username, password) => {
        const courseInfo = await this.data.createCourse(
            course, 
            username,
            password
        );
        return courseInfo;
    }

    updateCourse = async (course, username, password) => {
        const courseInfo = await this.data.updateCourse(
            course, 
            username,
            password
        );
        return courseInfo;
    }

    deleteCourse = async (course, username, password) => {
        const courseInfo = await this.data.deleteCourse(
            course, 
            username,
            password
        );
        return courseInfo;
    }
}

export const Consumer = Context.Consumer;

export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {(context) => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }