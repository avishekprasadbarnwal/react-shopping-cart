import React, {Component} from 'react';
import Cart from './components/Cart';
import Filter from './components/Filter';
import Products from './components/Products';

// importing store from store.js file to save the states
import {store} from './store';
import { Provider } from 'react-redux';

class App extends Component {

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
                <Products></Products>
              </div>
              <div className="sidebar">
                <Cart></Cart>
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
