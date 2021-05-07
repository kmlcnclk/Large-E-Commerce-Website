import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import { addUserToLocal, deleteUserFromLocal } from 'LocalStorage/userStorage';
import React, { PureComponent } from 'react';
import { Form } from 'react-bootstrap';
import { RiCloseLine } from 'react-icons/ri';
import ReactCrop from 'react-image-crop';
import { ToastContainer } from 'react-toastify';
import styles from 'styles/ImageCrop.module.css';
import { notifyError, notifySuccess } from './React-Toastify';
import { onDrop } from './UserOnDrop';

class ImageCropComponent extends PureComponent {
  state = {
    src: null,
    crop: {
      unit: '%',
      width: 30,
      aspect: 1 / 1,
    },
    btnState: false,
    blobState: '',
    imageFileUrl: '',
    profile_image: '',
  };

  onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () =>
        this.setState({ src: reader.result })
      );
      reader.readAsDataURL(e.target.files[0]);
      this.setState({ profile_image: e.target.files[0] });
    }
  };

  clikBtn = async () => {
    if (this.state.src) {
      try {
        await this.props.profileImageUpdate({
          variables: {
            access_token: getAccessTokenFromLocal()[0],
            profile_image: await onDrop(this.state.blobState),
          },
        });
      } catch (err) {
        notifyError(err.message);
      }

      if (this.props.data) {
        notifySuccess(this.props.data.profileImageEdit.message);
        await deleteUserFromLocal();
        await addUserToLocal(this.props.data.profileImageEdit.data);
        await this.props.setImageState(this.state.imageFileUrl);

        this.props.setImageState2(false);
      }
    } else {
      notifyError('You did not choose a picture');
    }
  };

  profileImageClosePopupMenu = () => {
    this.props.setImageState2(false);
  };

  onImageLoaded = (image) => {
    this.imageRef = image;
  };

  onCropChange = (crop, percentCrop) => {
    this.setState({ crop });
  };

  onCropComplete = (crop) => {
    this.makeClientCrop(crop);
  };

  async makeClientCrop(crop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageUrl = await this.getCroppedImg(
        this.imageRef,
        crop,
        'newFile.jpeg'
      );
      this.setState({ croppedImageUrl });
    }
  }

  getCroppedImg(image, crop, fileName) {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (!blob) {
          //reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        window.URL.revokeObjectURL(this.fileUrl);
        this.fileUrl = window.URL.createObjectURL(blob);
        this.setState({ blobState: blob });
        this.setState({ imageFileUrl: this.fileUrl });
        resolve(this.fileUrl);
      }, 'image/jpeg');
    });
  }
  render() {
    const { crop, croppedImageUrl, src } = this.state;

    return this.props.trigger ? (
      <div className={styles.profileImageCropPopup}>
        <div className={styles.profileImageCropPopupInner}>
          <div className="d-flex justify-content-between row mb-3">
            <div className="col-2"></div>
            <div className={`col-8 ${styles.profileImageCropPopupName}`}>
              <strong>Edit Profile Image</strong>
            </div>
            <RiCloseLine
              className={`col-2 ${styles.imageCropClose}`}
              size={35}
              onClick={this.profileImageClosePopupMenu}
            />
          </div>

          <div
            className="d-inline-block"
            style={{
              textAlign: 'center',
              marginLeft: 'auto',
              marginRight: 'auto',
              width: '100%',
            }}
          >
            <Form.File
              type="file"
              label=""
              className="d-inline-block"
              style={{ width: '100%' }}
              data-browse="Choose"
              accept="image/*"
              custom
              onChange={this.onSelectFile}
            />
          </div>

          {this.state.src ? (
            <div className={`d-flex justify-content-around ${styles.srcDiv}`}>
              {src && (
                <div className={styles.mainCrop}>
                  <ReactCrop
                    src={src}
                    crop={crop}
                    ruleOfThirds
                    onChange={this.onCropChange}
                    onImageLoaded={this.onImageLoaded}
                    onComplete={this.onCropComplete}
                  />
                </div>
              )}
              <div className={styles.mainImage}>
                {croppedImageUrl && (
                  <img
                    alt="Crop"
                    className={styles.img}
                    src={croppedImageUrl}
                  />
                )}
              </div>
            </div>
          ) : null}
          <button
            className={`btn btn-danger d-inline-block btn-block ${styles.srcDivBtn}`}
            onClick={this.clikBtn}
          >
            Change Profile Image
          </button>
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
    ) : null;
  }
}

export default ImageCropComponent;
