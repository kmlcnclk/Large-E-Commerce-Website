import React, { Component } from 'react';
import { onDrop } from 'Components/toolbox/ProductOnDrop';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { Center, Flex, Heading, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Textarea } from '@chakra-ui/textarea';
import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from '@chakra-ui/number-input';
import { Select } from '@chakra-ui/select';
import { Button } from '@chakra-ui/button';
import styles from 'styles/ProductUpdate.module.css';

class ProductUpdateComponent extends Component {
  state = {
    name: '',
    content: '',
    price: 0,
    product_image: [],
    category: '',
    productImageState: false,
    priceState: false,
    stock: 0,
    stockState: false,
    brand: '',
  };

  async componentDidMount() {
    const { data } = this.props.productDetailData.getSingleProduct;
    console.log(data);
    if (this.props.getSingleUserData) {
      const user = await this.props.getSingleUserData.getSingleUser.data;
      if (data.user._id == user._id) {
        this.setState({ name: data.name });
        this.setState({ content: data.content });
        this.setState({ price: data.price });
        this.setState({ stock: data.stock });
        this.setState({ product_image: data.imageUrl });
        this.setState({ priceState: true });
        this.setState({ stockState: true });
        this.setState({ brand: data.brand });
      } else {
        this.props.router.push('/');
      }
    }
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  changeNumberInput1 = async (valueAsNumber) => {
    await this.setState({
      price: valueAsNumber,
    });
  };

  changeNumberInput2 = async (valueAsNumber) => {
    await this.setState({
      stock: valueAsNumber,
    });
  };

  fileChangeInput = (e) => {
    const files = e.target.files;
    this.setState({ product_image: files });
    this.setState({ productImageState: true });
  };

  updateProductFormSubmit = async (e) => {
    e.preventDefault();

    var category;
    const { data } = this.props.productDetailData.getSingleProduct;

    await this.props.categoryData.getCategories.forEach((c) => {
      if (c.name === this.state.category) {
        category = c._id;
      }
    });
    try {
      await this.props.productUpdate({
        variables: {
          name: this.state.name,
          access_token: getAccessTokenFromLocal()[0],
          category: category,
          content: this.state.content,
          price: this.state.price,
          imageUrl: this.state.productImageState
            ? await onDrop(this.state.product_image)
            : data.imageUrl,
          id: data._id,
          stock: this.state.stock,
          brand: this.state.brand,
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

    if (this.props.data) {
      this.props.toast({
        title: `${this.props.data.productUpdate.data.name} Updated Product`,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      this.props.router.push('/');
    }
  };

  render() {
    const { categoryData, fileImages, formBgMode } = this.props;

    return (
      <Flex className={styles.flexDiv} justify="center" align="center">
        <Flex
          bg={formBgMode}
          as="form"
          onSubmit={this.updateProductFormSubmit}
          rounded={6}
          className={styles.mainFlex}
        >
          <Flex justify="center" direction="column">
            <Heading textAlign="center" mb={6}>
              Product Update
            </Heading>
            <Flex className={styles.secondDiv}>
              <Flex m={3} direction="column">
                <Flex direction="column" mb={3}>
                  <Text ml={2} mb={3} fontWeight="hairline">
                    Name
                  </Text>
                  <Input
                    type="text"
                    variant="outline"
                    placeholder="Iphone 10"
                    mb={3}
                    isRequired
                    value={this.state.name}
                    onChange={this.changeInput}
                    name="name"
                  />
                </Flex>
                <Flex direction="column" mb={3}>
                  <Text ml={2}fontWeight="hairline" mb={3}>
                    Description
                  </Text>
                  <Textarea
                    mb={3}
                    placeholder="Product description"
                    resize="both"
                    variant="outline"
                    size="md"
                    isRequired
                    value={this.state.content}
                    onChange={this.changeInput}
                    name="content"
                  />
                </Flex>
                <Flex direction="column" mb={3}>
                  <Text ml={2}fontWeight="hairline" mb={3}>
                    Price
                  </Text>
                  {this.state.priceState ? (
                    <NumberInput
                      defaultValue={this.state.price}
                      min={0}
                      precision={2}
                      step={0.1}
                      mb={3}
                      isRequired
                      variant="outline"
                      rounded={10}
                      name="price"
                      onChange={(valueAsString, valueAsNumber) =>
                        this.changeNumberInput1(valueAsNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  ) : null}
                </Flex>
              </Flex>
              <Flex m={3} direction="column" justify="center">
                {' '}
                <Flex direction="column" mb={3}>
                  <Text ml={2}fontWeight="hairline" mb={3}>
                    Brand
                  </Text>
                  <Input
                    type="text"
                    variant="outline"
                    placeholder="Apple"
                    mb={3}
                    isRequired
                    value={this.state.brand}
                    onChange={this.changeInput}
                    name="brand"
                  />
                </Flex>
                <Flex direction="column" mb={3}>
                  <Text ml={2}fontWeight="hairline" mb={3}>
                    Stock
                  </Text>{' '}
                  {this.state.stockState ? (
                    <NumberInput
                      defaultValue={this.state.stock}
                      min={0}
                      precision={0}
                      step={1}
                      mb={3}
                      isRequired
                      variant="outline"
                      rounded={10}
                      name="stock"
                      onChange={(valueAsString, valueAsNumber) =>
                        this.changeNumberInput2(valueAsNumber)
                      }
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  ) : null}
                </Flex>
                <Select
                  variant="outline"
                  mb={6}
                  placeholder="Select Category"
                  isRequired
                  name="category"
                  onChange={this.changeInput}
                >
                  {categoryData.getCategories.map((category) => (
                    <option name={category.name} key={category._id}>
                      {category.name}
                    </option>
                  ))}
                </Select>{' '}
                <Center mb={6}>
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    d="none"
                    ref={fileImages}
                    onChange={this.fileChangeInput}
                    name="productImage"
                  />
                  <Button
                    colorScheme="red"
                    onClick={() => fileImages.current.click()}
                    w="min"
                    textAlign="center"
                  >
                    Choose Product Images
                  </Button>
                </Center>
              </Flex>{' '}
            </Flex>
            <Button colorScheme="teal" type="submit">
              Product Update
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}

export default ProductUpdateComponent;
