import { Route, Switch } from 'react-router-dom';
import Login from '../pages/login';
import CreateAccount from './../pages/create-account';

export const LoggedOutRouter = () => {
  return (
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/create-account">
        <CreateAccount />
      </Route>
    </Switch>
  );
};
