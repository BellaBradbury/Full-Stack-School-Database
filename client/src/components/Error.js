// MODULES
import React from 'react';

// PROVIDES A USER FRIENDLY LISTING 500 ERRORS
export default function Error(props) {
    const {error} =  props.location.state;

    return (
        <div className='wrap'>
            <h2>Error</h2>
            <p>{error}</p>
        </div>
    );
}