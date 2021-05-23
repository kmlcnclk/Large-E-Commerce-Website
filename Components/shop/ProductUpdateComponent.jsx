import React, { Component } from 'react';
import { onDrop } from 'Components/toolbox/ProductOnDrop';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { Center, Flex, Heading } from '@chakra-ui/layout';
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

class ProductUpdateComponent extends Component {
  state = {
    name: '',
    content: '',
    price: 0,
    product_image: [],
    category: '',
    productImageState: false,
    priceState: false,
  };

  async componentDidMount() {
    const { data } = this.props.productDetailData.getSingleProduct;

    if (this.props.getSingleUserData) {
      const user = await this.props.getSingleUserData.getSingleUser.data;
      if (data.user._id == user._id) {
        this.setState({ name: data.name });
        this.setState({ content: data.content });
        this.setState({ price: data.price });
        this.setState({ product_image: data.imageUrl });
        this.setState({ priceState: true });
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

  changeNumberInput = async (valueAsString, valueAsNumber) => {
    await this.setState({
      price: valueAsNumber,
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
      <Flex h="100vh" justify="center" align="center">
        <Flex
          bg={formBgMode}
          as="form"
          onSubmit={this.updateProductFormSubmit}
          p="12"
          rounded={6}
          direction="column"
        >
          <Heading textAlign="center" mb={6}>
            Product Update
          </Heading>
          <Input
            type="text"
            variant="filled"
            placeholder="Iphone 10"
            mb={3}
            isRequired
            value={this.state.name}
            onChange={this.changeInput}
            name="name"
          />
          <Textarea
            mb={3}
            placeholder="Product description"
            resize="both"
            variant="filled"
            size="md"
            isRequired
            value={this.state.content}
            onChange={this.changeInput}
            name="content"
          />
          {this.state.priceState ? (
            <NumberInput
              defaultValue={this.state.price}
              min={0}
              precision={2}
              step={0.1}
              mb={3}
              isRequired
              variant="filled"
              rounded={10}
              name="price"
              onChange={(valueAsString, valueAsNumber) =>
                this.changeNumberInput(valueAsString, valueAsNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          ) : null}
          <Select
            variant="filled"
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
          </Select>

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
          <Button colorScheme="teal" type="submit">
            Product Update
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default ProductUpdateComponent;
