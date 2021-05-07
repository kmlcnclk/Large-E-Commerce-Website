import { getSignature } from './GetSignature';
import { buildUrl } from 'cloudinary-build-url';

export const onDrop = async (acceptedFiles) => {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

  // await this.props.cloudinaryProfileImage();
  // ilk denemede çalışmıyor bak buraya
  // const { signature, timestamp } = await this.props.cloudinaryProfileImageData
  //   .cloudinaryProfileImage;
  // console.log(signature);
  // console.log(timestamp);

  const formData = new FormData();

  var results = [];

  for (let i = 0; i < acceptedFiles.length; i++) {
    const { signature, timestamp } = await getSignature();

    const acceptedFile = acceptedFiles[i];

    formData.append('file', acceptedFile);

    formData.append('signature', signature);
    formData.append('timestamp', timestamp);
    formData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_KEY);
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    const datas = await response.json();

    const src = await buildUrl(datas.public_id, {
      cloud: { cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME },
      // transformations: {
      // resize: {
      // type: 'scale',
      // width: 400,
      // height: 400,
      // },
      // },
    });
    results.push(src);
  }

  return results;
};
