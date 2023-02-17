import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignUp extends Component {
    state = {
        firstName: '',
        lastName: '',
        username: '',
        password: '',
        errors: [],
    }

    render() {
        const {
            firstName,
            lastName,
            username,
            password,
            errors,
        } = this.state;

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
                            <input 
                                id='firstName'
                                name='firstName'
                                type='text'
                                value={firstName}
                                onChange={this.change}
                                placeholder='First Name' />
                            <input 
                                id='lastName'
                                name='lastname'
                                type='text'
                                value={lastName}
                                onChange={this.change}
                                placeholder='Last Name' />
                            <input 
                                id='username'
                                name='username'
                                type='text'
                                value={username}
                                onChange={this.change}
                                placeholder='User Name' />
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

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState(() => {
            return {
                [name]: value
            };
        });
    }

    submit = () => {
        const {context} = this.props;
        const {
            firstName,
            lastName,
            username,
            password,
        } = this.state;

        const user = {
            firstName,
            lastName,
            username,
            password,
        };

        context.data.createUser(user)
            .then( errors => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    context.actions.signIn(username, password)
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

    cancel = () => {
        this.props.history.push('/');
    }
}
