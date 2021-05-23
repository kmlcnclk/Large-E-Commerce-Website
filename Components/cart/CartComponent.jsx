import React, { Component } from 'react';
import styles from '../../styles/Cart.module.css';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { BsPlusCircle, BsDashCircle, BsTrash } from 'react-icons/bs';
import { RiShoppingCartLine } from 'react-icons/ri';
import Link from 'next/link';
import {
  Badge,
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/layout';
import { Image } from '@chakra-ui/image';
import { Button } from '@chakra-ui/button';

class CartComponent extends Component {
  emptyCart = () => {
    return (
      <Container maxW="container.sm">
        <Flex justify="center" direction="column" align="center">
          <Heading
            size="lg"
            color="gray"
            fontWeight="semibold"
            fontFamily="cursive"
          >
            Empty Your Cart
          </Heading>

          <Box mt={8}>
            <RiShoppingCartLine color="grey" size={100} />
          </Box>
        </Flex>
      </Container>
    );
  };

  removeFromCart = async (product) => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.removeFromCart({
        variables: {
          access_token: token ? token : '',
          _id: product.product._id,
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
    if (this.props.removeFromCartData) {
      this.props.setUserCart(
        this.props.removeFromCartData.removeFromCart.data.cart
      );
      this.props.setUser(this.props.removeFromCartData.removeFromCart.data);

      this.props.toast({
        title: `${product.product.name} ${this.props.removeFromCartData.removeFromCart.message}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    setTimeout(() => {
      if (!this.props.userCart[0]) {
        this.props.router.reload();
      }
    }, 2000);
  };

  fullRemoveFromCart = async (product) => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.fullRemoveFromCart({
        variables: {
          access_token: token ? token : '',
          _id: product.product._id,
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
    if (this.props.fullRemoveFromCartData) {
      this.props.setUserCart(
        this.props.fullRemoveFromCartData.fullRemoveFromCart.data.cart
      );
      this.props.setUser(
        this.props.fullRemoveFromCartData.fullRemoveFromCart.data
      );

      this.props.toast({
        title: `${product.product.name} ${this.props.fullRemoveFromCartData.fullRemoveFromCart.message}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
    setTimeout(() => {
      if (!this.props.userCart[0]) {
        this.props.router.reload();
      }
    }, 2000);
  };

  addToCart = async (product) => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.addToCart({
        variables: {
          access_token: token ? token : '',
          _id: product.product._id,
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
    if (this.props.addToCartData) {
      this.props.setUserCart(this.props.addToCartData.addToCart.data.cart);
      this.props.setUser(this.props.addToCartData.addToCart.data);

      this.props.toast({
        title: `${product.product.name} ${this.props.addToCartData.addToCart.message}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  fullCart = () => {
    const { userCart, user, data } = this.props;
    const cart = [...userCart];

    return (
      <Flex justify="center" align="center">
        {data ? (
          <Flex className={styles.parent}>
            <Box className={styles.child1}>
              {cart.reverse().map((product) => (
                <Box
                  borderWidth="1px"
                  borderRadius="2xl"
                  key={product.product._id}
                  w="100%"
                  pt={3}
                  pb={3}
                  mt={5}
                  mb={5}
                >
                  <SimpleGrid w="100%" columns={{ md: 1, lg: 2 }}>
                    <Flex
                      justify="center"
                      align="center"
                      textAlign="center"
                      p="2"
                      w="100%"
                    >
                      <Image
                        className={styles.childImg}
                        objectFit="contain"
                        src={product.product.imageUrl[0]}
                        alt="ProductImage"
                      />
                    </Flex>
                    <Flex w="100%" justify="normal" align="center" p="2">
                      <Flex
                        direction="column"
                        align="start"
                        justify="space-between"
                        h="80%"
                        w="100%"
                        m={4}
                      >
                        <Box>
                          <Heading
                            w="100%"
                            fontWeight="bold"
                            color="teal.500"
                            size="md"
                          >
                            {product.product.name}
                          </Heading>
                          <Heading
                            fontWeight="semibold"
                            w="100%"
                            size="md"
                            fontFamily="sans-serif"
                            mt={4}
                          >
                            <strong>$</strong>{' '}
                            {parseFloat(product.product.price).toFixed(2)}
                          </Heading>
                          <Text w="100%" fontSize="md" mt={4}>
                            {product.product.content}
                          </Text>
                        </Box>

                        <Flex
                          align="center"
                          w="100%"
                          justify="space-between"
                          mt="6"
                          mb={3}
                        >
                          <Flex align="center" w="100%" justify="center">
                            <Box d="inline-block" pt="1" pr={2}>
                              <BsPlusCircle
                                onClick={() => this.addToCart(product)}
                                style={{ cursor: 'pointer' }}
                                size={23}
                              />
                            </Box>
                            <Box d="inline-block">
                              <Heading size="lg">{product.quantity}</Heading>
                            </Box>
                            <Box d="inline-block" pt="1" pl={2}>
                              <BsDashCircle
                                onClick={() => this.removeFromCart(product)}
                                style={{ cursor: 'pointer' }}
                                size={23}
                              />
                            </Box>
                          </Flex>
                          <Flex justify="center" w="100%" align="center">
                            <BsTrash
                              onClick={() => this.fullRemoveFromCart(product)}
                              style={{ cursor: 'pointer' }}
                              size={25}
                            />
                          </Flex>
                        </Flex>
                      </Flex>
                    </Flex>
                  </SimpleGrid>
                </Box>
              ))}
            </Box>
            <Box className={styles.child2}>
              <Flex m={2} justify="center" align="start" p={2}>
                <Box w="100%" borderWidth="1px" borderRadius="2xl" p={2}>
                  <Flex m={3} justify="center" align="center">
                    <Heading size="sm">Total number of products: </Heading>
                    <Badge ml={2}>{user.cartCount}</Badge>
                  </Flex>
                  <Flex m={3} justify="center" align="center">
                    <Heading size="sm">Total basket price: </Heading>
                    <Badge ml={2}>
                      <strong>$</strong>{' '}
                      {parseFloat(user.cartTotalPrice).toFixed(2)}
                    </Badge>
                  </Flex>
                  <Flex mt={5} justify="center" align="center">
                    <Link href="/orderInformation">
                      <Button w="100%" colorScheme="red">
                        Complete shopping
                      </Button>
                    </Link>
                  </Flex>
                </Box>
              </Flex>
            </Box>
          </Flex>
        ) : null}
      </Flex>
    );
  };

  render() {
    const { cart, loading } = this.props;
    return (
      <Flex justify="center" mt={3} mb={3} align="center">
        {loading ? null : (
          <Box>{!loading && cart ? this.fullCart() : this.emptyCart()}</Box>
        )}
      </Flex>
    );
  }
}

export default CartComponent;
