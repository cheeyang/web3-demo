import { useContext } from "react";
// import { signOutFirebase } from "../firebase";
import styled from "styled-components";
import { AuthContext } from "../contexts/auth";

const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  padding: 0 2rem;
  width: 100%;

  .left-button-group {
    display: flex;
    gap: 1rem;
  }
`;

const Navbar = () => {
  const { user, dispatch: dispatchAuth } = useContext(AuthContext);
  const handleLogOut = async () => {
    // signOutFirebase();
    dispatchAuth({ type: "RESET_AUTH", payload: null });
  };

  return user ? (
    <Div>
      <span>Logged in as: {user?.email}</span>

      <div className="left-button-group">
        <button type="button" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </Div>
  ) : null;
};
export default Navbar;
