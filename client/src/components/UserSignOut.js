import React, {useContext, useEffect} from "react";
import { Navigate } from "react-router-dom";
import {UserContext} from '../Context';

const UserSignOut = () => {
    const {actions} = useContext(UserContext);
    useEffect(() => actions.signOut());

    return (
        <Navigate to="/" />
    );
}

export default UserSignOut;