import { useQuery } from '@apollo/client';
import { graphql } from './../gql/gql';

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

  console.log(data);

  return (
    <div>
      <h1>{data.me.role}</h1>
    </div>
  );
};
