// PROVIDES A USER FRIENDLY WHEN USER IS ATTEMPTING
    // TO ACCESS A PAGE THAT IS NOT AUTHORIZED FOR THEM
export default function Forbidden({
    context: {
        authenticatedUser: {user}
    }
}) {
    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Uh oh! You do not have access to this course.</p>
        </div>
    );
}