import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  // Switch,
  Route,
  // Redirect,
} from "react-router-dom";
import { lazy } from "react";

import { ToastContainer } from "./utils/toast";
import AccessibleNavigationAnnouncer from "./components/AccessibleNavigationAnnouncer";
// import Test from "./routes/test";
import { AdminContext } from "./context/AdminContext";
import { useSubdomain } from "./hooks/useSubdomain";
import { CentralRoutes, SubdomainRoutes } from "./routes/Routes";
import { ErrorBoundary } from "./components/ErrorBoundary";

const App = () => {
  const {
    state: { adminInfo },
    // dispatch,
  } = useContext(AdminContext);
  const { isSub } = useSubdomain();
  console.log(isSub);

  return (
    <>
      {/* <Route exact path="/test" component={Test} /> */}
      <ToastContainer />
      <Router>
        <AccessibleNavigationAnnouncer />
        <ErrorBoundary>
          {/* Showing main routes only if it's a sub domain  */}
          {isSub ? (
            <SubdomainRoutes adminInfo={adminInfo} />
          ) : (
            <CentralRoutes />
          )}
        </ErrorBoundary>
      </Router>
    </>
  );
};

export default App;
