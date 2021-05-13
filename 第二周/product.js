const app = {
  data: {
    apiPath: 'ryder',
    products: [],
  },
  getData() {
    const url = `https://vue3-course-api.hexschool.io/api/${this.data.apiPath}/products`;
    axios.get(url)
      .then((response) => {
        console.log(response)
        this.data.products = response.data.products;
        this.render();
      })
  },
  removeData(id){
    const url = `https://vue3-course-api.hexschool.io/api/${this.data.apiPath}/admin/product/${id}`;
    axios.delete(url)
    .then(() => {
      this.getData();
    })
  },
    // 驗證
  checkLogin(){
    const myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = `${myCookie}`;
    const url = `https://vue3-course-api.hexschool.io/api/user/check`;
    axios.post(url)
  },
  render() {
    const productsID = document.querySelector('#productList');
    const products = this.data.products;
    let str = '';
    products.forEach(function (item) {
      str += `
        <tr>
        <td>${item.title}</td>
        <td width="120">
          ${item.origin_price}
        </td>
        <td width="120">
          ${item.price}
        </td>
        <td width="100">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="${item.id}" ${item.is_enabled ? 'checked' : ''} data-action="status" data-id="${item.id}">
            <label class="form-check-label" for="${item.id}">${item.is_enabled ? '啟用' : '未啟用'}</label>
          </div>
        </td>
        <td width="120">
          <button type="button" class="btn btn-sm btn-danger move" data-action="remove" data-id="${item.id}"> 刪除 </button>
        </td>
      </tr>`;
      });
    productsID.innerHTML = str;
    this.ListenerEvent();
  },
  ListenerEvent() {
    const btns = document.querySelectorAll('.btn');
    btns.forEach(btn => btn.addEventListener('click', (e)=> {
      const productId= e.target.dataset.id;
      this.removeData(productId)
    }))  
  },
};


function init(){
  app.getData()
  app.checkLogin()
}
init()