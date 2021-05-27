import React, { Component } from 'react';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { onDrop } from '../toolbox/ProductOnDrop';
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
import styles from 'styles/ProductAdd.module.css';

class ProductAddComponent extends Component {
  state = {
    name: '',
    content: '',
    price: 0,
    product_image: [],
    category: '',
    stock: 0,
    productImageState: false,
    brand: '',
  };

  changeInput = async (e) => {
    await this.setState({
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

  fileChangeInput = async (e) => {
    const files = e.target.files;
    await this.setState({ product_image: files });
    this.setState({ productImageState: true });
  };

  addProductFormSubmit = async (e) => {
    e.preventDefault();

    if (this.state.productImageState) {
      var category;

      await this.props.categoryData.getCategories.forEach((c) => {
        if (c.name === this.state.category) {
          category = c._id;
        }
      });

      try {
        await this.props.productAdd({
          variables: {
            name: this.state.name,
            access_token: getAccessTokenFromLocal()[0],
            category: category,
            content: this.state.content,
            price: parseFloat(this.state.price),
            imageUrl: await onDrop(this.state.product_image),
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
          title: `${this.props.data.productAdd.data.name} Added`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });

        this.props.router.push('/');
      }
    } else {
      this.props.toast({
        title: 'Please select a product images',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  render() {
    const { categoryData, fileImages, formBgMode } = this.props;
    return (
      <Flex className={styles.flexDiv} justify="center" align="center">
        <Flex
          bg={formBgMode}
          as="form"
          onSubmit={this.addProductFormSubmit}
          rounded={6}
          className={styles.mainFlex}
        >
          <Flex justify="center" direction="column">
            <Heading textAlign="center" mb={6}>
              Product Add
            </Heading>
            <Flex className={styles.secondDiv}>
              <Flex m={3} direction="column">
                <Heading size="sm" color="teal.500" textAlign="center" mb={3}>
                  &bull; Name &bull;
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
                <Heading size="sm" color="teal.500" textAlign="center" mb={3}>
                  &bull; Description &bull;
                </Heading>
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
                <Heading size="sm" color="teal.500" textAlign="center" mb={3}>
                  &bull; Price &bull;
                </Heading>
                <NumberInput
                  defaultValue={0}
                  min={0}
                  precision={2}
                  step={0.1}
                  mb={3}
                  isRequired
                  variant="filled"
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
                <Heading size="sm" color="teal.500" textAlign="center" mb={3}>
                  &bull; Brand &bull;
                </Heading>
                <Input
                  type="text"
                  variant="filled"
                  placeholder="Apple"
                  mb={3}
                  isRequired
                  value={this.state.brand}
                  onChange={this.changeInput}
                  name="brand"
                />
              </Flex>
              <Flex m={3} justify="center" direction="column">
                <Heading size="sm" color="teal.500" textAlign="center" mb={3}>
                  &bull; Stock &bull;
                </Heading>
                <NumberInput
                  defaultValue={0}
                  min={0}
                  precision={0}
                  step={1}
                  mb={3}
                  isRequired
                  variant="filled"
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
                <Heading size="sm" color="teal.500" textAlign="center" mb={3}>
                  &bull; Category &bull;
                </Heading>
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
            </Flex>{' '}
            <Button colorScheme="teal" type="submit">
              Product Add
            </Button>
          </Flex>{' '}
        </Flex>
      </Flex>
    );
  }
}

export default ProductAddComponent;
