import React, { useCallback, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CategoryContext } from '../../contexts/CategoryContext';

const Footer = () => {

  const { categories } = useContext(CategoryContext);

  // const consolesubCategory =useCallback(() => {
  //   categories?.subCategories?.map((subCategory) => (
  //   console.log(subCategory)
  // ))
  // },[categories]) 

  // useEffect(() => {
  //   consolesubCategory()
  // }, [consolesubCategory])

  return (
    <>
      <footer>
        <div className="footer-category">
          <div className="container">
            <h2 className="footer-category-title">Brand directory</h2>
            {categories.map((category) => (
              <div className="footer-category-box" key={category._id}>
                <h3 className="category-box-title">{category.category} :</h3>
                {category.subCategories.map((subCategory) => (
                  <Link className="footer-category-link" key={subCategory}>
                    {subCategory}
                  </Link>
                ))}
              </div>
            ))}

            
            {/* <div className="footer-category-box">
              <h3 className="category-box-title">Fashion :</h3>
              <Link className="footer-category-link">
                T-shirt
              </Link>
              <Link className="footer-category-link">
                Shirts
              </Link>
              <Link className="footer-category-link">
                shorts &amp; jeans
              </Link>
              <Link className="footer-category-link">
                jacket
              </Link>
              <Link className="footer-category-link">
                dress &amp; frock
              </Link>
              <Link className="footer-category-link">
                innerwear
              </Link>
              <Link className="footer-category-link">
                hosiery
              </Link>
            </div>
            <div className="footer-category-box">
              <h3 className="category-box-title">footwear :</h3>
              <Link className="footer-category-link">
                sport
              </Link>
              <Link className="footer-category-link">
                formal
              </Link>
              <Link className="footer-category-link">
                Boots
              </Link>
              <Link className="footer-category-link">
                casual
              </Link>
              <Link className="footer-category-link">
                cowboy shoes
              </Link>
              <Link className="footer-category-link">
                safety shoes
              </Link>
              <Link className="footer-category-link">
                Party wear shoes
              </Link>
              <Link className="footer-category-link">
                Branded
              </Link>
              <Link className="footer-category-link">
                Firstcopy
              </Link>
              <Link className="footer-category-link">
                Long shoes
              </Link>
            </div>
            <div className="footer-category-box">
              <h3 className="category-box-title">jewellery :</h3>
              <Link className="footer-category-link">
                Necklace
              </Link>
              <Link className="footer-category-link">
                Earrings
              </Link>
              <Link className="footer-category-link">
                Couple rings
              </Link>
              <Link className="footer-category-link">
                Pendants
              </Link>
              <Link className="footer-category-link">
                Crystal
              </Link>
              <Link className="footer-category-link">
                Bangles
              </Link>
              <Link className="footer-category-link">
                bracelets
              </Link>
              <Link className="footer-category-link">
                nosepin
              </Link>
              <Link className="footer-category-link">
                chain
              </Link>
              <Link className="footer-category-link">
                Earrings
              </Link>
              <Link className="footer-category-link">
                Couple rings
              </Link>
            </div>
            <div className="footer-category-box">
              <h3 className="category-box-title">cosmetics :</h3>
              <Link className="footer-category-link">
                Shampoo
              </Link>
              <Link className="footer-category-link">
                Bodywash
              </Link>
              <Link className="footer-category-link">
                Facewash
              </Link>
              <Link className="footer-category-link">
                makeup kit
              </Link>
              <Link className="footer-category-link">
                liner
              </Link>
              <Link className="footer-category-link">
                lipstick
              </Link>
              <Link className="footer-category-link">
                prefume
              </Link>
              <Link className="footer-category-link">
                Body soap
              </Link>
              <Link className="footer-category-link">
                scrub
              </Link>
              <Link className="footer-category-link">
                hair gel
              </Link>
              <Link className="footer-category-link">
                hair colors
              </Link>
              <Link className="footer-category-link">
                hair dye
              </Link>
              <Link className="footer-category-link">
                sunscreen
              </Link>
              <Link className="footer-category-link">
                skin loson
              </Link>
              <Link className="footer-category-link">
                liner
              </Link>
              <Link className="footer-category-link">
                lipstick
              </Link>
            </div> */}
          </div>
        </div>
        <div className="footer-nav">
          <div className="container">
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Popular Categories</h2>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Fashion
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Electronic
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Cosmetic
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Health
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Watches
                </Link>
              </li>
            </ul>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Products</h2>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Prices drop
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  New products
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Best sales
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Contact us
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Sitemap
                </Link>
              </li>
            </ul>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Our Company</h2>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Delivery
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Legal Notice
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Terms and conditions
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  About us
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Secure payment
                </Link>
              </li>
            </ul>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Services</h2>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Prices drop
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  New products
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Best sales
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Contact us
                </Link>
              </li>
              <li className="footer-nav-item">
                <Link className="footer-nav-link">
                  Sitemap
                </Link>
              </li>
            </ul>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Contact</h2>
              </li>
              <li className="footer-nav-item flex">
                <div className="icon-box">
                  <ion-icon name="location-outline" />
                </div>
                <address className="content">
                  Angré djorobité2 Carrefour de la boulangerie flaman, Abidjan, Côte d'ivoire.
                </address>
              </li>
              <li className="footer-nav-item flex">
                <div className="icon-box">
                  <ion-icon name="call-outline" />
                </div>
                <a href="tel:+607936-8058" className="footer-nav-link">
                  +225 07 00 60 60 80
                </a>
              </li>
              <li className="footer-nav-item flex">
                <div className="icon-box">
                  <ion-icon name="mail-outline" />
                </div>
                <a href="mailto:example@gmail.com" className="footer-nav-link">
                  info@csn.tech
                </a>
              </li>
            </ul>
            <ul className="footer-nav-list">
              <li className="footer-nav-item">
                <h2 className="nav-title">Follow Us</h2>
              </li>
              <li>
                <ul className="social-link">
                  <li className="footer-nav-item">
                    <Link className="footer-nav-link">
                      <ion-icon name="logo-facebook" />
                    </Link>
                  </li>
                  <li className="footer-nav-item">
                    <Link className="footer-nav-link">
                      <ion-icon name="logo-twitter" />
                    </Link>
                  </li>
                  <li className="footer-nav-item">
                    <Link className="footer-nav-link">
                      <ion-icon name="logo-linkedin" />
                    </Link>
                  </li>
                  <li className="footer-nav-item">
                    <Link className="footer-nav-link">
                      <ion-icon name="logo-instagram" />
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <img
              src="./assets/images/payment.png"
              alt="payment method"
              className="payment-img"
            />
            <p className="copyright">
              Copyright © <Link>CSN</Link> all rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;