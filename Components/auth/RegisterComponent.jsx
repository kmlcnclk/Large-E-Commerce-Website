import React, { Component } from 'react';
import { addAccessTokenToLocal } from '../../LocalStorage/accessTokenStorage';
import { onDrop } from '../toolbox/UserOnDrop';
import { Flex } from '@chakra-ui/layout';
import { Heading } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';
import { Center } from '@chakra-ui/layout';

export default class RegisterComponent extends Component {
  state = {
    profileImageState: false,
  };

  componentDidMount = () => {
    this.props.router.prefetch('/');
  };

  registerFormSubmit = async (e) => {
    e.preventDefault();

    if (this.state.profileImageState) {
      try {
        await this.props.register({
          variables: {
            name: this.props.name,
            email: this.props.email,
            password: this.props.password,
            profile_image: await onDrop(this.props.imageDrop),
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
          `Bearer: ${this.props.data.register.access_token}`
        );

        this.props.toast({
          title: 'Your registration is successful',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });

        this.props.router.push('/');
      }
    } else {
      this.props.toast({
        title: 'Please select a profile image',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  fileChangeInput = (e) => {
    const file = e.target.files[0];
    this.props.setImageDrop(file);
    this.setState({ profileImageState: true });
  };

  render() {
    const { formBgMode } = this.props;

    return (
      <Flex h="100vh" justify="center" align="center">
        <Flex
          as="form"
          direction="column"
          bg={formBgMode}
          onSubmit={this.registerFormSubmit}
          rounded={6}
          p="12"
        >
          <Heading textAlign="center" mb={6}>
            Register
          </Heading>
          <Input
            type="text"
            variant="filled"
            placeholder="John Doe"
            mb={3}
            isRequired
            value={this.props.name}
            onChange={(e) => this.props.setName(e.target.value)}
            name="name"
          />
          <Input
            type="email"
            variant="filled"
            placeholder="large@gmail.com"
            mb={3}
            isRequired
            value={this.props.email}
            onChange={(e) => this.props.setEmail(e.target.value)}
            name="email"
          />
          <Input
            type="password"
            variant="filled"
            placeholder="******"
            mb={6}
            isRequired
            value={this.props.password}
            onChange={(e) => this.props.setPassword(e.target.value)}
            name="password"
          />

          <Center mb={6}>
            <Input
              type="file"
              accept="image/*"
              onChange={this.fileChangeInput}
              d="none"
              ref={this.props.fileInput}
              name="profileImage"
            />
            <Button
              onClick={() => this.props.fileInput.current.click()}
              colorScheme="red"
              w="min"
              textAlign="center"
            >
              Choose Profile Image
            </Button>
          </Center>

          <Button type="submit" colorScheme="teal">
            Register
          </Button>
        </Flex>
      </Flex>
    );
  }
}
