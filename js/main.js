var productNameInput = document.getElementById("productNameInput");
var productPriceInput = document.getElementById("productPriceInput");
var productCategoryInput = document.getElementById("productCategoryInput");
var productDescriptionInput = document.getElementById(
  "productDescriptionInput"
);
var addBtn = document.getElementById("addBTN");
var updateBtn = document.getElementById("updateBTN");
var searchInput = document.getElementById("searchInput");
var idUpdate = 0;

var productList = [];

if (localStorage.getItem("products") != null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayData();
}

function addProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };
  productList.push(product);
  localStorage.setItem("products", JSON.stringify(productList));
  clearInput();
  displayData();
}

function clearInput() {
  productNameInput.value = "";
  productPriceInput.value = "";
  productCategoryInput.value = "";
  productDescriptionInput.value = "";
}

function displayData() {
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    cartona += `<tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].description}</td>
                <td>
                    <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
                    <button onclick="setData(${i})" class="btn btn-warning btn-sm">Update</button>
                </td>
            </tr>`;
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function deleteProduct(id) {
  productList.splice(id, 1);
  localStorage.setItem("products", JSON.stringify(productList));
  displayData();
}

function searchByName() {
  var term = searchInput.value;
  var cartona = "";
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += `<tr>
                <td>${i}</td>
                <td>${productList[i].name}</td>
                <td>${productList[i].price}</td>
                <td>${productList[i].category}</td>
                <td>${productList[i].description}</td>
                <td>
                    <button onclick="deleteProduct(${i})" class="btn btn-danger btn-sm">Delete</button>
                    <button class="btn btn-warning btn-sm">Update</button>
                </td>
            </tr>`;
    }
  }
  document.getElementById("tableBody").innerHTML = cartona;
}

function setData(id) {
  idUpdate = id;
  var currentProduct = productList[id];
  productNameInput.value = currentProduct.name;
  productPriceInput.value = currentProduct.price;
  productCategoryInput.value = currentProduct.category;
  productDescriptionInput.value = currentProduct.description;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}

function updateProduct() {
  var product = {
    name: productNameInput.value,
    price: productPriceInput.value,
    category: productCategoryInput.value,
    description: productDescriptionInput.value,
  };
  productList.splice(idUpdate, 1, product);
  localStorage.setItem("products", JSON.stringify(productList));
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
  clearInput();
  displayData();
}
