import React, { useState } from 'react';
import NavbarComponent from './NavbarComponent';
import { useLazyQuery, useMutation } from '@apollo/client';
import { LOGOUT_MUTATION } from '../../GraphQL/Apollo-Client/Mutations/userMutations';
import { useRouter } from 'next/router';
import { GET_ALL_CATEGORIES } from 'GraphQL/Apollo-Client/Queries/categoryQuerys';
import { useToast } from '@chakra-ui/toast';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';
import { useDisclosure } from '@chakra-ui/hooks';

function Navi() {
  const router = useRouter();

  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();

  const bgIconColor = useColorModeValue('white', 'gray.800');
  const bgIconColorBurger = useColorModeValue('white', 'gray.700');

  const { isOpen, onClose, onOpen } = useDisclosure();

  const [logState, setLogState] = useState(true);

  const [logout, { data }] = useMutation(LOGOUT_MUTATION);

  const [category, { data: categoryData }] = useLazyQuery(GET_ALL_CATEGORIES);

  return (
    <div>
      <NavbarComponent
        router={router}
        logout={logout}
        data={data}
        logState={logState}
        setLogState={setLogState}
        category={category}
        categoryData={categoryData}
        toast={toast}
        colorMode={colorMode}
        toggleColorMode={toggleColorMode}
        bgIconColor={bgIconColor}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        bgIconColorBurger={bgIconColorBurger}
      />
    </div>
  );
}

export default Navi;
