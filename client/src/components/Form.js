// IMPORTED FUNCTIONS & MODULES
import React from 'react';

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

    return (
        <div>
            <DisplayErrors errors={errors} />
            <form onSubmit={submitForm} type='submit'>
                {elements()}
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button button-secondary" onClick={cancelForm}>Cancel</button>
            </form>
        </div>
    );
}

function DisplayErrors({ errors }) {
    let displayErrors = null;

    if (errors.length) {
        displayErrors = (
            <div className="validation--errors">
                <h3>Form Validation Errors</h3>
                <ul>
                    {errors.map( (error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }

    return displayErrors;
}