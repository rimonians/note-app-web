import React from "react";
import Navbar from "../components/Shared/Navbar";
import Footer from "../components/Shared/Footer";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated && (
        <div className="min-h-screen w-full grid grid-rows-[auto,1fr,auto]">
          <Navbar />
          <div className="w-[100vw]">{children}</div>
          <Footer />
        </div>
      )}
      {!isAuthenticated && <div className="w-[100vw]">{children}</div>}
    </>
  );
};

export default Layout;
