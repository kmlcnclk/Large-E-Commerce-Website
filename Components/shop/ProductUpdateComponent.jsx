import { onDrop } from 'Components/toolbox/ProductOnDrop';
import { notifyError, notifySuccess } from 'Components/toolbox/React-Toastify';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import {
  addUserToLocal,
  deleteUserFromLocal,
  getUserFromLocal,
} from 'LocalStorage/userStorage';
import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import styles from '../../styles/ProductUpdate.module.css';

class ProductUpdateComponent extends Component {
  state = {
    name: '',
    content: '',
    price: '',
    product_image: [],
    category: '',
    productImageState: false,
  };

  async componentDidMount() {
    const { data } = this.props.productDetailData.getSingleProduct;
    console.log(data);
    if (data.user._id == getUserFromLocal()[0]._id) {
      this.setState({ name: data.name });
      this.setState({ content: data.content });
      this.setState({ price: data.price });
      this.setState({ product_image: data.imageUrl });
    } else {
      this.props.router.push('/');
    }
  }

  changeInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  fileChangeInput = (e) => {
    const files = e.target.files;
    this.setState({ product_image: files });
    this.setState({ productImageState: true });
  };

  addProductFormSubmit = async (e) => {
    e.preventDefault();

    var category;
    const { data } = this.props.productDetailData.getSingleProduct;

    await this.props.categoryData.getCategories.forEach((c) => {
      if (c.name === this.state.category) {
        category = c._id;
      }
    });
    try {
      await this.props.productUpdate({
        variables: {
          name: this.state.name,
          access_token: getAccessTokenFromLocal()[0],
          category: category,
          content: this.state.content,
          price: parseFloat(this.state.price),
          imageUrl: this.state.productImageState
            ? await onDrop(this.state.product_image)
            : data.imageUrl,
          id: data._id,
        },
      });
    } catch (err) {
      notifyError(err.message);
    }

    if (this.props.data) {
      await deleteUserFromLocal();

      notifySuccess(this.props.data.productUpdate.data.name + ' Added');

      await addUserToLocal(this.props.data.productUpdate.user);

      setTimeout(() => {
        this.props.router.push('/');
      }, 2200);
    }
  };

  render() {
    return (
      <div className={styles.productUpdate}>
        <div className={styles.productUpdateMainDiv}>
          <Form
            className="form-productUpdate"
            onSubmit={this.addProductFormSubmit}
          >
            <h1 className="h3 mb-3 text-center font-weight-normal">
              Product Update
            </h1>
            <Form.Group>
              <Form.Label htmlFor="inputName" className="sr-only">
                Product name
              </Form.Label>
              <Form.Control
                type="text"
                id={styles.productUpdateName}
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
                id={styles.productUpdateContent}
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
                id={styles.productUpdatePrice}
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
                {this.props.categoryData.getCategories.map((category) => (
                  <option name={category.name} key={category._id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group id={styles.productUpdateImageForm}>
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
                name="product_image"
                label="Choose product picture"
                data-browse="Choose"
                multiple
                custom
              />
            </Form.Group>
            <button className="btn btn-lg btn-primary btn-block" type="submit">
              Product Update
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

export default ProductUpdateComponent;
