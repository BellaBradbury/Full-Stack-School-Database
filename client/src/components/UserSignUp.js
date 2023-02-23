// MODULES & FUNCTIONS
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

// COMPONENT TO SIGN UP A NEW USER
export default class UserSignUp extends Component {
    // define user poperty state
    state = {
        firstName: '',
        lastName: '',
        emailAddress: '',
        password: '',
        errors: [],
    }

    render() {
        // uses user proptery state
        const {
            firstName,
            lastName,
            emailAddress,
            password,
            errors,
        } = this.state;

        // shows a signup form, sign up, cancel, and sign in buttons
        return (
            <div className='form--centered'>
                <h2>Sign Up</h2>
                <Form 
                    cancel={this.cancel}
                    errors={errors}
                    submit={this.submit}
                    submitButtonText='Sign Up'
                    elements={() => (
                        <React.Fragment>
                            <label for='firstName'>First Name</label>
                            <input 
                                id='firstName'
                                name='firstName'
                                type='text'
                                value={firstName}
                                onChange={this.change} />
                            <label for='lastName'>Last Name</label>
                            <input 
                                id='lastName'
                                name='lastName'
                                type='text'
                                value={lastName}
                                onChange={this.change} />
                            <label for='emailAddress'>Email Address</label>
                            <input 
                                id='emailAddress'
                                name='emailAddress'
                                type='email'
                                value={emailAddress}
                                onChange={this.change} />
                            <label for='password'>Password</label>
                            <input 
                                id='password'
                                name='password'
                                type='password'
                                value={password}
                                onChange={this.change}
                                placeholder='Password' />
                        </React.Fragment>
                    )} />
                <p>Already have a user account? Click here to <Link to='/signin'>sign in</Link>!</p>
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
        const {
            firstName,
            lastName,
            emailAddress,
            password,
        } = this.state;

        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    context.actions.signIn(emailAddress, password)
                        .then(() => {
                            this.props.history.push('/');
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                this.props.history.push('/error');
            });
    }

    // redirects users to home page
    cancel = () => {
        this.props.history.push('/');
    }
}
