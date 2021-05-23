import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import React, { Component } from 'react';
import { Badge, Box, Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import Image from 'next/image';

export default class MyOrdersComponent extends Component {
  componentDidMount = async () => {
    try {
      await this.props.getMyOrders({
        variables: {
          access_token: await getAccessTokenFromLocal()[0],
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
  };
  render() {
    return (
      <Flex justify="center" mt={3} mb={3} align="center">
        {this.props.data ? (
          <Flex justify="center" align="center">
            {this.props.data.getMyOrders.data[0] ? (
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
                {this.props.data.getMyOrders.data.map((products, index) => (
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
                    <Box p={4}>
                      <Box
                        d="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box
                          fontWeight="bold"
                          color={this.props.priceColor}
                          m={2}
                          mr={2}
                        >
                          $ {parseFloat(products.product.price).toFixed(2)}
                        </Box>
                      </Box>

                      <Heading
                        m={2}
                        fontWeight="semibold"
                        size="md"
                        lineHeight="taller"
                        isTruncated
                      >
                        Name: {products.product.name}
                      </Heading>
                      <Flex m={2} align="center">
                        <strong>Quantity:</strong>
                        <Badge colorScheme="red" ml={2} rounded="full" d="flex">
                          <Heading
                            fontWeight="bold"
                            isTruncated
                            m={1}
                            size="sm"
                          >
                            {products.quantity}
                          </Heading>
                        </Badge>
                      </Flex>
                    </Box>
                  </Box>
                ))}
              </SimpleGrid>
            ) : (
              <Flex justify="center" align="center">
                <Heading size="md" color="gray.500">
                  You don't have any orders yet
                </Heading>
              </Flex>
            )}
          </Flex>
        ) : null}
      </Flex>
    );
  }
}
