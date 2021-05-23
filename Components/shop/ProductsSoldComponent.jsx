import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { SimpleGrid } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import React, { Component } from 'react';
import { getAccessTokenFromLocal } from '../../LocalStorage/accessTokenStorage';
import Image from 'next/image';
import { Heading } from '@chakra-ui/layout';
import { Badge } from '@chakra-ui/layout';
import { Text } from '@chakra-ui/layout';

export default class ProductsSoldComponent extends Component {
  shipTheProduct = async (index) => {
    try {
      await this.props.postProductsSold({
        variables: {
          access_token: await getAccessTokenFromLocal()[0],
          index: index,
        },
      });
    } catch (err) {
      this.props.toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    if (this.props.postProductsSoldData) {
      this.props.toast({
        title: this.props.postProductsSoldData.postProductsSold.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        this.props.router.reload();
      }, 2000);
    }
  };

  render() {
    return (
      <Flex justify="center" mt={3} mb={3} align="center">
        {this.props.data ? (
          <Flex justify="center" align="center">
            {this.props.data.productsSold.data[0] ? (
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
                {this.props.data.productsSold.data.map((products, index) => (
                  <Box
                    m={3}
                    key={index}
                    mt={5}
                    maxW="sm"
                    borderWidth="1px"
                    borderRadius="xl"
                    overflow="hidden"
                    d="inline-block"
                  >
                    <div
                      style={{
                        margin: '2rem',
                        width: 'auto',
                        textAlign: 'center',
                      }}
                    >
                      <Image
                        objectFit="contain"
                        width={'auto'}
                        height={'auto'}
                        src={products.product.imageUrl}
                      />
                    </div>
                    <Flex
                      direction="column"
                      align="center"
                      justify="center"
                      textAlign="center"
                      p={4}
                    >
                      <Text m={2} size="md" lineHeight="taller">
                        <Heading
                          fontWeight="semibold"
                          color="teal.500"
                          size="md"
                          mb={2}
                        >
                          &bull; Name &bull;
                        </Heading>{' '}
                        {products.product.name}
                      </Text>
                      <Box m={2}>
                        <Heading
                          color="teal.500"
                          fontWeight="semibold"
                          size="md"
                          mb={2}
                        >
                          &bull; Quantity &bull;
                        </Heading>{' '}
                        <Badge colorScheme="red" rounded="full">
                          <Heading fontWeight="bold" m={1} size="sm">
                            {products.quantity}
                          </Heading>
                        </Badge>
                      </Box>
                      <Text m={2} size="md" lineHeight="taller">
                        <Heading
                          fontWeight="semibold"
                          color="teal.500"
                          size="md"
                          mb={2}
                        >
                          &bull; Orderer's name &bull;
                        </Heading>{' '}
                        {products.user.name}
                      </Text>
                      <Text m={2} size="md" lineHeight="taller">
                        <Heading
                          fontWeight="semibold"
                          size="md"
                          color="teal.500"
                          mb={2}
                        >
                          &bull; Orderer's address &bull;
                        </Heading>{' '}
                        {products.user.address}
                      </Text>
                      <Button
                        variant="customRed"
                        w="100%"
                        onClick={() => this.shipTheProduct(index)}
                      >
                        Ship the product
                      </Button>
                    </Flex>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Flex justify="center" align="center">
                <Heading size="md" color="gray.500">
                  You don't have any products sold yet
                </Heading>
              </Flex>
            )}
          </Flex>
        ) : null}
      </Flex>
    );
  }
}
