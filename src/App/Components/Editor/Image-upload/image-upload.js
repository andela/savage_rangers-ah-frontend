import Axios from 'axios';

export default e =>
  new Promise((resolve, reject) => {
    const baseUrl = 'https://api.cloudinary.com/v1_1/dkqqm2qwn/upload';
    const basePreset = 'n9dlfrxu';
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', basePreset);

    Axios.post(baseUrl, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
      .then(res => {
        resolve(res.data.secure_url);
      })
      .catch(err => reject(err));
  });
