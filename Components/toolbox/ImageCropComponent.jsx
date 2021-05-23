import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { Input } from '@chakra-ui/input';
import { Box, Center, Flex } from '@chakra-ui/layout';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { getAccessTokenFromLocal } from 'LocalStorage/accessTokenStorage';
import React, { PureComponent } from 'react';
import ReactCrop from 'react-image-crop';
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
        this.props.toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }

      if (this.props.data) {
        this.props.toast({
          title: this.props.data.profileImageEdit.message,
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        await this.props.setImageState(this.state.imageFileUrl);
      }
    } else {
      this.props.toast({
        title: 'You did not choose a picture',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
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
    const { onClose, isOpen, fileProfileImage } = this.props;

    return this.props.trigger ? (
      <Modal onClose={onClose} size="xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center mb={6}>
              <Input
                type="file"
                ref={fileProfileImage}
                onChange={this.onSelectFile}
                d="none"
                accept="image/*"
              />
              <Button
                colorScheme="red"
                onClick={() => fileProfileImage.current.click()}
                w="100%"
                textAlign="center"
              >
                Choose Profile Image
              </Button>
            </Center>
            {this.state.src ? (
              <Flex direction="column" justify="center" align="center">
                {src && (
                  <Box mb={4}>
                    <ReactCrop
                      src={src}
                      crop={crop}
                      ruleOfThirds
                      onChange={this.onCropChange}
                      onImageLoaded={this.onImageLoaded}
                      onComplete={this.onCropComplete}
                    />
                  </Box>
                )}
                <Box>
                  {croppedImageUrl && (
                    <Image
                      rounded="full"
                      alt="Crop"
                      w="auto"
                      h="auto"
                      objectFit="contain"
                      src={croppedImageUrl}
                    />
                  )}
                </Box>
              </Flex>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              onClick={() => {
                this.clikBtn();
                onClose();
              }}
              w="100%"
            >
              Change Profile Image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    ) : null;
  }
}

export default ImageCropComponent;
