import React from 'react';
import styles from '../../styles/Navi.module.css';
import posed from 'react-pose';
import Link from 'next/link';
import jwt from 'jsonwebtoken';
import { RiShoppingCartLine } from 'react-icons/ri';
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai';
import { BsPerson, BsFillPersonFill } from 'react-icons/bs';
import {
  getUserFromLocal,
  deleteUserFromLocal,
} from '../../LocalStorage/userStorage';
import {
  getAccessTokenFromLocal,
  deleteAccessTokenFromLocal,
} from '../../LocalStorage/accessTokenStorage';
import { ToastContainer } from 'react-toastify';
import { Dropdown } from 'react-bootstrap';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { slide as Menu } from 'react-burger-menu';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons';

const Animation = posed.div({
  visible: {
    opacity: 1,
    applyAtStart: {
      display: 'block',
    },
  },
  hidden: {
    opacity: 0,
    applyAtEnd: {
      display: 'none',
    },
  },
});

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    style={{ color: 'black' }}
  >
    {children}
  </a>
));

class NavbarComponent extends React.Component {
  state = {
    isVisible: false,
    res: '',
    sideBar: false,
    menu1: false,
    menu2: false,
    firstMenu: false,
  };

  clickSearch = (e) => {
    this.setState({ isVisible: !this.state.isVisible });
  };

  changeInput = (e) => {
    this.setState({ res: e.target.value });
  };

