// repository check
import React, {Component} from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';

// importing store from store.js file to save the states
import {store} from './store';
import { Provider } from 'react-redux';

class App extends Component {

  // .parse() is reverse of stringify i.e convert string to JSON

  constructor(){
    super();
    this.state = {
      cartItems: localStorage.getItem("cartItems")? 
        JSON.parse(localStorage.getItem("cartItems")) 
        : 
        [],
      
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

  render() {
    return (
      <Provider store={store}>
        <div className="grid-container">
          <header>
            <a href="/">React Shopping cart</a>
          </header>
          <main>
            <div className="content">
              <div className="main">
                <Filter></Filter>
                <Products addToCart={this.addToCart}></Products>
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
      </Provider>
    );
  }
}

export default App;
