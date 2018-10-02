import * as React from "react";

import AuthUserContext from "./AuthUserContext";

const withFirebaseAuthentication = Component =>
  class WithFirebaseAuthentication extends React.Component {
    render() {
      return (
        <AuthUserContext.Consumer>
          {authInfo => <Component authInfo={authInfo} {...this.props} />}
        </AuthUserContext.Consumer>
      );
    }
  };

export { withFirebaseAuthentication };
