import { IconButton } from '@chakra-ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/layout';
import React from 'react';

function CustomPagination({ setPageIndex, previous, next, pageIndex }) {
  return (
    <Flex justify="space-around" align="center">
      <IconButton
        aria-label="Previous"
        isDisabled={previous ? false : true}
        onClick={() => {
          previous ? setPageIndex(pageIndex - 1) : null;
        }}
        icon={<ChevronLeftIcon w="8" h="8" />}
      />

      <IconButton
        aria-label="Next"
        isDisabled={next ? false : true}
        onClick={() => {
          next ? setPageIndex(pageIndex + 1) : null;
        }}
        icon={<ChevronRightIcon w="8" h="8" />}
      />
    </Flex>
  );
}

export default CustomPagination;
