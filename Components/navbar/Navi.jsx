import React, { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../../GraphQL/Apollo-Client/Mutations/userMutations';
import { useRouter } from 'next/router';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';

function Navi() {
  const router = useRouter();

  const [logState, setLogState] = useState(true);

  const [logout, { error, data }] = useMutation(LOGOUT_MUTATION);

  const [category, { data: categoryData }] = useLazyQuery(GET_ALL_CATEGORIES);

  return (
    <div>
      <NavbarComponent
        router={router}
        logout={logout}
        data={data}
        error={error}
        logState={logState}
        setLogState={setLogState}
        category={category}
        categoryData={categoryData}
      />
    </div>
  );
}

export default Navi;
