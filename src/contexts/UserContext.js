import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { updateUserUrl, loginUserUrl, registerUserUrl } from '../url';
import { useNavigate } from 'react-router-dom';

// Créer le contexte
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Utilisateur connecté
  const [loading, setLoading] = useState(false); // Indicateur de chargement
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ open: false, message: '', severity: '' });

  // Sauvegarder les informations utilisateur dans le localStorage chaque fois qu'il change
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  // Récupérer les données du localStorage lors du premier rendu
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Charger l'utilisateur depuis le localStorage
    }
  }, []);


  


  // Charger les informations utilisateur depuis l'API
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const response = await axios.get(`${getUserUrl}`);
  //       setUser(response.data);
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération de l\'utilisateur', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  // Gérer la mise à jour de l'utilisateur

  const updateUser = async (userInfo) => {
    setLoading(true);
    try {
      const response = await axios.put(`${updateUserUrl}/${user.id}`, userInfo);
      setUser({ ...user, user: response.data });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
    }
  };


  // const updateUser = (userInfo) => {
  //   setUser({token: user.token, user: userInfo}); 
  // };

  // Gérer la connexion de l'utilisateur
  const loginUser = async (email, password) => {
    console.log(email,password)
    try {
      setLoading(true);
      const response = await axios.post(loginUserUrl, { email, password });
      setUser(response.data);
      setLoading(false);
      // if(response.status === 200){
      //   navigate("/userPage");
      // }
    } catch (error) {
      setLoading(false);
      console.error('Erreur lors de la connexion', error);
    }
  };

    // Gérer l'inscription de l'utilisateur
    const registerUser = async (name, phone, email, password) => {
      try {
        setLoading(true);
        const response = await axios.post(registerUserUrl, { name, phone, email, password });
        setLoading(false);
        if(response.status === 200){
          setAlert({ open: true, message: "Votre compte a été crée avec succès, veuillez vous connecter", severity: 'success' });
        }else{
        setAlert({ open: true, message: "Une erreur est survenue lors de l'inscription", severity: 'error' });
        }
      } catch (error) {
        setLoading(false);
        console.error('Erreur lors de l\'inscription', error);
      }
    };

  // Gérer la déconnexion de l'utilisateur
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('user')
  };

  // Suivre ou ne plus suivre une boutique
  // const toggleFollowShop = async (shopId) => {
  //   try {
  //     const response = await axios.post(`/api/user/follow/${shopId}`);
  //     setUser(prevUser => ({
  //       ...prevUser,
  //       followingShops: response.data.followingShops,
  //     }));
  //   } catch (error) {
  //     console.error('Erreur lors du suivi de la boutique', error);
  //   }
  // };

  return (
    <UserContext.Provider value={{ 
      user, 
      alert,
      setAlert,
      updateUser,
      loginUser,
      registerUser,
      logoutUser, 
      // toggleFollowShop, 
      loading 
    }}>
      {children}
    </UserContext.Provider>
  );
};
