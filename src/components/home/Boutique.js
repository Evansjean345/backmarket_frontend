import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';
import { ArticleContext } from '../../contexts/ArticleContext';
import { UserContext } from '../../contexts/UserContext';
import { FaCamera } from 'react-icons/fa';
import { Alert, Backdrop, Box, Card, CircularProgress, Pagination, Snackbar, SpeedDial, SpeedDialAction, useMediaQuery } from '@mui/material';
import ArticleForm from '../form/ArticleForm';
import Article from '../list/article';
import OrderTable from '../table/OrderTable';
import Order from '../table/Order';
import { HiMenu } from 'react-icons/hi';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MaterialCard from './MaterialCard';

const Boutique = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const { shops, selectShop, selectedShop, updateShop, loading } = useContext(ShopContext);
  const { articles, fetchArticlesByShop, articlesByShop, } = useContext(ArticleContext);

  useEffect(() => {
    if (id) {
      selectShop(id);  // Charger les informations du shop à partir du contexte en fonction de l'ID
      setBannerImage(selectedShop?.bannerPic);
      setProfileImage(selectedShop?.profilePic);
    }
  }, [id, selectShop]);

  useEffect(() => {
    if (shops) {
      fetchArticlesByShop(id); // Charger les informations du shop à partir du contexte en fonction de l'ID
    }
  }, [shops, articles]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const actions = [
    { icon: <ShoppingBagIcon />, name: 'Articles', status: 'articles' },
    { icon: <LocalShippingIcon />, name: 'Commandes', status: 'orders' },

  ];
  const [activeTab, setActiveTab] = useState('articles');
  const [manageOption, setManageOption] = useState('articles');
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [bannerImage, setBannerImage] = useState(selectedShop?.bannerPic);
  const [profileImage, setProfileImage] = useState(selectedShop?.profilePic);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  const [shopDetails, setShopDetails] = useState({
    name: selectedShop?.name,
    description: selectedShop?.description,
    openingHours: selectedShop?.openingHours,
    closingHours: selectedShop?.closingHours,
    isPhysicalStore: selectedShop?.isPhysicalStore,
    address: selectedShop?.address,
    phoneNumber: selectedShop?.phoneNumber,
    email: selectedShop?.email,
  });

  useEffect(() => {
    if (selectedShop) {
      setShopDetails({
        name: selectedShop?.name,
        description: selectedShop?.description,
        openingHours: selectedShop?.openingHours,
        closingHours: selectedShop?.closingHours,
        isPhysicalStore: selectedShop?.isPhysicalStore,
        address: selectedShop?.address,
        phoneNumber: selectedShop?.phoneNumber,
        email: selectedShop?.email,
      });
    }
  },[selectedShop]);

  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBannerImage(URL.createObjectURL(file));
      updateShopDetails('bannerPic', file); // Envoyer le fichier au contexte
    }
  };

  // Gestionnaire d'upload pour l'image de profil
  const handleProfileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file));
      updateShopDetails('profilePic', file);
    }
  };

  const updateShopDetails = (key, value) => {
    setShopDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };

  const handleSave = () => {
    updateShop(shopDetails, id); // Appel de la fonction du contexte pour envoyer les modifications au backend
    setAlert({ open: true, message: 'Les détails de la boutique ont bien été mis à jour', severity: 'success' });
    setIsEditing(false);
  };

  const filteredDiscount = articlesByShop.filter(item => item.discount.applyDiscount === true);

  const isSmallScreen = useMediaQuery('(max-width: 600px)');
  const isMediumScreen = useMediaQuery('(max-width: 601px)');
  const isLargeScreen = useMediaQuery('(max-width: 1025px)');

  // Déterminer le nombre d'articles par page en fonction de la taille de l'écran
  const articlesPerPage = isSmallScreen ? 2 : isMediumScreen ? 2 : isLargeScreen? 5 : 10;


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const [currentArticles, setCurrentArticles] = useState(articlesByShop.slice(indexOfFirstArticle, indexOfLastArticle));


  const [currentDiscountArticles, setCurrentDiscountArticles] = useState(filteredDiscount.slice(indexOfFirstArticle, indexOfLastArticle));

  useEffect(() => {
    setCurrentArticles(articlesByShop.slice(indexOfFirstArticle, indexOfLastArticle));
  }, [articlesByShop, currentPage, articlesPerPage]);

  useEffect(() => {
    setCurrentDiscountArticles(filteredDiscount.slice(indexOfFirstArticle, indexOfLastArticle));
  }, [articlesByShop, currentPage, articlesPerPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  console.log("id", id);
  console.log("articlesByShop:", articlesByShop);
  console.log("articles:", articles);
  console.log("selectedShop:", selectedShop);

  return (
    <>
      <section className="relative pt-36 ">
        <img
          src={bannerImage || "/images/profil-banner.jpg"}
          alt={"cover"}
          className="w-full absolute border-2 border-solid border-gray-400 top-0 left-0 z-0 h-72 object-cover"
        />
        {isEditing && (
          <label className="absolute top-5 right-5 bg-white p-2 rounded-full shadow-md cursor-pointer">
            <FaCamera className="w-6 h-6 text-gray-600" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
            />
          </label>
        )
        }

        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center justify-center relative z-10 mb-2.5 w-28 h-28 sm:w-40 sm:h-40">
            <img
              src={profileImage || "/images/logo_minimalist.png"}
              alt={"shop-avatar-image"}
              className="border-4 border-solid border-gray-400 rounded-[50%] w-full h-full object-cover bg-white"
            />
            {
              isEditing && (
                <label className="absolute bottom-1 right-1/2 bg-white p-1 rounded-[50%] shadow-md cursor-pointer">
                  <FaCamera className="w-5 h-5 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleProfileChange}
                  />
                </label>
              )
            }
          </div>
          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <ul className="flex items-center gap-5">
              <li>
                {" "}
                <Link
                  to={`/`}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <svg
                    width={20}
                    height={20}
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.5 14.0902L7.5 14.0902M2.5 9.09545V14.0902C2.5 15.6976 2.5 16.5013 2.98816 17.0006C3.47631 17.5 4.26198 17.5 5.83333 17.5H14.1667C15.738 17.5 16.5237 17.5 17.0118 17.0006C17.5 16.5013 17.5 15.6976 17.5 14.0902V10.9203C17.5 9.1337 17.5 8.24039 17.1056 7.48651C16.7112 6.73262 15.9846 6.2371 14.5313 5.24606L11.849 3.41681C10.9528 2.8056 10.5046 2.5 10 2.5C9.49537 2.5 9.04725 2.80561 8.151 3.41681L3.98433 6.25832C3.25772 6.75384 2.89442 7.0016 2.69721 7.37854C2.5 7.75548 2.5 8.20214 2.5 9.09545Z"
                      stroke="black"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-medium text-base leading-7 text-gray-900">
                    Back Market
                  </span>
                </Link>
              </li>
              <li>
                {" "}
                <Link

                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={5}
                    height={20}
                    viewBox="0 0 5 20"
                    fill="none"
                  >
                    <path
                      d="M4.12567 1.13672L1 18.8633"
                      stroke="#E5E7EB"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-medium text-base leading-7 text-gray-400">
                    Boutiques
                  </span>
                </Link>
              </li>
              <li>
                <Link

                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={5}
                    height={20}
                    viewBox="0 0 5 20"
                    fill="none"
                  >
                    <path
                      d="M4.12567 1.13672L1 18.8633"
                      stroke="#E5E7EB"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="font-medium text-base leading-7 text-gray-400">
                    {selectedShop?.name}
                  </span>
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-4">
              {user?.id === selectedShop?.manager?._id || user?.id === selectedShop?.manager ? (
                <>
                  <button onClick={() => setIsEditing(!isEditing)} className="cursor-pointer text-xs rounded-full border border-solid border-orange-300 bg-orange-100 hover:bg-orange-200 py-3 px-4 font-semibold text-gray-900 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-50  hover:border-gray-300">
                    Modifier la boutique
                  </button>
                  <button onClick={() => setActiveTab('gestion')} className="rounded-full border border-solid  border-indigo-600 text-xs bg-indigo-600 py-3 px-4  font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-indigo-700 hover:border-indigo-700">
                    Gerer la boutique
                  </button>
                </>
              ) : (
                <button className="rounded-full border border-solid border-indigo-600 bg-indigo-600 py-3 px-4 text-xs font-semibold text-white whitespace-nowrap shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:bg-indigo-700 hover:border-indigo-700">
                  Contacter la boutique
                </button>
              )
              }

            </div>
          </div>
          {isEditing ? (
            <div className="relative py-2">
              <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 mx-auto">
                <form className='w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex' onSubmit={handleSave}>
                  <div className="w-full flex-col justify-start items-start gap-6 flex">
                    <h4 className="text-gray-900 text-xl font-semibold leading-loose">
                      Détails de la boutique
                    </h4>
                    <div className="w-full flex-col justify-start items-start gap-8 flex">
                      <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor=""
                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                          >
                            Nom de la boutique
                            <span className='text-red-600'>*</span>
                          </label>
                          <input
                            type="text"
                            value={shopDetails.name}
                            onChange={(e) => setShopDetails({ ...shopDetails, name: e.target.value })}
                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                            placeholder="John"
                            required
                          />

                        </div>
                        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor=""
                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                          >
                            Description de la boutique
                            <span className='text-red-600'>*</span>
                          </label>
                          <input
                            type="text"
                            value={shopDetails.description}
                            onChange={(e) => setShopDetails({ ...shopDetails, description: e.target.value })}
                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                            placeholder="Smith"
                            required
                          />
                        </div>
                      </div>
                      <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor=""
                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                          >
                            Numéro de téléphone de la boutique
                            <span className='text-red-600'>*</span>
                          </label>
                          <input
                            type="text"
                            value={shopDetails.phoneNumber}
                            onChange={(e) => setShopDetails({ ...shopDetails, phoneNumber: e.target.value })}
                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                            placeholder="028 2154-2541"
                            required
                          />
                        </div>
                        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor=""
                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                          >
                            Email de la boutique (optionnel)
                          </label>
                          <input
                            type="text"
                            value={shopDetails.email}
                            onChange={(e) => setShopDetails({ ...shopDetails, email: e.target.value })}
                            className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                            placeholder="Johnsmith@gmail.com"
                          />
                        </div>
                      </div>
                      <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                        <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                          <label
                            htmlFor=""
                            className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                          >
                            Avez vous une boutique physique
                            <span className='text-red-600'>*</span>
                          </label>
                          <div className='flex gap-5'>
                            <input
                              type="radio"
                              value={shopDetails.isPhysicalStore}
                              name='isPhysicalStore'
                              required
                              onChange={(e) => setShopDetails({ ...shopDetails, isPhysicalStore: true })}
                              className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                              placeholder="396 Matilda Falls, New Theresiaboro 14897-2774"
                            />Oui
                            <input
                              type="radio"
                              value={shopDetails.isPhysicalStore}
                              name='isPhysicalStore'
                              required
                              onChange={(e) => setShopDetails({ ...shopDetails, isPhysicalStore: false })}
                              className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                              placeholder="396 Matilda Falls, New Theresiaboro 14897-2774"
                            />Non
                          </div>

                        </div>

                      </div>
                      {shopDetails.isPhysicalStore === true ? (
                        <>
                          <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor=""
                                className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                              >
                                Adresse
                                <span className='text-red-600'>*</span>
                              </label>
                              <input
                                type="text"
                                required
                                value={shopDetails.address}
                                onChange={(e) => setShopDetails({ ...shopDetails, address: e.target.value })}
                                className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                placeholder="396 Matilda Falls, New Theresiaboro 14897-2774"
                              />
                            </div>
                          </div>

                          <div className="w-full justify-start items-start gap-8 flex sm:flex-row flex-col">
                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor=""
                                className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                              >
                                Heure d'ouverture de la boutique
                                <span className='text-red-600'>*</span>
                              </label>
                              <input
                                type="time"
                                value={shopDetails.openingHours}
                                onChange={(e) => setShopDetails({ ...shopDetails, openingHours: e.target.value })}
                                className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                placeholder="028 2154-2541"
                                required
                              />
                            </div>
                            <div className="w-full flex-col justify-start items-start gap-1.5 flex">
                              <label
                                htmlFor=""
                                className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed"
                              >
                                Heure de fermeture de la boutique
                              </label>
                              <input
                                type="time"
                                value={shopDetails.closingHours}
                                onChange={(e) => setShopDetails({ ...shopDetails, closingHours: e.target.value })}
                                className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                placeholder="Johnsmith@gmail.com"
                                required
                              />
                            </div>
                          </div>
                        </>

                      ) : ('')
                      }

                    </div>
                  </div>
                  <div className='flex '>
                    <button type='submit' className="mx-2 sm:w-fit w-full px-3 py-3 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex">
                      <span className="px-3.5  text-center text-white text-xs font-semibold leading-8">
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Sauvegarder'}
                      </span>
                    </button>
                    <button onClick={() => setIsEditing(!isEditing)} className="mx-2 sm:w-fit w-full px-3 py-3 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex">
                      <span className="px-3.5 text-center text-white text-xs font-semibold leading-8">
                        Annuler
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-center font-manrope font-bold text-3xl leading-10 text-gray-900 mb-3">
                {selectedShop?.name}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500 text-center mb-8">
                {selectedShop?.description}
              </p>
            </>
          )
          }
        </div>
      </section>
      <section className="py-2 relative">
        <div className="">
          <div className="border-b border-gray-300">
            <nav className="flex justify-center ">
              <button
                onClick={() => setActiveTab('articles')}
                className={`py-2 px-4 text-xs sm:text-lg font-medium ${activeTab === 'articles'
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-600'
                  }`}
              >
                Articles
              </button>

              <button
                onClick={() => setActiveTab('reductions')}
                className={`py-2 px-4 text-xs sm:text-lg font-medium ${activeTab === 'reductions'
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-600'
                  }`}
              >
                Reductions
              </button>
              {user?.id === selectedShop?.manager?._id || user?.id === selectedShop?.manager ? (
                <button
                onClick={() => setActiveTab('gestion')}
                className={`py-2 px-4 text-xs sm:text-lg font-medium ${activeTab === 'gestion'
                  ? 'border-b-2 border-orange-500 text-orange-500'
                  : 'text-gray-600'
                  }`}
              >
                Gestion de la boutique
              </button>
              ) : (
                ""
              )
              }

            </nav>
          </div>

          {/* CONTENT BASED ON ACTIVE TAB */}
          <div className="">
            {activeTab === 'articles' && (

              <>
                <div className="product-main">
                  {articlesByShop.length === 0 ? (
                    <div className='text-3xl font-bold text-orange-400 text-center py-14 '>Aucun articles disponible.</div>
                  ) : (
                    <>
                      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
                        {currentArticles.map((article) => (
                          <MaterialCard article={article} />
                        ))}
                      </div>

                      <div className="flex justify-center mt-6">
                        <Pagination
                          count={Math.ceil(articlesByShop.length / articlesPerPage)}
                          page={currentPage}
                          onChange={handlePageChange}
                          // onChange={(event, value) => paginate(value)}
                          color="primary"
                          size="large"
                          shape="rounded"
                        />
                      </div>
                    </>

                  )
                  }
                </div>
              </>
            )}

            {activeTab === 'reductions' && (
              <div className="product-main">
                {filteredDiscount.length === 0 ? (
                  <div className='text-3xl font-bold text-orange-400 text-center py-14 '>Aucune promotions en cours.</div>
                ) : (
                  <>
                    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                      {currentDiscountArticles.map((article) => (
                        <MaterialCard article={article} />
                      ))}
                    </div>

                    <div className="flex justify-center mt-6">
                      <Pagination
                        count={Math.ceil(articlesByShop.length / articlesPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        // onChange={(event, value) => paginate(value)}
                        color="primary"
                        size="large"
                        shape="rounded"
                      />
                    </div>
                  </>

                )
                }
              </div>
            )}
            {activeTab === 'gestion' && (
              
                <div className="">
                  <Box sx={{transform: 'translateZ(0px)', flexGrow: 1 }}>
                    <Backdrop open={open} className='h-screen' />
                    {/* MAIN CONTENT */}
                    <div className="flex-1 p-6 overflow-auto">
                      {/* {manageOption === 'dashboard' && (
                      <>
                      </>
                    )
                    } */}
                      {manageOption === 'orders' && (
                        <>
                          <OrderTable shopId={id} />
                        </>
                      )
                      }
                      {manageOption === 'articles' && (
                        <>
                          <ArticleForm shopId={id} />
                          <Article shopId={id} />
                        </>
                      )
                      }
                    </div>
                    <SpeedDial
                      ariaLabel="SpeedDial tooltip example"
                      sx={{ position: 'absolute', top: 16, right: 16 }}
                      icon={<HiMenu />}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      open={open}
                      direction='down'
                    >
                      {actions.map((action) => (
                        <SpeedDialAction
                          onClick={() => {
                            setManageOption(action.status);
                            handleClose();
                          }
                          }
                          sx={{ padding: 2 }}
                          key={action.name}
                          icon={action.icon}
                          tooltipTitle={action.name}
                          tooltipOpen
                        />
                      ))}
                    </SpeedDial>
                  </Box>
                </div>
              

            )}
          </div>
        </div>
      </section>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Boutique;