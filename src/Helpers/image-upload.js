import Axios from 'axios';

export default e => new Promise((resolve, reject) => {
  const baseUrl = process.env.CLOUDINARYAPI;
  const basePreset = process.env.CLOUDINARYPRESET;
  const imageFile = e.target.files[0];
  const formData = new FormData();
  formData.append('file', imageFile);
  formData.append('upload_preset', basePreset);
  /* istanbul ignore next */
  Axios.post(baseUrl, formData, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      document.getElementById('output').innerHTML = `
          <p>Loading....${percentCompleted}</p>
          `;
    }
  })
    .then((res) => {
      resolve(res.data.secure_url);
    })
    .catch(err => reject(err));
});
