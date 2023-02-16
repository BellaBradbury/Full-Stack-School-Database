// IMPORTED FUNCTIONS & MODULES
import React, {Component} from 'react';
import Form from './Form';

export default class UpdateCourse extends Component {
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
        const {context} = this.props;
        const {from} = this.props.location.state || {from: {pathname: '/authenticated'}};
        const {username, password} = this.state;
        const {course} = this.state;

        context.actions.updateCourse(course, username, password)
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

    cancel = () => {
        this.props.history.push('/');
    }

    render () {
        const {
            context: {
                authenticatedUser: {user},
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
                    )}
                />
            </div> 
        )
    }
}