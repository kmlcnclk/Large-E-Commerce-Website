import React, { Component } from 'react';
import styles from 'styles/Profile.module.css';
import Link from 'next/link';
import ProfileImage from './ProfileImage';
import Image from 'next/image';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Collapse } from '@chakra-ui/transition';

class ProfileComponent extends Component {
  state = {
    user: {},
    profileImageStatic: '',
    userCartState1: false,
    userCartState2: true,
    userProductState1: false,
    userProductState2: true,
    deleted: false,
  };

  async componentDidMount() {
    if (this.props.user) {
      if (this.props.user.cart[0]) {
        await this.props.setUserCartState2(false);
      }
      if (this.props.user.products[0]) {
        await this.props.setUserProductState2(false);
      }
    }
  }
  profileCartVisible = (e) => {
    this.props.setUserCartState1(!this.props.userCartState1);
  };

  profileProductVisible = () => {
    this.props.setUserProductState1(!this.props.userProductState1);
  };

  deleteProductBtn = async (id) => {
    try {
      await this.props.productDelete({
        variables: {
          access_token: getAccessTokenFromLocal()[0],
          id: id,
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

    if (this.props.productDeleteData) {
      this.props.toast({
        title: this.props.productDeleteData.productDelete.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        this.props.router.reload();
      }, 2000);
    }
  };

  outOfStockBtn = async (id) => {
    try {
      await this.props.productStock({
        variables: {
          access_token: getAccessTokenFromLocal()[0],
          id: id,
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

    if (this.props.productStockData) {
      this.props.toast({
        title: this.props.productStockData.productStock.message,
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
    const {
      user,
      userCartState1,
      userCartState2,
      userProductState1,
      userProductState2,
      isOpenCart,
      isOpenProduct,
      onToggleCart,
      onToggleProduct,
      priceColor,
    } = this.props;

    const cart = [...user.cart];
    const products = [...user.products];

    return (
      <Flex className={styles.parent} mt={5} mb={5}>
        <Box className={styles.child1}>
          <Box
            className={styles.childBox2}
            borderWidth="1px"
            w="100%"
            borderRadius="3xl"
          >
            <Flex direction="column" w="100%" justify="center" align="center">
              <Flex justify="center" w="100%" direction="column" align="center">
                <ProfileImage profileImageStatic={user.profile_image} />

                <Heading
                  m={3}
                  textAlign="center"
                  color="teal.500"
                  fontWeight="semibold"
                  size="md"
                >
                  {user.name}
                </Heading>

                <Link href="/profileEdit">
                  <Button m={3} colorScheme="red" w="60%">
                    Edit profile
                  </Button>
                </Link>

                <Box textAlign="center" mb={3}>
                  <Box mt={3}>
                    <Heading size="sm" d="block">
                      &bull; Cart &bull;
                    </Heading>
                    <Box d="block" mt={2}>
                      <Badge rounded="full" colorScheme="red">
                        <Heading fontWeight="bold" m={2} size="md">
                          {user.cartCount}
                        </Heading>
                      </Badge>
                    </Box>
                  </Box>

                  <Box d="block" mt={3}>
                    <Heading size="sm" d="block">
                      &bull; Products &bull;
                    </Heading>

                    <Badge mt={2} colorScheme="red" rounded="full">
                      <Heading fontWeight="bold" m={2} size="md">
                        {user.productCount}
                      </Heading>
                    </Badge>
                  </Box>
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
        <Box className={styles.child2}>
          <Box
            className={styles.childBox2}
            borderWidth="1px"
            w="100%"
            borderRadius="3xl"
          >
            <Flex justify="center" w="100%" align="center">
              <SimpleGrid w="100%" columns={{ sm: 1, md: 2, lg: 2 }}>
                <Box m={2}>
                  <Heading
                    textAlign="center"
                    onClick={() => {
                      onToggleCart();
                      this.profileCartVisible();
                    }}
                    size="md"
                    mt={3}
                    cursor="pointer"
                    mb={3}
                    color="red.500"
                    _hover={{
                      bg: 'red.500',
                      color: 'white',
                      rounded: '3xl',
                      p: 2,
                      mt: 1,
                      mb: 0,
                    }}
                  >
                    &bull; Your Cart &bull;
                  </Heading>
                  <Collapse in={isOpenCart} animateOpacity>
                    {userCartState1 ? (
                      <Box>
                        {userCartState2 ? (
                          <Flex
                            p="40px"
                            color="white"
                            mt="4"
                            bg="teal.500"
                            rounded="md"
                            shadow="md"
                            justify="center"
                            align="center"
                          >
                            <Heading size="sm">Empty Your Cart</Heading>
                          </Flex>
                        ) : (
                          <SimpleGrid
                            columns={{ md: 1, lg: 1 }}
                            pt={1}
                            w="100%"
                            pb={1}
                            mt="4"
                          >
                            {cart.reverse().map((cartItem) => (
                              <Box
                                key={cartItem.product._id}
                                mt={3}
                                mb={3}
                                borderWidth="1px"
                                shadow="md"
                                borderRadius="xl"
                                overflow="hidden"
                              >
                                <Box
                                  textAlign="center"
                                  width="auto"
                                  m={2}
                                  mt={5}
                                >
                                  <Image
                                    objectFit="contain"
                                    width={'auto'}
                                    height={'auto'}
                                    src={cartItem.product.imageUrl[0]}
                                  />
                                </Box>
                                <Box p={4}>
                                  <Box
                                    d="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    {Date.now() -
                                      new Date(
                                        cartItem.product.createAt
                                      ).getTime() <
                                    604800000 ? (
                                      <Badge
                                        borderRadius="full"
                                        m={2}
                                        px={2}
                                        colorScheme="teal"
                                      >
                                        New
                                      </Badge>
                                    ) : null}

                                    <Box
                                      fontWeight="bold"
                                      color={priceColor}
                                      m={1}
                                      mr={2}
                                    >
                                      ${' '}
                                      {parseFloat(
                                        cartItem.product.price
                                      ).toFixed(2)}
                                    </Box>
                                  </Box>

                                  <Heading
                                    m={2}
                                    fontWeight="semibold"
                                    size="md"
                                    lineHeight="taller"
                                    isTruncated
                                  >
                                    {cartItem.product.name}
                                  </Heading>
                                  <Text
                                    m={2}
                                    mb={4}
                                    lineHeight="taller"
                                    isTruncated
                                  >
                                    {cartItem.product.content}
                                  </Text>

                                  <Flex
                                    m={2}
                                    mb={1}
                                    justify="center"
                                    align="center"
                                  >
                                    <Link
                                      href={`/product/${cartItem.product.slug}`}
                                    >
                                      <Button w="100%" colorScheme="teal">
                                        Go to Product
                                      </Button>
                                    </Link>
                                  </Flex>
                                </Box>
                              </Box>
                            ))}
                          </SimpleGrid>
                        )}
                      </Box>
                    ) : null}
                  </Collapse>
                </Box>
                <Box m={2}>
                  <Heading
                    size="md"
                    textAlign="center"
                    mt={3}
                    mb={3}
                    cursor="pointer"
                    onClick={() => {
                      this.profileProductVisible();
                      onToggleProduct();
                    }}
                    color="red.500"
                    _hover={{
                      bg: 'red.500',
                      color: 'white',
                      rounded: '3xl',
                      p: 2,
                      mt: 1,
                      mb: 0,
                    }}
                  >
                    &bull; Your Products &bull;
                  </Heading>

                  <Collapse in={isOpenProduct} animateOpacity>
                    {userProductState1 ? (
                      <Box w="100%">
                        {userProductState2 ? (
                          <Flex
                            p="40px"
                            color="white"
                            mt="4"
                            bg="teal.500"
                            rounded="md"
                            shadow="md"
                            justify="center"
                            align="center"
                          >
                            <Heading size="sm">You Have No Products</Heading>
                          </Flex>
                        ) : (
                          <SimpleGrid
                            columns={{ md: 1, lg: 1 }}
                            pt={1}
                            w="100%"
                            pb={1}
                            mt="4"
                          >
                            {products.reverse().map((product) => (
                              <Box
                                key={product._id}
                                mt={3}
                                mb={3}
                                borderWidth="1px"
                                shadow="md"
                                borderRadius="xl"
                                overflow="hidden"
                              >
                                <Box
                                  textAlign="center"
                                  width="auto"
                                  m={2}
                                  mt={5}
                                >
                                  <Image
                                    objectFit="contain"
                                    width={'auto'}
                                    height={'auto'}
                                    src={product.imageUrl[0]}
                                  />
                                </Box>
                                <Box p={4}>
                                  <Box
                                    d="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                  >
                                    {Date.now() -
                                      new Date(product.createAt).getTime() <
                                    604800000 ? (
                                      <Badge
                                        borderRadius="full"
                                        m={2}
                                        px={2}
                                        colorScheme="teal"
                                      >
                                        New
                                      </Badge>
                                    ) : null}

                                    <Box
                                      fontWeight="bold"
                                      color={priceColor}
                                      m={1}
                                      mr={2}
                                    >
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
                                  <Text
                                    m={2}
                                    mb={4}
                                    lineHeight="taller"
                                    isTruncated
                                  >
                                    {product.content}
                                  </Text>

                                  <Flex
                                    m={2}
                                    mb={1}
                                    justify="center"
                                    align="center"
                                  >
                                    <Link
                                      href={`/productUpdate/${product.slug}`}
                                    >
                                      <Button w="100%" colorScheme="teal">
                                        Go to Product Update
                                      </Button>
                                    </Link>
                                  </Flex>
                                  {product.stockState ? (
                                    <Flex
                                      m={2}
                                      mb={1}
                                      justify="center"
                                      align="center"
                                    >
                                      <Button
                                        colorScheme="pink"
                                        w="100%"
                                        onClick={() =>
                                          this.outOfStockBtn(product._id)
                                        }
                                      >
                                        Out of stock
                                      </Button>
                                    </Flex>
                                  ) : (
                                    <Flex
                                      m={2}
                                      mb={1}
                                      justify="center"
                                      align="center"
                                    >
                                      <Link
                                        href={`/productUpdate/${product.slug}`}
                                      >
                                        <Button w="100%" colorScheme="pink">
                                          In stock
                                        </Button>
                                      </Link>
                                    </Flex>
                                  )}
                                  <Flex
                                    m={2}
                                    mb={1}
                                    justify="center"
                                    align="center"
                                  >
                                    <Button
                                      colorScheme="red"
                                      w="100%"
                                      onClick={() =>
                                        this.deleteProductBtn(product._id)
                                      }
                                    >
                                      Delete Product
                                    </Button>
                                  </Flex>
                                </Box>
                              </Box>
                            ))}
                          </SimpleGrid>
                        )}
                      </Box>
                    ) : null}
                  </Collapse>
                </Box>
              </SimpleGrid>
            </Flex>
          </Box>
        </Box>
      </Flex>
    );
  }
}

export default ProfileComponent;
