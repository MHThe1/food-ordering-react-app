import { useContext } from "react";
import { ShoppingBasketIcon, Trash2, CreditCard, X } from "lucide-react";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import { formatPrice } from "../utils/formatting.js";
import Input from "../ui/Input.jsx";
import useHttp from "../hooks/useHttp.js";
import Modal from "../ui/Modal.jsx";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(`${apiUrl}/orders`, requestConfig);

  const cartTotal = cartCtx.cartItems.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.cartItems,
          customer: customerData,
        },
      })
    );
  }

  let actionArea = (
    <div className="flex space-x-4">
      <button
        onClick={handleClose}
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
  );

  if (isSending) {
    actionArea = (
      <span className="text-white text-center">Sending order data...</span>
    );
  }

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleFinish}
      >
        <h2 className="text-white">Success!</h2>
        <p>Your order was submitted successfully.</p>
        <div className="modal-actions flex justify-center mt-6">
          <button
            onClick={handleFinish}
            type="button"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-12 h-12" />
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ShoppingBasketIcon className="w-6 h-6 text-blue-400 mr-2" />
            Checkout
          </h2>
          <p className="text-lg text-gray-300">
            Total: {formatPrice(cartTotal)}
          </p>
          <button
            onClick={handleClose}
            type="button"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6 flex-grow overflow-y-auto pr-2">
          <Input label="Full Name" type="text" id="name" required />
          <Input label="E-Mail Address" type="email" id="email" required />
          <Input label="Street" type="text" id="street" required />
          <div className="flex space-x-2">
            <Input label="Postal Code" type="text" id="postal-code" required />
            <Input label="City" type="text" id="city" required />
          </div>
        </div>

        {error && <div className="text-red-600 text-center m-2">{error}</div>}

        <div className="modal-actions">{actionArea}</div>
      </form>
    </Modal>
  );
}
