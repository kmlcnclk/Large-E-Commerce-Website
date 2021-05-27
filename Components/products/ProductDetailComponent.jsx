import React, { Component } from 'react';
import styles from 'styles/ProductDetail.module.css';
import Image from 'next/image';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { Badge, Box, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/layout';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { Button } from '@chakra-ui/button';
// import ImageZoom from 'react-medium-image-zoom';

class ProductDetailComponent extends Component {
  state = {
    images: [],
    index: 0,
    like: false,
  };

  async componentDidMount() {
    this.props.setProductDetail(this.props.data);

    const timing = setTimeout(() => {
      const { index } = this.state;
      this.myRef.current.children[
        index
      ].className = `${styles.thumbImageActive} ${styles.thumbImage}`;
    }, 1000);

    return () => clearTimeout(timing);
  }

  myRef = React.createRef();

  handleTab = (index) => {
    this.setState({ index: index });
    const images = this.myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace(
        `${styles.thumbImageActive} ${styles.thumbImage}`,
        `${styles.thumbImage}`
      );
    }
    images[index].className = `${styles.thumbImageActive} ${styles.thumbImage}`;
  };

  addToCart = async () => {
    const token = getAccessTokenFromLocal()[0];
    try {
      await this.props.addToCart({
        variables: {
          access_token: token ? token : '',
          _id: this.props.data._id,
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
      this.props.toast({
        title: `${this.props.data.name} ${this.props.addToCartData.addToCart.message}`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  likeOrUndoLikeProduct = async (product) => {
    if (getAccessTokenFromLocal()[0]) {
      if (this.props.getSingleUserData) {
        const user = this.props.getSingleUserData.getSingleUser.data;

        var result = product.likes.includes(user._id);
        if (result) {
          const token = getAccessTokenFromLocal()[0];

          try {
            await this.props.undoLikeProduct({
              variables: {
                access_token: token ? token : '',
                _id: this.props.productDetail._id,
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

          if (this.props.undoLikeProductData) {
            await this.props.setProductDetail(
              this.props.undoLikeProductData.undoLikeProduct.data
            );

            this.setState({ like: false });
            this.props.toast({
              title: `${this.props.undoLikeProductData.undoLikeProduct.message}`,
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          }
        } else {
          const token = getAccessTokenFromLocal()[0];

          try {
            await this.props.likeProduct({
              variables: {
                access_token: token ? token : '',
                _id: this.props.productDetail._id,
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

          if (this.props.likeProductData) {
            await this.props.setProductDetail(
              this.props.likeProductData.likeProduct.data
            );

            this.setState({ like: true });
            this.props.toast({
              title: `${this.props.likeProductData.likeProduct.message}`,
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          }
        }
      }
    } else {
      this.props.toast({
        title: 'You are not logged in',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  likeState = async () => {
    if (getAccessTokenFromLocal()[0]) {
      if (this.props.getSingleUserData) {
        const user = this.props.getSingleUserData.getSingleUser.data;

        var result = this.props.data.likes.includes(user._id);
        if (result) {
          this.setState({ like: true });
        }
      }
    }
  };

  mainPage() {
    const product = this.props.productDetail;
    const { priceColor } = this.props;

    if (product.name) {
      return (
        <Flex
          onLoad={() => this.likeState()}
          h="auto"
          className={styles.parentFlex}
          borderWidth="1px"
          borderRadius="2xl"
          maxW="5xl"
        >
          <Box className={styles.child1} textAlign="center" p={4}>
            <Flex justify="center" align="start">
              {/* <ImageZoom> */}
              <Image
                width={400}
                src={product.imageUrl[this.state.index]}
                height={400}
                objectFit="contain"
                alt="ProductImage"
                priority
              />
              {/* </ImageZoom> */}
            </Flex>
          </Box>
          <Box className={styles.child2} mt="5">
            <Heading
              color="teal.500"
              fontWeight="bold"
              size="md"
              fontFamily="heading"
              m={5}
            >
              {product.name}
            </Heading>
            <Box m={5}>
              <Text
                as="span"
                mr={1}
                fontSize="lg"
                fontWeight="bold"
                d="inline-block"
                color={priceColor}
                decoration="line-through"
              >
                ${parseFloat(product.price).toFixed(2)}
              </Text>
              <Text
                color="red.500"
                fontWeight="bold"
                ml={1}
                fontSize="2xl"
                d="inline-block"
              >
                ${parseFloat(product.price).toFixed(2)}
              </Text>
            </Box>
            <Text fontWeight="bold" fontSize="sm" color={priceColor} m={5}>
              {product.content}
            </Text>

            <Flex fontWeight="bold" color={priceColor} align="center" m={5}>
              <Heading size="sm" d="inline-block" fontWeight="semibold">
                Stock:
              </Heading>{' '}
              <Badge colorScheme="red" ml={2} rounded="full">
                <Heading m={1} size="sm">
                  {product.stock}
                </Heading>
              </Badge>
            </Flex>

            <Flex fontWeight="bold" color={priceColor} align="center" m={5}>
              <Heading size="sm" d="inline-block" fontWeight="semibold">
                Brand: {product.brand}
              </Heading>
            </Flex>

            <Box m={5}>
              <Box>
                <Flex fontWeight="bold" color={priceColor} align="center">
                  <Heading size="sm" d="inline-block" fontWeight="semibold">
                    Likes:
                  </Heading>
                  <Badge colorScheme="red" ml={2} rounded="full">
                    <Heading m={1} size="sm">
                      {product.likeCount}
                    </Heading>
                  </Badge>
                </Flex>
                <Box mt={3}>
                  {this.state.like ? (
                    <BsHeartFill
                      onClick={() => this.likeOrUndoLikeProduct(product)}
                      style={{ marginLeft: '1px', cursor: 'pointer' }}
                      size={28}
                      color="red"
                    />
                  ) : (
                    <BsHeart
                      style={{ marginLeft: '1px', cursor: 'pointer' }}
                      size={28}
                      onClick={() => this.likeOrUndoLikeProduct(product)}
                      color="red"
                    />
                  )}
                </Box>
              </Box>
            </Box>
            <Flex m={5} justify="center" align="center" direction="row">
              <SimpleGrid
                columns={{ sm: 3, md: 5, lg: 3 }}
                textAlign="center"
                p={2}
                ref={this.myRef}
              >
                {product.imageUrl.map((img, index) => (
                  <Box key={index} className={`${styles.thumbImage}`}>
                    <Image
                      src={img}
                      onClick={() => this.handleTab(index)}
                      key={index}
                      width={100}
                      height={100}
                      alt="ProductImage"
                      objectFit="contain"
                    />
                  </Box>
                ))}
              </SimpleGrid>
            </Flex>
            <Flex justify="center" m={5} align="center">
              <Button colorScheme="yellow" w="98%" onClick={this.addToCart}>
                Add to Cart
              </Button>
            </Flex>
          </Box>
        </Flex>
      );
    }
  }

  render() {
    return (
      <Flex justify="center" className={styles.parent} align="center">
        {this.mainPage()}
      </Flex>
    );
  }
}

export default ProductDetailComponent;
