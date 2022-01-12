import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { PATHS, PrivateRoute } from "./config/routes";
import styled from "styled-components";
import EthersContextProvider from "./contexts/ethers";
import AuthContextProvider from "./contexts/auth";
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
        </EthersContextProvider>
      </AuthContextProvider>
    </StyledAppContainer>
  );
}

export default App;
