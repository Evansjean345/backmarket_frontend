import { img } from 'framer-motion/client';
import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArticleContext } from '../../contexts/ArticleContext';

const CategoryBox = () => {

  const { articles } = useContext(ArticleContext);

  const categoryImages = {

    Femme: '/images/Femme.webp',
    Cosmétique: '/images/cosmétique.webp',
    Enfant: '/images/enfant.webp',
    Homme: '/images/Homme.webp',
    Food: '/images/food.webp',
    Santé: '/images/santé.webp',
    Hebergement: '/images/hebergement.webp',
    Restauration: '/images/restauration.webp',
    Vivriers: '/images/vivriers.webp',
    Ferme: '/images/ferme.webp',
    Poissonnerie: '/images/poissonerie.webp',
  };
  const predefinedOrder = ['Cosmétique', 'Femme',  'Enfant', 'Homme', 'Food', 'Hebergement' ];
   // Predefined order of categories
   const categories = useMemo(() => {
    const uniqueCategories = new Set(articles.map(article => article.category));
    const filteredCategories = Array.from(uniqueCategories).filter(category => category in categoryImages); // Filter categories based on categoryImages
    const sortedCategories = filteredCategories.sort((a, b) => {
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

  // Example category images (you might need to adjust these URLs or image paths)


  return (
    <>
      {/*BLOG*/}
      <div className="blog">
        <div className="container">
          <div className="blog-container has-scrollbar ">
            {categories.map((category) => (
              <div className="blog-card" key={category.id}>
                <Link to={`/AllProducts/${category}`}>
                  <img
                    src={categoryImages[category] || 'default-category-image.webp'}
                    alt={categoryImages[category]}
                    className="blog-banner w-[100%] h-[175px] object-cover"
                  />
                </Link>
                <div className="blog-content">
                  <Link to={`/AllProducts/${category}`} className="blog-category">
                    {category}
                  </Link>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryBox;