import { RoutesList } from "./routes/routes";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "./context/auth-context";
function App() {
  const contextData = useContext(AuthContext);
  const { data } = contextData;
  return (
    <>
      {/* <RouterProvider router={router} /> */}
      <RoutesList isAuthenticated={data?.isAuthenticated} />
    </>
  );
}

export default App;
