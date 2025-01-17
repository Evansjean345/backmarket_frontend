import React, { useContext, useMemo, useState } from 'react';
import { IoAdd, IoClose, IoRemove } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { ArticleContext } from '../../contexts/ArticleContext';
import { ShopContext } from '../../contexts/ShopContext';
// import categories from '../data/categories';
import { CategoryContext } from '../../contexts/CategoryContext';
import { ChevronRight, Menu, Store } from 'lucide-react'

const SideBar = ({ isSideBarOpen, handleSideBar, isVisible, setIsVisible, handleSubCategoryChange }) => {

  const { categories } = useContext(CategoryContext);
  const { shops } = useContext(ShopContext);
  const { articles } = useContext(ArticleContext);
  const [openCategory, setOpenCategory] = useState(false);
  const getRandomShops = (shopsArray, count) => {
    const shuffled = [...shopsArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredShops = useMemo(() => {
    if (!shops || shops.length === 0) return [];

    let filtered = [];

    filtered = getRandomShops(shops);

    return filtered;
  }, [shops]);

  return (
    <>
      <div className={isSideBarOpen ? "sidebar  has-scrollbar active" : "sidebar  has-scrollbar"} data-mobile-menu="">
        <div className={`sidebar-category ${openCategory ? '' : 'h-14'} `} >
          <div className="sidebar-top">
            <div className='flex justify-between w-full cursor-pointer' onClick={() => setOpenCategory(!openCategory)} ><h2 className="sidebar-title ">Catégories</h2>  <Menu /> </div>
            <button
              className="sidebar-close-btn"
              data-mobile-menu-close-btn=""
              onClick={handleSideBar}
            >
              <IoClose />
            </button>
          </div>
          <ul className="sidebar-menu-category-list">
            {categories.map((categorie) => (
              <li className="sidebar-menu-category">
                <button
                  className="sidebar-accordion-menu"
                  data-accordion-btn="" onClick={() => {
                    if (isVisible === `${categorie.category}`) {
                      setIsVisible('')
                    } else (
                      setIsVisible(`${categorie.category}`)
                    )
                  }}

                >
                  <div className="menu-title-flex">
                    <p className="menu-title">{categorie.category}</p>
                  </div>
                  <div>
                    <IoAdd className={isVisible === `${categorie.category}` ? 'hidden' : 'block'} />
                    <IoRemove className={isVisible === `${categorie.category}` ? 'block' : 'hidden'} />
                  </div>
                </button>
                <ul className={isVisible === `${categorie.category}` ? "sidebar-submenu-category-list active" : "sidebar-submenu-category-list"} >
                  {categorie.subCategories.map((subCategorie) => (
                    <li className="sidebar-submenu-category">
                      <Link className="sidebar-submenu-title" onClick={() => {
                        handleSubCategoryChange(`${subCategorie}`, `${categorie.category}`)
                        window.scrollTo(0, 0);
                      }}>
                        <p className="product-name">{subCategorie}</p>
                        <data
                          value={45}
                          className="stock"
                          title="Available Stock"
                        >
                          {articles.filter(article =>
                            article.category === categorie.category && article.subCategory === subCategorie
                          ).length}
                        </data>
                      </Link>
                    </li>
                  ))

                  }
                </ul>
              </li>
            ))
            }
          </ul>

        </div>
        <div className="product-showcase">
          <Link className='hover:text-orange-600 text-orange-400' to={"/allShops"}>
            <h3 className="showcase-heading flex  ">Nos établissements <Store className='w-6 h-6 ' /> </h3>
          </Link>
          <div className="showcase-wrapper">
            <div className="showcase-container">
              {filteredShops.slice(0, 6).map((shop, index) => (
                <>
                  <div index={shop._id} className=" group bg-white border mb-2 border-solid border-gray-300 rounded-2xl p-2 transition-all duration-500 w-full hover:border-orange-600 slide-active:border-indigo-600">
                    <div className="flex items-center gap-5">
                      <img
                        className="rounded-full object-cover w-[50px] h-[50px]"
                        src={shop.profilePic || "/images/logo_minimalist.png"}
                        alt={shop.name}
                      />
                      <Link to={`/shop/${shop._id}`}className="grid gap-1">
                        <h5 className="text-gray-900 line-clamp-1 font-medium transition-all duration-500  group-hover:text-orange-600 ">
                          {shop.name}
                        </h5>
                        <span className="text-sm leading-6 line-clamp-1 text-gray-500">{shop.description} </span>
                      </Link>
                    </div>
                  </div>
                </>
              ))
              }
              <Link className='flex text-orange-500 w-full justify-end' to={"/allShops"}>
                <span className="btn-showcase">Voir plus</span>
                <ChevronRight className='w-6 h-6' />
              </Link>
            </div>
          </div>
        </div>
      </div>



    </>
  );
};

export default SideBar;