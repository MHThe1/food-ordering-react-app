import React, { useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Trash2, CreditCard, Plus, Minus, X } from "lucide-react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { formatPrice } from "../utils/formatting";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalPrice = cartCtx.cartItems.reduce(
    (totalPrice, item) =>
      totalPrice + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  function handleHideCart() {
    userProgressCtx.hideCart();
  }

  function handleClearCart() {
    cartCtx.clearCart();
    handleHideCart();
  }

  function handleAddFoodToCart(id) {
    const item = cartCtx.cartItems.find((item) => item.id === id);
    if (item) {
      cartCtx.addToCart(item);
    }
  }

  const handleDeleteItem = (id) => {
    cartCtx.removeFromCart(id);
  };

  return (
    <AnimatePresence>
      {userProgressCtx.progress === "cart" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => userProgressCtx.setProgress("")}
          className="bg-black bg-opacity-50 fixed inset-0 z-40 flex items-center justify-center p-2 sm:p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                <ShoppingCart className="w-6 h-6 text-blue-400 mr-2" />
                Your Cart
              </h2>
              <button
                onClick={handleHideCart}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 mb-4 flex-grow overflow-y-auto pr-2">
              <AnimatePresence>
                {cartCtx.cartItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-gray-800 p-3 rounded-lg flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3 flex-grow">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-grow">
                        <h3 className="text-sm font-semibold text-white">
                          {item.name}
                        </h3>
                        <p className="text-blue-400 text-sm">
                          ${Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <div className="flex items-center space-x-2 bg-gray-700 rounded-lg p-1">
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-gray-400 hover:text-white transition-colors p-1"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-white font-semibold w-6 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleAddFoodToCart(item.id)}
                          className="text-gray-400 hover:text-white transition-colors p-1"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <p className="text-white font-semibold text-sm">
                        $
                        {(Number(item.price) * (item.quantity || 1)).toFixed(2)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {cartCtx.cartItems.length > 0 ? (
              <div className="border-t border-gray-700 pt-3">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-semibold text-white">
                    Total:
                  </span>
                  <span className="text-xl font-bold text-blue-400">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <button
                    onClick={handleClearCart}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Clear Cart
                  </button>
                  <button
                    onClick={userProgressCtx.showCheckout}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded-lg transition-colors flex items-center justify-center text-sm flex-grow"
                  >
                    <CreditCard className="w-4 h-4 mr-1" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-xl font-bold text-white">
                  Your cart is empty
                </h2>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
