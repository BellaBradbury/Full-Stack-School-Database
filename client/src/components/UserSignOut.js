// FUNCTIONS & MODULES
import React, {useEffect} from "react";
import { Redirect } from "react-router-dom";

// SIGNS USER OUT AND REDIRECTS TO HOME PAGE
export default function UserSignOut({context}) {
    useEffect(() => context.actions.signOut());

    return (
        <Redirect to="/" />
    );
}