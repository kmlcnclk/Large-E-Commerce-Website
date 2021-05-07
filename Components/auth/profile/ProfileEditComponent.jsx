import React, { Component } from 'react';
import styles from 'styles/ProfileEdit.module.css';
import { Form } from 'react-bootstrap';
import {
  addUserToLocal,
  deleteUserFromLocal,
  getUserFromLocal,
} from 'LocalStorage/userStorage';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { onDrop } from '../../toolbox/UserOnDrop';
import { ToastContainer } from 'react-toastify';

class ProfileEditComponent extends Component {
  state = {
    name: '',
    password: '',
    email: '',
    profile_image: {},
    imageState: false,
  };

  async componentDidMount() {
    const user = await getUserFromLocal()[0];

    this.setState({ password: user.password });
    this.setState({ email: user.email });
    this.setState({ name: user.name });
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
    const user = await getUserFromLocal()[0];

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
        notifyError('Duplicate Key Found : Check Your Input');
      } else {
        notifyError(err.message);
      }
    }

    if (this.props.data) {
      await deleteUserFromLocal();

      notifySuccess(this.props.data.profileEdit.data.name + ' Update Profile');
      await addUserToLocal(this.props.data.profileEdit.data);

      setTimeout(() => {
        this.props.router.push('/');
      }, 2200);
    }
  };

  render() {
    return (
      <div className={styles.updateProfile}>
        <div className={styles.updateProfileMainDiv}>
          <Form
            className="form-updateProfile"
            onSubmit={this.updateProfileFormSubmit}
          >
            <h1 className="h3 mb-3 text-center font-weight-normal">
              Please update profile
            </h1>
            <Form.Group>
              <Form.Label htmlFor="inputName" className="sr-only">
                Name
              </Form.Label>
              <Form.Control
                type="text"
                id={styles.updateProfileName}
                className="form-control"
                placeholder="Name"
                required
                value={this.state.name}
                autoFocus
                onChange={this.changeInput}
                name="name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputEmail" className="sr-only">
                Email address
              </Form.Label>
              <Form.Control
                type="email"
                id={styles.updateProfileEmail}
                className="form-control"
                placeholder="Email address"
                required
                value={this.state.email}
                onChange={this.changeInput}
                name="email"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="inputPassword" className="sr-only">
                Password
              </Form.Label>
              <Form.Control
                type="password"
                id={styles.updateProfilePassword}
                className="form-control"
                placeholder="Password"
                name="password"
                required
                onChange={this.changeInput}
              />
            </Form.Group>

            <Form.Group id={styles.updateProfileImageForm}>
              <Form.Label
                htmlFor="inputPassword"
                className="ml-1"
                style={{ fontSize: '0.95rem' }}
              >
                <strong> Profile Image :</strong>
              </Form.Label>
              <Form.File
                onChange={this.fileChangeInput}
                type="file"
                label="Choose profile picture"
                data-browse="Choose"
                custom
                name="profile_image"
              />
            </Form.Group>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Update profile
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

export default ProfileEditComponent;
