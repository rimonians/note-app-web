import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFound = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={`hero ${isAuthenticated ? "h-full" : "h-screen"}`}>
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404 Not Found</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {isAuthenticated && (
            <Link to="/" className="btn btn-primary">
              Back to home
            </Link>
          )}
          {!isAuthenticated && (
            <Link to="/signin" className="btn btn-primary">
              Signin first
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
