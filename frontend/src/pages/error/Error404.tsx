import { Link } from "react-router-dom";
export default function Error404() { return <div className="error-page"><div><h1>404</h1><p>Page not found.</p><Link to="/dashboard" className="btn btn-success">Back to Dashboard</Link></div></div>; }
