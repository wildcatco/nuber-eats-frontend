import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/header';
import { UserRole } from '../gql/graphql';
import { useMe } from '../hooks/useMe';
import NotFound from '../pages/404';
import Restaurants from '../pages/client/restaurants';
import ConfirmEmail from '../pages/user/confirm-email';

const ClientRoutes = [
  <Route key="/" path="/" exact>
    <Restaurants />
  </Route>,
  <Route key="/confirm" path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
];

export const LoggedInRouter = () => {
  const { data, loading, error } = useMe();
  console.log('useMe called');

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
        <NotFound />
      </Switch>
    </Router>
  );
};
