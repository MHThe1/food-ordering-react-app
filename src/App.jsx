import { CartContextProvider } from "./store/CartContext.jsx";
import Header from "./components/Header.jsx";
import { ThemeMode } from "./components/ToggleTheme.jsx";
import Footer from "./components/Footer.jsx";

import Foods from "./components/Foods.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <div
          id="mainbody"
          className={`${
            ThemeMode() ? "dark" : ""
          } min-h-screen bg-gradient-to-b from-gray-900 to-gray-700`}
        >
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow lg:px-10 xl:px-16 2xl:px-20 font-quicksand font-smooth-antialiased">
              <Header />
              <Foods />
              <Cart />
              <Checkout />
            </main>
            <Footer />
          </div>
        </div>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
