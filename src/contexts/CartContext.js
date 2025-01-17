// CartContext.js
import React, { createContext, useState } from 'react';
import { useEffect } from 'react';

// Créez un contexte pour le panier
export const CartContext = createContext();


export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    deliveryLocation: ''
  });
  const [delivery, setDelivery] = useState(false);

  useEffect(() => {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCart(JSON.parse(storedCart)); // Charger le panier depuis le localStorage
    }
  }, []);

  // Sauvegarder le panier dans le localStorage chaque fois qu'il change
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cart));
    } else {
      localStorage.removeItem('cart');
    }
  }, [cart]);

  //calculer le total du panier
  const calculateTotal = () => {
    let total = cart.reduce((total, item) => {
      // Si l'article a une remise appliquée, utiliser le nouveau prix
      const itemPrice = item.discount?.applyDiscount ? item.discount.newPrice : item.price;
      return total + itemPrice * item.quantity;
    }, 0);
  
    // Si la livraison est incluse, tu peux la rajouter ici
    // if (delivery) {
    //   total += 2000; // Exemple : 2000 FCFA pour la livraison
    // }
  
    return total;
  };
  

  // Ajouter un article au panier
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  const canceledCart = () =>{
    setCart([])
  }
  // Mettre à jour la quantité d'un article
  const updateCartItemQuantity = (index, quantity) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      updatedCart[index].quantity = quantity;
      return updatedCart;
    });
  };

  // Supprimer un article du panier
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        canceledCart,
        customerInfo,
        setCustomerInfo,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        delivery,
        setDelivery,
        calculateTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
