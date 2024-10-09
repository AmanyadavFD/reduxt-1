export const ADD_TO_CART = "cart/added";
export const REMOVE_FROM_CART = "cart/removed";
export const CALCULATE_TOTAL = "cart/calculateTotal";

export const addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    payload: product,
  };
};

export const removeFromCart = (productId) => {
  return {
    type: REMOVE_FROM_CART,
    payload: productId,
  };
};

export const calculateTotal = () => {
  return {
    type: CALCULATE_TOTAL,
  };
};
