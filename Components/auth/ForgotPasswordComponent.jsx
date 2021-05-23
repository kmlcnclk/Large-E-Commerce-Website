import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Flex, Heading } from '@chakra-ui/layout';
import React, { Component } from 'react';

class ForgotPasswordComponent extends Component {
  state = {
    email: '',
  };

  forgotPassword = async (e) => {
    e.preventDefault();

    try {
      await this.props.forgotPassword({
        variables: { email: this.state.email },
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
        title: this.props.data.forgotPassword.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      this.props.router.push('/');
    }

    this.setState({ email: '' });
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { formBgMode } = this.props;

    return (
      <Flex h="100vh" align="center" justify="center">
        <Flex
          as="form"
          bg={formBgMode}
          onSubmit={this.forgotPassword}
          p="12"
          rounded={6}
          direction="column"
        >
          <Heading size="lg" textAlign="center" mb={6}>
            Forgot Password
          </Heading>
          <Input
            type="email"
            variant="filled"
            mb={6}
            isRequired
            placeholder="large@gmail.com"
            value={this.state.email}
            onChange={this.changeInput}
            name="email"
          />
          <Button type="submit" colorScheme="teal">
            Send Your Mail
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default ForgotPasswordComponent;
