import React, {createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {createShopUrl, getAllShopsUrl, updateShopUrl, deleteShopUrl} from '../url';
import {useNavigate} from 'react-router-dom';
import {UserContext} from './UserContext';

// Créer le contexte
export const ShopContext = createContext();

export const ShopProvider = ({children}) => {
    const {user, updateUser} = useContext(UserContext);
    const [shops, setShops] = useState([]); // Liste des boutiques
    const navigate = useNavigate();
    const [selectedShop, setSelectedShop] = useState(null); // Boutique sélectionnée
    const [loading, setLoading] = useState(true); // Indicateur de chargement
    const userInfo = user?.user;

    // Récupérer les données du localStorage lors du premier rendu
    useEffect(() => {
        const storedShop = localStorage.getItem('selectedShop');
        if (storedShop) {
            setSelectedShop(JSON.parse(storedShop)); // Charger les informations de la boutique depuis le localStorage
        }
    }, []);

    // Sauvegarder la boutique sélectionnée dans le localStorage chaque fois qu'elle change
    useEffect(() => {
        if (selectedShop) {
            localStorage.setItem('selectedShop', JSON.stringify(selectedShop));
        } else {
            localStorage.removeItem('selectedShop');
        }
    }, [selectedShop]);

    //Crée une boutique
    const createShop = async (shop) => {
        setLoading(true);
        try {
            const response = await axios.post(createShopUrl, {
                name: shop.name,
                description: shop.description,
                manager: shop.manager, // Récupérer l'ID du manager
                openingHours: shop.openingHours,
                closingHours: shop.closingHours,
                isPhysicalStore: shop.isPhysicalStore,
                address: shop.address,
                phoneNumber: shop.phoneNumber,
                email: shop.email,
            });

            if (response.status === 200 || response.status === 201) {
                const createdShop = response.data;
                setShops([...shops, createdShop]);

                // Mettre à jour l'utilisateur avec la nouvelle boutique
                const updatedShopsManaged = userInfo.shopsManaged
                    ? [...userInfo.shopsManaged, createdShop._id]
                    : [createdShop._id];

                updateUser({
                    ...userInfo,
                    shopsManaged: updatedShopsManaged,
                });

                // Mise à jour du contexte utilisateur avec les nouvelles boutiques
                updateUser({
                    ...userInfo,
                    shopsManaged: updatedShopsManaged,
                });

                // Rediriger vers la page de la boutique nouvellement créée
                navigate(`/shop/${createdShop._id}`);
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };


    // Charger toutes les boutiques depuis l'API
    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get(getAllShopsUrl);
                setShops(response.data);
            } catch (error) {
                console.error('Erreur lors de la récupération des boutiques', error);
            } finally {
                setLoading(false);
            }
        };
        fetchShops();
    }, []);

    // Sélectionner une boutique
    const selectShop = (shopId) => {
        const shop = shops.find(shop => shop._id === shopId);
        setSelectedShop(shop);
    };

    // Mettre à jour les détails d'une boutique
    const updateShop = async (data, id) => {
        console.log("data", data);
        setLoading(true);
        const formData = new FormData();

        // Append text fields
        for (const key in data) {
            if (key !== 'bannerPic' && key !== 'profilePic') {
                formData.append(key, data[key]);
            }
        }

        // Append file fields if they exist
        if (data.bannerPic) {
            formData.append('bannerPic', data.bannerPic);
        }
        if (data.profilePic) {
            formData.append('profilePic', data.profilePic);
        }

        // Logging FormData contents
        // console.log('FormData Contents:');
        // for (let [key, value] of formData.entries()) {
        //   console.log(`${key}:`, value);
        // }
        try {
            const response = await axios.put(
                `${updateShopUrl}/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            setShops((prevShops) =>
                prevShops.map((shop) =>
                    shop.id === response.data.id ? response.data : shop
                )
            );
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error('Erreur lors de la mise à jour de la boutique', error);
        }
    };

    // Supprimer une boutiquue
    const deleteShop = async (id) => {
        try {
            await axios.delete(`${deleteShopUrl}/${id}`);
            setShops((prevShops) => prevShops.filter((shop) => shop._id !== id));
        } catch (error) {
            console.error('Erreur lors de la suppression de la boutique', error);
        }
    }


    return (
        <ShopContext.Provider value={{
            shops,
            createShop,
            selectedShop,
            selectShop,
            updateShop,
            deleteShop,
            loading
        }}>
            {children}
        </ShopContext.Provider>
    );
};
