const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);

  for (const product of allProducts) {
    const image = product.image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product card h-100 p-3 rounded-3 shadow-sm">
    <div class="product rounded-3 shadow-sm">
    <div class="p-2">
    <img class="product-image " class="" src=${image}></img>
      </div>
      <h3>${product.title.slice(0, 40)}</h3>
      <p><b>Category:</b> ${product.category}</p>
      <p><b>Rating:</b>  ${product.rating.rate} (${product.rating.count})</p>
    </div>
    <div class="footer-area ">
    <h3><b>Price: $</b> ${product.price}</h3>
    <div class="d-flex justify-content-around pb-3">
    <button onclick="addToCart(${product.id},${
      product.price
    })" id="addToCart-btn" class="buy-now btn btn-primary">Add to cart</button>

   <button  id="details-btn" class="btn btn-secondary " data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="getProductDetails('${
     product.id
   }')">Details</button>
    </div>
    </div>
    </div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);
  updateTaxAndCharge();
  updateTotal();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};

//single product details
const getProductDetails = (id) => {
  const url = `https://fakestoreapi.com/products/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayProductDetails(data));
};
// display single product in modal
const displayProductDetails = (singleProduct) => {
  //destructuring
  const { title, image, category, description, price } = singleProduct;
  const { rate, count } = singleProduct.rating;
  document.getElementById("exampleModalLabel").innerText = title;
  document.getElementById("modal-body").innerHTML = `
  <img class="rounded mx-auto d-block"  width="70%" src="${image}" alt="">
    <p class="mt-3"><b>Category</b>: ${category}</p>
    <p><b>Description: </b> ${description.slice(0, 200)}</p>
    <p><b>Rating:</b>  ${rate} (${count})</p>
    <h2>Price: $ ${price}</h2>
  `;
};
