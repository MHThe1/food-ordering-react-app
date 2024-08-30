import ToggleTheme from "./ToggleTheme";
import { useContext } from "react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartLength = useContext(CartContext).cartItems.length;
  const userProgressCtx = useContext(UserProgressContext);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <nav
      className="sticky top-0 z-50 container mx-auto p-4 bg-pink-600 dark:bg-gray-800 shadow-md 
                flex flex-col md:flex-row items-center justify-between
                rounded-b-md"
    >
      {/* App Title (Left) */}
      <div className="md:flex-1 text-center md:text-left mb-2 md:mb-0">
        <h1 className="text-xl font-semibold text-white">
          <button
            onClick={() => window.location.reload()}
            className="focus:outline-none"
          >
            FoodThanda
          </button>
        </h1>
      </div>

      <div className="flex-1 text-center mb-2 md:mb-0 flex items-center justify-center">
        <span className="text-xl text-white font-semibold mr-2">Order Now</span>
        <ToggleTheme />
      </div>

      {/* Cart Button (Right) */}
      <div className="md:flex-1 text-center md:text-right md:relative absolute top-4 right-4 md:top-0 md:right-0">
        <button onClick={handleShowCart} className="bg-black text-white px-4 py-3 rounded-md">
          Cart ({cartLength})
        </button>
      </div>
    </nav>
  );
}
