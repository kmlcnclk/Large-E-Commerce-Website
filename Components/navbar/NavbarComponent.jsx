import React from 'react';
import styles from '../../styles/Navi.module.css';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import { RiShoppingCartLine } from 'react-icons/ri';
import { BiMenu } from 'react-icons/bi';
import { BsPerson } from 'react-icons/bs';
import {
  getAccessTokenFromLocal,
  deleteAccessTokenFromLocal,
} from '../../LocalStorage/accessTokenStorage';
import { Button, IconButton } from '@chakra-ui/button';
import { MoonIcon, SearchIcon, SunIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/input';
import { Box, Flex, Heading, List, ListItem } from '@chakra-ui/layout';
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/menu';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from '@chakra-ui/modal';

class NavbarComponent extends React.Component {
  state = {
    isVisible: false,
    res: '',
    sideBar: false,
    menu1: false,
    firstMenu: false,
  };

  clickSearch = (e) => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  changeInput = (e) => {
    this.setState({ res: e.target.value });
  };

  async componentDidMount() {
    if (getAccessTokenFromLocal()[0]) {
      this.props.setLogState(false);
    }

    if (getAccessTokenFromLocal()[0]) {
      const access_token = await getAccessTokenFromLocal(
        'access_token'
      )[0].split(' ')[1];

      jwt.verify(access_token, process.env.JSON_SECRET_KEY, (err, decoded) => {
        if (err) {
          deleteAccessTokenFromLocal();

          this.props.setLogState(true);

          this.props.router.push('/');
        }
      });
    }
  }

  signOut = async () => {
    const token = getAccessTokenFromLocal()[0];

    try {
      await this.props.logout({
        variables: {
          access_token: token ? token : '',
        },
      });
    } catch (err) {
      this.props.toast({
        title: err.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      if (err.message == 'You are not authorized to access this route') {
        this.props.setLogState(true);

        this.props.router.push('/');
      }
    }

    if (this.props.data) {
      await deleteAccessTokenFromLocal();

      this.props.toast({
        title: this.props.data.logout.message,
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      this.props.setLogState(true);

      this.props.router.push('/');
    }
  };

  stateMenu1 = () => {
    this.setState({ menu1: !this.state.menu1 });
    if (this.state.firstMenu) {
      this.setState({ firstMenu: false });
    }
  };

  stateFirstMenu = async () => {
    this.setState({ firstMenu: !this.state.firstMenu });

    await this.props.category();
  };

  render() {
    const {
      colorMode,
      bgIconColor,
      toggleColorMode,
      onOpen,
      isOpen,
      onClose,
      bgIconColorBurger,
    } = this.props;
    return (
      <Box bg={colorMode} p={2}>
        <Box className={styles.normalNavi}>
          <Flex justify="space-between" align="center">
            <Link href="/">
              <Heading
                fontFamily="monospace"
                cursor="pointer"
                as="h4"
                size="lg"
                ml={2}
                mr={2}
                fontWeight="extrabold"
              >
                Large
              </Heading>
            </Link>
            <InputGroup ml={3} mr={3}>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon color="gray.300" />}
              />
              <Input
                type="text"
                placeholder="Search"
                variant="filled"
                onChange={(e) => this.changeInput(e)}
              />
              <InputRightElement w="4.5rem" ml="2">
                <Link
                  href={{
                    pathname: '/product',
                    query: { search: `${this.state.res}` },
                  }}
                >
                  <Button h="1.75rem" size="sm">
                    Search
                  </Button>
                </Link>
              </InputRightElement>
            </InputGroup>
            <Flex as="div" ml={2} mr={2}>
              {this.props.logState ? (
                <Flex>
                  <Link href="/register">
                    <Button size="sm" m={1} variant="customRed">
                      Register
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button size="sm" m={1} variant="customRed">
                      Login
                    </Button>
                  </Link>
                </Flex>
              ) : (
                <Flex as="div">
                  <Button
                    onClick={this.signOut}
                    size="sm"
                    m={1}
                    variant="customRed"
                  >
                    Logout
                  </Button>

                  <Link href="/cart">
                    <IconButton
                      bg={bgIconColor}
                      ml={1}
                      mr={1}
                      icon={<RiShoppingCartLine size={23} />}
                    />
                  </Link>

                  <Menu>
                    {({ isOpen }) => (
                      <>
                        <MenuButton
                          as={IconButton}
                          isActive={isOpen}
                          bg={bgIconColor}
                          icon={<BsPerson size={23} />}
                        />

                        <MenuList zIndex="2">
                          <Link href="/profile">
                            <MenuItem>Profile</MenuItem>
                          </Link>
                          <MenuDivider />
                          <Link href="/profileEdit">
                            <MenuItem>Profile Edit </MenuItem>
                          </Link>
                          <MenuDivider />
                          <Link href="/productAdd">
                            <MenuItem>Product Add </MenuItem>
                          </Link>
                          <MenuDivider />
                          <Link href="/productsSold">
                            <MenuItem>Products Sold </MenuItem>
                          </Link>
                          <MenuDivider />
                          <Link href="/myOrders">
                            <MenuItem>My Orders </MenuItem>
                          </Link>
                          <MenuDivider />
                          <Link href="/myLikes">
                            <MenuItem>My Likes </MenuItem>
                          </Link>
                        </MenuList>
                      </>
                    )}
                  </Menu>
                </Flex>
              )}

              <IconButton
                ml={1}
                onClick={toggleColorMode}
                bg={bgIconColor}
                icon={
                  colorMode == 'light' ? (
                    <MoonIcon color="gray.500" />
                  ) : (
                    <SunIcon />
                  )
                }
              />
            </Flex>
          </Flex>
        </Box>
        <Box className={styles.burgerNavi}>
          <Flex justify="space-between" align="center">
            <IconButton
              icon={<BiMenu size={23} />}
              bg={bgIconColor}
              onClick={onOpen}
            />
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader
                  fontSize="2xl"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  Large
                </DrawerHeader>
                <DrawerBody>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents="none"
                      children={<SearchIcon color="gray.300" />}
                    />
                    <Input
                      type="text"
                      placeholder="Search"
                      variant="filled"
                      onChange={(e) => this.changeInput(e)}
                    />
                    <InputRightElement w="4.5rem" ml="2">
                      <Link
                        href={{
                          pathname: '/product',
                          query: { search: `${this.state.res}` },
                        }}
                      >
                        <Button h="1.75rem" size="sm">
                          Search
                        </Button>
                      </Link>
                    </InputRightElement>
                  </InputGroup>

                  <Box mt={3}>
                    <Flex
                      justify="center"
                      align="center"
                      borderRadius={10}
                      p={3}
                      color="white"
                      mb={2}
                      bg="red.500"
                      cursor="pointer"
                      onClick={this.stateFirstMenu}
                    >
                      Categories
                    </Flex>
                    {this.state.firstMenu && this.props.categoryData ? (
                      <List spacing={2}>
                        {this.props.categoryData.getCategories.map(
                          (category) => (
                            <Link
                              key={category._id}
                              href={`/category/${category.slug}`}
                            >
                              <ListItem
                                textAlign="center"
                                borderRadius={10}
                                p={3}
                                color="white"
                                mb={2}
                                cursor="pointer"
                                bg="yellow.500"
                                onClick={() => {
                                  this.stateMenu1();
                                  onClose();
                                }}
                              >
                                {category.name}
                              </ListItem>
                            </Link>
                          )
                        )}
                      </List>
                    ) : null}
                  </Box>
                </DrawerBody>

                <DrawerFooter>
                  <Flex as="div" justify="center" width="100%" ml={2} mr={2}>
                    {this.props.logState ? (
                      <Flex justify="center" width="100%" align="center">
                        <Link href="/register">
                          <Button
                            size="sm"
                            width="50%"
                            mr={1}
                            variant="customRed"
                          >
                            Register
                          </Button>
                        </Link>
                        <Link href="/login">
                          <Button
                            size="sm"
                            width="50%"
                            ml={1}
                            variant="customRed"
                          >
                            Login
                          </Button>
                        </Link>
                      </Flex>
                    ) : (
                      <Flex align="center" width="100%" justify="space-between">
                        <Link href="/cart">
                          <IconButton
                            bg={bgIconColorBurger}
                            mr={2}
                            icon={<RiShoppingCartLine size={20} />}
                          />
                        </Link>
                        <Button
                          onClick={() => {
                            this.signOut();
                            onClose();
                          }}
                          size="sm"
                          variant="customRed"
                          width="70%"
                        >
                          Logout
                        </Button>
                        <IconButton
                          ml={2}
                          onClick={toggleColorMode}
                          bg={bgIconColorBurger}
                          icon={
                            colorMode == 'light' ? (
                              <MoonIcon color="gray.500" />
                            ) : (
                              <SunIcon />
                            )
                          }
                        />
                      </Flex>
                    )}
                  </Flex>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
            <Link href="/">
              <Heading
                fontFamily="monospace"
                cursor="pointer"
                as="h4"
                size="lg"
                ml={2}
                mr={2}
                fontWeight="extrabold"
              >
                Large
              </Heading>
            </Link>

            {this.props.logState ? (
              <IconButton
                ml={1}
                onClick={toggleColorMode}
                bg={bgIconColor}
                icon={
                  colorMode == 'light' ? (
                    <MoonIcon color="gray.500" />
                  ) : (
                    <SunIcon />
                  )
                }
              />
            ) : (
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      as={IconButton}
                      isActive={isOpen}
                      bg={bgIconColor}
                      icon={<BsPerson size={20} />}
                    />

                    <MenuList zIndex="2">
                      <Link href="/profile">
                        <MenuItem>Profile</MenuItem>
                      </Link>
                      <MenuDivider />
                      <Link href="/profileEdit">
                        <MenuItem>Profile Edit </MenuItem>
                      </Link>
                      <MenuDivider />
                      <Link href="/productAdd">
                        <MenuItem>Product Add </MenuItem>
                      </Link>
                      <MenuDivider />
                      <Link href="/productsSold">
                        <MenuItem>Products Sold </MenuItem>
                      </Link>
                      <MenuDivider />
                      <Link href="/myOrders">
                        <MenuItem>My Orders </MenuItem>
                      </Link>
                      <MenuDivider />
                      <Link href="/myLikes">
                        <MenuItem>My Likes </MenuItem>
                      </Link>
                    </MenuList>
                  </>
                )}
              </Menu>
            )}
          </Flex>
        </Box>
      </Box>
    );
  }
}

export default NavbarComponent;
