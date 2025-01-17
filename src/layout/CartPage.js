import React, { useState } from 'react';
import Navigation from '../components/home/Navigation';
import Cart from '../components/home/Cart';
import Footer from '../components/home/Footer';

const CartPage = () => {
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
    <div>
      <Navigation 
        handleMenu={handleMenu}
        handleSideBar={handleSideBar}
        isMenuOpen={isMenuOpen}
        isSideBarOpen={isSideBarOpen}  
        openRegister={openRegister} 
        setOpenRegister={setOpenRegister} />

      <Cart setOpenRegister={setOpenRegister} />
      <Footer />
    </div>
  );
};

export default CartPage;