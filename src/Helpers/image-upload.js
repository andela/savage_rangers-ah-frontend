import Axios from 'axios';

export default e =>
  new Promise((resolve, reject) => {
    const baseUrl = 'https://api.cloudinary.com/v1_1/dkqqm2qwn/upload';
    const basePreset = 'n9dlfrxu';
    const imageFile = e.target.files[0];
    const { id } = e.target;
    const formData = new FormData();
    console.log(id);
    formData.append('file', imageFile);
    formData.append('upload_preset', basePreset);

    Axios.post(baseUrl, formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      onUploadProgress: progressEvent => {
        var percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        document.getElementById('output').innerHTML = `
          <p>Loading....${percentCompleted}</p>
          `;
      }
    })
      .then(res => {
        resolve(res.data.secure_url);
      })
      .catch(err => reject(err));
  });
