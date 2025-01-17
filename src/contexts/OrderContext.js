import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import { createOrderUrl, getAllOrdersUrl, getOrdersByShopUrl, getOrderUrl, updateStatusOrderUrl } from '../url';

// Créer le contexte
const OrderContext = createContext();

// Fournisseur du contexte
export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [shopOrders, setShopOrders] = useState([]);
  const [articlesByOrders, setArticlesByOrders] = useState([]);
  const [ordersByShop, setOrdersByShop] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [error, setError] = useState(null);

  // Fonction pour créer une commande
  const createOrder = async (items, customer, deliveryLocation) => {
    try {
      setLoading(true);
      const response = await axios.post(createOrderUrl, { items, customer, deliveryLocation });
      setOrders((prevOrders) => [...prevOrders, response.data]); // Ajouter la nouvelle commande
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Fonction pour récupérer les commandes
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoadingFetch(true);
        setLoading(true);
        const response = await axios.get(getAllOrdersUrl);
        setOrders(response.data); // Mettre à jour les commandes
        const allShopOrders = response.data.flatMap(order => 
          order.shopOrders.map(shopOrder => ({
            ...shopOrder,
            customer: order.customer, 
            deliveryLocation: order.deliveryLocation, 
            createdAt: order.createdAt, 
            status: order.status, 
          }))
        );
        // Update shopOrders state with the combined array
        setShopOrders(allShopOrders);
        setLoading(false);
        setLoadingFetch(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        setLoadingFetch(false);
      }
    };
    fetchOrders();
  }, []);

  const fetchOrders = useCallback(async () => {
    const Orders = []
    try {
      setLoadingFetch(true);
      const response = await axios.get(getAllOrdersUrl);
      setOrders(response.data); // Mettre à jour les commandes
      setLoadingFetch(false);
    } catch (err) {
      setError(err);
      setLoadingFetch(false);
    }

    return Orders;
  },[]);

  const fetchOrdersByShop = async (shopId) => {
    try {
      setLoadingFetch(true);
      const response = await axios.get(`${getOrdersByShopUrl}/${shopId}`);
      setOrdersByShop(response.data); // Mettre à jour les commandes
      setLoadingFetch(false);
    } catch (err) {
      setError(err);
      setLoadingFetch(false);
    }
  };

  // Fonction pour mettre à jour le statut d'une commande
  const updateOrderStatus = async (orderId, status) => {
    try {
      setLoading(true);
      const response = await axios.put(`${updateStatusOrderUrl}/${orderId}`, { status });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: response.data.status } : order
        )
      );
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  const filtredOrders = useMemo((shopId) => {
    if (!orders || orders?.length === 0) return [];

    let filtred = [];

    filtred = shopOrders.filter(item => item.shopId === shopId);

    return filtred;
  }, [orders,shopOrders]);

  const handleArticlesByOrders = (orders) => {
    setLoadingFetch(true);
    const articles = orders.flatMap(order => order.items);
    setArticlesByOrders(articles) ;
    setLoadingFetch(false);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        articlesByOrders,
        shopOrders,
        loading,
        loadingFetch,
        error,
        createOrder,
        fetchOrders,
        fetchOrdersByShop,
        handleArticlesByOrders,
        filtredOrders,
        ordersByShop,
        updateOrderStatus
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

// Hook personnalisé pour accéder au contexte des commandes
export const useOrder = () => {
  return useContext(OrderContext);
};
