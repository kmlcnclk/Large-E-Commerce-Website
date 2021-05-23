import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Button, IconButton } from '@chakra-ui/button';

function ProductCardComponent() {
  return (
    <Flex justify="center" direction="column" align="center">
      <SimpleGrid columns={{ md: 2, lg: 3 }} ml={2} mr={2}>
        {currentCategory.map((product) => (
          <Box
            key={product._id}
            m={3}
            mt={5}
            maxW="sm"
            borderWidth="1px"
            borderRadius="xl"
            overflow="hidden"
            d="inline-block"
          >
            <div style={{ margin: '2rem', width: 'auto', textAlign: 'center' }}>
              <Image
                objectFit="contain"
                width={'auto'}
                height={'auto'}
                src={product.imageUrl[0]}
              />
            </div>
            <Box p={4}>
              <Box d="flex" justifyContent="space-between" alignItems="center">
                {Date.now() - new Date(product.createAt).getTime() <
                604800000 ? (
                  <Badge borderRadius="full" m={2} px={2} colorScheme="teal">
                    New
                  </Badge>
                ) : null}

                <Box fontWeight="bold" color={priceColor} m={1} mr={2}>
                  $ {parseFloat(product.price).toFixed(2)}
                </Box>
              </Box>

              <Heading
                m={2}
                fontWeight="semibold"
                size="md"
                lineHeight="taller"
                isTruncated
              >
                {product.name}
              </Heading>
              <Text m={2} mb={4} lineHeight="taller" isTruncated>
                {product.content}
              </Text>

              <Flex m={2} mb={1} justify="center" align="center">
                <Link href={`/product/${product.slug}`}>
                  <Button w="100%" colorScheme="teal">
                    Go to Product
                  </Button>
                </Link>
              </Flex>

              {/* <Box d="flex" mt="2" alignItems="center">
                {Array(5)
                  .fill('')
                  .map((a, i) => {
                    const y = property.rating.toString().split('.')[0];
                    let z = property.rating.toString().split('.')[1];

                    if (i + 1 <= y) {
                      return <BsStarFill key={i} color="#319795" />;
                    } else if (parseInt(z) >= 5 && i <= parseInt(y)) {
                      return <BsStarHalf color="#319795" key={i} />;
                    } else {
                      return <BsStar color="#319795" key={i} />;
                    }
                  })}
                <div>{property.rating}</div>
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {property.reviewCount} reviews
                </Box>
              </Box> */}
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {data ? (
        <Box w="100%" m={3}>
          {data.currentCategory.data[0] ? (
            <Flex justify="space-around" align="center">
              <IconButton
                aria-label="Previous"
                isDisabled={
                  data.currentCategory.pagination.previous ? false : true
                }
                onClick={() => {
                  data.currentCategory.pagination.previous
                    ? setPageIndex(pageIndex - 1)
                    : null;
                }}
                icon={<ChevronLeftIcon w="8" h="8" />}
              />

              <IconButton
                aria-label="Next"
                isDisabled={data.currentCategory.pagination.next ? false : true}
                onClick={() => {
                  data.currentCategory.pagination.next
                    ? setPageIndex(pageIndex + 1)
                    : null;
                }}
                icon={<ChevronRightIcon w="8" h="8" />}
              />
            </Flex>
          ) : null}
        </Box>
      ) : null}
    </Flex>
  );
}

export default ProductCardComponent;
