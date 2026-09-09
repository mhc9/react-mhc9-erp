
const ErrorMessage = ({ message, className }) => {
    return (
        <p className={["text-xs text-red-500 flex items-center gap-1", className].join(' ')}>
            <i className="fas fa-info-circle"></i>
            {message}
        </p>
    )
}

export default ErrorMessage