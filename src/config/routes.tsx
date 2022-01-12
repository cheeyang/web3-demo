// import { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
// import { AuthContext } from "../contexts/auth";

export enum PATHS {
  Login = "/login",
  EthersDashboard = "/dashboard/ethers",
  Web3Dashboard = "/dashboard/web3",
}

interface IProps {
  children?: JSX.Element;
  [props: string]: any;
}
export const PrivateRoute = ({ children, ...props }: IProps) => {
  // const { user } = useContext(AuthContext);
  const user = true;
  return user ? (
    <Route {...props}>{children}</Route>
  ) : (
    <Redirect to={PATHS.Login} />
  );
};
