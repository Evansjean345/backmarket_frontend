// ArticleCardList.jsx
import React, { useContext, useEffect, useState } from 'react';
import { ArticleContext } from '../../contexts/ArticleContext'; // Assurez-vous que votre contexte est configuré

const ArticleCardList = (shopId) => {

  const { articles,fetchArticlesByShop,articlesByShop, updateArticle, deleteArticle } = useContext(ArticleContext);

  const [discount, setDiscount] = useState(0); // État pour gérer le pourcentage de réduction

  const id = shopId.shopId ;

  useEffect(() => {
    if (id) {
      fetchArticlesByShop(id); // Charger les informations du shop à partir du contexte en fonction de l'ID
    }
  }, [id, articles]);

  // Fonction pour calculer le prix après réduction
  const calculateDiscountedPrice = (price, discount) => {
    const reduction = (price * discount) / 100;
    return price - reduction;
  };

  // Fonction pour appliquer la réduction
  const applyDiscount = (article) => {
    const newPrice = calculateDiscountedPrice(article.price, discount);
    updateArticle(article._id ,{ ...article, discountPrice: newPrice, discount: true }); // Appel à la fonction de mise à jour depuis le contexte
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {articlesByShop.map((article) => (
        <div key={article._id} className="bg-white p-4 shadow rounded">
          <img src={article.imageUrls[0]} alt={article.name} className="w-full h-32 object-cover rounded" />
          <h3 className="text-lg font-semibold">{article.name}</h3>
          <p className="text-sm text-gray-500">{article.category}</p>
          <p className="text-sm text-gray-700">
            Prix original : {article.price} FCFA
            <br />
            {discount > 0 && (
              <>
                <span className="text-green-500">Prix après réduction : {calculateDiscountedPrice(article.price, discount)} FCFA</span>
                <br />
                <span className="text-red-500">Réduction : {discount} %</span>
              </>
            )}
          </p>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            placeholder="Pourcentage de réduction"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => applyDiscount(article)}
            className="w-full mt-2 bg-green-500 text-white py-1 rounded hover:bg-green-600"
          >
            Appliquer Réduction
          </button>
          <button
            onClick={() => updateArticle(article)}
            className="w-full mt-2 bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
          >
            Modifier
          </button>
          <button
            onClick={() => deleteArticle(article._id)}
            className="w-full mt-2 bg-red-500 text-white py-1 rounded hover:bg-red-600"
          >
            Supprimer
          </button>
        </div>
      ))}
    </div>
  );
};

export default ArticleCardList;
