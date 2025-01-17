import DetailsProducts from './layout/DetailsProducts';
import { CartProvider } from './contexts/CartContext';
import { ShopProvider } from './contexts/ShopContext';
import { UserProvider } from './contexts/UserContext';
import HomePage from './layout/HomePage';
import StorePage from './layout/ShopPage';
import './style/global.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from './layout/UserPage';
import { ArticleProvider } from './contexts/ArticleContext';
import CartPage from './layout/CartPage';
import { UserContext } from './contexts/UserContext';
import { useContext, useEffect, useState } from 'react';
import AllProductsPage from './layout/AllProductsPage';
import ScrollToTop from './components/home/ScrollToTop';
import { OrderProvider } from './contexts/OrderContext';
import Boutique from './components/home/Boutique';
import { CategoryProvider } from './contexts/CategoryContext';
import ShopListPage from './layout/ShopListPage';
import VisionPage from './layout/VisionPage';


function App() {
    // Ajout d'un état de chargement
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Simuler un chargement (remplace ça par une vraie logique, ex : API call ou data fetching)
      setTimeout(() => {
        setLoading(false);
      }, 2000); // 2 secondes de chargement pour l'exemple
    }, []);

  function ProtectedRoute({ children }) {
    const { user } = useContext(UserContext);

    if (!user) {
      // Rediriger vers la page de connexion si l'utilisateur n'est pas connecté
      return <Navigate to="/" replace />;
    }

    return children;
  }
  return (
    <>

      <CartProvider>
        <UserProvider>
          <ShopProvider>
            <ArticleProvider>
              <OrderProvider>
                <CategoryProvider>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/user/:id" element={<Boutique />} />

                  <Route path="/userPage" element={
                  <ProtectedRoute>
                    <UserPage />
                  </ProtectedRoute>
                } />
                  <Route path="/allShops" element={<ShopListPage />} />   
                  <Route path="/allShops/:searchTerm" element={<ShopListPage />} />   
                  <Route path="/shop/:id" element={<StorePage />} />
                  <Route path="/details/:id" element={<DetailsProducts />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/allProducts/:searchTerm" element={<AllProductsPage />} />
                  <Route path="/vision" element={<VisionPage />} />
                </Routes>
                </CategoryProvider>
                <ScrollToTop />
              </OrderProvider>
            </ArticleProvider>
          </ShopProvider>
        </UserProvider>
      </CartProvider>


    </>
  );
}

export default App;
