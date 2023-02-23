// MODULES
import React from 'react';

// PROVIDES STRUCTURE FOR APP FORMS
export default function Form ({
        cancel,
        errors,
        submit,
        submitButtonText,
        elements
}) {
    function submitForm(event) {
        event.preventDefault();
        submit();
    }

    function cancelForm(event) {
        event.preventDefault();
        cancel();
    }

    // shows form and buttons, shows errors if applicable
    return (
        <>
            <DisplayErrors errors={errors} />
            <form onSubmit={submitForm} type='submit'>
                {elements()}
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={cancelForm}>Cancel</button>
            </form>
        </>
    );
}

// USES COLLECTED ERRORS TO DISPLAY FOR USER INPUT VALIDATION
function DisplayErrors({ errors }) {
    let displayErrors = null;

    if (errors.length) {
        displayErrors = (
            <div className="validation--errors">
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map( (error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }

    return displayErrors;
}