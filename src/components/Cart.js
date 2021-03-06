import React, { Component } from 'react';
import formatCurrency from '../util';
import Fade from 'react-reveal/Fade';
import Modal from 'react-modal';
import Zoom from 'react-reveal/Zoom';
import {connect} from 'react-redux';
import { removeFromCart } from '../actions/cartActions';
import { createOrder, clearOrder } from '../actions/orderActions';

class Cart extends Component {

    // the props declared in constructor basically calls the properties from its parent component
    constructor(props){
        super(props);

        this.state = {
            name: "",
            email: "",
            address: "",
            showCheckout: false
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    // preventDefault() will not allow to refresh the page when user presses the submit button
    createOrder = (e) => {
        e.preventDefault();
        const order = {
            email: this.state.email,
            name: this.state.name,
            address: this.state.address,
            cartItems: this.props.cartItems,
            total: this.props.cartItems.reduce((a, c) => (a + c.price*c.count), 0),
        }

        // sending all the order information to the parent component and there we save the data using a method
        this.props.createOrder(order);
    }

    closeModal = () => {
        this.props.clearOrder();
    }

    render() {

        // retriving the value of cartItems present inside the parent class component by using this.props
        const {cartItems, order} = this.props;

        return (
            <div>
                <div>
                    {cartItems.length === 0 ? 
                        (<div className="cart cart-header">Cart is empty</div>) 
                        : 
                        (<div className="cart cart-header">You have {cartItems.length} items in the cart{" "}</div>)    
                    }
                </div>
                {
                    order && <Modal 
                        isOpen={true}
                        onRequestClose={this.closeModal}>
                        <Zoom>
                            <button className="close-modal" onClick={this.closeModal}>x</button> 
                            <div className="order-details" >
                                <h3 className="success-message">Your orders have been placed</h3>
                                <h2>Order {order._id}</h2>
                                <ul>
                                    <li>
                                        <div>Name: </div>
                                        <div>{order.name}</div>
                                    </li>
                                    <li>
                                        <div>Email: </div>
                                        <div>{order.email}</div>
                                    </li>
                                    <li>
                                        <div>Address: </div>
                                        <div>{order.address}</div>
                                    </li>
                                    <li>
                                        <div>Created At: </div>
                                        <div>{order.createdAt}</div>
                                    </li>
                                    <li>
                                        <div>Total: </div>
                                        <div>{formatCurrency(order.total)}</div>
                                    </li>
                                    <li>
                                        <div>Cart Items: </div>
                                        <div>{order.cartItems.map(x => (
                                            <div>  {x.count} {" x "} {x.title} </div>
                                        ))}</div>
                                    </li>
                                </ul>
                            </div>
                        </Zoom>
                    </Modal>
                }
                <div>
                    <div className="cart">
                    <Fade left cascade>
                        <ul className="cart-items">
                        
                            {
                                cartItems.map( item => (
                                    <li key={item._id}>
                                        
                                            <div>
                                                <img src={item.image} alt={item.title}></img>
                                            </div>
                                            <div>
                                                <div>{item.title}</div>
                                                <div className="right">
                                                    {formatCurrency(item.price)} * {item.count}{" "}
                                                    <button 
                                                        className="button" 
                                                        onClick={() => this.props.removeFromCart(item)}>
                                                        Remove
                                                    </button>
                                                </div>
                                            </div>
                                        
                                    </li>
                                ))
                                
                            }
                            
                        </ul>
                        </Fade>
                    </div>
                    {cartItems.length !== 0 && (
                        <div>
                        
                            <div className="cart">
                                <div className="total">
                                    <div>
                                        Total: {" "}
                                        {formatCurrency(
                                            cartItems.reduce((a, c) => a + (c.price*c.count), 0)
                                            )
                                        }
                                    </div>
                                    <div onClick={ () => {
                                            this.setState({showCheckout: true})
                                            }
                                        } className="button primary">
                                    Proceed
                                    </div>
                                </div>
                            </div> 
                            {
                                this.state.showCheckout && (
                                    <Fade right>
                                    <div className="cart">
                                        <form onSubmit={this.createOrder}>
                                            <ul className="form-container">
                                                <li>
                                                    <label>Email</label>
                                                    <input 
                                                        name="email" 
                                                        type="email" 
                                                        required 
                                                        onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Name</label>
                                                    <input 
                                                        name="name" 
                                                        type="text" 
                                                        required 
                                                        onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <label>Address</label>
                                                    <input 
                                                        name="address" 
                                                        type="text" 
                                                        required 
                                                        onChange={this.handleInput}></input>
                                                </li>
                                                <li>
                                                    <button 
                                                        className="button primary" 
                                                        type="submit">
                                                    Checkout
                                                    </button>
                                                </li>
                                            </ul>
                                        </form>
                                        
                                    </div></Fade>
                                )
                            }
                            
                        </div>
                    )}
                    
                </div>
            </div>
        )
    }
}

export default connect(
    (state) => ({
        order: state.order.order,
        cartItems: state.cart.cartItems,
    }),
    { 
        removeFromCart,
        createOrder,
        clearOrder
    }
  )(Cart);
