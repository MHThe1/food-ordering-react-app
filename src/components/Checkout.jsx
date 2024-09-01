import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBasketIcon,
  Trash2,
  CreditCard,
  X,
} from "lucide-react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { formatPrice } from "../utils/formatting";
import Input from "../ui/Input.jsx";

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const totalPrice = cartCtx.cartItems.reduce(
    (totalPrice, item) =>
      totalPrice + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  function handleHideCheckout() {
    userProgressCtx.hideCheckout();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: {
          items: cartCtx.cartItems,
          customer: customerData,
        },
      }),
    });
    cartCtx.clearCart();
    userProgressCtx.hideCheckout();
  }

  return (
    <AnimatePresence>
      {userProgressCtx.progress === "checkout" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => userProgressCtx.setProgress("")}
          className="bg-black bg-opacity-70 fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4"
        >
          <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center">
                  <ShoppingBasketIcon className="w-6 h-6 text-blue-400 mr-2" />
                  Checkout
                </h2>
                <p className="text-lg text-gray-300">Total: {formatPrice(totalPrice)}</p>
                <button
                  onClick={handleHideCheckout}
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-6 flex-grow overflow-y-auto pr-2">
                <AnimatePresence>
                  <Input label="Full Name" type="text" id="name" required />
                  <Input label="Email" type="email" id="email" required />
                  <Input label="Address" type="text" id="street" required />
                  <div className="flex space-x-2">
                    <Input label="Zip Code" type="text" id="postal-code" required />
                    <Input label="City" type="text" id="city" required />
                  </div>
                </AnimatePresence>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleHideCheckout}
                  type="button"
                  className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center"
                >
                  <Trash2 className="w-5 h-5 mr-2" />
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-all flex items-center justify-center flex-grow"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  Checkout
                </button>
              </div>
            </motion.div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
