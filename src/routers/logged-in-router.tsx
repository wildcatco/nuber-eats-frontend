import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Header from '../components/header';
import { UserRole } from '../gql/graphql';
import { useMe } from '../hooks/useMe';
import Restaurants from '../pages/client/restaurants';

const ClientRoutes = [
  <Route key="temp-key" path="/" exact>
    <Restaurants />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === UserRole.Client && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
