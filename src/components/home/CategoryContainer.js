import React, { useContext, useMemo } from 'react';
import { ArticleContext } from '../../contexts/ArticleContext';
import Card from './Card';

const CategoryContainer = () => {
  const { articles } = useContext(ArticleContext);

  // Function to get random articles
  const getRandomArticles = (articlesArray, count) => {
    const shuffled = [...articlesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  // Predefined order of categories
  const predefinedOrder = ['Cosmétique', 'Femme',  'Enfant', 'Homme'];

  // Extract unique categories from the list of articles
  const categories = useMemo(() => {
    const uniqueCategories = new Set(articles.map(article => article.category));
    const sortedCategories = Array.from(uniqueCategories).sort((a, b) => {
      const indexA = predefinedOrder.indexOf(a);
      const indexB = predefinedOrder.indexOf(b);

      // If category `a` is in the predefined order, place it before the others
      if (indexA !== -1 && indexB !== -1) {
        return indexA - indexB;
      }
      // Categories in predefined order come first
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;

      // For the rest, maintain original order
      return 0;
    });

    return sortedCategories;
  }, [articles]);

  // Filter and select articles by category
  const categorizedArticles = useMemo(() => {
    const result = {};
    categories.forEach((category) => {
      const articlesByCategory = articles.filter(
        (article) => article.category === category
      );
      result[category] = getRandomArticles(articlesByCategory, 8);
    });
    return result;
  }, [articles, categories]);

  return (
    <div className="product-container">
      {categories.map((category) => (
        <div key={category} className={`rounded-lg container mb-8`}>
          <div className="product-box">
            <div className="product-main">
              <h2 className="title text-2xl font-bold text-white mb-4">{category}</h2>
              <div className="product-grid grid grid-cols-2 md:grid-cols-4 gap-4">
                {categorizedArticles[category].map((article, index) => (
                  <Card key={index} articles={article} />
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryContainer;
