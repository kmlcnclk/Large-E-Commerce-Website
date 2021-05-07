import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from 'styles/ResetPassword.module.css';
import { notifyError, notifySuccess } from '../toolbox/React-Toastify';

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
        notifyError(err.message);
      }

      if (this.props.data) {
        notifySuccess(this.props.data.resetPassword.message);

        setTimeout(() => {
          this.props.router.push('/login');
        }, 2200);
      }
    } else {
      notifyError('The passwords you entered do not match');
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
    return (
      <div className={styles.resetPassword}>
        <div className={styles.resetPasswordMainDiv}>
          <form
            className={styles.formResetPassword}
            onSubmit={this.resetPassword}
          >
            <h1 className="h3 mb-3 font-font-weight-normal">Reset password</h1>
            <label htmlFor="resetPasswordPassword" className="sr-only">
              New Password
            </label>
            <input
              type="password"
              id={styles.resetPasswordPassword}
              className="form-control"
              placeholder="Your new password"
              required
              autoFocus
              value={this.state.password}
              onChange={this.changeInput}
              name="password"
            />
            <input
              type="password"
              id={styles.resetPasswordRepeatPassword}
              className="form-control"
              placeholder="Repeat your new password"
              required
              autoFocus
              value={this.state.passwordRepeat}
              onChange={this.changeInput}
              name="passwordRepeat"
            />
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Reset your password
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

export default ResetPasswordComponent;
