import Navbar from "./components/navbar/navbar";
import {BrowserRouter, Routes, Route} from "react-router-dom";

// pages
import ShopPage from "./pages/shop.jsx";
import ShopCategoryPage from "./pages/shopCategory.jsx";
import ProductPage from "./pages/product.jsx";
import CartPage from "./pages/cart.jsx"
import LoginSignupPage from "./pages/loginSignup.jsx";
import NewsLetter from "./components/newsLetter/newsLetter.jsx";
import Footer from "./components/footer/footer.jsx";

// assets
import men_banner from "./components/assets/banner_mens.png";
import women_banner from "./components/assets/banner_women.png";
import kid_banner from "./components/assets/banner_kids.png";


function App() {

  return (
    <>

      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/kids" element={<ShopCategoryPage banner={kid_banner} category="kid"/>} />
          <Route path="/mens" element={<ShopCategoryPage banner={men_banner} category="men"/>} />
          <Route path="/womens" element={<ShopCategoryPage banner={women_banner} category="women"/>} />

          <Route path="/product" element={<ProductPage/>}>
            <Route path=":productId" element={<ProductPage/>} />

          </Route>

          <Route path="/cart" element={<CartPage/>} />
          <Route path="/login" element={<LoginSignupPage/>} />

        </Routes>

        <NewsLetter />
        <Footer />

      </BrowserRouter>
    </>
  )
}

export default App
