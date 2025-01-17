import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';
import { UserContext } from '../../contexts/UserContext';
import { CircularProgress, Snackbar, Alert, Avatar, Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, useMediaQuery } from '@mui/material';
import { HiLogout } from 'react-icons/hi';
import { MdDelete, MdOutlineLogout } from 'react-icons/md';
import { ArticleContext } from '../../contexts/ArticleContext';
import { useTheme } from '@emotion/react';
import { FiTrash } from 'react-icons/fi';


const User = () => {

  const { user, updateUser, logoutUser } = useContext(UserContext);  // UserContext pour gérer les données utilisateur
  const { shops, deleteShop } = useContext(ShopContext);
  const [selectedShop, setSelectedShop] = useState(null);
  const { deleteArticlesByShopId } = useContext(ArticleContext);
  const [open, setOpen] = useState(false);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const navigate = useNavigate();
  const { createShop, loading } = useContext(ShopContext);  // ShopContext pour gérer la création de la boutique
  const [editMode, setEditMode] = useState(false);  // État pour basculer entre la vue et l'édition
  const [addShop, setAddshop] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
  });
  const [shopInfo, setShopInfo] = useState({
    manager: user?.id,
    name: '',
    description: '',
    phoneNumber: '',
    email: '',
    address: '',
    openingHours: '',
    closingHours: '',
  });

  const handleClose = () => {
    setOpen(false);
    setAlert({ open: false, message: '', severity: '' });
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleSelectShop = (Shop) => {
    shopsManaged.forEach(shop => {
      if (shop._id === Shop._id) {
        setSelectedShop(shop);
      }
    });
  }

  const [shopsManaged, setShopsManaged] = useState();

  useEffect(() => {
    if (shops) {
      setShopsManaged(shops.filter(shop => shop?.manager?._id === user?.id))
    }
  }, [shops, user]);

  // console.log("manager's shop", shopsManaged);

  useEffect(() => {
    if (user) {
      setShopInfo({ ...shopInfo, manager: user?.id })
    }
  }, [shopInfo, user]);

  // Charger les informations de l'utilisateur dans le formulaire
  useEffect(() => {
    if (user) {
      setUserInfo({
        name: user?.user?.name,
        phone: user?.user?.phone,
        email: user?.user?.email,
        role: user?.user?.role,
      });
    }
  }, [user]);

  // Gestionnaire de mise à jour des informations utilisateur
  const handleUserChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  // Gestionnaire de soumission pour la mise à jour de l'utilisateur
  const handleUserSubmit = (e) => {
    e.preventDefault();
    updateUser(userInfo);  // Mettre à jour les informations utilisateur via le contexte
    setEditMode(false);
    setAlert({ open: true, message: "Informations utilisateur mises à jour avec succès", severity: 'success' });
  };


  // Gestionnaire de soumission pour la création de la boutique
  const handleShopSubmit = async (e) => {
    e.preventDefault();
    setShopInfo({
      name: '',
      description: '',
      phoneNumber: '',
      email: '',
      address: '',
      openingHours: '',
      closingHours: '',
    });
    createShop(shopInfo);
    setAddshop(false);

    // window.location.reload();
    setAlert({ open: true, message: "Boutique créée avec succès", severity: 'success' });
    // try {
    //   const result = await 

    //   if (result.success) {



    //   }
    // } catch (error) {
    //   console.error("Erreur lors de la création de la boutique:", error);
    // }
  };


  // if (loading) {
  //   return <p>Chargement en cours...</p>;
  // }

  const handleNewManager = () => {
    updateUser({ ...user, role: 'manager' });
    setAlert({ open: true, message: "Vous êtes maintenant manager", severity: 'success' });

  }

  const handleDeleteManager = async () => {
    try {
      await updateUser({ ...user, role: 'user' });
      setAlert({ open: true, message: "Vous êtes maintenant utilisateur", severity: 'success' });
    } catch (error) {
      console.error("Erreur lors de la mise à jour du rôle de l'utilisateur :", error);
    }
  };

  const handleDeleteShop = async (shopId) => {
    try {
      await deleteShop(shopId);
      await deleteArticlesByShopId(shopId);
      setAlert({ open: true, message: "Boutique supprimée avec succès", severity: 'success' });
      // window.location.reload();
    } catch (error) {
      console.error("Erreur lors de la suppression de la boutique :", error);
    }
  };
  return (
    <>
      <section className="relative pt-40 pb-24">
        <img
          src="/images/profil-banner.jpg"
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0 h-60 object-cover"
        />
        <div className="w-full max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex items-center w-32 h-32 justify-center sm:justify-start relative z-10 mb-5">
            <img
              src="/images/user-account.png"
              alt="user-avatar-image"
              className="border-4 border-solid w-full border-white rounded-[50%] object-cover"
            />
          </div>
          <div className="flex flex-col sm:flex-row max-sm:gap-5 items-center justify-between mb-5">
            <div className="block">
              <h3 className="font-manrope font-bold text-4xl text-gray-900 mb-1">
                {userInfo.name}
              </h3>
              <p className="font-normal text-base leading-7 text-gray-500">
                {userInfo.phone}
              </p>
            </div>
            <button
              className="rounded-full p-2 text-sm bg-orange-100 flex items-center group transition-all duration-500"
            >
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  className="stroke-gray-700 transition-all duration-500 group-hover:stroke-indigo-600"
                  d="M14.1667 11.6666V13.3333C14.1667 14.9046 14.1667 15.6903 13.6785 16.1785C13.1904 16.6666 12.4047 16.6666 10.8333 16.6666H7.50001C5.92866 16.6666 5.14299 16.6666 4.65483 16.1785C4.16668 15.6903 4.16668 14.9047 4.16668 13.3333V11.6666M16.6667 9.16663V13.3333M11.0157 10.434L12.5064 9.44014C14.388 8.18578 15.3287 7.55861 15.3287 6.66663C15.3287 5.77466 14.388 5.14749 12.5064 3.89313L11.0157 2.8993C10.1194 2.3018 9.67131 2.00305 9.16668 2.00305C8.66205 2.00305 8.21393 2.3018 7.31768 2.8993L5.82693 3.89313C3.9454 5.14749 3.00464 5.77466 3.00464 6.66663C3.00464 7.55861 3.9454 8.18578 5.82693 9.44014L7.31768 10.434C8.21393 11.0315 8.66205 11.3302 9.16668 11.3302C9.67131 11.3302 10.1194 11.0315 11.0157 10.434Z"
                  stroke="#374151"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg> */}

              {userInfo?.role === 'manager' ? (
                <>
                  <img src="/images/verified.png" alt="certification" className='w-6 h-6' />
                  <span className="px-2 flex flex-col justify-center font-medium text-sm leading-7 text-gray-700 transition-all duration-500 ">
                    Manager
                  </span>
                </>
              ) : (
                <span onClick={handleNewManager} className="px-2 font-medium text-sm leading-7 text-gray-700 transition-all duration-500 group-hover:text-orange-600">
                  Devenir manager
                </span>
              )
              }

            </button>

          </div>
          <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  setEditMode(true);
                  setAddshop(false);
                }}
                className="p-2 rounded-full bg-indigo-600 text-white text-sm font-semibold  leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-100 hover:bg-indigo-700">
                Modifier le profil
              </button>
              {userInfo?.role === 'manager' && (
                <button
                  onClick={() => {
                    setAddshop(true);
                    setEditMode(false);
                  }}
                  className="p-2 rounded-full bg-indigo-50 text-indigo-600 font-semibold text-sm leading-7 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-100">
                  Crée une boutique
                </button>
              )
              }

            </div>
            {/* <div className="flex flex-col md:flex-row items-center gap-6 ">
              <p className="flex items-center gap-2 font-medium text-lg leading-8 text-gray-400 ">
                Skills
                <svg
                  width={20}
                  height={20}
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.78135 5.55191C9.4453 3.5173 9.77728 2.5 10.3928 2.5C11.0083 2.5 11.3403 3.5173 12.0043 5.55191L12.2949 6.44244C12.4784 7.00479 12.5701 7.28596 12.7928 7.44706C13.0155 7.60816 13.3125 7.60816 13.9063 7.60816H14.8683C17.0355 7.60816 18.119 7.60816 18.3081 8.19335C18.4972 8.77854 17.6169 9.40763 15.8563 10.6658L15.0921 11.2118C14.6069 11.5586 14.3643 11.732 14.278 11.9937C14.1918 12.2554 14.2841 12.5382 14.4687 13.1038L14.7569 13.9872C15.4209 16.0218 15.7529 17.0391 15.2549 17.3993C14.7569 17.7595 13.8878 17.1308 12.1496 15.8733L11.3887 15.323C10.9083 14.9754 10.6681 14.8016 10.3928 14.8016C10.1175 14.8016 9.87731 14.9754 9.39687 15.323L8.63605 15.8733C6.89779 17.1308 6.02866 17.7595 5.5307 17.3993C5.03273 17.0391 5.36471 16.0218 6.02866 13.9872L6.31927 13.0966C6.50278 12.5343 6.59454 12.2531 6.50948 11.9924C6.42441 11.7318 6.18419 11.558 5.70375 11.2104L4.94293 10.6601C3.20467 9.40261 2.33555 8.77389 2.52575 8.19102C2.71596 7.60816 3.79026 7.60816 5.93886 7.60816H6.87929C7.47315 7.60816 7.77008 7.60816 7.99277 7.44706C8.21547 7.28596 8.30723 7.00479 8.49074 6.44244L8.78135 5.55191Z"
                    stroke="#9CA3AF"
                    strokeWidth="1.6"
                  />
                </svg>
              </p>
              <ul className="flex items-center max-sm:justify-center max-sm:flex-wrap gap-2.5">
                <li className="py-3.5 px-7 rounded-full bg-orange-50 font-semibold text-base leading-7 text-gray-700">
                  HTML
                </li>
                <li className="py-3.5 px-7 rounded-full bg-orange-50 font-semibold text-base leading-7 text-gray-700">
                  CSS
                </li>
                <li className="py-3.5 px-7 rounded-full bg-orange-50 font-semibold text-base leading-7 text-gray-700">
                  Dart
                </li>
                <li className="py-3.5 px-7 rounded-full bg-orange-50 font-semibold text-base leading-7 text-gray-700">
                  C++
                </li>
                <li className="py-3.5 px-7 rounded-full bg-orange-50 font-semibold text-base leading-7 text-gray-700">
                  UI Design
                </li>
              </ul>
            </div> */}
          </div>
          <div className="flex flex-col lg:flex-row max-lg:gap-5 items-center justify-between py-0.5">
            {editMode ? (
              <form onSubmit={handleUserSubmit}>
                <h4 className="text-gray-900 text-xl font-semibold leading-loose">
                  Détails du profil
                </h4>
                <div className="mb-4">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed" htmlFor="name">Nom :</label>
                  <input
                    type="text"
                    name="name"
                    value={userInfo?.name}
                    onChange={handleUserChange}
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed" htmlFor="phone">Téléphone :</label>
                  <input
                    type="tel"
                    name="phone"
                    value={userInfo?.phone}
                    onChange={handleUserChange}
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex gap-1 items-center text-gray-600 text-base font-medium leading-relaxed" htmlFor="email">Email :</label>
                  <input
                    type="email"
                    name="email"
                    value={userInfo?.email}
                    onChange={handleUserChange}
                    className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                  />
                </div>
                <div className='flex justify-between'>
                  <button type="submit" className="bg-blue-500  text-white px-4 py-2 rounded">
                    {loading ? <CircularProgress size={24} color="inherit" /> : 'Sauvegarder'}
                  </button>
                  <button onClick={() => setEditMode(false)} className="bg-red-500  text-white px-4 py-2 rounded">
                    Annuler
                  </button>
                </div>

              </form>
            ) : addShop ? (
              <>
                <div className="relative py-2">
                  <div className="w-full  mx-auto">
                    <form className='w-full flex-col justify-start items-start lg:gap-14 md:gap-10 gap-8 inline-flex' onSubmit={handleShopSubmit}>
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
                                className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                placeholder="John"
                                value={shopInfo?.name}
                                onChange={(e) => setShopInfo({ ...shopInfo, name: e.target.value })}
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
                                value={shopInfo?.description}
                                onChange={(e) => setShopInfo({ ...shopInfo, description: e.target.value })}
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
                                className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                placeholder="028 2154-2541"
                                required
                                value={shopInfo.phoneNumber}
                                onChange={(e) => setShopInfo({ ...shopInfo, phoneNumber: e.target.value })}
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
                                value={shopInfo.email}
                                onChange={(e) => setShopInfo({ ...shopInfo, email: e.target.value })}
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
                                  value={shopInfo.isPhysicalStore}
                                  name='isPhysicalStore'
                                  required
                                  onChange={(e) => setShopInfo({ ...shopInfo, isPhysicalStore: true })}
                                  className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                  placeholder="396 Matilda Falls, New Theresiaboro 14897-2774"
                                />Oui
                                <input
                                  type="radio"
                                  value={shopInfo.isPhysicalStore}
                                  name='isPhysicalStore'
                                  required
                                  onChange={(e) => setShopInfo({ ...shopInfo, isPhysicalStore: false })}
                                  className="w-full focus:outline-none text-gray-900 placeholder-gray-400 text-lg font-normal leading-relaxed px-5 py-3 rounded-lg shadow-[0px_1px_2px_0px_rgba(16,_24,_40,_0.05)] border border-gray-200 justify-start items-center gap-2 inline-flex"
                                  placeholder="396 Matilda Falls, New Theresiaboro 14897-2774"
                                />Non
                              </div>

                            </div>

                          </div>
                          {shopInfo.isPhysicalStore === true ? (
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
                                    value={shopInfo.address}
                                    onChange={(e) => setShopInfo({ ...shopInfo, address: e.target.value })}
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
                                    value={shopInfo.openingTime}
                                    onChange={(e) => setShopInfo({ ...shopInfo, openingTime: e.target.value })}
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
                                    value={shopInfo.closingTime}
                                    onChange={(e) => setShopInfo({ ...shopInfo, closingTime: e.target.value })}
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
                        <button type='submit' className="mx-2 sm:w-fit w-full p-2 bg-indigo-600 hover:bg-indigo-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex">
                          <span className="px-3.5  text-center text-white text-xs font-semibold leading-8">
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sauvegarder'}
                          </span>
                        </button>
                        <button onClick={() => setAddshop(!addShop)} className="mx-2 sm:w-fit w-full p-2 bg-red-600 hover:bg-red-700 ease-in-out transition-all duration-700 rounded-xl shadow justify-center items-center flex">
                          <span className="px-3.5 text-center text-white text-xs font-semibold leading-8">
                            Annuler
                          </span>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

              </>

            ) : ("")
            }
          </div>

        </div>
        {userInfo?.role === 'manager' && (
          <div className='container mx-auto '>
            <div className='mt-4 bg-white p-1 relative flex flex-col min-w-0 break-words mb-6 rounded-lg'>
              <div className="w-full lg:order-1">
                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                  <div className="mr-4 p-3 text-center">
                    <h3 className=" text-blueGray-400 font-bold text-xl">Liste des boutiques gérées</h3>
                  </div>
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  {shopsManaged.map((shop) => (
                    <div index={shop._id} className="w-[20%] flex justify-between group bg-white border mb-2 border-solid border-gray-300 rounded-2xl p-2 transition-all duration-500 hover:border-orange-600 ">
                      <div className="w-[90%] flex items-center gap-5">
                        <img
                          className="rounded-full object-cover w-[50px] h-[50px]"
                          src={shop.profilePic || "/images/logo_minimalist.png"}
                          alt={shop.name}
                        />
                        <Link to={`/shop/${shop._id}`} className="grid gap-1">
                          <h5 className="text-gray-900 font-medium transition-all duration-500  group-hover:text-orange-600 ">
                            {shop.name}
                          </h5>
                          <span className="text-sm leading-6 line-clamp-1 text-gray-500">{shop.description} </span>
                        </Link>
                      </div>
                      <div className="flex w-[10%] items-center justify-between mr-2">
                        <button onClick={() => { handleClickOpen(); handleSelectShop(shop) }} className="bg-red-200 p-2 rounded-full group flex items-center justify-center focus-within:outline-red-500 fill-red-50 transition-all duration-500 group-hover:fill-red-400 hover:bg-red-500">
                          <FiTrash className='text-white' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )
        }
      </section>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Supprimer la boutique ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Etes vous sur de vouloir supprimer la boutique <span className='font-bold'>{selectedShop?.name} ?</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Annuler
          </Button>
          <Button sx={{ backgroundColor: "red", color: "white", padding: '1.5px' }} onClick={() => {
            deleteShop(selectedShop?._id);
            deleteArticlesByShopId(selectedShop?._id);
            setAlert({ open: true, message: "Boutique supprimée avec succès", severity: 'success' });
          }} autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </>

  );
};

export default User;