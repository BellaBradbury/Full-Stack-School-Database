// IMPORTED FUNCTIONS & MODULES
import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import config from '../Config';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

export default function CourseDetail({context, history}) {
    const {authenticatedUser} = context;
    const [course, setCourse] = useState({});
    const {id} = useParams();
    const [isLoaded, setIsLoaded] = useState(false);

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

    if (isLoaded) {
        console.log(course.id);
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
                                    <p>By {course.firstName} {course.lastName}</p>
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
        return (
            <p>Course Was Not Found</p>
        );
    }
}