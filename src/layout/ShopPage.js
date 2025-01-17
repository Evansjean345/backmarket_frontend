import React, { useState } from 'react';
import Navigation from '../components/home/Navigation';
import Footer from '../components/home/Footer';
import Boutique from '../components/home/Boutique';

const StorePage = () => {
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
      <Boutique />
      <Footer />
    </>
  );
};

export default StorePage;