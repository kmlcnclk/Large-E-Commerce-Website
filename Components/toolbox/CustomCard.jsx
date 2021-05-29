import { Box } from '@chakra-ui/layout';
import React from 'react';
import Image from 'next/image';
import { Badge } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import Link from 'next/link';
import { Button } from '@chakra-ui/button';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

function CustomCard({ product, priceColor }) {
  return (
    <Box
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
          {Date.now() - new Date(product.createAt).getTime() < 604800000 ? (
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

        <Box d="flex" m={2} alignItems="center">
          {Array(5)
            .fill('')
            .map((a, i) => {
              const y = product.star.toString().split('.')[0];
              let z = product.star.toString().split('.')[1];

              if (i + 1 <= y) {
                return <BsStarFill key={i} color="#319795" />;
              } else if (parseInt(z) >= 5 && i <= parseInt(y)) {
                return <BsStarHalf color="#319795" key={i} />;
              } else {
                return <BsStar color="#319795" key={i} />;
              }
            })}
          <Box ml={2} as="div" d="inline-block">
            {' '}
            {product.star == 0
              ? product.star.toFixed(0)
              : product.star.toFixed(1)}
          </Box>
        </Box>

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
      </Box>
    </Box>
  );
}

export default CustomCard;
