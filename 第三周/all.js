const app = {
  data(){
    return{
      logging:false,
    }
  },
  mounted() {
    
  },
  methods: {
    sign() {
      const url = `https://vue3-course-api.hexschool.io/admin/signin `;
      const  username = document.querySelector('#username').value;
      const  password = document.querySelector('#password').value;
      const user = {
        username,
        password
      };
      axios.post(url,user)
      .then((res) => {
        console.log(res)
        if(res.data.success){
          const token = res.data.token;
          const expired = res.data.expired
          document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
          this.logging =true;
        }
      })
    },
  },
}
Vue.createApp(app).mount("#app");
