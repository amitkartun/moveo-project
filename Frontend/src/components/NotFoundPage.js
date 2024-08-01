import React from 'react';
import { Link } from 'react-router-dom';


function NotFoundPage() {
     return ( 
        <div> 
            <h1>404 - Page Not Found</h1>
            <p>The page you are looking for doesn't exist or has been moved.</p>
            <Link to="/">Go to Home Page</Link>
        </div>
    ); 
}

export default NotFoundPage;