import React, { Component } from 'react';
import styles from 'styles/ProductAdd.module.css';
import { Form } from 'react-bootstrap';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { addUserToLocal, deleteUserFromLocal } from 'LocalStorage/userStorage';
import { ToastContainer } from 'react-toastify';
import { onDrop } from '../toolbox/ProductOnDrop';

class ProductAddComponent extends Component {
  state = {
    name: '',
    content: '',
    price: '',
    product_image: [],
    category: '',
  };

  changeInput = async (e) => {
    await this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileChangeInput = async (e) => {
    const files = e.target.files;
    await this.setState({ product_image: files });
  };

  addProductFormSubmit = async (e) => {
    e.preventDefault();

    var category;

    await this.props.categoryData.getCategories.forEach((c) => {
      if (c.name === this.state.category) {
        category = c._id;
      }
    });

    try {
      await this.props.productAdd({
        variables: {
          name: this.state.name,
          access_token: getAccessTokenFromLocal()[0],
          category: category,
          content: this.state.content,
          price: parseFloat(this.state.price),
          imageUrl: await onDrop(this.state.product_image),
        },
      });
    } catch (err) {
      notifyError(err.message);
    }
    if (this.props.data) {
      await deleteUserFromLocal();

      notifySuccess(this.props.data.productAdd.data.name + ' Added');

      await addUserToLocal(this.props.data.productAdd.user);

      setTimeout(() => {
        this.props.router.push('/');
      }, 2200);
    }
  };

  render() {
    const { categoryData } = this.props;

    return (
      <div className={styles.productAdd}>
        <div className={styles.productAddMainDiv}>
          <Form
            className="form-productAdd"
            onSubmit={this.addProductFormSubmit}
          >
            <h1 className="h3 mb-3 text-center font-weight-normal">
              Product Add
            </h1>
            <Form.Group>
              <Form.Label htmlFor="inputName" className="sr-only">
                Product name
              </Form.Label>
              <Form.Control
                type="text"
                id={styles.productAddName}
                className="form-control"
                placeholder="Product name"
                required
                value={this.state.name}
                autoFocus
                onChange={this.changeInput}
                name="name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="inputEmail" className="sr-only">
                Product content
              </Form.Label>
              <Form.Control
                type="text"
                id={styles.productAddContent}
                className="form-control"
                placeholder="Product content"
                required
                value={this.state.content}
                onChange={this.changeInput}
                name="content"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputPassword" className="sr-only">
                Product price
              </Form.Label>
              <Form.Control
                type="number"
                id={styles.productAddPrice}
                className="form-control"
                placeholder="Price"
                name="price"
                value={this.state.price}
                required
                onChange={this.changeInput}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputPassword" className="sr-only">
                Product category
              </Form.Label>
              <Form.Control
                as="select"
                className="form-control"
                placeholder="Category"
                required
                name="category"
                onChange={this.changeInput}
                defaultValue="Select Category"
                custom
              >
                <option disabled>Select Category</option>
                {categoryData.getCategories.map((category) => (
                  <option name={category.name} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group id={styles.productAddImageForm}>
              <Form.Label
                htmlFor="inputPassword"
                className="ml-1"
                style={{ fontSize: '0.95rem' }}
              >
                <strong> Product Image :</strong>
              </Form.Label>
              <Form.File
                onChange={this.fileChangeInput}
                type="file"
                label="Choose product picture"
                name="product_image"
                multiple
                data-browse="Choose"
                custom
                required
              />
            </Form.Group>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Product Add
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

export default ProductAddComponent;
