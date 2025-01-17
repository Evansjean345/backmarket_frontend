import { motion, useAnimationControls } from "framer-motion";
import { useState, useEffect } from "react";
import NavigationLink from "./NavigationLink";
import {
  ChartBarIcon,
  UserIcon,
  ShoppingCartIcon,
  ShoppingBagIcon,
  ArrowLeftStartOnRectangleIcon
} from "@heroicons/react/24/outline";
import { TbShoppingCartCopy, TbShoppingCartCancel, TbShoppingCartShare, TbShoppingCartPlus, TbShoppingCartPause } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const containerVariants = {
  close: {
    width: "5rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
  open: {
    width: "16rem",
    transition: {
      type: "spring",
      damping: 15,
      duration: 0.5,
    },
  },
};

const svgVariants = {
  close: {
    rotate: 360,
  },
  open: {
    rotate: 180,
  },
};

const Navigation = ({ manageOption, setManageOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerControls = useAnimationControls();
  const svgControls = useAnimationControls();

  useEffect(() => {
    if (isOpen) {
      containerControls.start("open");
      svgControls.start("open");
    } else {
      containerControls.start("close");
      svgControls.start("close");
    }
  }, [isOpen]);

  const handleOpenClose = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <motion.nav
        variants={containerVariants}
        animate={containerControls}
        initial="close"
        className="bg-teal-700 flex flex-col z-2 gap-5 p-3 top-0 left-0 h-full shadow shadow-neutral-600 "
      >
        <div className="flex flex-row w-full justify-between place-items-center">
          <img src="/images/logoJF.png" className="w-20" alt="" />
          {/* <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-700 rounded-full" /> */}
          <button
            className="p-1 rounded-full flex "
            onClick={() => handleOpenClose()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1}
              stroke="currentColor"
              className="w-8 h-8 stroke-black"
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={svgVariants}
                animate={svgControls}
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                }}
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-3 overflow-clip">
          <div onClick={()=> setManageOption('dashboard')}>
            <NavigationLink name="Accueil" >
              <ChartBarIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8 " />
            </NavigationLink>
          </div>
          <div onClick={()=> setManageOption('orders')}>
            <NavigationLink name="Gestion des commandes" >
              <TbShoppingCartPlus className="stroke-inherit stroke-[0.75] min-w-8 w-8 text-3xl" />
            </NavigationLink>
          </div>
          <div onClick={()=> setManageOption('articles')}>
            <NavigationLink name="Gestion des articles">
              <ShoppingBagIcon className="stroke-inherit stroke-[0.75] min-w-8 w-8 text-3xl" />
            </NavigationLink>
          </div>
        </div>
        
      </motion.nav>
    </>
  );
};

export default Navigation;
