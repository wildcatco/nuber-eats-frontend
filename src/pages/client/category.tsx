import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { CATEGORY_QUERY } from '../../query/categories';

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data, loading } = useQuery(CATEGORY_QUERY, {
    variables: {
      input: {
        page: 1,
        slug,
      },
    },
  });

  console.log(data);

  return <div>Category</div>;
};

export default Category;
