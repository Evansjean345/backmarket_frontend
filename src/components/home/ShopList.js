import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';
import { Pagination } from '@mui/material';
import SideBar from './SideBar';

const ShopList = () => {
  const { shops } = useContext(ShopContext);
  const { searchTerm } = useParams();

  const [isVisible, setIsVisible] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const shopsPerPage = 7;

  const handleSubCategoryChange = (newSubCategory) => {
    setSubCategory(newSubCategory);
  };

  // Filtrage des shops selon le terme de recherche
  const searchShops = useMemo(() => {
    if (!searchTerm || !shops) return shops;

    const searchQuery = searchTerm.toLowerCase();
    return shops.filter(shop => shop.name.toLowerCase().includes(searchQuery));
  }, [shops, searchTerm]);

  // Pagination des résultats de recherche
  const paginatedShops = useMemo(() => {
    const startIndex = (currentPage - 1) * shopsPerPage;
    const endIndex = startIndex + shopsPerPage;
    return searchShops.slice(startIndex, endIndex);
  }, [searchShops, currentPage]);

  // Gérer le changement de page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  console.log()
  return (
    <>
      <div className='flex justify-between gap-5 mx-6 my-3'>
        <SideBar handleSubCategoryChange={handleSubCategoryChange} setIsVisible={setIsVisible} isVisible={isVisible} />
        <div className='p-3 rounded-lg shadow-lg border w-[75%]'>
          <div className="search-results">
            {paginatedShops.length > 0 ? (
              <div className="product-main">
                <ul className="divide-y divide-slate-100">
                  {paginatedShops.map((shop) => (
                    <div index={shop._id} className=" group bg-white border mb-2 border-solid border-gray-300 rounded-2xl p-2 transition-all duration-500 w-full hover:border-orange-600 ">
                      <div className="flex items-center gap-5">
                        <img
                          className="rounded-full object-cover w-[50px] h-[50px]"
                          src={shop.profilePic || "/images/logo_minimalist.png"}
                          alt={shop.name}
                        />
                        <Link to={`/shop/${shop._id}`} className="grid gap-1">
                          <h5 className="text-gray-900 font-medium transition-all duration-500  group-hover:text-orange-600 ">
                            {shop.name}
                          </h5>
                          <span className="text-sm leading-6 line-clamp-1 text-gray-500">{shop.description} </span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Aucune boutique trouvé.</p>
            )}
            {/* Pagination */}
            <div className="flex justify-center mt-6">
              <Pagination
                count={Math.ceil(searchShops.length / shopsPerPage)}
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

export default ShopList;
