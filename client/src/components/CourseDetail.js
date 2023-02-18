// FUNCTIONS & MODULES
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import config from '../Config';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

// PROVIDES IN DEPTH LOOK AT A SPECIFIC COURSE
export default function CourseDetail({context, history}) {
    // variables
    const {authenticatedUser} = context;
    const [course, setCourse] = useState({});
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

    // fetches course data from api
    useEffect(() => {
        const courseFind = async () => {
            const courseInfo = await axios(config.apiBaseUrl + '/courses/' + id)
                                    .catch((error) => {
                                        history.push({
                                            pathname: '/error', 
                                            state: {
                                                error: error.message
                                            }});
                                    });
            setCourse(courseInfo.data);
             if (setCourse.data === null) {
                history.push('/notfound');
            } else {
                setIsLoaded(true);
            }
        }
        courseFind();
    }, [id, history]);

    // handles deletion of auth user owned course
    const deleteCourse = () => {
        if (authenticatedUser !== null) {
            context.actions.deleteCourse(id, authenticatedUser.emailAddress, authenticatedUser.password)
                            .then((response) => {
                                if (response.status === 204) {
                                    console.log('Course successfully deleted.');
                                    history.push('/');
                                }
                            })
                            .catch((error) => {
                                history.push({
                                    pathname: '/error',
                                    state: {
                                        error: error.message
                                    }
                                });
                            });
        }
    }

    // checks if course was found in data
    if (isLoaded) {
        // shows update & delete buttons to auth user in owned course detail page
            // shows courses list button, title, owner name, description, time, and material information to all users
        return (
            <div>
                <div className='actions--bar'>
                    <div className='wrap'>
                        {authenticatedUser !== null && authenticatedUser.id === course.teacher.id ? (
                             <>
                             <Link to={`/courses/${course.id}/update`} className='button'>Update Course</Link>
                             <button className='button' onClick={deleteCourse}>Delete Course</button>
                         </>
                        ) : (
                            <></>
                        )}
                        <Link to={'/'} className='button button-secondary'>Return to Courses List</Link>
                    </div>
                </div>
                <div className='wrap'>
                        <h2>Course Details</h2>
                        <form>
                            <div className='main--flex'>
                                <div>
                                    <h3 className='course--detail--title'>Course</h3>
                                    <h4 className='course--name'>{course.title}</h4>
                                    <p>By {course.teacher.firstName} {course.teacher.lastName}</p>
                                    <ReactMarkdown>{course.description}</ReactMarkdown>
                                </div>
                                <div>
                                    <h3 className='course--detail--title'>Estimated Time</h3>
                                    <p>{course.estimatedTime}</p>
                                    <ReactMarkdown className='course--detail--list'>{course.materialsNeeded}</ReactMarkdown>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        );
    } else {
        // shows course not found if course data does not exist
        return (
            <p>Course Was Not Found</p>
        );
    }
}