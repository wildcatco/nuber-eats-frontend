import { useQuery } from '@apollo/client';
import { ME_QUERY } from './../query/users';

export const useMe = () => {
  return useQuery(ME_QUERY);
};
