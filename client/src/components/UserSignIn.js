// FUNCTIONS & MODULES
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// COMPONENTS
import Form from './Form';

// PROVIDES FORM AND HANDLES USER INPUT WHEN SIGNING IN
export default class UserSignIn extends Component {
    // define user property state
    state = {
        emailAddress: '',
        password: '',
        errors: [],
    }

    // shows form for users to submit prior credentials, sign in button, cancel button, and sign up button
    render() {
        const {
            emailAddress,
            password,
            errors,
        } = this.state;

        return (
            <div className='form--centered'>
                <h2>Sign In</h2>
                <Form
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <label for='emailAddress'>Email Address</label>
                            <input
                                id="emailAddress"
                                name="emailAddress"
                                type="email"
                                value={emailAddress}
                                onChange={this.change} />
                            <label for='password'>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={this.change} />
                        </React.Fragment>
                    )} />
                <p>Don't have a user account? Click here to <Link to='/signup'>sign up</Link>!</p>
            </div>
        );
    }

    // sets state of input field & updates in real-time
    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    // creates new user or displays errors based on user input
    submit = () => {
        const {context} = this.props;
        const {from} = this.props.location.state || {from: {pathname: '/'}};
        const {emailAddress, password} = this.state;

        context.actions.signIn(emailAddress, password)
            .then((user) => {
                if(user === null) {
                    this.setState(() => {
                        return { errors: ['Sign-in was unsuccessful']};
                    });
                } else {
                    this.props.history.push(from);
                }
            })
            .catch((error) => {
                console.log(error);
                this.props.history.push('/errors');
            });
    }

    // redirects users to home page
    cancel = () => {
        this.props.history.push('/');
    }
}