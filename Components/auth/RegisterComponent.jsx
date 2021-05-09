import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import styles from '../../styles/Register.module.css';
import { addUserToLocal } from '../../LocalStorage/userStorage';
import { addAccessTokenToLocal } from '../../LocalStorage/accessTokenStorage';
import { Form } from 'react-bootstrap';
import { notifySuccess, notifyError } from '../toolbox/React-Toastify';
import { onDrop } from '../toolbox/UserOnDrop';

export default class RegisterComponent extends Component {
  componentDidMount = () => {
    this.props.router.prefetch('/');
  };

  registerFormSubmit = async (e) => {
    e.preventDefault();

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
      notifyError(err.message);
    }

    if (this.props.data) {
      await addUserToLocal(this.props.data.register.data);
      await addAccessTokenToLocal(
        `Bearer: ${this.props.data.register.access_token}`
      );

      notifySuccess('Your registration is successful');

      setTimeout(() => {
        this.props.router.push('/');
      }, 2400);
    }
  };

  fileChangeInput = (e) => {
    const file = e.target.files[0];
    this.props.setImageDrop(file);
  };

  render() {
    return (
      <div className={styles.register}>
        <div className={styles.registerMainDiv}>
          <Form className="form-register" onSubmit={this.registerFormSubmit}>
            <h1 className="h3 mb-3 text-center font-weight-normal">
              Please register
            </h1>
            <Form.Group>
              <Form.Label htmlFor="inputName" className="sr-only">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                id={styles.registerName}
                className="form-control"
                placeholder="Name"
                required
                autoFocus
                value={this.props.name}
                onChange={(e) => this.props.setName(e.target.value)}
                name="name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputEmail" className="sr-only">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                id={styles.registerEmail}
                className="form-control"
                placeholder="Email address"
                required
                value={this.props.email}
                onChange={(e) => this.props.setEmail(e.target.value)}
                name="email"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputPassword" className="sr-only">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                id={styles.registerPassword}
                className="form-control"
                placeholder="Password"
                name="password"
                required
                value={this.props.password}
                onChange={(e) => this.props.setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group id={styles.profileImageRegisterForm}>
              <Form.Label
                htmlFor="inputPassword"
                className="ml-1"
                style={{ fontSize: '0.95rem' }}
              >
                <strong> Profile Image :</strong>
              </Form.Label>
              <Form.File
                id="profileImageRegister"
                onChange={this.fileChangeInput}
                className="form-control"
                required
                label="Profile image choose"
                type="file"
                data-browse="Choose"
                name="profile_image"
                custom
              />
            </Form.Group>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Register
            </button>
          </Form>
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
