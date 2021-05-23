import React, { useRef, useState } from 'react';
import ImageCropComponent from '../../toolbox/ImageCropComponent';
import NextImage from 'next/image';
import styles from 'styles/Profile.module.css';
import { useMutation } from '@apollo/client';
import { PROFILE_IMAGE_EDIT } from 'GraphQL/Apollo-Client/Mutations/userMutations';
import { Flex } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import { useDisclosure } from '@chakra-ui/hooks';
import { useToast } from '@chakra-ui/toast';

export default function ProfileImage(props) {
  const [imageState, setImageState] = useState(null);

  const toast = useToast();
  const fileProfileImage = useRef();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [profileImageUpdate, { data }] = useMutation(PROFILE_IMAGE_EDIT);

  return (
    <Flex justify="center" w="100%" align="center" direction="column">
      {imageState === null ? (
        <NextImage
          src={`${props.profileImageStatic}`}
          className={styles.profileImg}
          width={200}
          height={200}
          alt="ProfileImage"
        />
      ) : (
        <Image
          src={imageState}
          objectFit="contain"
          rounded="full"
          width={200}
          height={200}
          alt="ProfileImage"
        />
      )}
      <Button m={3} mt={4} colorScheme="teal" w="60%" onClick={onOpen}>
        Profile Image Edit
      </Button>

      <ImageCropComponent
        setImageState={setImageState}
        trigger={true}
        profileImageUpdate={profileImageUpdate}
        data={data}
        toast={toast}
        isOpen={isOpen}
        onClose={onClose}
        fileProfileImage={fileProfileImage}
      />
    </Flex>
  );
}
