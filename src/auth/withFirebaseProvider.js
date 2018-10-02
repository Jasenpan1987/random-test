import * as React from "react";
import AuthUserContext from "./AuthUserContext";

const withFirebaseProvider = Component =>
  class FirebaseAuthProvider extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authInfo: {
          user: {},
          isUserAuthenticated: false,
          isFirebaseInitialized: false,
          isAnonymous: true,
          auth: props.auth,
          loginUrl: props.loginUrl
        }
      };
    }

    OnAuthenticationStateChange = (firebaseUser, token, auth, loginUrl) => {
      if (this.props.authenticationCallback) {
        this.props.authenticationCallback(firebaseUser, token, auth, loginUrl);
      }

      this.setState({
        authInfo: {
          user: {
            name: firebaseUser ? firebaseUser.displayName : null,
            userId: firebaseUser ? firebaseUser.uid : null
          },
          isUserAuthenticated: firebaseUser ? true : false,
          isAnonymous: firebaseUser ? firebaseUser.isAnonymous : true,
          isFirebaseInitialized: true,
          auth,
          loginUrl
        }
      });
    };

    componentDidMount() {
      this.fireBaseUnsubscriber = this.props.auth.onIdTokenChanged(user => {
        if (user) {
          user.getIdToken().then(token => {
            this.OnAuthenticationStateChange(
              user,
              token,
              this.props.auth,
              this.props.loginUrl
            );
          });
        } else {
          this.OnAuthenticationStateChange(
            null,
            null,
            this.props.auth,
            this.props.loginUrl
          );
        }
      });

      if (this.props.auth.currentUser) {
        this.props.auth.currentUser.getIdToken().then(token => {
          this.OnAuthenticationStateChange(
            this.props.auth.currentUser,
            token,
            this.props.auth,
            this.props.loginUrl
          );
        });
      }
    }

    componentWillUnmount() {
      if (this.fireBaseUnsubscriber) {
        this.fireBaseUnsubscriber();
        this.fireBaseUnsubscriber = null;
      }
    }

    render() {
      const { authInfo } = this.state;
      if (!authInfo.isFirebaseInitialized) {
        return null;
      }

      return (
        <AuthUserContext.Provider value={authInfo}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  };

export { withFirebaseProvider };
