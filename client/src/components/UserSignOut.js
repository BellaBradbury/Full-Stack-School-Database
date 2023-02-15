import React, {useEffect} from "react";
import { Navigate } from "react-router-dom";

export default function UserSignOut({context}) {
    useEffect(() => context.actions.signOut());

    return (
        <Navigate to="/" />
    );
}