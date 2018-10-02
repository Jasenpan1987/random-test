import { BrowserRouter } from "react-router-dom";
import { withFirebaseProvider } from "./withFirebaseProvider";

const AuthenticationRouter = withFirebaseProvider(BrowserRouter);

export { AuthenticationRouter };
