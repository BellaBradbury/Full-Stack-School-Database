// MODULES AND FUNCTIONS
import React from "react";
import {Route, Redirect} from 'react-router-dom';
import {Consumer} from './Context';

// ENSURES AUTHENTICATION ON PRIVATE ROUTES
export default function PrivateRoute ({ component: Component, ...rest }) {

    // shows private route or redirects user to sign in
        // based on authorization status
    return (
        <Consumer>
            {(context) => (
                <Route
                    {...rest}
                    render={(props) => context.authenticatedUser ? (
                        <Component {...props} />
                    ) : (
                        <Redirect to={{
                            pathname: '/signin',
                            state: {from: props.location}
                        }}  />
                    )}
                />
            )}
        </Consumer>
    );
};