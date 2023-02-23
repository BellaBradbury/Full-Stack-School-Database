// FUNCTIONS & MODULES
import React, {Component} from 'react';
import axios from "axios";
import config from "../Config";

// COMPONENTS
import Form from './Form';

// ALLOWS USER TO UPDATE PERSONALLY OWNED COURSE
export default class UpdateCourse extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            course: {
                title: '',
                description: '',
                estimatedTime: '',
                materialsNeeded: '',
            },
            errors: [],
            authorized: false
        }
    }

    // checks to make sure that ids match course data is set
    componentDidMount() {
        const course = async () => {
            const { id } = this.props.match.params;
            await axios(config.apiBaseUrl + "/courses/" + id)
                .then((response) => {
                    if (response.data == null) {
                    this.props.history.push("/notfound");
                    } else if (
                    response.data.teacher.emailAddress !==
                    this.props.context.authenticatedUser.emailAddress
                    ) {
                    this.props.history.push("/forbidden");
                    } else {
                    this.setState({ course: response.data });
                    }
                })
                .catch((error) => {
                    this.props.history.push({
                    pathname: "/error",
                    state: { error: error.message },
                    });
                });
            }
              course();
              
    }

    // sets state of input field & updates in real-time
    change = (event) => {
        let name;
        const value = event.target.value;

        if (event.target.name === 'courseTitle') {
            name = 'title';
        } else if (event.target.name === 'courseDescription') {
            name = 'description';
        } else {
            name = event.target.name;
        }

        this.setState(() => {
            return {
                ...this.state,
                course: {
                    ...this.state.course,
                    [name]: value,
                }
            };
        });
    }

    // creates new user or displays errors based on user input
    submit = () => {
        const {
            context: {
                authenticatedUser
            },
        } = this.props;
        const {course} = this.state;

        this.props.context.actions.updateCourse(course, authenticatedUser.emailAddress, authenticatedUser.password)
                                    .then((errors) => {
                                        if (errors.length) {
                                            this.setState({errors});
                                        } else {
                                            this.props.history.push('/');
                                        }
                                    })
                                    
    }

    // redirects users to home page
    cancel = () => {
        this.props.history.push('/');
    }

    // shows form to update and delete course to authorized user, update button, and cancel button
    render () {
        const {
            context: {
                authenticatedUser
            },
        } = this.props;
        const {title, description, estimatedTime, materialsNeeded} = this.state.course;
        
        return(
            <div className='wrap'>
                <h2>Update Course</h2>
                <Form errors={this.state.errors} cancel={this.cancel} submit={this.submit} submitButtonText='Update Course' 
                    elements = {() => (
                        <div className='main--flex'>
                            <div>
                                <label htmlFor='courseTitle'>Course Title</label>
                                <input id='courseTitle' name='courseTitle' type='text' value={title} onChange={this.change} />
                                <p>By {authenticatedUser.firstName} {authenticatedUser.lastName}</p>

                                <label htmlFor='courseDescription'>Course Description</label>
                                <textarea id='courseDescription' name='courseDescription' value={description} onChange={this.change} />
                            </div>
                            <div>
                                <label htmlFor='estimatedTime'>Estimated Time</label>
                                <input id='estimatedTime' name='estimatedTime' type='text' value={estimatedTime} onChange={this.change} />

                                <label htmlFor='materialsNeeded'>Materials Needed</label>
                                <textarea id='materialsNeeded' name='materialsNeeded' value={materialsNeeded} onChange={this.change} />
                            </div>
                        </div>
                    )}
                />
            </div> 
        );
    }
}