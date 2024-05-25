import { Outlet } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth-context";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { useNavigate } from "react-router-dom";

export default function Root() {
  const contextData = useContext(AuthContext);
  const { data } = contextData;
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!data?.isAuthenticated) {
  //     navigate("login");
  //   }
  // }, []);

  return (
    <>
      <Header />
      <div id="detail">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}
