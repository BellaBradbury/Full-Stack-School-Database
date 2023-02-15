import React, {useContext, useEffect} from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from '../Context';

export default function UserSignOut({context}) {
    const {actions} = useContext(UserContext);
    useEffect(() => actions.signOut());

    return (
        <Navigate to="/" />
    );
}