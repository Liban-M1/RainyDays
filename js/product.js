const productsEndpoint = 'https://www.cdr2b.pro/wp-json/wc/v3/products?consumer_key=ck_47b5900d801d14f4fcfcceb798694c9048fe1d47&consumer_secret=cs_c33b95cf393ff20ac87ab76fe533b2fa3071f016';

// Fetch an array of product data from the WordPress API
function fetchProducts() {
  return fetch(productsEndpoint)
    .then(response => response.json())
    .catch(error => console.error(error));
}

// Fetch a single product's data from the WordPress API
function fetchProduct(productId) {
    if (!productId) {
      return Promise.reject(new Error('Product id is required'));
    }
    const endpoint = `https://www.cdr2b.pro/wp-json/wc/v3/products/${productId}?consumer_key=ck_47b5900d801d14f4fcfcceb798694c9048fe1d47&consumer_secret=cs_c33b95cf393ff20ac87ab76fe533b2fa3071f016`;
    return fetch(endpoint)
      .then(response => response.json())
      .catch(error => console.error(error));
  }
  

// Render a grid of product data as thumbnails
function renderProducts(products) {
    const productsContainer = document.getElementById('products-container');
    products.forEach(product => {
      const productElement = document.createElement('div');
      productElement.classList.add('product-thumbnail');
      productElement.innerHTML = `
        <a href="productdetail.html?id=${product.id}">
          <img src="${product.images.length > 0 ? product.images[0].src : ''}" alt="${product.images.length > 0 ? product.images[0].alt : ''}">
          <h2>${product.name}</h2>
        </a>
      `;
      productsContainer.appendChild(productElement);
    });
  }

// Filter Featured products and show in their own section
function renderFeaturedProducts(products) {
  const featuredProducts = products.filter(product => product.featured);
  const featuredProductsContainer = document.getElementById('featured-products');
  renderProducts(featuredProducts);
}

// Render a single product's data on the Product Detail page
function renderProductDetail(product) {
    const productDetailContainer = document.getElementById('product-detail');
    if (!product || !productDetailContainer) {
      console.error('Product or product detail container is missing');
      return;
    }
    productDetailContainer.innerHTML = `
      <h2>${product.name}</h2>
      <img src="${product.images.length > 0 ? product.images[0].src : ''}" alt="${product.images.length > 0 ? product.images[0].alt : ''}">
      <p>${product.description}</p>
      <p>Price: ${product.price}</p>
      <p>SKU: ${product.sku}</p>
    `;
  }
  
// Handle the Product Detail page search parameter
function handleProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (!productId) {
      console.error('Product id is required');
      return;
    }
    
    fetchProduct(productId)
      .then(product => {
        renderProductDetail(product);
      })
      .catch(error => console.error(error));
  }
  
// Use the above functions to fetch and display the products on your site
fetchProducts()
  .then(products => {
    renderProducts(products);
    renderFeaturedProducts(products);
    handleProductDetail();
  })
  .catch(error => console.error(error));
