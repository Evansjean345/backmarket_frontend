import React, { useContext, useEffect, useState } from 'react';
import { FaCamera} from 'react-icons/fa';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import ArticleForm from '../form/ArticleForm';
import OrderTable from '../table/OrderTable';
import { ShopContext } from '../../contexts/ShopContext';
import { useParams } from 'react-router-dom';
import { ArticleContext } from '../../contexts/ArticleContext';
import { UserContext } from '../../contexts/UserContext';
import noProfil from '../../assets/img/no-profil.jpeg';
import noBanner from '../../assets/img/no-banner.png';
import Card from './Card';
import Article from '../list/article';
import { TextField, CircularProgress, SpeedDial, Box, SpeedDialAction, Backdrop } from '@mui/material';
import { ShoppingBagIcon, TruckIcon } from '@heroicons/react/24/outline';
import { HiMenu } from 'react-icons/hi';


const Shop = () => {

  const { id } = useParams();

  const { user } = useContext(UserContext);
  const { shops, selectShop, selectedShop, updateShop, loading } = useContext(ShopContext);
  const { articles, fetchArticlesByShop, articlesByShop, } = useContext(ArticleContext);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const actions = [
    { icon: <ShoppingBagIcon />, name: 'Articles', status: 'articles' },
    { icon: <TruckIcon />, name: 'Commandes', status: 'orders' },

  ];
  const [activeTab, setActiveTab] = useState('articles');
  const [manageOption, setManageOption] = useState('articles');
  const [isEditing, setIsEditing] = useState(false);
  const [bannerImage, setBannerImage] = useState(selectedShop?.bannerPic || noBanner);
  const [profileImage, setProfileImage] = useState(selectedShop?.profilePic || noProfil);
  const [shopDetails, setShopDetails] = useState({
    id: selectedShop?._id,
    name: selectedShop?.name,
    description: selectedShop?.description,
    openingHours: selectedShop?.openingHours,
    closingHours: selectedShop?.closingHours,
    country: selectedShop?.address.country,
    city: selectedShop?.address.city,
    street: selectedShop?.address.street,
    phoneNumber: selectedShop?.phoneNumber,
    email: selectedShop?.email,

  });


  useEffect(() => {
    setShopDetails({
      _id: selectedShop?._id,
      name: selectedShop?.name,
      description: selectedShop?.description,
      openingHours: selectedShop?.openingHours,
      closingHours: selectedShop?.closingHours,
      country: selectedShop?.address.country,
      city: selectedShop?.address.city,
      street: selectedShop?.address.street,
      phoneNumber: selectedShop?.phoneNumber,
      email: selectedShop?.email,

    })
  }, [selectedShop])

  useEffect(() => {
    if (shops) {
      fetchArticlesByShop(id); // Charger les informations du shop à partir du contexte en fonction de l'ID
    }
  }, [shops, articles]);

  useEffect(() => {
    if (id) {
      selectShop(id);  // Charger les informations du shop à partir du contexte en fonction de l'ID
      setBannerImage(selectedShop?.bannerPic);
      setProfileImage(selectedShop?.profilePic);
    }
  }, [id, selectShop]);

  useEffect(() => {
    if (id) {
      fetchArticlesByShop(id); // Charger les articles une fois que l'ID est disponible
    }
  }, [id, fetchArticlesByShop]);

  console.log(selectedShop)

  // if (loading) {
  //   return <p>Chargement en cours...</p>;  // Afficher un indicateur de chargement si les données sont en train d'être récupérées
  // }

  // if (!selectedShop) {
  //   return <p>Shop non trouvé.</p>;  // Si aucune boutique n'est trouvée, afficher un message
  // }

  // Gestionnaire d'upload pour la bannière
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

  // Met à jour les détails de la boutique
  const updateShopDetails = (key, value) => {
    setShopDetails((prevDetails) => ({
      ...prevDetails,
      [key]: value,
    }));
  };
  const handleSave = () => {
    updateShop(shopDetails); // Appel de la fonction du contexte pour envoyer les modifications au backend
    setIsEditing(false);
  };

  const filteredDiscount = articlesByShop.filter(item => item.discount.applyDiscount === true);


  return (
    <>
      {/* BANNER */}
      <div className="relative bg-gray-200">
        <div className="relative">
          <img
            src={bannerImage}
            alt="women's latest fashion sale"
            className="w-full h-[40vh] sm:h-[50vh] object-cover"
          />
          {isEditing && (
            <label className="absolute bottom-5 right-5 bg-white p-2 rounded-full shadow-md cursor-pointer">
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

        </div>

        <div className="absolute sm:top-1/2 sm:left-[5%] sm:transform-none top-[70%] left-1/2 transform -translate-x-1/2 sm:translate-y-[-50%] w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg">
          <img
            src={profileImage}
            alt="profile"
            className="w-full h-full object-cover"
          />
          {
            isEditing && (
              <label className="absolute bottom-1 right-1/2 bg-white p-1 rounded-full shadow-md cursor-pointer">
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
      </div>
      {isEditing ? (
        <>
          <div className="">
            <div className="">
              <div className="flex flex-column  my-5">
                <div className=" flex flex-wrap gap-10 justify-center">
                  <TextField
                    type="text"
                    label='Nom de la boutique'
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.name}
                    onChange={(e) => updateShopDetails('name', e.target.value)}
                  />
                  <TextField
                    type="text"
                    label='Description de la boutique'
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.description}
                    onChange={(e) => updateShopDetails('description', e.target.value)}
                  />
                  <TextField
                    type="text"
                    label='Pays de la boutique'
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.country}
                    onChange={(e) => updateShopDetails('country', e.target.value)}
                  />
                  <TextField
                    type="text"
                    label='Ville de la boutique'
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.city}
                    onChange={(e) => updateShopDetails('city', e.target.value)}
                  />
                  <TextField
                    type="text"
                    label='Rue de la boutique'
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.street}
                    onChange={(e) => updateShopDetails('street', e.target.value)}
                  />
                  <TextField
                    type="text"
                    label='Numéro de téléphone de la boutique'
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.phoneNumber}
                    onChange={(e) => updateShopDetails('phoneNumber', e.target.value)}
                  />
                  <TextField
                    type="text"
                    label='Email de la boutique'
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.email}
                    onChange={(e) => updateShopDetails('email', e.target.value)}
                  />
                  <TextField
                    type="time"
                    label="Horaires d'ouverture de la boutique"
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.openingHours}
                    onChange={(e) => updateShopDetails('openingHours', e.target.value)}
                  />
                  <TextField
                    type="time"
                    label="Horaires de fermeture de la boutique"
                    className=" w-full sm:w-[45%] m-2"
                    value={shopDetails.closingHours}
                    onChange={(e) => updateShopDetails('closingHours', e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className='flex '>
              <button
                onClick={handleSave}
                className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : 'Sauvegarder'}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="mt-4 bg-red-500 text-white py-2 px-6 rounded-full hover:bg-blue-600"
              >
                Annuler
              </button>
            </div>

          </div>
        </>
      ) : (
        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center">
                  <div>
                    <h2 className="text-2xl font-semibold">{selectedShop?.name}</h2>
                    <p className="text-gray-600">{selectedShop?.description}</p>
                  </div>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-4">
                  <p className="text-gray-600">
                    <span className="font-semibold">Adresse : </span>
                    {selectedShop?.address.country},{selectedShop?.address.city}, {selectedShop?.address.street}
                    <br />
                    <span className="font-semibold">Téléphone : </span>
                    {selectedShop?.phoneNumber}
                    <br />
                    <span className="font-semibold">Email : </span>
                    {selectedShop?.email}
                    <br />
                    <span className="font-semibold">Horaires d'ouverture : {" "}</span>
                    {selectedShop?.openingHours} - {selectedShop?.closingHours}
                    <br />
                  </p>
                </div>
              </div>
            </div>
            {user?.id !== selectedShop?.manager?._id ? (
              ""
            ) : (
              <button onClick={() => setIsEditing(true)} className="bg-orange-600 rounded-md text-white hover:bg-orange-400 transition-[.2s] duration-300 ease-in-out p-2 ml-4">
                Modifier les informations de la boutique
              </button>
            )
            }
          </div>
        </>
      )}
      {/* <div className="text-center mt-16 sm:mt-20 px-4">
        <input
          type="text"
          value={shopDetails.name}
          onChange={(e) => updateShopDetails('name', e.target.value)}
          placeholder="Nom de la boutique"
          className="text-3xl font-semibold w-full text-center"
        />
        <textarea
          value={shopDetails.description}
          onChange={(e) => updateShopDetails('description', e.target.value)}
          placeholder="Description de la boutique"
          className="text-gray-600 mt-2 w-full text-center"
        />
      </div> */}
      {/* Shop NAME, DESCRIPTION, FOLLOW BUTTON */}
      {/* <div className="text-center mt-16 sm:mt-20 px-4">
        <h1 className="text-3xl font-semibold">{selectedShop?.name}</h1>
        <p className="text-gray-600 mt-2">
          {selectedShop?.description}
        </p> */}
      {/* <button className="mt-4 bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600">
          Suivre
        </button> 
      </div>*/}
      {/* TABS FOR CATEGORIES */}
      <div className="mt-10">
        <div className="border-b border-gray-300">
          <nav className="flex justify-center ">
            <button
              onClick={() => setActiveTab('articles')}
              className={`py-2 px-4 text-xs sm:text-lg font-medium ${activeTab === 'articles'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600'
                }`}
            >
              Articles
            </button>

            <button
              onClick={() => setActiveTab('reductions')}
              className={`py-2 px-4 text-xs sm:text-lg font-medium ${activeTab === 'reductions'
                ? 'border-b-2 border-blue-500 text-blue-500'
                : 'text-gray-600'
                }`}
            >
              Reductions
            </button>
            {user?.id !== selectedShop?.manager?._id ? (
              ""
            ) : (
              <button
                onClick={() => setActiveTab('gestion')}
                className={`py-2 px-4 text-xs sm:text-lg font-medium ${activeTab === 'gestion'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600'
                  }`}
              >
                Gestion de la boutique
              </button>
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
                  <div className="text-center text-gray-600 p-4">Aucun articles disponible.</div>
                ) : (
                  <div className="product-grid">
                    {articlesByShop.map((article) => (
                      <Card articles={article} />
                    ))}
                  </div>
                )
                }
              </div>
            </>
          )}

          {activeTab === 'reductions' && (
            <div className="product-main">
              {filteredDiscount.length < 0 ? (
                <div className="text-center text-gray-600 p-4">Aucune promotion en cours.</div>
              ) : (
                <div className="product-grid">
                  {filteredDiscount.map((article) => (
                    <Card articles={article} />
                  ))}
                </div>
              )
              }
            </div>
          )}
          {activeTab === 'gestion' && (
            <>
              <div className="flex h-screen">
                <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
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
            </>

          )}
        </div>
      </div>
      {/* SIDEBAR */}
      {/* <Navigation manageOption={manageOption} setManageOption={setManageOption} /> */}
    </>

  );
};

export default Shop;
