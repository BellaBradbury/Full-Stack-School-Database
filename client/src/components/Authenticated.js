import React from "react";

export default ({ context }) => {
    const authUser = context.authenticatedUser;

    return(
        <div>
            <h1>{authUser.name} is authenticated!</h1>
            <p>Your username is {authUser.username}.</p>
        </div>
    );
}