import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import styled from "styled-components";
import "./App.css";
import Navbar from "./components/Navbar";
import { PATHS } from "./config/routes";
import AuthContextProvider from "./contexts/auth";
import EthersContextProvider from "./contexts/ethers";
import Web3ContextProvider from "./contexts/web3js";
import EthersDashboard from "./pages/EthersDashboard";
import Web3Dashboard from "./pages/Web3Dashboard";

const StyledAppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  overflow: scroll;
`;

const StyledContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  overflow: scroll;
`;

function App() {
  return (
    <StyledAppContainer className="App">
      <AuthContextProvider>
        <EthersContextProvider>
          <Web3ContextProvider>
            <Router>
              <Navbar />
              <StyledContent className="content">
                <Switch>
                  {/* <Route path={PATHS.Login} component={LoginPage} /> */}
                  <Route
                    exact
                    path={PATHS.EthersDashboard}
                    component={EthersDashboard}
                  />
                  <Route
                    exact
                    path={PATHS.Web3Dashboard}
                    component={Web3Dashboard}
                  />
                  {/* <PrivateRoute
                exact
                path={PATHS.Dashboard}
                component={DashboardPage}
              /> */}
                  {/* <Redirect to={PATHS.Login} /> */}
                  <Redirect to={PATHS.Web3Dashboard} />
                </Switch>
              </StyledContent>
            </Router>
          </Web3ContextProvider>
        </EthersContextProvider>
      </AuthContextProvider>
    </StyledAppContainer>
  );
}

export default App;
