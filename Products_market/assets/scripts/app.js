class Product {
  constructor(title, image, price, description) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = description;
  }
}

class ShoppingCart {
  items = [];
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = ` <h2> Total : \$${this.totalAmmount.toFixed(2)}</h2>`;
  }

  get totalAmmount() {
    const sum = this.items.reduce(
      (previousVal, curVal) => previousVal + curVal.price,
      0
    );
    return sum;
  }
  addProduct(product) {
    // this.items.push(product);
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
    <h2> Total : \$${0}</h2>
    <button>Order Now!</button> `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(product) {
    this.product = product;
  }
  addToCart() {
    // console.log(" Adding product to cart ...");
    // console.log(this.product);
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
    prodEl.innerHTML = `
        <div>
        <img  src ="${this.product.imageUrl}" alt =" ${this.product.title}">
        <div class = "product-item__content"> 
        <h2> ${this.product.title}</h2>
        <h3>  \$${this.product.price} </h3>
        <p>${this.product.description}</p>
        <button>Add To Cart</button>
        </div>
        </div>         
        `;
    const addCartButton = prodEl.querySelector("button");
    addCartButton.addEventListener("click", this.addToCart.bind(this));
    return prodEl;
  }
}
class ProductList {
  products = [
    new Product(
      "Nikon Z89",
      "https://in.canon/media/image/2018/05/03/642e7bbeae5741e3b872e082626c0151_eos6d-mkii-ef-24-70m-l.png",
      99.99,
      "High qulaity Canon camera"
    ),

    new Product(
      "Camera Lens",
      "https://www.businessinsider.in/thumb/msid-77720373,width-960,resizemode-4,imgsize-58282/tech-buying-guides/best-budget-dslr-cameras-in-india/best-budget-dslr-cameras.jpg",
      49.99,
      " Far quality zoom camera "
    ),
    new Product(
      "Camera stand",
      "https://i.ytimg.com/vi/ei1_z7XlUz0/maxresdefault.jpg",
      59.99,
      " High Quality camera stand "
    ),
  ];

  render() {
    // const renderHook = document.getElementById("app");
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItem = new ProductItem(prod);
      const prodEl = productItem.render();

      prodList.append(prodEl);
    }
    return prodList;
    // renderHook.append(prodList);
  }
}

class Market {
  render() {
    const renderHook = document.getElementById("app");
    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();
    const productList = new ProductList();
    const prodListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(prodListEl);
  }
}

class App {
  static cart;
  static init() {
    const market = new Market();
    market.render();
    this.cart = market.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
