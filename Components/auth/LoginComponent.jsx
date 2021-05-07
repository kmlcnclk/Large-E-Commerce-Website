import React, { Component } from 'react';
import styles from '../../styles/Login.module.css';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import { addUserToLocal } from '../../LocalStorage/userStorage';
import { addAccessTokenToLocal } from '../../LocalStorage/accessTokenStorage';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';

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
      notifyError(this.props.error.message);
    }

    if (this.props.data) {
      await addUserToLocal(this.props.data.login.data);
      await addAccessTokenToLocal(
        `Bearer: ${this.props.data.login.access_token}`
      );

      notifySuccess('Your login is successful');

      setTimeout(() => {
        this.props.router.push('/');
      }, 2400);
    }
  };

  render() {
    return (
      <div className={styles.login}>
        <div className={styles.loginMainDiv}>
          <form className="form-signin" onSubmit={this.loginFormSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Please login</h1>
            <label htmlFor="inputEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id={styles.loginEmail}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              value={this.props.email}
              onChange={(e) => this.props.setEmail(e.target.value)}
              name="email"
            />
            <label htmlFor="inputPassword" className="sr-only">
              Password
            </label>
            <input
              type="password"
              id={styles.loginPassword}
              className="form-control"
              placeholder="Password"
              name="password"
              required
              value={this.props.password}
              onChange={(e) => this.props.setPassword(e.target.value)}
            />
            <div className="checkbox mb-3">
              <Link href="/forgotPassword">
                <a style={{ textDecoration: 'none', cursor: 'pointer' }}>
                  Forgot password ?
                </a>
              </Link>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Login
            </button>
          </form>
        </div>
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

export default LoginComponent;
