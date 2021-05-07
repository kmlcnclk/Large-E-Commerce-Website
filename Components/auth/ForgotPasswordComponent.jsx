import React, { Component } from 'react';
import styles from 'styles/ForgotPassword.module.css';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { ToastContainer } from 'react-toastify';

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
      notifyError(err.message);
    }

    if (this.props.data) {
      notifySuccess(this.props.data.forgotPassword.message);

      setTimeout(() => {
        this.props.router.push('/');
      }, 2200);
    }

    this.setState({ email: '' });
  };

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  render() {
    return (
      <div className={styles.forgotPassword}>
        <div className={styles.forgotPasswordMainDiv}>
          <form
            className={styles.formForgotPassword}
            onSubmit={this.forgotPassword}
          >
            <h1 className="h3 mb-3 font-font-weight-normal">Forgot password</h1>
            <label htmlFor="forgotPasswordEmail" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              id={styles.forgotPasswordEmail}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
              value={this.state.email}
              onChange={this.changeInput}
              name="email"
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Send your email
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

export default ForgotPasswordComponent;
