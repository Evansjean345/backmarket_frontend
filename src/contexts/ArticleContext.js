import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { createArticleUrl, deleteArticleByShopUrl, deleteArticleUrl, getAllArticlesByShopIdUrl, getAllArticlesUrl, updateArticleUrl } from '../url';

// Créer le contexte
export const ArticleContext = createContext();

export const ArticleProvider = ({ children }) => {
  const [articles, setArticles] = useState([]); // Liste des articles
  const [articlesByShop, setArticlesByShop] = useState([]); // Liste des articles
  const [selectedArticle, setSelectedArticle] = useState(null); // article sélectionnée
  const [loadingArticle, setLoadingArticle] = useState(true); // Indicateur de chargement


  // Récupérer les données du localStorage lors du premier rendu
  useEffect(() => {
    const storedArticle = localStorage.getItem('selectedArticle');
    if (storedArticle) {
      setSelectedArticle(JSON.parse(storedArticle)); // Charger les informations de l' article depuis le localStorage
    }
  }, []);

  // Sauvegarder l' article sélectionnée dans le localStorage chaque fois qu'il change
  useEffect(() => {
    if (selectedArticle) {
      localStorage.setItem('selectedArticle', JSON.stringify(selectedArticle));
    } else {
      localStorage.removeItem('selectedArticle');
    }
  }, [selectedArticle]);

  //Crée un article
  const createArticle = async (article) => {
    try {
      // Vérification de l'objet discount pour s'assurer qu'il contient tous les champs requis
      if (!article.discount) {
        throw new Error('Discount object is missing.');
      }
      const { percentDiscount, newPrice, applyDiscount } = article.discount;
      if (
        percentDiscount === undefined ||
        newPrice === undefined ||
        applyDiscount === undefined
      ) {
        throw new Error(
          'Discount object is missing required fields: percentDiscount, newPrice, applyDiscount.'
        );
      }
  
      // Créer une instance de FormData
      const formData = new FormData();
      formData.append('name', article.name);
      formData.append('category', article.category);
      formData.append('subCategory', article.subCategory);
      formData.append('shop', article.shop); // Récupérez l'ID du shop
      formData.append('price', article.price);
      formData.append('description', article.description);
      formData.append('stock', article.stock);
  
      // Sérialiser l'objet discount
      formData.append('discount', JSON.stringify(article.discount));
  
      // Ajouter chaque fichier individuellement
      article.imageUrls.forEach((image) => {
        formData.append('imageUrls', image);
      });
  
      // Envoyer la requête avec axios
      const response = await axios.post(createArticleUrl, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data);
      setArticles([...articles, response.data]);
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };
  
  // Charger tout les articles depuis l'API
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get(getAllArticlesUrl);
        setArticles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles', error);
      } finally {
        setLoadingArticle(false);
      }
    };
    fetchArticles();
  }, []);

  // Charger tout les articles d'une boutique depuis l'API
  const fetchArticlesByShop = async (shopId) => {
    try {
      const response = await axios.get(`${getAllArticlesByShopIdUrl}/${shopId}`);
      setArticlesByShop(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des articles', error);
    } finally {
      setLoadingArticle(false);
    }
  };


  // Sélectionner un article
  const selectArticle = (articleId) => {
    const article = articles.find(article => article._id === articleId.id);
    setSelectedArticle(article);
  };

  // Mettre à jour les détails d'un article
  const updateArticle = async (articleId, article) => {

    try {
      // Vérification de l'objet discount pour s'assurer qu'il contient tous les champs requis
      if (!article.discount) {
        throw new Error('Discount object is missing.');
      }
      const { percentDiscount, newPrice, applyDiscount } = article.discount;
      if (
        percentDiscount === undefined ||
        newPrice === undefined ||
        applyDiscount === undefined
      ) {
        throw new Error(
          'Discount object is missing required fields: percentDiscount, newPrice, applyDiscount.'
        );
      }
  
      // Créer une instance de FormData
      const formData = new FormData();
      formData.append('name', article.name);
      formData.append('category', article.category);
      formData.append('subCategory', article.subCategory);
      formData.append('shop', article.shop); // Récupérez l'ID du shop
      formData.append('price', article.price);
      formData.append('description', article.description);
      formData.append('stock', article.stock);
  
      // Sérialiser l'objet discount
      formData.append('discount', JSON.stringify(article.discount));
  
      // Ajouter chaque fichier individuellement
      article.imageUrls.forEach((image) => {
        formData.append('imageUrls', image);
      });
      const response = await axios.put(`${updateArticleUrl}/${articleId}`, formData);
      setArticles(articles.map(article => (article._id === articleId ? response.data : article)));
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\' article', error);
    }
  };

  const deleteArticle = async (articleId) => {
    try {
      // Appel à l'API pour supprimer l'article
      await axios.delete(`${deleteArticleUrl}/${articleId}`);
  
      // Mise à jour de la liste d'articles en enlevant l'article supprimé
      setArticles(articles.filter(article => article._id !== articleId));
    } catch (error) {
      console.error('Erreur lors de la suppression de l\' article', error);
    }
  };

  const deleteArticlesByShopId = async (shopId) => {
    try {
      // Appel à l'API pour supprimer les articles du shop
      await axios.delete(`${deleteArticleByShopUrl}/${shopId}`);

      // Mise à jour de la liste d'articles en enlevant les articles du shop supprimé
      setArticles(articles.filter(article => article.shop !== shopId));
    } catch (error) {
      console.error('Erreur lors de la suppression des articles du shop', error);
    }
  };
  
  return (
    <ArticleContext.Provider value={{
      articles,
      articlesByShop,
      fetchArticlesByShop,
      createArticle,
      selectedArticle,
      selectArticle,
      updateArticle,
      deleteArticle,
      deleteArticlesByShopId,
      loadingArticle
    }}>
      {children}
    </ArticleContext.Provider>
  );
};
