import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Shared/Loading";

const Home = () => {
  const { loading, user } = useSelector((state) => state.user);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="hero h-full">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold">
            Hey <span className="text-primary">{user?.username}</span>
          </h1>
          <p className="py-6 text-secondary">
            We are delighted to have you among us. On behalf of all the members
            and the management, we would like to extend our warmest welcome and
            good wishes!
          </p>
          <Link to="/profile" className="btn btn-primary">
            See your profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
