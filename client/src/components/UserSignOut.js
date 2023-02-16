// IMPORTED FUNCTIONS & MODULES
import React, {useEffect} from "react";
import { NavLink } from "react-router-dom";

export default function UserSignOut({context}) {
    useEffect(() => context.actions.signOut());

    return (
        <NavLink to="/" />
    );
}