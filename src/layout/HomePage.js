import React, { useContext, useMemo, useState } from 'react';
import Main from '../components/home/Main';
import Footer from '../components/home/Footer';
import Navigation from '../components/home/Navigation';
import { useLocation } from 'react-router-dom';
import { ArticleContext } from '../contexts/ArticleContext';
import { UserContext } from '../contexts/UserContext';
import { CartContext } from '../contexts/CartContext';
import { Pagination } from '@mui/material';
import CardMinimalist from '../components/home/CardMinimalist';
import SideBar from '../components/home/SideBar';
import MiddleInformation from '../components/home/MiddleInformation';
import Carousel from '../components/home/Carousel';
import CategoryBox from '../components/home/CategoryBox';

const HomePage = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState("");
  const [openRegister, setOpenRegister] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false)
  const { user } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const { articles } = useContext(ArticleContext);
  const [category, setCategory] = useState("Food");
  const [subCategory, setSubCategory] = useState("Fast Food");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;


  const [isMenuOpen, setIsMenuOpen] = useState();
  const [isSideBarOpen, setIsSideBarOpen] = useState();

  const handleSubCategoryChange = (newSubCategory, newCategory) => {
    setCategory(newCategory);
    setSubCategory(newSubCategory);
    setCurrentPage(1); // Reset to first page when category changes
  };

  const filteredArticlesByCategoryAndSubCategory = useMemo(() => {
    if (!articles || articles.length === 0) return [];
  
    // Filtrer par catégorie et sous-catégorie
    const filtered = articles.filter(article => 
      article.category === category && article.subCategory === subCategory
    );
  
    return filtered;
  }, [articles, category, subCategory]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticlesByCategoryAndSubCategory.slice(startIndex, endIndex);
  }, [filteredArticlesByCategoryAndSubCategory, currentPage]);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  const getRandomArticles = (articlesArray, count) => {
    const shuffled = [...articlesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredArticles = useMemo(() => {
    if (!articles || articles.length === 0) return [];

    let filtered = [];

    filtered = getRandomArticles(articles, 16);

    return filtered;
  }, [articles]);

  return (
    <>
      <Navigation
        user={user}
        handleMenu={handleMenu}
        handleSideBar={handleSideBar}
        isMenuOpen={isMenuOpen}
        isSideBarOpen={isSideBarOpen}
        isCategoryVisible={isCategoryVisible}
        setIsCategoryVisible={setIsCategoryVisible}
        setOpenRegister={setOpenRegister}
        articles={articles}
        location={location}
        cart={cart}
      />

      <div className={(isCategoryVisible || (location.pathname === '/')) ? 'block mt-10' : 'hidden'}>
        {/*- PRODUCT*/}
        <div className="product-container">
          <div className="container w-auto">
            {/*- SIDEBAR*/}

            <div className="product-container">
              <div className="container">
                <SideBar
                  isSideBarOpen={isSideBarOpen}
                  handleSideBar={handleSideBar}
                  isVisible={isVisible}
                  setIsVisible={setIsVisible}
                  handleSubCategoryChange={handleSubCategoryChange}
                />
                <div className="product-box">
                  {/*AFFICHAGE DE PRODUITS MINIMALISTE PAR CATEGORIE*/}
                  <div className="product-minimal">
                    <div className="product-showcase">
                      <div className="product-showcase">
                        <h2 className="title">{subCategory}</h2>
                        <div className=" has-scrollbar">
                          <div className="showcase-container flex flex-wrap">
                            {paginatedArticles.map(article => (
                              <div className='m-2 w-[100%]  md:w-[23%] showcase-item-container' key={article.id}>
                                <CardMinimalist article={article} />
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Pagination */}
                        <Pagination
                          count={Math.ceil(filteredArticlesByCategoryAndSubCategory.length / articlesPerPage)}
                          page={currentPage}
                          onChange={handlePageChange}
                          className="flex justify-center mt-4"
                        />
                      </div>
                    </div>
                  </div>
                  <Carousel/>
                  <CategoryBox/>
                  <Main filteredArticles={filteredArticles} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MiddleInformation/>
      <Footer />
    </>
  );
};

export default HomePage;