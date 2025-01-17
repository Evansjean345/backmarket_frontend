import React, { useState } from 'react';
import Navigation from '../components/home/Navigation';
import AllProducts from '../components/home/AllProducts';
import Footer from '../components/home/Footer';

const AllProductsPage = () => {
  const [openRegister, setOpenRegister] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState();
  const [isSideBarOpen, setIsSideBarOpen] = useState();

  const handleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <>
      <Navigation
      
      handleMenu={handleMenu}
      handleSideBar={handleSideBar}
      isMenuOpen={isMenuOpen}
      isSideBarOpen={isSideBarOpen}
      openRegister={openRegister}
      setOpenRegister={setOpenRegister}
      />
     <AllProducts/>
     <Footer/> 
    </>
  );
};

export default AllProductsPage;