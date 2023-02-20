import { Route, Switch, Redirect } from "react-router-dom";
import { lazy } from "react";
const PrivateRoute = lazy(() => import("../components/login/PrivateRoute"));
const Page404 = lazy(() => import("../pages/404"));
const CentralLogIn = lazy(() => import("../pages/central-auth/CentralLogin"));
const Stores = lazy(() => import("../pages/central-auth/Stores"));
const Layout = lazy(() => import("../layout/Layout"));
const Login = lazy(() => import("../pages/Login"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Register = lazy(() => import("../pages/Register"));
// const Test = lazy(() => import("../pages/location/EditLocationPage"));
const Test = lazy(() => import("./test"));
const ForgetPassword = lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));

export const SubdomainRoutes = ({ adminInfo }) => {
  return (
    <>
      <Switch>
        {/* <Route exact path="/test" component={test} /> */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/Register" component={Register} />
        <Route exact path="/forgot-password" component={ForgetPassword} />
        <Route exact path="/reset-password/:token" component={ResetPassword} />
        <Route path="/signup" component={SignUp} />
        {/* {!adminInfo && <Redirect to="/login" />} */}
        <PrivateRoute>
          <Route path="/" component={Layout} />
        </PrivateRoute>
        <Route component={Page404} />
      </Switch>
    </>
  );
};

export const CentralRoutes = () => {
  return (
    <>
      <Switch>
        * <Route exact path={"/test"} component={Test} />
        <Route exact path="/" component={CentralLogIn} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/Register" component={Register} />
        <Redirect exact rom="/login" to="/" f />
        <Route path="*" component={Page404} />
      </Switch>
    </>
  );
};
