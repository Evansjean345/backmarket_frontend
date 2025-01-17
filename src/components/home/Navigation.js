import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-number-input';
import { Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Snackbar, Alert, CircularProgress, Pagination } from '@mui/material';
import { FaFacebookF, FaHeart, FaHome, FaInstagram, FaLinkedin, FaSearch, FaShoppingCart, FaStar, FaStarHalf, FaTwitter } from "react-icons/fa";
import { IoAdd, IoClose, IoGrid, IoHome, IoLogOut, IoMenu, IoPerson, IoRemove } from "react-icons/io5";
import { TbLogout2 } from "react-icons/tb";
import 'react-phone-number-input/style.css'
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';

const Navigation = ({ isVisible, isMenuOpen, handleMenu, handleSideBar, isCategoryVisible, setIsCategoryVisible, setIsVisible,openRegister, setOpenRegister }) => {

  const { user, loginUser, registerUser, logoutUser, loading, alert, setAlert } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [method, setMethod] = useState('login');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setOpen(false);
    }
  }, [user]);

  useEffect(() => {
    if (openRegister) {
      setOpen(true);
    }
  }, [openRegister]);

  const handleOpenAccount = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenRegister(false);
  };

  const handleMethodChange = useCallback(
    (event, value) => {
      setMethod(value);
    },
    []
  );
  const handleSearch = (e) => {
    e.preventDefault();
    if((location.pathname === "/allShops" || location.pathname === "/allShops/:searchTerm") && (searchTerm.trim() !== "")) {
      navigate(`/allShops/${searchTerm}`);
    }else if (searchTerm.trim() !== "") {
      navigate(`/AllProducts/${searchTerm}`);
    }
  };


  return (
    <>
      <header>
        <div className="header-top">
          <div className="container">
            <ul className="header-social-container">
              <li>
                <Link to={"/"} className="social-link">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="social-link">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="social-link">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="social-link">
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
            <div className="header-alert-news">
              <p>
                <b className='font-bold text-orange-600'>Livraison gratuite{" "} </b>
                Cette semaine pour les commandes de plus de 15000 - FCFA
              </p>
            </div>
            {/* <div className="header-top-actions">
              <select name="currency">
                <option value="usd">USD $</option>
                <option value="eur">EUR €</option>
              </select>
              <select name="language">
                <option value="en-US">English</option>
                <option value="es-ES">Español</option>
                <option value="fr">Français</option>
              </select>
            </div> */}
          </div>
        </div>
        <div className="header-main">
          <div className="container">
            <Link to={"/"} className="header-logo">
              <img
                src="/images/logo_text_noir.png"
                alt="back market's logo"
                width={120}
                height={36}
              />
            </Link>
            <div className="header-search-container">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  name="search"
                  className="search-field"
                  placeholder={location.pathname === "/allShops" ? "Recherchez des boutiques..." : "Recherchez des articles..."}
                />
                <button type="submit" className="search-btn">
                  <FaSearch />
                </button>
              </form>

            </div>
            <div className="header-user-actions">
              <button className="action-btn" onClick={user ? (() => navigate("/userPage")) : (handleOpenAccount)}>
                <IoPerson />
                {user ? (<span className="connect">{" "}</span>) : ('')}
              </button>
              {/* {location.pathname !== '/' ? (
                <button className="action-btn" onClick={() => setIsCategoryVisible(!isCategoryVisible)}>
                  <IoGrid />
                </button>
              ) : ('')} */}
              <Link to={"/cart"} className="action-btn">
                <FaShoppingCart />
                <span className="count">{cart.length}</span>
              </Link>
              {user ? (
                <button className="action-btn" onClick={() => logoutUser()}>
                  <TbLogout2 />
                </button>
              ) : ('')
              }

            </div>
          </div>
        </div>
        <div className="mobile-bottom-navigation">
          <button className="action-btn" data-mobile-menu-open-btn="" onClick={handleMenu}>
            <IoMenu />
          </button>
          <Link to={"/cart"} className="action-btn">
            <FaShoppingCart />
            <span className="count">{cart.length}</span>
          </Link>
          <Link to={"/"} className="action-btn">
            <FaHome />
          </Link>
          <button className="action-btn" onClick={user ? (() => navigate("/userPage")) : (handleOpenAccount)}>
            <IoPerson />
          </button>
          <button className="action-btn" data-mobile-menu-open-btn="" onClick={handleSideBar}>
            <IoGrid />
          </button>
        </div>
        <nav className={isMenuOpen ? "mobile-navigation-menu  has-scrollbar active" : "mobile-navigation-menu  has-scrollbar"} data-mobile-menu="">
          <div className="menu-top">
            <h2 className="menu-title">Menu</h2>
            <button className="menu-close-btn" data-mobile-menu-close-btn="" onClick={handleMenu}>
              <IoClose />
            </button>
          </div>
          <ul className="mobile-menu-category-list">
            <li className="menu-category">
              <Link to={"/"} className="menu-title">
                Home
              </Link>
            </li>
            <li className="menu-category">
              <Link onClick={() => logoutUser()} className="menu-title">
                Deconnexion
              </Link>
            </li>
          </ul>
          <div className="menu-bottom">
            <ul className="menu-social-container">
              <li>
                <Link to={"/"} className="social-link">
                  <FaFacebookF />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="social-link">
                  <FaTwitter />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="social-link">
                  <FaInstagram />
                </Link>
              </li>
              <li>
                <Link to={"/"} className="social-link">
                  <FaLinkedin />
                </Link>
              </li>
            </ul>
          </div>
        </nav>


      </header>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        className='bg-teal-300'
        sx={{
          backgroundColor: 'rgba(0, 128, 128, 0.1)', // Appliquer une couleur de fond aux cellules du corps
        }}
      >
        <DialogTitle >Identification</DialogTitle>
        <DialogContent>
          <section className="flex justify-center relative">
            {method === 'login' &&
              (
                <>
                  <form onSubmit={(e) => { e.preventDefault(); loginUser(email, password); }} className="lg:p-11 mx-auto">
                    <div className="">
                      <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                        Bon retour!
                      </h1>
                    </div>
                    <input type="email"
                      className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-xl border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                      placeholder="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                      required />
                    <input type="password"
                      className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-xl border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                      placeholder="Mot de passe"
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                    {/*
                  <Link className="flex justify-end mb-6">
                    <span className="text-indigo-600 text-right text-base font-normal leading-6">
                      Forgot Password?
                    </span>
                  </Link> */}
                    <button type='submit'
                      className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-xl mt-5 hover:bg-orange-800 transition-all duration-700 bg-orange-600 shadow-sm mb-11">
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Connexion'}
                    </button>
                    <button onClick={() => {
                      setMethod('register');
                    }}
                      className="flex justify-center text-gray-900 text-xs font-medium leading-6"
                    >
                      {" "}
                      Vous n'avez pas de compte?{" "}
                      <span className="text-indigo-600 font-semibold pl-3"> Inscrivez vous</span>
                    </button>
                  </form>
                </>

              )
            }
            {method === 'register' &&
              (
                <>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      registerUser(name, phoneNumber, email, password);
                      setTimeout(() => {
                        setMethod('login');
                      }, 2000);
                    }} 
                    className="lg:p-11 mx-auto">
                    <div className="">
                      <h1 className="text-gray-900 text-center font-manrope text-3xl font-bold leading-10 mb-2">
                        Bienvenue!
                      </h1>
                    </div>
                    <input type="text"
                      className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-xl border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                      placeholder="Nom"
                      required
                      onChange={(e) => setName(e.target.value)} />
                    <PhoneInput defaultCountry='CI' type='tel'
                      className='w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-xl border-gray-300 border shadow-sm focus:outline-none px-4 mb-6' id="phone" name="phone"
                      placeholder="Numero de téléphone" value={phoneNumber} onChange={(value) => setPhoneNumber(value)}
                      required
                    />
                    <input type="email"
                      className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-xl border-gray-300 border shadow-sm focus:outline-none px-4 mb-6"
                      placeholder="E-mail"
                      onChange={(e) => setEmail(e.target.value)}
                      required />
                    <input type="password"
                      className="w-full h-12 text-gray-900 placeholder:text-gray-400 text-lg font-normal leading-7 rounded-xl border-gray-300 border shadow-sm focus:outline-none px-4 mb-1"
                      placeholder="Mot de passe"
                      onChange={(e) => setPassword(e.target.value)}
                      required />
                    {/*
                    <Link className="flex justify-end mb-6">
                      <span className="text-indigo-600 text-right text-base font-normal leading-6">
                        Forgot Password?
                      </span>
                    </Link> */}
                    <button type='submit'
                      className="w-full h-12 text-white text-center text-base font-semibold leading-6 rounded-xl mt-5 hover:bg-orange-800 transition-all duration-700 bg-orange-600 shadow-sm mb-11">
                      {loading ? <CircularProgress size={24} color="inherit" /> : 'Inscription'}
                    </button>
                    <button onClick={() => {
                      setMethod('login');
                    }}
                      className="flex justify-center text-gray-900 text-xs font-medium leading-6"
                    >
                      {" "}
                      Vous avez déjà un compte?{" "}
                      <span className="text-indigo-600 font-semibold pl-3"> Connectez vous</span>
                    </button>
                  </form>
                </>

              )
            }
          </section >
        </DialogContent >
        <DialogActions></DialogActions>
      </Dialog >

      <Snackbar anchorOrigin={{ vertical: "top", horizontal: "center" }} open={alert.open} autoHideDuration={6000} onClose={() => setAlert({ ...alert, open: false })}>
        <Alert onClose={() => setAlert({ ...alert, open: false })} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>

    </>
  );
};

export default Navigation;