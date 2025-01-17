import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaRegHeart, FaPhoneAlt, FaPhone } from "react-icons/fa";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { FaRegStar, FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { IoBoatSharp, IoRocket, IoArrowUndo, IoBoat } from "react-icons/io5";
import {ArticleContext} from "../../contexts/ArticleContext"
import Card from './Card';
import CategoryContainer from './CategoryContainer';

const Main = ({filteredArticles}) => {

  return (
    <>
      {/*google font link*/}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet"
      />
      <div className="overlay" data-overlay="" />

      {/*MAIN*/}
      <main>
 
        <CategoryContainer/>
        {/*PRODUCT*/}
        <div className="product-container">
          <div className="container">
            <div className="product-box">
              {/*AFFICHAGE DE PRODUITS MINIMALISTE PAR CATEGORIE*/}
              {/* <div className="product-minimal">
                <div className="product-showcase">
                  <h2 className="title">FOOD</h2>
                  <div className="showcase-wrapper has-scrollbar">
                    <div className="showcase-container">
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/clothes-1.jpg"
                            alt="relaxed short full sleeve t-shirt"
                            width={70}
                            className="showcase-img"
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Relaxed Short full Sleeve T-Shirt
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Clothes
                          </Link>
                          <div className="price-box">
                            <p className="price">$45.00</p>
                            <del>$12.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/clothes-2.jpg"
                            alt="girls pink embro design top"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Girls pnk Embro design Top
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Clothes
                          </Link>
                          <div className="price-box">
                            <p className="price">$61.00</p>
                            <del>$9.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/clothes-3.jpg"
                            alt="black floral wrap midi skirt"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Black Floral Wrap Midi Skirt
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Clothes
                          </Link>
                          <div className="price-box">
                            <p className="price">$76.00</p>
                            <del>$25.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/shirt-1.jpg"
                            alt="pure garment dyed cotton shirt"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Pure Garment Dyed Cotton Shirt
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Mens Fashion
                          </Link>
                          <div className="price-box">
                            <p className="price">$68.00</p>
                            <del>$31.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="showcase-container">
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/jacket-5.jpg"
                            alt="men yarn fleece full-zip jacket"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              MEN Yarn Fleece Full-Zip Jacket
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Winter wear
                          </Link>
                          <div className="price-box">
                            <p className="price">$61.00</p>
                            <del>$11.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/jacket-1.jpg"
                            alt="mens winter leathers jackets"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Mens Winter Leathers Jackets
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Winter wear
                          </Link>
                          <div className="price-box">
                            <p className="price">$32.00</p>
                            <del>$20.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/jacket-3.jpg"
                            alt="mens winter leathers jackets"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Mens Winter Leathers Jackets
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Jackets
                          </Link>
                          <div className="price-box">
                            <p className="price">$50.00</p>
                            <del>$25.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/shorts-1.jpg"
                            alt="better basics french terry sweatshorts"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Better Basics French Terry Sweatshorts
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Shorts
                          </Link>
                          <div className="price-box">
                            <p className="price">$20.00</p>
                            <del>$10.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-showcase">
                  <h2 className="title">VETEMENTS</h2>
                  <div className="showcase-wrapper  has-scrollbar">
                    <div className="showcase-container">
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/sports-1.jpg"
                            alt="running & trekking shoes - white"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Running &amp; Trekking Shoes - White
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Sports
                          </Link>
                          <div className="price-box">
                            <p className="price">$49.00</p>
                            <del>$15.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/sports-2.jpg"
                            alt="trekking & running shoes - black"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Trekking &amp; Running Shoes - black
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Sports
                          </Link>
                          <div className="price-box">
                            <p className="price">$78.00</p>
                            <del>$36.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/party-wear-1.jpg"
                            alt="womens party wear shoes"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Womens Party Wear Shoes
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Party wear
                          </Link>
                          <div className="price-box">
                            <p className="price">$94.00</p>
                            <del>$42.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/sports-3.jpg"
                            alt="sports claw women's shoes"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Sports Claw Women's Shoes
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Sports
                          </Link>
                          <div className="price-box">
                            <p className="price">$54.00</p>
                            <del>$65.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="showcase-container">
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/sports-6.jpg"
                            alt="air tekking shoes - white"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Air Trekking Shoes - white
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Sports
                          </Link>
                          <div className="price-box">
                            <p className="price">$52.00</p>
                            <del>$55.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/shoe-3.jpg"
                            alt="Boot With Suede Detail"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Boot With Suede Detail
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            boots
                          </Link>
                          <div className="price-box">
                            <p className="price">$20.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/shoe-1.jpg"
                            alt="men's leather formal wear shoes"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Men's Leather Formal Wear shoes
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            formal
                          </Link>
                          <div className="price-box">
                            <p className="price">$56.00</p>
                            <del>$78.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/shoe-2.jpg"
                            alt="casual men's brown shoes"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Casual Men's Brown shoes
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Casual
                          </Link>
                          <div className="price-box">
                            <p className="price">$50.00</p>
                            <del>$55.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product-showcase">
                  <h2 className="title">ELECTRONIQUE</h2>
                  <div className="showcase-wrapper  has-scrollbar">
                    <div className="showcase-container">
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/watch-3.jpg"
                            alt="pocket watch leather pouch"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Pocket Watch Leather Pouch
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Watches
                          </Link>
                          <div className="price-box">
                            <p className="price">$50.00</p>
                            <del>$34.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/jewellery-3.jpg"
                            alt="silver deer heart necklace"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Silver Deer Heart Necklace
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Jewellery
                          </Link>
                          <div className="price-box">
                            <p className="price">$84.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/perfume.jpg"
                            alt="titan 100 ml womens perfume"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Titan 100 Ml Womens Perfume
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Perfume
                          </Link>
                          <div className="price-box">
                            <p className="price">$42.00</p>
                            <del>$10.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/belt.jpg"
                            alt="men's leather reversible belt"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Men's Leather Reversible Belt
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Belt
                          </Link>
                          <div className="price-box">
                            <p className="price">$24.00</p>
                            <del>$10.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="showcase-container">
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/jewellery-2.jpg"
                            alt="platinum zircon classic ring"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              platinum Zircon Classic Ring
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            jewellery
                          </Link>
                          <div className="price-box">
                            <p className="price">$62.00</p>
                            <del>$65.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/watch-1.jpg"
                            alt="smart watche vital plus"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Smart watche Vital Plus
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            Watches
                          </Link>
                          <div className="price-box">
                            <p className="price">$56.00</p>
                            <del>$78.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/shampoo.jpg"
                            alt="shampoo conditioner packs"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              shampoo conditioner packs
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            cosmetics
                          </Link>
                          <div className="price-box">
                            <p className="price">$20.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>
                      <div className="showcase">
                        <Link className="showcase-img-box">
                          <img
                            src="/templates/products/jewellery-1.jpg"
                            alt="rose gold peacock earrings"
                            className="showcase-img"
                            width={70}
                          />
                        </Link>
                        <div className="showcase-content">
                          <Link>
                            <h4 className="showcase-title">
                              Rose Gold Peacock Earrings
                            </h4>
                          </Link>
                          <Link className="showcase-category">
                            jewellery
                          </Link>
                          <div className="price-box">
                            <p className="price">$20.00</p>
                            <del>$30.00</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/*GRANDE ANNONCE DE PRODUIT*/}
              {/* <div className="product-featured">
                <h2 className="title">Deal of the day</h2>
                <div className="showcase-wrapper has-scrollbar">
                  <div className="showcase-container">
                    <div className="showcase">
                      <div className="showcase-banner">
                        <img
                          src="/templates/products/shampoo.jpg"
                          alt="shampoo, conditioner & facewash packs"
                          className="showcase-img"
                        />
                      </div>
                      <div className="showcase-content">
                        <div className="showcase-rating">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                          <FaRegStar />
                        </div>
                        <Link>
                          <h3 className="showcase-title">
                            shampoo, conditioner &amp; facewash packs
                          </h3>
                        </Link>
                        <p className="showcase-desc">
                          Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor
                          dolor sit amet consectetur Lorem ipsum dolor
                        </p>
                        <div className="price-box">
                          <p className="price">$150.00</p>
                          <del>$200.00</del>
                        </div>
                        <button className="add-cart-btn">add to cart</button>
                        <div className="showcase-status">
                          <div className="wrapper">
                            <p>
                              already sold: <b>20</b>
                            </p>
                            <p>
                              available: <b>40</b>
                            </p>
                          </div>
                          <div className="showcase-status-bar" />
                        </div>
                        <div className="countdown-box">
                          <p className="countdown-desc">Hurry Up! Offer ends in:</p>
                          <div className="countdown">
                            <div className="countdown-content">
                              <p className="display-number">360</p>
                              <p className="display-text">Days</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">24</p>
                              <p className="display-text">Hours</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">59</p>
                              <p className="display-text">Min</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">00</p>
                              <p className="display-text">Sec</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="showcase-container">
                    <div className="showcase">
                      <div className="showcase-banner">
                        <img
                          src="/templates/products/jewellery-1.jpg"
                          alt="Rose Gold diamonds Earring"
                          className="showcase-img"
                        />
                      </div>
                      <div className="showcase-content">
                        <div className="showcase-rating">
                          <FaStar />
                          <FaStar />
                          <FaStar />
                          <FaRegStar />
                          <FaRegStar />
                        </div>
                        <h3 className="showcase-title">
                          <Link className="showcase-title">
                            Rose Gold diamonds Earring
                          </Link>
                        </h3>
                        <p className="showcase-desc">
                          Lorem ipsum dolor sit amet consectetur Lorem ipsum dolor
                          dolor sit amet consectetur Lorem ipsum dolor
                        </p>
                        <div className="price-box">
                          <p className="price">$1990.00</p>
                          <del>$2000.00</del>
                        </div>
                        <button className="add-cart-btn">add to cart</button>
                        <div className="showcase-status">
                          <div className="wrapper">
                            <p>
                              {" "}
                              already sold: <b>15</b>{" "}
                            </p>
                            <p>
                              {" "}
                              available: <b>40</b>{" "}
                            </p>
                          </div>
                          <div className="showcase-status-bar" />
                        </div>
                        <div className="countdown-box">
                          <p className="countdown-desc">Hurry Up! Offer ends in:</p>
                          <div className="countdown">
                            <div className="countdown-content">
                              <p className="display-number">360</p>
                              <p className="display-text">Days</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">24</p>
                              <p className="display-text">Hours</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">59</p>
                              <p className="display-text">Min</p>
                            </div>
                            <div className="countdown-content">
                              <p className="display-number">00</p>
                              <p className="display-text">Sec</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
              {/*PRODUCT GRID*/}
              {/* <div className="product-main">
                <h2 className="title">Nos Produits</h2>
                <div className="product-grid ">
                  {filteredArticles.map((article) => (
                    <Card className='w-[30%]' articles={article}/>
                  ))
                  }
                </div>
              </div> */}
            </div>
          </div>
        </div>

      </main>
      {/*FOOTER*/}

    </>

  );
};

export default Main;