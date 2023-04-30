const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
const productEndpoint = "https://www.cdr2b.pro/wp-json/wc/v3/products/" + productId + "?consumer_key=ck_47b5900d801d14f4fcfcceb798694c9048fe1d47&consumer_secret=cs_c33b95cf393ff20ac87ab76fe533b2fa3071f016";

function fetchProductDetail() {
  return fetch(productEndpoint)
    .then(response => response.json())
    .catch(error => console.error(error));
}

function renderProductDetail(product) {
  const productDetailContainer = document.getElementById("product-detail");
  if (!product || !productDetailContainer) {
    console.error("Product or product detail container is missing");
    return;
  }
  productDetailContainer.innerHTML = `
    <h2>${product.name}</h2>
    <img src="${product.images.length > 0 ? product.images[0].src : ""}" alt="${product.images.length > 0 ? product.images[0].alt : ""}">
    <p>${product.description}</p>
    <p>Price: ${product.price}</p>
    <p>SKU: ${product.sku}</p>
  `;
}

fetchProductDetail()
  .then(product => {
    renderProductDetail(product);
  })
  .catch(error => console.error(error));


let popup = document.querySelector(".popup"),
    button = document.querySelector(".button");

button.addEventListener("click", openPop);

function openPop(){
  popup.style.display = "Block";
}

window.addEventListener("click", closePop);

function closePop(e){
  if(e.target == popup) {
  popup.style.display = "none";
}
}
