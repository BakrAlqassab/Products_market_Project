class Product {
  constructor(title, image, price, description) {
    this.title = title;
    this.imageUrl = image;
    this.price = price;
    this.description = description;
  }
}

class ElementAttributes {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    if (shouldRender) {
      // Here is refer to each subClass render
      this.render();
    }
  }

  // Useless method to show that the this.render is refer for the Component class
  render() {}
  createRootElement(tag, cssClasses, attributes) {
    // createRootElement(tag, cssClasses) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }
    if (attributes && attributes.length > 0) {
      for (const attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
        // console.log(attr.name + "  " + attr.value);
      }
    }

    // use Super() Help to pass the hookId
    document.getElementById(this.hookId).append(rootElement);
    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = ` <h2> Total : \$${this.totalAmmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmmount() {
    const sum = this.items.reduce(
      (previousVal, curVal) => previousVal + curVal.price,
      0
    );
    return sum;
  }

  // as long as the subClass don't have constructor will called the inherit class,and if exist hen will called only the subclass construct.
  // So need to use Super() to call both;
  constructor(renderHookId) {
    super(renderHookId);
  }
  addProduct(product) {
    // this.items.push(product);
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }
  orderProduts(){



    console.log(' Order is coming .............');
     console.log(this.items)
  }

  render() {
    // const cartEl = document.createElement("section");
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
    <h2> Total : \$${0}</h2>
    <button>Order Now!</button> `;
    // cartEl.className = "cart";
    const orderButton = cartEl.querySelector('button');
    orderButton.addEventListener('click',() => this.orderProduts())
    this.totalOutput = cartEl.querySelector("h2");
  }
}

class ProductItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId, false);
    this.product = product;
    this.render();
  }
  addToCart() {
    // console.log(" Adding product to cart ...");
    // console.log(this.product);
    App.addProductToCart(this.product);
  }
  render() {
    const prodEl = this.createRootElement("li", "product-item");
    // const prodEl = document.createElement("li");
    // prodEl.className = "product-item";
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
    // return prodEl;
  }
}
class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }
  fetchProducts() {
    this.products = [
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
    this.renderProduct();
  }

  renderProduct() {
    for (const prod of this.products) {
      new ProductItem(prod, "prod-list");
    }
  }
  render() {
    // const renderHook = document.getElementById("app");

    this.createRootElement("ul", "product-list", [
      new ElementAttributes("id", "prod-list"),
    ]);
    if (this.product && this.product.length > 0) {
      this.renderProduct();
    }
    // prodList.id = 'prod-list';
    // prodList.className = "product-list";

    // const prodList = this.createRootElement('ul',)

    // for (const prod of this.products) {
    //   new ProductItem(prod, "prod-list");
    //   // const productItem = new ProductItem(prod, "prod-list");
    //   // const prodEl = productItem.render();
    //   // productItem.render();

    //   // prodList.append(prodEl);
    // }
    // return prodList;
    // renderHook.append(prodList);
  }
}

class Market {
  constructor() {
    // Can done too by extends to the Compnents class and execute super(), but no need
    this.render();
  }
  render() {
    // const renderHook = document.getElementById("app");
    // app initilazed as id to shopping cart contructor to trnsform to the inherit class
    this.cart = new ShoppingCart("app");
    // this.cart.render();
    // const productList = new ProductList("app");
    new ProductList("app");
    // const prodListEl = productList.render();
    // productList.render();

    // renderHook.append(prodListEl);
  }
}

class App {
  static cart;
  static init() {
     const market = new Market();
    // new Market();
    // market.render();
    this.cart = market.cart;
  }
  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}
App.init();
