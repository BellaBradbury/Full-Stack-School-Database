// IMPORTED FUNCTIONS & MODULES
import React, {Component} from 'react';
import Form from './Form';

export default class CreateCourse extends Component {
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(() => {
            return {
                [name]: value
            }
        });
    }

    submit = () => {
        const {context} = this.props;
        const {title, description, estimatedTime, materialsNeeded} = this.state;
        const {
            context: {
                authenticatedUser: {
                    user: {id, password, emailAddress},
                },
            },
        } = this.props;

        const courseInfo = { title, description, estimatedTime, materialsNeeded, userId: id, emailAddress }
        context.actions.createCourse(courseInfo, emailAddress, password)
                       .then((errors) => {
                            this.setState((errors) => {
                                if (errors.length) {
                                    this.setState({errors});
                                } else {
                                    this.props.history.push('/');
                                }
                            });
                       })
                       .catch((error) => {
                            this.props.history.push({
                                pathname: '/error',
                                state: {
                                    error: error.message
                                },
                            });
                        });
    }

    cancel = () => {
        this.props.history.push('/');
    }

    render() {
        const {title, description, estimatedTime, materialsNeeded, errors} = this.state;
        const {
            context: {
                authenticatedUser: {user},
            },
        } = this.props;

       return (
            <div className='wrap'>
                <h2>Create Course</h2>
                <Form submit={this.submit} cancel={this.cancel} errors={errors} submitButtonText='Create Course' 
                    elements={() => {
                        <>
                            <div className='main--flex'>
                                <label htmlFor='courseTitle'>Course Title</label>
                                <input id='CourseTitle' name='CourseTitle' type='text' value={title} onChange={this.change} />
                                <p>By {user.firstName} {user.lastName}</p>

                                <label htmlFor='courseDescription'>Course Description</label>
                                <textarea id='courseDescription' name='courseDescription' value={description} onChange={this.change} />
                            </div>
                            <div>
                                <label htmlFor='estimatedTime'>Estimated Time</label>
                                <input id='estimatedTime' name='estimatedTime' type='text' value={estimatedTime} onChange={this.change} />

                                <label htmlFor='materialsNeeded'>Materials Needed</label>
                                <textarea id='materialsNeeded' name='materialsNeeded' value={materialsNeeded} onChange={this.change} />
                            </div>
                        </>
                    }}
                />
            </div>
       );
    }
}