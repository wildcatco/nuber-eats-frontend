import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../components/header';
import { UserRole } from '../gql/graphql';
import { useMe } from '../hooks/useMe';
import NotFound from '../pages/404';
import Category from '../pages/client/category';
import Restaurant from '../pages/client/restaurant';
import Restaurants from '../pages/client/restaurants';
import Search from '../pages/client/search';
import ConfirmEmail from '../pages/user/confirm-email';
import EditProfile from './../pages/user/edit-profile';

const ClientRoutes = [
  <Route key="/" path="/" exact>
    <Restaurants />
  </Route>,
  <Route key="/confirm" path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
  <Route key="/edit-profile" path="/edit-profile" exact>
    <EditProfile />
  </Route>,
  <Route key="/search" path="/search" exact>
    <Search />
  </Route>,
  <Route key="/category" path="/category/:slug" exact>
    <Category />
  </Route>,
  <Route key="/restaurants" path="/restaurants/:id" exact>
    <Restaurant />
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
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
};
