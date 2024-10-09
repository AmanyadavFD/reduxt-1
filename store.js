import { createStore } from "redux";
import cartReducer from "./cartReducer";
import { addToCart, removeFromCart, calculateTotal } from "./action";

// Create the Redux store
const store = createStore(cartReducer);

// Subscribe to the store to update the UI when the state changes
store.subscribe(() => {
  console.log("Store updated:", store.getState());
  updateCart();
});

// List of products to display
const products = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 15 },
];

// Element where the product list will be rendered
const productsList = document.getElementById("products");

// Function to render the product list with "Add to Cart" buttons
const renderProducts = (products) => {
  const productItems = products
    .map(
      (product) => `
        <li>
          ${product.name} - RS.${product.price}
          <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
        </li>`
    )
    .join("");

  productsList.innerHTML = productItems;

  // Add event listeners for all "Add to Cart" buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", handleAddToCart);
  });
};
renderProducts(products);

// Elements where the cart items and total price will be rendered
const cartItemsElement = document.getElementById("cart");
const cartTotalElement = document.getElementById("totalPrice");

// Function to update the cart items and total price
const updateCart = () => {
  const state = store.getState();

  const cartItems = state.cartItems
    .map(
      (item) => `
        <li>
          ${item.name} - RS.${item.price} Quantity: ${item.quantity}
          <button class="remove-from-cart" data-id="${item.id}">Remove</button>
        </li>`
    )
    .join("");

  cartItemsElement.innerHTML = cartItems;

  // Add event listeners for all "Remove" buttons
  document.querySelectorAll(".remove-from-cart").forEach((button) => {
    button.addEventListener("click", handleRemoveFromCart);
  });

  // Render the total price
  cartTotalElement.textContent = `Total: RS.${state.total.toFixed(2)}`;
};

// Function to handle "Add to Cart" button click
function handleAddToCart(event) {
  const productId = parseInt(event.target.getAttribute("data-id"));
  const product = products.find((p) => p.id === productId);
  store.dispatch(addToCart(product));
  store.dispatch(calculateTotal());
}

// Function to handle "Remove" button click
function handleRemoveFromCart(event) {
  const productId = parseInt(event.target.getAttribute("data-id"));
  console.log("Removing product with ID:", productId); // Debugging line
  store.dispatch(removeFromCart(productId));
  store.dispatch(calculateTotal());
}

// Initial cart rendering
updateCart();
