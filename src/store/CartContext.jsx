import { useReducer, useEffect } from "react";
import { createContext } from "react";

const CartContext = createContext({
  cartItems: [],
  addToCart: (item) => {},
  removeFromCart: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  let updatedItems;

  if (action.type === "ADD_TO_CART") {
    const existingCartItemIndex = state.cartItems.findIndex(
      (cartItem) => cartItem.id === action.item.id
    );

    updatedItems = [...state.cartItems];

    if (existingCartItemIndex === -1) {
      updatedItems.push({ ...action.item, quantity: 1 });
    } else {
      const updatedItem = {
        ...state.cartItems[existingCartItemIndex],
        quantity: state.cartItems[existingCartItemIndex].quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }

    return {
      ...state,
      cartItems: updatedItems,
    };
  }

  if (action.type === "REMOVE_FROM_CART") {
    const existingCartItemIndex = state.cartItems.findIndex(
      (cartItem) => cartItem.id === action.id
    );
    const existingCartItem = state.cartItems[existingCartItemIndex];

    if (existingCartItem) {
      updatedItems = [...state.cartItems];

      if (existingCartItem.quantity === 1) {
        updatedItems.splice(existingCartItemIndex, 1);
      } else {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity - 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return { ...state, cartItems: updatedItems };
    }
  }

  if (action.type === "CLEAR_CART") {
    return { cartItems: [] };
  }

  return state;
}


export function CartContextProvider({ children }) {
    const initialCartState = {
        cartItems: JSON.parse(localStorage.getItem('cartItems')) || []
    };

    const [cart, dispatchCartAction] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cart.cartItems));
    }, [cart.cartItems]);

    function addToCart(item) {
        dispatchCartAction({ type: 'ADD_TO_CART', item });
    }

    function removeFromCart(id) {
        dispatchCartAction({ type: 'REMOVE_FROM_CART', id });
    }

    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' });
    }

    const cartContext = {
        cartItems: cart.cartItems,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}



export default CartContext;
