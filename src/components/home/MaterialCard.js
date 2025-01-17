import { Alert, Button, Snackbar } from '@mui/material';
import React, { useContext, useState } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const MaterialCard = ({ article }) => {
  const { cart, addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);  // Quantité par défaut
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const newItem = { ...article, quantity };

    // Ajouter le produit au panier via le contexte
    addToCart(newItem);

    setAlert({ open: true, message: 'Article ajouté au panier avec succès!', severity: 'success' });
  };
  const findCartItem = () => {
    return cart.find(item => item?._id === article?._id);
  };

  return (
    <>
      <div className="relative m-2 flex flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md  w-full ">
        <Link
          className="relative mx-3 mt-3 flex h-40 overflow-hidden rounded-xl"
          to={`/details/${article._id}`}
        >
          <img
            className="object-cover font-manrope w-full h-full"
            src={article?.imageUrls[0]}
            alt={article?.name}
          />
          {article.discount.applyDiscount ? (
            <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
              -{article.discount.percentDiscount}%
            </span>
          ) : (
            ""
          )}
        </Link>
        <div className="mt-4 px-5 pb-5">
          <Link to={`/details/${article._id}`}>
            <h5 className="text-xs tracking-tight text-slate-900">
              {article.name}
            </h5>
          </Link>
          <div className="mt-2 mb-5 flex items-center justify-between">
            {article.discount.applyDiscount ? (
              <>
                <span className="text-xs font-bold font-manrope text-slate-900">
                  {article.discount.newPrice} FCFA
                </span>
                <span className="text-xs text-slate-900 line-through">
                  {article.price} FCFA
                </span>
              </>
            ) : (
              <span className="text-xs font-bold font-manrope text-slate-900">
                {article.price} FCFA
              </span>
            )}
          </div>
          {findCartItem() ? (
            <button
              className="flex cursor-normal items-center justify-center rounded-md bg-orange-200 px-5 py-2.5 text-center text-xs font-medium text-orange-600  focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Article ajouter
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center justify-center rounded-md bg-orange-600 p-2 text-center text-xs font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Ajouter au panier
            </button>
          )
          }
        </div>
      </div>


      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default MaterialCard;