let productData = []

//DOM
const productList = document.getElementById('productList');
const productCount = document.getElementById('productCount');
const addProduct = document.getElementById('addProduct');
const clearAll = document.getElementById('clearAll');
const title = document.getElementById('title');
const originPrice = document.getElementById('origin_price');
const price = document.getElementById('price');

//事件
addProduct.addEventListener('click', addProductFN)
clearAll.addEventListener('click', clearAllFN)
productList.addEventListener('click', productListStatus)

// 函式
function addProductFN(e) {
  e.preventDefault();
  const timeStamp = Math.floor(Date.now());
  // 商品名不是空的就建立。
  if (title.value.trim() !== '') {
    productData.push({
      id: timeStamp,
      title: title.value.trim(),
      origin_price: parseInt(originPrice.value) || 0,
      price: parseInt(price.value) || 0,
      is_enabled: false,
    })
    ShowProduct()
  }
}

function productListStatus(e) {
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  if (action === 'remove') {
    let newIndex = 0;
    productData.forEach((item, key) => {
      if (id == item.id) {
        newIndex = key;
      }
    })
    productData.splice(newIndex, 1);

  } else if (action === 'status') {
    productData.forEach((item) => {
      if (id == item.id) {
        item.is_enabled = !item.is_enabled;
      }
    })
  }
  ShowProduct();
}

function clearAllFN(e) {
  e.preventDefault();
  productData = [];
  ShowProduct();
}

function init(){
  ShowProduct();
}

// view 函式
function ShowProduct() {
  let str = '';
  productData.forEach((item) => {
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
  })
  productList.innerHTML = str;
  productCount.textContent = productData.length;
  title.value='';
  originPrice.value='';
  price.value='';
}

// 初始化
init()

