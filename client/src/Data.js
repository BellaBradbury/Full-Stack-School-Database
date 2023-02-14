// MODULES
import config from './Config';

// MANAGES API DATA
export default class Data {
    // defines the params for GET requests
    api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
        const url = config.apiBaseUrl + path;

        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
        };

        if (body !== null) {
            options.body = JSON.stringify(body);
        }

        // encodes user credentials
        if (requiresAuth) {
            const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);
            options.headers['Authorization'] = `Basic ${encodedCredentials}`;
        }

        return fetch(url, options);
    }

    // GET USER from database
    async getUser(username, password) {
        const response = await this.api('/users', 'GET', null, true, {username, password});
        if (response.status === 200) {
            console.log('User validated!');
            return response.json().then(data => data);
        } else if (response.status === 401) {
            console.log('User could not be validated.');
            return null;
        } else {
            throw new Error();
        }
    }

    // POST USER to database
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            console.log('User created!');
            return [];
        } else if (response.status === 400) {
            console.log('User could not be created.');
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // POST COURSES to database
    async createCourse(course, username, password) {
        const response = await this.api('/courses', 'Post', course, true, {username, password});
        if (response.status === 201) {
            console.log('Course created!');
            return [];
        } else if (response.status === 400) {
            console.log('Course could not be created.');
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // PUT COURSE to update database
    async updateCourse(course, username, password) {
        const response = await this.api('/courses', 'PUT', course, true, {username, password});
        if (response.status === 204) {
            console.log('Course updated!');
            return [];
        } else if (response.status === 403) {
            console.log('Course could not be updated.');
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // DELETE COURSE from database
    async deleteCourse(course, username, password) {
        const response = await this.api('/courses', 'DELETE', course, true, {username, password});
        if (response.status === 204) {
            console.log('Course deleted!');
            return [];
        } else if (response.status === 403) {
            console.log('Course could not be deleted.');
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }
}