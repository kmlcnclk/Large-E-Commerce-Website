import React, { Component } from 'react';
import { Flex, Heading, SimpleGrid } from '@chakra-ui/layout';
import CustomCard from '../toolbox/CustomCard';

export default class MyLikesComponent extends Component {
  render() {
    const { priceColor } = this.props;
    return (
      <Flex justify="center" mt={3} mb={3} align="center">
        {this.props.data ? (
          <Flex justify="center" align="center">
            {this.props.data.getMyLikesProduct.data[0] ? (
              <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }}>
                {this.props.data.getMyLikesProduct.data.map(
                  (product, index) => (
                    <CustomCard
                      product={product}
                      priceColor={priceColor}
                      key={index}
                    />
                  )
                )}
              </SimpleGrid>
            ) : (
              <Flex justify="center" align="center">
                <Heading size="md" color="gray.500">
                  You don't like any product yet
                </Heading>
              </Flex>
            )}
          </Flex>
        ) : null}
      </Flex>
    );
  }
}
