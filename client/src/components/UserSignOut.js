import React from "react";
import { Navigate } from "react-router-dom";

export default ({context}) => {
    context.actions.signOut();

    return (
        <Navigate to="/" />
    );
}