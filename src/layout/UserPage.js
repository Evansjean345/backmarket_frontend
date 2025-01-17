import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext';
import { ShopContext } from '../contexts/ShopContext';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/home/Navigation';
import User from '../components/home/User';
import Footer from '../components/home/Footer';

const UserPage = () => {
  const { user, updateUser, loading, logoutUser } = useContext(UserContext);  // UserContext pour gérer les données utilisateur
  const navigate = useNavigate();
  const { createShop } = useContext(ShopContext);  // ShopContext pour gérer la création de la boutique
  const [editMode, setEditMode] = useState(false);  // État pour basculer entre la vue et l'édition
  const [userInfo, setUserInfo] = useState({
    name: '',
    phone: '',
    email: '',
    role: 'user',  // Par défaut, le rôle est 'user'
  });
  const [shopInfo, setShopInfo] = useState({
    manager: user?.id,
    name: '',
    description: '',
    phoneNumber: '',
    address: '',
    isPhysicalStore: '',
    street: '',
    openingHours: '',
    closingHours: '',
  });
  console.log("contextUser", user)

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
  };

  // Gestionnaire de soumission pour la création de la boutique
  const handleShopSubmit = (e) => {
    e.preventDefault();
    createShop(shopInfo);  // Créer une boutique via le contexte
    // Ajouter des actions supplémentaires ici, comme rediriger vers la page de la boutique
  };

  // if (loading) {
  //   return <p>Chargement en cours...</p>;
  // }
  const [openRegister, setOpenRegister] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState();
  const [isSideBarOpen, setIsSideBarOpen] = useState();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <>
      <Navigation
      
      handleMenu={handleMenu}
      handleSideBar={handleSideBar}
      isMenuOpen={isMenuOpen}
      isSideBarOpen={isSideBarOpen}
      openRegister={openRegister}
      setOpenRegister={setOpenRegister}
      />
      <User />
      <Footer />
    </>

  );
};

export default UserPage;
