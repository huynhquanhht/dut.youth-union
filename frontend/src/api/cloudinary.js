import axios from 'axios';
const CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/drxazklch/upload';
const CLOUDINARY_UPLOAD_PRESET = 'te9our4e';
const CLOUDINARY_FOLDER = 's-union';

const uploadActivityCover = (file) => {
  console.log('file - ', file);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', CLOUDINARY_FOLDER);
  return axios.post(CLOUDINARY_API, formData, {
    headers: { 'Content-type': 'multipart/form-data' },
  });
};

export default { uploadActivityCover };
