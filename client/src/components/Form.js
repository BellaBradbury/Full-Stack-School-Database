import React from 'react';

const Form = (props) => {
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

export default Form;