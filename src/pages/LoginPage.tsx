// import { useContext } from "react";
import { useHistory } from "react-router-dom";
// import { AuthContext, IAuthContext } from "../contexts/auth";
// import { signInWithGoogle } from "../firebase";
import { PATHS } from "../config/routes";

const LoginPage: React.FC = () => {
  // const { dispatch } = useContext<IAuthContext>(AuthContext);
  const history = useHistory();
  const handleLogIn = async () => {
    // const user = await signInWithGoogle();
    // console.log("user: ", user);
    // dispatch({ type: "UPDATE_USER", payload: user });
    history.push(PATHS.Web3Dashboard);
  };

  return (
    <>
      <button type="button" onClick={handleLogIn}>
        Log In With Google
      </button>
    </>
  );
};
export default LoginPage;
