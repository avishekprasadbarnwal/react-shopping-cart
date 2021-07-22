// repository check
import React, {Component} from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';
import data from './data.json';

class App extends Component {

  // .parse() is reverse of stringify i.e convert string to JSON

  constructor(){
    super();
    this.state = {
      products: data.products,
      cartItems: localStorage.getItem("cartItems")? JSON.parse(localStorage.getItem("cartItems")) : [],
      size: "",
      sort: ""
    };
  }

  createOrder = (orders) => {
    alert("Need to save order for" + orders.name);
  }

  removeFromCart = (product) => {
    // Creating a duplicate or say instance of cart items
    const cartItems = this.state.cartItems.slice();
    this.setState({
      cartItems: cartItems.filter((x) => x._id !== product._id)
    })

    // Adding items to our local storage for making it persistent
    localStorage.setItem("cartItems", JSON.stringify(cartItems.filter((x) => x._id !== product._id)));

    // cartItems.filter( (x) => x._id !== product._id) is used to filter and show those items whose id is not 
    // is not equal to the id of the product selected by the user to remove
  }

  addToCart = (product) => {
    // Creating a duplicate or say instance of cart items
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart = false;
    cartItems.forEach((item) => {
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true;
      }
    });
    if(!alreadyInCart){
      cartItems.push({...product, count: 1 });
    }
    this.setState({cartItems});
    // Adding items to our local storage for making it persistent
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  sortProducts = (event) => {
    // impl
    const sort = event.target.value;
    console.log(event.target.value);
    this.setState((state) => ({
      sort: sort,
      products: this.state.products
        .slice()
        .sort((a, b) =>
          sort === "lowest"
            ? a.price > b.price
              ? 1
              : -1
            : sort === "highest"
            ? a.price < b.price
              ? 1
              : -1
            : a._id < b._id
            ? 1
            : -1
        ),
    }));
  };

  filterProduct = (event) => {
    // console.log(event.target.value)
    if(event.target.value === ""){
      this.setState({size: event.target.value, products: data.products});
    } else {
      this.setState({
        size: event.target.value,
        products: data.products.filter(product => product.availableSizes.indexOf(event.target.value)>=0)
      })
    }   
  }

  render() {
    return (
      <div className="grid-container">
        <header>
          <a href="/">React Shopping cart</a>
        </header>
        <main>
          <div className="content">
            <div className="main">
              <Filter 
                count={this.state.products.length}
                size={this.state.size}
                sort={this.state.sort}
                filterProducts={this.filterProduct}
                sortProducts={this.sortProducts}
                ></Filter>
              <Products products={this.state.products} addToCart={this.addToCart}></Products>
            </div>
            <div className="sidebar">
              <Cart 
                createOrder={this.createOrder}
                cartItems={this.state.cartItems} 
                removeFromCart={this.removeFromCart}
              ></Cart>
            </div>
          </div>
        </main>
        <footer>
          All rights are reserved
        </footer>
      </div>
    );
  }
}

export default App;
