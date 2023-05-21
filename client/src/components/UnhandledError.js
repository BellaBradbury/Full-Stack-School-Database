// MODULES
import React from 'react';

// PROVIDES A USER FRIENDLY LISTING 500 ERRORS
export default function UnhandledError(props) {
    const {error} =  props.location.state;

    return (
        <div className='wrap'>
            <h2>Server Error</h2>
            <p>An unexpected error has occurred.</p>
            <p>{error}</p>
        </div>
    );
}