import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Heading } from '@chakra-ui/layout';
import { Flex } from '@chakra-ui/layout';
import React, { Component } from 'react';

class ResetPasswordComponent extends Component {
  state = {
    password: '',
    passwordRepeat: '',
  };

  resetPassword = async (e) => {
    e.preventDefault();

    if (this.state.password === this.state.passwordRepeat) {
      try {
        await this.props.resetPassword({
          variables: {
            password: this.state.password,
            resetPasswordToken: this.props.resetPasswordToken,
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
          title: this.props.data.resetPassword.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        this.props.router.push('/login');
      }
    } else {
      this.props.toast({
        title: 'The passwords you entered do not match',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    this.setState({ password: '' });
    this.setState({ passwordRepeat: '' });
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    const { formBgMode } = this.props;

    return (
      <Flex h="100vh" justify="center" align="center">
        <Flex
          bg={formBgMode}
          direction="column"
          as="form"
          rounded={6}
          p="12"
          onSubmit={this.resetPassword}
        >
          <Heading textAlign="center" mb={6}>
            Reset Password
          </Heading>
          <Input
            type="password"
            variant="filled"
            placeholder="******"
            mb={6}
            isRequired
            value={this.state.password}
            onChange={this.changeInput}
            name="password"
          />
          <Input
            type="password"
            variant="filled"
            placeholder="******"
            mb={6}
            isRequired
            value={this.state.passwordRepeat}
            onChange={this.changeInput}
            name="passwordRepeat"
          />
          <Button colorScheme="teal" type="submit">
            Reset Password
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default ResetPasswordComponent;
