import React from 'react';
import "../css/ErrorBoundary.css"

// This is an ErrorBoundary for all the uncatched errors
class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null, errorInfo: null };
    }
  
    static getDerivedStateFromError(error) {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      console.error("Uncaught error:", error, errorInfo);
      this.setState({ error, errorInfo });
    }
  
    render() {
      if (this.state.hasError) {
        return (
        <div className="error-boundary-container">Something went wrong..</div>
        );
      }
  
      return this.props.children; 
    }
  }
  export default ErrorBoundary;