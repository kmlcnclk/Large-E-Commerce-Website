import React, { Component } from 'react';
import Link from 'next/link';
import { addAccessTokenToLocal } from '../../LocalStorage/accessTokenStorage';
import { Flex, Heading, Input, Button, Text } from '@chakra-ui/react';

class LoginComponent extends Component {
  componentDidMount = () => {
    this.props.router.prefetch('/');
  };

  loginFormSubmit = async (e) => {
    e.preventDefault();

    try {
      await this.props.login({
        variables: {
          email: this.props.email,
          password: this.props.password,
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
      await addAccessTokenToLocal(
        `Bearer: ${this.props.data.login.access_token}`
      );

      this.props.toast({
        title: 'Your login is successful',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      this.props.router.push('/');
    }
  };

  render() {
    const { formBgMode } = this.props;

    return (
      <Flex h="100vh" align="center" justify="center">
        <Flex
          bg={formBgMode}
          p="12"
          as="form"
          onSubmit={this.loginFormSubmit}
          direction="column"
          rounded={6}
        >
          <Heading mb={6} textAlign="center">
            Log in
          </Heading>
          <Input
            type="email"
            placeholder="large@gmail.com"
            mb={3}
            variant="filled"
            isRequired
            value={this.props.email}
            onChange={(e) => this.props.setEmail(e.target.value)}
            name="email"
          />
          <Input
            type="password"
            placeholder="******"
            mb={3}
            variant="filled"
            isRequired
            name="password"
            value={this.props.password}
            onChange={(e) => this.props.setPassword(e.target.value)}
          />

          <Link href="/forgotPassword">
            <Text
              as="span"
              cursor="pointer"
              fontSize="sm"
              textAlign="center"
              mb={6}
              bg={formBgMode}
              _hover={{ textDecoration: 'underline' }}
            >
              Forgot password ?
            </Text>
          </Link>

          <Button type="submit" colorScheme="teal">
            Log in
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default LoginComponent;
