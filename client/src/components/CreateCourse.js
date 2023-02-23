// FUNCTIONS & MODULES
import React, {Component} from 'react';

// COMPONENTS
import Form from './Form';

// COLLECTS USER INPUT TO CREATE A NEW COURSE
export default class CreateCourse extends Component {
    // defines the course property state
    state = {
        title: '',
        description: '',
        estimatedTime: '',
        materialsNeeded: '',
        errors: [],
    }

    // creates new user or displays errors based on user input
    submit = () => {
        const {context} = this.props;
        const materialsNeeded = document.getElementById('materialsNeeded').value;
        const title = document.getElementById('CourseTitle').value;
        const description = document.getElementById('courseDescription').value;
        const estimatedTime = document.getElementById('estimatedTime').value;

        const {
            context: {
                authenticatedUser: {
                    id, password, emailAddress,
                },
            },
        } = this.props;

        const courseInfo = { title, description, estimatedTime, materialsNeeded, userId: id, emailAddress }
        context.actions.createCourse(courseInfo, emailAddress, password)
                       .then((errors) => {
                                if (errors.length) {
                                    this.setState({errors});
                                } else {
                                    this.props.history.push('/');
                                };
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

    // redirects users to home page
    cancel = () => {
        this.props.history.push('/');
    }

    // shows form that validates user input, display errors when needed, and create & cancel buttons
    render() {
        const {title, description, estimatedTime, materialsNeeded, errors} = this.state;

        return (
            <div className='wrap'>
                <h2>Create Course</h2>
                <Form submit={this.submit} cancel={this.cancel} errors={errors} submitButtonText='Create Course' 
                    elements={() => (
                        <div className='main--flex'>
                            <div>
                                <label htmlFor='courseTitle'>Course Title</label>
                                <input id='CourseTitle' name='CourseTitle' type='text' defaultValue={title} />
                                <p>By {this.props.context.authenticatedUser.firstName} {this.props.context.authenticatedUser.lastName}</p>

                                <label htmlFor='courseDescription'>Course Description</label>
                                <textarea id='courseDescription' name='courseDescription' defaultValue={description} />
                            </div>
                            <div>
                                <label htmlFor='estimatedTime'>Estimated Time</label>
                                <input id='estimatedTime' name='estimatedTime' type='text' defaultValue={estimatedTime} />

                                <label htmlFor='materialsNeeded'>Materials Needed</label>
                                <textarea id='materialsNeeded' name='materialsNeeded' defaultValue={materialsNeeded} />
                            </div>
                        </div>
                    )}
                />
            </div>
       );
    }
}