import { useLocation } from "react-router-dom";

const ErrorPage = () => {
    const location = useLocation();
    let error = {
        "status": 404, 
        "message": "Page Not Found"
    }
    if (location.state && location.state.error) {
        error.status = location.state.error.status;
        error.message = location.state.error.message;
    }
    
    return (
        <div className="container-fluid">
            <h4 className="text-danger py-3">Error {error.status} - {error.message}</h4>
        </div>
    )
}

export default ErrorPage;