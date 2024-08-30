import { CartContextProvider } from "./store/CartContext.jsx";
import Header from "./components/Header.jsx";
import { ThemeMode } from "./components/ToggleTheme.jsx";
import Footer from "./components/Footer.jsx";

import Foods from "./components/Foods.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";
import Cart from "./components/Cart.jsx";

function App() {
  return (
    <UserProgressContextProvider>
      <CartContextProvider>
        <div id="mainbody" className={ThemeMode() ? "dark" : ""}>
          <div className="flex flex-col min-h-screen bg-neutral-100 dark:bg-neutral-900">
            <main className="flex-grow lg:px-10 xl:px-16 2xl:px-20 font-quicksand font-smooth-antialiased">
              <Header />
              <Foods />
              <Cart />
            </main>
            <Footer />
          </div>
        </div>
      </CartContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
