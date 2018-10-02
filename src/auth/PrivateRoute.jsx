import * as React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { withFirebaseAuthentication } from "./withFirebaseAuthentication";

class PrivateRouteComponent extends React.Component {
  render() {
    const { authInfo, exact, path, isloginUrl } = this.props;
    if (authInfo && authInfo.isUserAuthenticated && !authInfo.isAnonymous) {
      return (
        <Route exact={!!exact} path={path} component={this.props.component} />
      );
    } else {
      window.location.href = `${authInfo.loginUrl}?redirectUrl=${
        window.location.pathname
      }&isAbsolute=true`;
      return null;
    }
  }
}

PrivateRouteComponent.propTypes = {
  authInfo: PropTypes.shape({
    auth: PropTypes.object,
    user: PropTypes.shape({
      userName: PropTypes.string,
      userId: PropTypes.string
    }),
    isFirebaseInitialized: PropTypes.bool,
    isUserAuthenticated: PropTypes.bool,
    isAnonymous: PropTypes.bool,
    loginUrl: PropTypes.string
  })
};

const PrivateRoute = withFirebaseAuthentication(PrivateRouteComponent);

export { PrivateRoute };
