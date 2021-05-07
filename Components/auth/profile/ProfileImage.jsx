import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md';
import ImageCropComponent from '../../toolbox/ImageCropComponent';
import Image from 'next/image';
import styles from 'styles/Profile.module.css';
import { useMutation } from '@apollo/client';
import { PROFILE_IMAGE_EDIT } from 'GraphQL/Apollo-Client/Mutations/userMutations';

export default function ProfileImage(props) {
  const [imageState, setImageState] = useState(null);
  const [imageState2, setImageState2] = useState(false);

  const [profileImageUpdate, { data }] = useMutation(PROFILE_IMAGE_EDIT);

  const profileImageStatePopupMenu = () => {
    setImageState2(true);
  };

  return (
    <div className={styles.profileImgDiv}>
      {imageState === null ? (
        <Image
          src={`${props.profileImageStatic}`}
          className={styles.profileImg}
          width={200}
          height={200}
          alt="ProfileImage"
        />
      ) : (
        <img
          src={imageState}
          className={styles.profileImg}
          width={200}
          height={200}
          alt="ProfileImage"
        />
      )}
      <div className={styles.pencil}>
        <MdEdit color="black" size={25} onClick={profileImageStatePopupMenu} />
      </div>

      {imageState2 ? (
        <ImageCropComponent
          imageState2={imageState2}
          setImageState={setImageState}
          setImageState2={setImageState2}
          trigger={true}
          profileImageUpdate={profileImageUpdate}
          data={data}
        />
      ) : null}
    </div>
  );
}