  async componentDidMount() {
    if (getUserFromLocal('User')[0]) {
      this.props.setLogState(false);
    }

    if (getAccessTokenFromLocal()[0]) {
      const access_token = await getAccessTokenFromLocal(
        'access_token'
      )[0].split(' ')[1];

      jwt.verify(access_token, process.env.JSON_SECRET_KEY, (err, decoded) => {
        if (err) {
          deleteUserFromLocal();
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
      notifyError(this.props.error.message);
      if (
        this.props.error.message ==
        'You are not authorized to access this route'
      ) {
        this.props.setLogState(true);
        setTimeout(() => {
          this.props.router.push('/');
        }, 2400);
      }
    }

    if (this.props.data) {
      await deleteUserFromLocal();
      await deleteAccessTokenFromLocal();
      this.stateMenu2();

      notifySuccess(this.props.data.logout.message);

      this.props.setLogState(true);
      setTimeout(() => {
        this.props.router.push('/');
      }, 2400);
    }
  };

  stateMenu1 = () => {
    this.setState({ menu1: !this.state.menu1 });
    if (this.state.firstMenu) {
      this.setState({ firstMenu: false });
    }

    if (this.state.menu2) {
      this.setState({ menu2: false });
    }
  };
  stateMenu2 = () => {
    this.setState({ menu2: !this.state.menu2 });
    if (this.state.menu1) {
      this.setState({ menu1: false });
    }
  };
  stateFirstMenu = async () => {
    this.setState({ firstMenu: !this.state.firstMenu });

    await this.props.category();
  };

  render() {
    return (
      <div>
        <header
          className={styles.blogHeader + ' py-3 border'}
          style={{ borderRadius: '0.5rem' }}
        >
          <div className="row flex-nowrap justify-content-between align-items-center">
            <div className="pl-4 col-5 pt-1">
              {this.props.logState ? (
                <div>
                  <Link href="/register">
                    <button type="button" className="btn btn-danger btn-sm m-1">
                      Register
                    </button>
                  </Link>
                  <Link href="/login">
                    <button type="button" className="btn btn-danger btn-sm m-1">
                      Login
                    </button>
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  className="btn btn-danger btn-sm m-1"
                  onClick={this.signOut}
                >
                  Logout
                </button>
              )}
            </div>

            <div className="col-2 text-center">
              <Link href="/">
                <a className="text-decoration-none text-dark">
                  <strong className={styles.blogHeaderLogo}>Large </strong>
                </a>
              </Link>
            </div>
            <div className="col-5 pr-4 d-flex justify-content-end align-items-center">
              <Animation
                className="mr-4"
                pose={this.state.isVisible ? 'visible' : 'hidden'}
              >
                <div className="input-group m-2 bold">
                  <input
                    type="text"
                    className="form-control"
                    id="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{ backgroundColor: '#f2f2f2' }}
                    aria-describedby="Search"
                    onChange={(e) => this.changeInput(e)}
                  />
                  <div className="input-group-append">
                    <Link
                      href={{
                        pathname: '/product',
                        query: { search: `${this.state.res}` },
                      }}
                    >
                      <a className="btn btn-danger" type="button">
                        Search
                      </a>
                    </Link>
                  </div>
                </div>
              </Animation>
              <div className="border mr-1" style={{ borderRadius: '1rem' }}>
                <div
                  onClick={this.clickSearch}
                  className="m-2 bold d-inline-block"
                >
                  <AiOutlineSearch
                    size={23}
                    style={{ padding: '1px', cursor: 'pointer' }}
                  />
                </div>
                <div className="m-2 bold d-inline-block">
                  <Link href="/cart">
                    <a style={{ color: 'black' }}>
                      <RiShoppingCartLine
                        style={{ padding: '1px', cursor: 'pointer' }}
                        size={23}
                      />
                    </a>
                  </Link>
                </div>
                {this.props.logState ? null : (
                  <div className="m-2 bold d-inline-block">
                    <Dropdown className="dropdown">
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <BsPerson
                          size={23}
                          style={{ padding: '1px', cursor: 'pointer' }}
                        />
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="dropdown-menu bg-light dropdown-menu-right"
                        style={{
                          margin: '0.8rem',
                          marginRight: '0rem',
                          padding: '0',
                        }}
                        align="right"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link href="/profile">
                          <a
                            className="dropdown-item bg-light text-dark mt-3"
                            style={{ fontSize: '0.8rem' }}
                          >
                            Profile
                          </a>
                        </Link>
                        <hr className="bg-dark-gray"></hr>
                        <Link href="/profileEdit">
                          <a
                            className="dropdown-item bg-light text-dark"
                            style={{ fontSize: '0.8rem' }}
                          >
                            Profile Edit
                          </a>
                        </Link>
                        <hr className="bg-dark-gray"></hr>
                        <Link href="/productAdd">
                          <a
                            className="dropdown-item bg-light text-dark mb-3"
                            style={{ fontSize: '0.8rem' }}
                          >
                            Product Add
                          </a>
                        </Link>
                        <hr className="bg-dark-gray"></hr>
                        <Link href="/productsSold">
                          <a
                            className="dropdown-item bg-light text-dark mb-3"
                            style={{ fontSize: '0.8rem' }}
                          >
                            Products Sold
                          </a>
                        </Link>
                        <hr className="bg-dark-gray"></hr>
                        <Link href="/myOrders">
                          <a
                            className="dropdown-item bg-light text-dark mb-3"
                            style={{ fontSize: '0.8rem' }}
                          >
                            My Orders
                          </a>
                        </Link>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
        <header
          className={styles.burgerNavi + ' py-3 border'}
          style={{ borderRadius: '0.5rem' }}
        >
          <div className="row flex-nowrap justify-content-between align-items-center pl-4 pr-4">
            <div className="col-3 text-center">
              <FaBars
                size={21}
                onClick={this.stateMenu1}
                style={{ padding: '1px', cursor: 'pointer' }}
              />
            </div>
            <div className="col-6 text-center">
              <Link href="/">
                <a className="text-decoration-none text-dark">
                  <strong className={styles.blogHeaderLogo}>Large </strong>
                </a>
              </Link>
            </div>
            <div className="text-center d-inline-block col-3">
              <div className="m-2 bold d-inline">
                <BsFillPersonFill
                  style={{ padding: '1px', cursor: 'pointer' }}
                  size={23}
                  onClick={this.stateMenu2}
                />
              </div>
            </div>
          </div>
        </header>

        {this.state.menu1 ? (
          <div>
            <div className={`input-group input-group-sm ${styles.search}`}>
              <input
                type="text"
                className="form-control"
                id="search"
                style={{ backgroundColor: '#f2f2f2' }}
                placeholder="Search"
                aria-label="Search"
                aria-describedby="Search"
                onChange={(e) => this.changeInput(e)}
              />
              <div className="input-group-append">
                <Link
                  href={{
                    pathname: '/product',
                    query: { search: `${this.state.res}` },
                  }}
                >
                  <a
                    className="btn-sm"
                    style={{
                      backgroundColor: '#f55656',
                      color: '#f2f2f2',
                      textDecoration: 'none',
                    }}
                    type="button"
                  >
                    Search
                  </a>
                </Link>
              </div>
            </div>
            <div
              className={`border p-3 ${styles.categories}`}
              onClick={this.stateFirstMenu}
              style={{ fontSize: '1.1rem', fontWeight: '640' }}
            >
              Categories
            </div>
            {this.state.firstMenu && this.props.categoryData ? (
              <div>
                {this.props.categoryData.getCategories.map((category) => (
                  <Link key={category._id} href={`/category/${category.slug}`}>
                    <div
                      onClick={this.stateMenu1}
                      className={`border p-3 ${styles.category}`}
                    >
                      {category.name}
                    </div>
                  </Link>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {this.state.menu2 ? (
          <div>
            {this.props.logState ? (
              <div>
                <Link href="/register">
                  <div
                    className={`border p-3 ${styles.account}`}
                    onClick={this.stateMenu2}
                  >
                    Register
                  </div>
                </Link>
                <Link href="/login">
                  <div
                    className={`border p-3 ${styles.account}`}
                    onClick={this.stateMenu2}
                  >
                    Login
                  </div>
                </Link>
              </div>
            ) : (
              <div
                className={`border p-3 ${styles.account}`}
                onClick={this.signOut}
              >
                Logout
              </div>
            )}

            {this.props.logState ? null : (
              <div>
                <Link href="/cart">
                  <div
                    className={`border p-3 ${styles.profile}`}
                    onClick={this.stateMenu2}
                  >
                    Cart
                  </div>
                </Link>

                <Link href="/profile">
                  <div
                    className={`border p-3 ${styles.profile}`}
                    onClick={this.stateMenu2}
                  >
                    Profile
                  </div>
                </Link>

                <Link href="/profileEdit">
                  <div
                    className={`border p-3 ${styles.profile}`}
                    onClick={this.stateMenu2}
                  >
                    Profile Edit
                  </div>
                </Link>

                <Link href="/productAdd">
                  <div
                    className={`border p-3 ${styles.profile}`}
                    onClick={this.stateMenu2}
                  >
                    Product Add
                  </div>
                </Link>
                <Link href="/productsSold">
                  <div
                    className={`border p-3 ${styles.profile}`}
                    onClick={this.stateMenu2}
                  >
                    Products Sold
                  </div>
                </Link>
                <Link href="/myOrders">
                  <div
                    className={`border p-3 ${styles.profile}`}
                    onClick={this.stateMenu2}
                  >
                    My Orders
                  </div>
                </Link>
              </div>
            )}
          </div>
        ) : null}

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover={false}
        />
      </div>
    );
  }
}

export default NavbarComponent;
