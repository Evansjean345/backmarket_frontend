import React, { useContext, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode, Thumbs } from 'swiper/modules';
import { ArticleContext } from '../../contexts/ArticleContext';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import { Link, useParams } from 'react-router-dom';
import { CartContext } from '../../contexts/CartContext';
import { Alert, Snackbar } from '@mui/material';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const Products = () => {
  const { articles, selectArticle, selectedArticle } = useContext(ArticleContext);
  const { cart, addToCart, updateCartItemQuantity, } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false); // Ajout d'un état pour vérifier si Swiper est prêt
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const id = useParams();

  useEffect(() => {
    if (id) {
      selectArticle(id); // Charger les informations du shop à partir du contexte en fonction de l'ID
    }
  }, [id, selectArticle]);

  // Vérifier si l'article est déjà dans le panier
  const findCartItem = () => {
    return cart.find(item => item?._id === selectedArticle?._id);
  };

  const currentItem = findCartItem();

  // Fonction pour gérer l'ajout au panier avec la quantité
  const handleAddToCart = () => {
    const item = {
      ...selectedArticle,
      quantity: quantity,
      pricePerKilo: selectedArticle?.discount?.applyDiscount
        ? selectedArticle?.discount?.newPrice
        : selectedArticle?.price,
    };
    addToCart(item);
    setAlert({ open: true, message: 'Article ajouté au panier', severity: 'success' });
  };

  // Gestion de l'augmentation de la quantité
  const handleIncrease = () => {
    if (currentItem) {
      updateCartItemQuantity(selectedArticle?._id, currentItem.quantity + 1);
      setQuantity(currentItem.quantity + 1);
    } else {
      setQuantity(quantity + 1);
      handleAddToCart(); // Ajouter l'article si ce n'est pas encore dans le panier
    }
  };

  // Gestion de la diminution de la quantité
  const handleDecrease = () => {
    if (currentItem && currentItem.quantity > 1) {
      updateCartItemQuantity(selectedArticle?._id, currentItem.quantity - 1);
      setQuantity(currentItem.quantity - 1);
    } else if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Gestion du changement manuel de la quantité
  const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity(newQuantity);
      if (currentItem) {
        updateCartItemQuantity(selectedArticle?._id, newQuantity);
      }
    }
  };

  console.log(selectedArticle);

  return (
    <>


      <>

        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="slider-box w-full h-full max-lg:mx-auto mx-0">
                <Swiper
                  style={{
                    '--swiper-navigation-color': '#4F46E5', // Couleur de navigation
                    '--swiper-pagination-color': '#4F46E5', // Couleur de pagination
                  }}
                  loop={true}
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {selectedArticle?.imageUrls?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`product-${index}`}
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  loop={true}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                  className="mySwiper mt-4"
                >
                  {selectedArticle?.imageUrls?.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={img}
                        alt={`thumb-${index}`}
                        className={`w-24 h-24 object-cover rounded-lg border-2 transition-colors duration-200 hover:border-indigo-500 ${thumbsSwiper?.activeIndex === index ? 'border-indigo-500' : 'border-gray-200'
                          }`}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="flex justify-center items-center">
                <div className="pro-detail w-full max-lg:max-w-[608px] lg:pl-8 xl:pl-16 max-lg:mx-auto max-lg:mt-8">
                  <div className="flex items-center justify-between gap-6 mb-6">
                    <div className="text">
                      <h2 className="font-manrope font-bold text-3xl leading-10 text-gray-900 mb-2">
                        {selectedArticle?.name || 'Nom du produit non disponible'}
                      </h2>
                      <p className="font-normal text-base text-gray-500">
                        {selectedArticle?.description || 'Description du produit non disponible.'}
                      </p>
                      <p className="font-normal text-xs text-gray-500">
                        {selectedArticle?.subCategory || 'sous catégorie du produit non disponible.'}
                      </p>
                    </div>

                  </div>
                  {selectedArticle?.discount?.applyDiscount ? (
                    <>
                      <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                        <div className="flex items-center">
                          <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 ">
                            {selectedArticle.discount.newPrice} FCFA
                          </h5>
                          <span className="ml-3 font-semibold text-lg text-indigo-600">
                            -{selectedArticle.discount.percent}%
                          </span>
                        </div>
                        <svg
                          className="mx-5 max-[400px]:hidden"
                          xmlns="http://www.w3.org/2000/svg"
                          width={2}
                          height={36}
                          viewBox="0 0 2 36"
                          fill="none"
                        >
                          <path d="M1 0V36" stroke="#E5E7EB" />
                        </svg>
                        <div className="flex items-center">
                          <h5 className="font-manrope line-through font-semibold text-2xl leading-9 text-gray-900 ">
                            {selectedArticle?.price || 'Prix non disponible'} FCFA
                          </h5>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                      <div className="flex items-center">
                        <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 ">
                          {selectedArticle?.price} FCFA
                        </h5>
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col min-[400px]:flex-row min-[400px]:items-center mb-8 gap-y-3">
                    <div className="flex items-center">
                      <h5 className="font-manrope font-semibold text-2xl leading-9 text-gray-900 ">
                        Stock : {selectedArticle?.stock}
                      </h5>
                    </div>
                  </div>
                  <div className="flex items-center p-2 ">
                    {selectedArticle?.shop?.profilePic && (
                      <Link to={`/shop/${selectedArticle?.shop?._id}`}>
                        <img
                          src={selectedArticle?.shop?.profilePic}
                          alt={selectedArticle?.shop?.name}
                          className="w-16 h-16 rounded-full object-cover mr-4"
                        />
                      </Link>
                    )}

                    <Link to={`/shop/${selectedArticle?.shop?._id}`} className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800">{selectedArticle?.shop?.name}</h3>
                      <div
                        className="text-blue-500 mt-1 inline-block"
                      >
                        {selectedArticle?.shop?.description}
                      </div>
                    </Link>
                  </div>
                  <div className="flex items-center flex-col min-[400px]:flex-row gap-3 mb-3 min-[400px]:mb-8">
                    <button onClick={handleAddToCart}
                      disabled={!!currentItem}
                      className={`group py-3 px-5 rounded-full font-semibold text-lg w-full flex items-center justify-center gap-2 shadow-sm shadow-transparent transition-all duration-500  
                      ${currentItem
                          ? 'bg-gray-400 text-gray-800 cursor-not-allowed'
                          : 'bg-indigo-50 hover:shadow-indigo-300 hover:bg-indigo-100 text-indigo-600'
                        }`}>
                      {currentItem ? (
                        <>
                          <ShoppingCart className="w-6 h-6 mr-2" />
                          Déjà ajouté
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-6 h-6 mr-2" />
                          Ajouter au panier
                        </>
                      )}
                    </button>
                    <button className="text-center w-full px-5 py-4 rounded-[100px] bg-indigo-600 flex items-center justify-center font-semibold text-lg text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-300">
                      <Link to={`/shop/${selectedArticle?.shop?._id}`}>
                        Visiter l'etablissement
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>



      {/* Affichage de l'alerte si nécessaire */}
      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Products;
