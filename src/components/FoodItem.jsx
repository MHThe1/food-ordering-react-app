import { useContext } from "react";
import { formatPrice } from "../utils/formatting";
import CartContext from "../store/CartContext.jsx";

export default function FoodItem(foodItem) {
  const cartCtx = useContext(CartContext);

  function handleAddFoodToCart() {
    cartCtx.addToCart(foodItem);
  }

  return (
    <li className="bg-pink-600 dark:bg-slate-900 text-white shadow rounded overflow-hidden flex flex-col rounded-t-lg rounded-b-md">
      <article className="flex-grow flex flex-col items-center">
        <img src={foodItem.image} alt={foodItem.name} className="w-full h-48 object-cover" />
        <h3 className="text-lg font-semibold mt-4">{foodItem.name}</h3>
        <p className="mt-2 mb-3">${formatPrice(foodItem.price)}</p>
        <p className="text-sm text-center mb-3">{foodItem.description}</p>
      </article>
      <button
        onClick={handleAddFoodToCart}
        className="w-52 mx-auto dark:bg-pink-600 dark:hover:bg-pink-700 bg-yellow-300 hover:bg-yellow-600 hover:scale-105 text-black dark:text-white font-bold py-2 px-4 mb-2 rounded"
      >
        Add to cart
      </button>
    </li>
  );
}
