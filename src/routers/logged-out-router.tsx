import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import NotFound from './../pages/404';
import CreateAccount from './../pages/create-account';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/create-account">
          <CreateAccount />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
