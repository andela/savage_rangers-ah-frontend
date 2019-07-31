import Axios from 'axios';


export default{ 
    initialCreate: data => new Promise((resolve,reject)=> {
    Axios.post('http://localhost:3000/api/articles', { ...data }, {
    headers: { 
      Authorization:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IkJ1cmluZGlBbGFpbjIiLCJlbWFpbCI6ImFsYWluMkBnbWFpbC5jb20ifSwiaWF0IjoxNTY1MTk3OTExLCJleHAiOjE1NjUyODQzMTF9.ppap0MIqWZdTA7fmSqPfJKxACEvQqjwLdtJniEA2hwM'
    }
  })
  .then(res => resolve(res.data.article))
  .catch(error => reject(error))
}),
drafting: data => new Promise((resolve,reject)=> {
    Axios.patch(`http://localhost:3000/api/articles/${data.slug}`, { ...data }, {
    headers: { 
      Authorization:  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoyLCJ1c2VybmFtZSI6IkJ1cmluZGlBbGFpbjIiLCJlbWFpbCI6ImFsYWluMkBnbWFpbC5jb20ifSwiaWF0IjoxNTY1MTk3OTExLCJleHAiOjE1NjUyODQzMTF9.ppap0MIqWZdTA7fmSqPfJKxACEvQqjwLdtJniEA2hwM'
    }
  })
  .then(res => resolve(res.data.article))
  .catch(error => reject(error))
})
}