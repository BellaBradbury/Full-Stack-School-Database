// VARIABLES
import config from './Config';

// 
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
        const response = await this.api('/user', 'GET', null, true, {username, password});
        if (response.status === 200) {
            return response.json().then(data => data);
        } else if (response.status === 401) {
            return null;
        } else {
            throw new Error();
        }
    }

    // POST USER to database
    async createUser(user) {
        const response = await this.api('/users', 'POST', user);
        if (response.status === 201) {
            return [];
        } else if (response.status === 400) {
            return response.json().then(data => {
                return data.errors;
            });
        } else {
            throw new Error();
        }
    }

    // POST COURSES to database
    async createCourse(path, method, body, username, password) {
        const response = await this.api(path, method, body, true, {username, password});
        if (response.status === 201) {
            console.log('You have created a course.');
        } else {
            throw new Error();
        }
    }

    // PUT COURSES to update database
    async updateCourse(path, method, body, username, password) {
        const response = await this.api(path, method, body, true, {username, password});
        if (response.status === 204) {
            console.log('You have updated a course.');
        } else {
            throw new Error();
        }
    }
}