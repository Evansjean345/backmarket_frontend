import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArticleContext } from '../../contexts/ArticleContext';
import { IoAdd, IoRemove } from 'react-icons/io5';
import Card from './Card';
import { Pagination } from '@mui/material';
import SideBar from './SideBar';

const AllProducts = () => {

  const { searchTerm } = useParams();
  const [results, setResults] = useState([]);
  const [isVisible, setIsVisible] = useState("")
  const { articles } = useContext(ArticleContext);
  const [subCategory, setSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 8;


  console.log(searchTerm)
  const handleSubCategoryChange = (newSubCategory) => {
    setSubCategory(newSubCategory);
  };

  // Fonction qui analyse caractère par caractère
  const searchArticles = useMemo(() => {
    if (!searchTerm || !articles) return [];

    const searchQuery = searchTerm?.toLowerCase();
    const subCategoryQuery = subCategory.toLowerCase();

    // Si une sous-catégorie est sélectionnée, filtrer uniquement par sous-catégorie
    if (subCategoryQuery) {
      return articles.filter((article) => {
        return article.subCategory?.toLowerCase() === subCategoryQuery;
      });
    }

    // Filtrer les articles en fonction de la correspondance caractère par caractère
    return articles.filter(article => {
      const nameMatch = article.name.toLowerCase().includes(searchQuery);
      const descMatch = article.description.toLowerCase().includes(searchQuery);
      const categoryMatch = article.category?.toLowerCase().includes(searchQuery);
      const subCategoryMatch = article.subCategory?.toLowerCase().includes(searchQuery);

      return nameMatch || descMatch || categoryMatch || subCategoryMatch;
    });
  }, [articles, searchTerm, subCategory]);

  useEffect(() => {
    setResults(searchArticles);
  }, [searchArticles]);

    // Gérer les articles affichés par page
    const paginatedArticles = useMemo(() => {
      const startIndex = (currentPage - 1) * articlesPerPage;
      const endIndex = startIndex + articlesPerPage;
      return searchArticles.slice(startIndex, endIndex);
    }, [searchArticles, currentPage]);
  
    useEffect(() => {
      setResults(paginatedArticles);
    }, [paginatedArticles]);

    // Gérer la pagination
    const handlePageChange = (event, value) => {
      setCurrentPage(value);
    };

  return (
    <>
      <div className='flex justify-between mx-6 my-3'>
        <SideBar handleSubCategoryChange={handleSubCategoryChange} setIsVisible={setIsVisible} isVisible={isVisible}  />
        <div className='p-3 rounded-lg shadow-lg border w-[75%]'>
          <div className="search-results">
            <h2>Résultats de recherche pour : "{searchTerm}"</h2>

            {results.length > 0 ? (
              <div className="product-main">

                <div className="product-grid">
                  {results?.map(article => (
                    <Card articles={article} />
                  ))}
                </div>

              </div>
            ) : (
              <p>Aucun article ne correspond à votre recherche.</p>
            )}
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <Pagination
                count={Math.ceil(searchArticles.length / articlesPerPage)}
                page={currentPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default AllProducts;