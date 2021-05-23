import React, { Component } from 'react';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { onDrop } from '../../toolbox/UserOnDrop';
import { Center, Flex, Heading } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/input';
import { Button } from '@chakra-ui/button';

class ProfileEditComponent extends Component {
  state = {
    name: '',
    password: '',
    email: '',
    profile_image: {},
    imageState: false,
  };

  async componentDidMount() {
    if (this.props.getSingleUserData) {
      this.setState({
        email: this.props.getSingleUserData.getSingleUser.data.email,
      });
      this.setState({
        name: this.props.getSingleUserData.getSingleUser.data.name,
      });
    }
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileChangeInput = async (e) => {
    const file = e.target.files[0];
    await this.setState({ profile_image: file });
    await this.setState({ imageState: true });
  };

  updateProfileFormSubmit = async (e) => {
    e.preventDefault();

    const user = await this.props.getSingleUserData.getSingleUser.data;

    try {
      await this.props.profileEdit({
        variables: {
          access_token: getAccessTokenFromLocal()[0],
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          profile_image: this.state.imageState
            ? await onDrop(this.state.profile_image)
            : user.profile_image,
        },
      });
    } catch (err) {
      if (err.message.startsWith('E11000')) {
        this.props.toast({
          title: 'Duplicate Key Found : Check Your Input',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        this.props.toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }

    if (this.props.data) {
      this.props.toast({
        title: `${this.props.data.profileEdit.data.name} Updated Profile`,
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
      <Flex h="100vh" justify="center" align="center">
        <Flex
          as="form"
          direction="column"
          bg={formBgMode}
          onSubmit={this.updateProfileFormSubmit}
          rounded={6}
          p="12"
        >
          <Heading textAlign="center" mb={6}>
            Update Profile
          </Heading>
          <Input
            type="text"
            variant="filled"
            placeholder="John Doe"
            mb={3}
            isRequired
            value={this.state.name}
            onChange={this.changeInput}
            name="name"
          />
          <Input
            type="email"
            variant="filled"
            placeholder="large@gmail.com"
            mb={3}
            isRequired
            value={this.state.email}
            onChange={this.changeInput}
            name="email"
          />
          <Input
            type="password"
            variant="filled"
            placeholder="******"
            mb={6}
            isRequired
            onChange={this.changeInput}
            name="password"
          />

          <Center mb={6}>
            <Input
              type="file"
              onChange={this.fileChangeInput}
              d="none"
              ref={this.props.fileImage}
              accept="image/*"
              name="profileImage"
            />
            <Button
              onClick={() => this.props.fileImage.current.click()}
              colorScheme="red"
              w="min"
              textAlign="center"
            >
              Choose Profile Image
            </Button>
          </Center>

          <Button type="submit" colorScheme="teal">
            Update Profile
          </Button>
        </Flex>
      </Flex>
    );
  }
}

export default ProfileEditComponent;
