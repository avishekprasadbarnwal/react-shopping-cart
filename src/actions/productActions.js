import { FETCH_PRODUCTS } from "../types";

// Defining of Action and dispatching that action with the required data that need 
// to be passed for updating the state
export const fetchProducts = () => async(dispatch) => {
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({
        type: FETCH_PRODUCTS,
        payload: data
    })
}