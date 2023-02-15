export default function Forbidden({
    context: {
        authenticatedUser: {user}
    }
}) {
    return (
        <div className="wrap">
            <h2>Forbidden</h2>
            <p>Uh oh! {user.emailAddress} you do not have access to this course.</p>
        </div>
    )
}