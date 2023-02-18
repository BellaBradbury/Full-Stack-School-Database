// FUNCTIONS & MODULES
import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

// VARIABLES
const Context = React.createContext();

// USE DATA TO ASSIST OTHER APP FUNCTIONS
export class Provider extends Component { 
    // create & manage cookie data for users
    constructor() {
        super();
        this.data = new Data();
        this.cookie = Cookies.get('authenticatedUser');

        this.state = {
            authenticatedUser: this.cookie ? JSON.parse(this.cookie) : null
        };
    }

    // define usable actions
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

    // action to find user using "getUser" method, sign in, and set cookies
    signIn = async (emailAddress, password) => {
        const user = await this.data.getUser(emailAddress, password);
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

    // action to sign out user and remove cookies
    signOut = () => {
        this.setState(() => {
            return {authenticatedUser: null};
        });
        Cookies.remove('authenticatedUser');
        console.log('User has been signed out!');
    }

    // action to sign up a new user using "createUser" method
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

    // action to create a course using "createCourse" method
    createCourse = async (course, emailAddress, password) => {
        const courseInfo = await this.data.createCourse(
            course, 
            emailAddress,
            password
        );
        return courseInfo;
    }

    // action to update a course using "updateCourse" method
    updateCourse = async (course, emailAddress, password) => {
        const courseInfo = await this.data.updateCourse(
            course, 
            emailAddress,
            password
        );
        return courseInfo;
    }

    // action to delete course using "deleteCourse" method
    deleteCourse = async (course, emailAddress, password) => {
        const courseInfo = await this.data.deleteCourse(
            course, 
            emailAddress,
            password
        );
        return courseInfo;
    }
}

export const Consumer = Context.Consumer;

// ALLOWS A COMPONENT TO USE CONTEXT
export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <Context.Consumer>
          {(context) => <Component {...props} context={context} />}
        </Context.Consumer>
      );
    }
  }