// FUNCTIONS & MODULES
import React, {useEffect, useState} from 'react';
import config from '../Config';
import axios from 'axios';
import { Link } from 'react-router-dom';

// LANDING PAGE LISTING ALL COURSES TO ANY USER
export default function Courses({ history }) {
    const [coursesData, setCourses] = useState([]);

    // fetches course data from api
    useEffect(() => {
        const coursesFind = async () => {
            await axios.get(config.apiBaseUrl + '/courses')
                    .then((response) => {
                        setCourses(response.data);
                    })
                    .catch((err) => {
                        history.push({
                            pathname: '/errors', 
                            state: {error: err.message}});
                    });
        }
        coursesFind();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // maps all course data returned from fetch
    const courseTitles = coursesData.map((course) => {
        return (
            <Link className='course--module course--link' to={`/courses/${course.id}`} key={course.id}>
                <h2 className='course--label'>Course</h2>
                <h3 className='course--title'>{course.title}</h3>
            </Link>
        );
    });

    // shows course title & links to detail page, create course button
    return (
        <div className='wrap main--grid'>
            {courseTitles}
            <Link className='course--module course--add--module' to='/courses/create'>
                <span className='course--add--title'>
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                        <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                    </svg>
                New Course </span>
            </Link>
        </div>
    );
}