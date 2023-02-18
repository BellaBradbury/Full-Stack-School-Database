// IMPORTED FUNCTIONS & MODULES
import React, {Component} from 'react';
import Form from './Form';
import axios from "axios";
import config from "../Config";

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

    change = (event) => {
        const name = event.target.name;
        const value = event.target.value;

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

    submit = () => {
        const {
            context: {
                authenticatedUser
            },
        } = this.props;
        console.log(this.props);
        // const {context} = this.props;
        // const {from} = this.props.location.state || {from: {pathname: '/'}};
        // const {emailAddress, password} = this.state;
        const {course} = this.state;
        this.props.context.actions.updateCourse(course, authenticatedUser.emailAddress, authenticatedUser.password)
            .then((errors) => {
                if (errors.length) {
                    this.setState({errors});
                } else {
                    this.props.history.push('/');
                }
            });
    
    }

    cancel = () => {
        this.props.history.push('/');
    }

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
                        <>
                            <div className='main--flex'>
                                <label htmlFor='courseTitle'>Course Title</label>
                                <input id='CourseTitle' name='CourseTitle' type='text' value={title} onChange={this.change} />
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
                        </>
                    )}
                />
            </div> 
        );
    }
}