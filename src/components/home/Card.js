import React, { useContext, useState } from 'react';
import { FaEye, FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { Alert, Snackbar } from '@mui/material';

const Card = ({ articles }) => {
  const { cart, addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);  // Quantité par défaut
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const newItem = { ...articles, quantity };

    // Ajouter le produit au panier via le contexte
    addToCart(newItem);

    setAlert({ open: true, message: 'Article ajouté au panier avec succès!', severity: 'success' });
  };

  // const handleQuantityIncrease = () => {
  //   setQuantity(quantity + 1);
  // };

  // const handleQuantityDecrease = () => {
  //   if (quantity > 1) setQuantity(quantity - 1);
  // };
  const findCartItem = () => {
    return cart.find(item => item?._id === articles?._id);
  };
  return (
    <>
      <div className="showcase bg-white">
        <div className="showcase-banner">
          <img
            src={articles.imageUrls[0]}
            alt={articles.name}
            width={300}
            height={300} // Définir une hauteur fixe
            className="object-cover w-[100%] h-[200px]"
            onClick={() => {
              navigate(`/details/${articles._id}`);
              window.scrollTo(0, 0);
            }}
          />
          {
            articles.discount.applyDiscount === true && (
              <p className="showcase-badge">-{articles.discount.percentDiscount}%</p>
            )
          }

          <div className="showcase-actions">
            {/* <button className="btn-action">
              <FaRegHeart />
            </button> */}
            <button
              className="btn-action"
              onClick={() => {
                navigate(`/details/${articles._id}`);
                window.scrollTo(0, 0);
              }}
            >
              <FaEye />
            </button>
            <button className="btn-action" onClick={handleAddToCart}>
              <MdOutlineAddShoppingCart />
            </button>
          </div>
        </div>

        <div className="showcase-content">
          <Link className="showcase-category line-clamp-1" to={`/details/${articles._id}`}>
            {articles.name}
          </Link>
          <Link to={`/details/${articles._id}`}>
            <h3 className="showcase-title line-clamp-1">
              {articles.description}
            </h3>
          </Link>

          <div className="price-box">
            {
              articles.discount.applyDiscount === true ? (
                <>
                  <p className="price text-xs">
                    {articles.discount.newPrice} FCFA
                  </p>
                  <del className='text-xs'>{articles.price} FCFA</del>
                </>
              ) : (
                <p className="price text-xs">
                  {articles.price} FCFA
                </p>
              )
            }
          </div>

          {/* Bouton Ajouter au panier */}
          {findCartItem() ? (
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-primary  cursor-default text-orange-500 text-sm bg-white  p-3 rounded transition-all mb-3"
            >
              Article ajouter
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-primary text-white bg-orange-500 text-sm p-3 rounded hover:bg-orange-200 hover:text-orange-500 transition-all mb-3"
            >
              Ajouter au panier
            </button>
          )
          }
        </div>
      </div>

      {/* Affichage de l'alerte si nécessaire */}
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Card;
