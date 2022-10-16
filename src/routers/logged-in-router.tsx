import { useQuery } from '@apollo/client';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import { UserRole } from '../gql/graphql';
import Restaurants from '../pages/client/restaurants';
import { graphql } from './../gql/gql';

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
];

const ME_QUERY = graphql(`
  query me {
    me {
      id
      email
      role
      verified
    }
  }
`);

export const LoggedInRouter = () => {
  const { data, loading, error } = useQuery(ME_QUERY);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Switch>
        {data.me.role === UserRole.Client && ClientRoutes}
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};
