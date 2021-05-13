const app = {
  data: {
    apiPath: 'ryder',
  },
  sign(e) {
    e.preventDefault();
    // axios.defaults.withCredentials = true;
    const url = `https://vue3-course-api.hexschool.io/admin/signin `;
    const  username = document.querySelector('#username').value;
    const  password = document.querySelector('#password').value;
    const user = {
      username,
      password
    };
    axios.post(url,user)
    .then((res) => {
      // console.log(res)
      if(res.data.success){
        const token = res.data.token;
        const expired = res.data.expired
        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
        window.location='product.html';
      }
    })
  },
};

// event
const signBtn = document.querySelector('.sign');
signBtn.addEventListener('click',app.sign)