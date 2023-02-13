import React from 'react';

export default (props) => {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements
    } = props;

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
            <form onSubmit={submitForm}>
                {elements()}
                <div>
                    <button className="button" type="submit">{submitButtonText}</button>
                    <button className="button" onClick={cancelForm}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

function DisplayErrors({ errors }) {
    let displayErrors = null;

    if (errors.length) {
        displayErrors = (
            <div className="wrap">
                <h2>Form Validation Errors</h2>
                <ul>
                    {errors.map( (error, i) => <li key={i}>{error}</li>)}
                </ul>
            </div>
        );
    }

    return displayErrors;
}