import React from 'react';
import { FaPhone } from 'react-icons/fa';
import { IoArrowUndo, IoBoat, IoRocket } from 'react-icons/io5';
import { Link } from 'react-router-dom';

const MiddleInformation = () => {
  return (
    <>
      {/*TESTIMONIALS, CTA & SERVICE*/}
      <div>
        <div className="container">
          <div className="testimonials-box">
            {/*TESTIMONIALS*/}
            <div className="testimonial">
              <h2 className="title">Notre vision</h2>
              <div className="testimonial-card">
                <img
                  src="/images/person.png"
                  alt="alan doe"
                  className="testimonial-banner"
                  width={80}
                  height={80}
                />
                <p className="testimonial-name">KEUMINGO REMI</p>
                <p className="testimonial-title">CEO &amp; Founder Of CSN</p>
                <img
                  src="/templates/icons/quotes.svg"
                  alt="quotation"
                  className="quotation-img"
                  width={26}
                />
                <p className="testimonial-desc">
                  Nous envisageons une plateforme e-commerce révolutionnaire dédiée aux entrepreneurs et vendeurs qui, faute de moyens, ne peuvent s’installer dans une boutique physique ou investir dans la création et l’entretien d’un site web. Cette plateforme unique leur permettra de vendre une variété de produits, quel que soit leur domaine d'activité, en toute simplicité.<Link className='text-blue-300 hover:text-blue-500' to={"/vision"}>...voir plus</Link>
                </p>
              </div>
            </div>
            {/*CTA*/}
            <div className="cta-container">
              <img
                src="/templates/cta-banner.jpg"
                alt="summer collection"
                className="cta-banner"
              />
              <Link className="cta-content">
                <p className="discount">- 25% DE REDUCTION</p>
                <h2 className="cta-title">articles d'été</h2>
                <p className="cta-text">À partir de 25.000 FCFA</p>
                <button className="cta-btn">Achetez maintenant</button>
              </Link>
            </div>
            {/*SERVICE*/}
            <div className="service">
              <h2 className="title">Nos services</h2>
              <div className="service-container">
                <Link className="service-item">
                  <div className="service-icon">
                    <IoBoat />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">Livraison partout dans le monde</h3>
                    <p className="service-desc">Pour des achats de plus de 100.000 FCFA</p>
                  </div>
                </Link>
                <Link className="service-item">
                  <div className="service-icon">
                    <IoRocket />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">Livraison le lendemain de l'achat</h3>
                    <p className="service-desc">Uniquement à Abidjan</p>
                  </div>
                </Link>
                <Link className="service-item">
                  <div className="service-icon">
                    <FaPhone />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">Meilleure support en ligne</h3>
                    <p className="service-desc">Heures: 8h - 17h</p>
                  </div>
                </Link>
                <Link className="service-item">
                  <div className="service-icon">
                    <IoArrowUndo />
                  </div>
                  <div className="service-content">
                    <h3 className="service-title">politique de retour d'articles</h3>
                    <p className="service-desc">Facile &amp; Retour gratuit</p>
                  </div>
                </Link>
                {/* <Link className="service-item">
                <div className="service-icon">
                  <ion-icon name="ticket-outline" />
                </div>
                <div className="service-content">
                  <h3 className="service-title">30% money back</h3>
                  <p className="service-desc">For Order Over $100</p>
                </div>
              </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*BLOG*/}
      <div className="blog">
        <div className="container">
          <div className="blog-container has-scrollbar">
            <div className="blog-card">
              <Link>
                <img
                  src="/images/show-yourself.png"
                  alt="show yourself here"
                  width={300}
                  className="blog-banner"
                />
              </Link>
              {/* <div className="blog-content">
                <Link className="blog-category">
                  Fashion
                </Link>
                <Link>
                  <h3 className="blog-title">
                    Clothes Retail KPIs 2021 Guide for Clothes Executives.
                  </h3>
                </Link>
                <p className="blog-meta">
                  By <cite>Mr Admin</cite> /{" "}
                  <time dateTime="2022-04-06">Apr 06, 2022</time>
                </p>
              </div> */}
            </div>
            <div className="blog-card">
              <Link>
                <img
                  src="/images/show-yourself.png"
                  alt="show yourself here"
                  className="blog-banner"
                  width={300}
                />
              </Link>
              {/* <div className="blog-content">
                <Link className="blog-category">
                  Clothes
                </Link>
                <h3>
                  <Link className="blog-title">
                    Curbside fashion Trends: How to Win the Pickup Battle.
                  </Link>
                </h3>
                <p className="blog-meta">
                  By <cite>Mr Robin</cite> /{" "}
                  <time dateTime="2022-01-18">Jan 18, 2022</time>
                </p>
              </div> */}
            </div>
            <div className="blog-card">
              <Link>
                <img
                  src="/images/show-yourself.png"
                  alt="show yourself here"
                  className="blog-banner"
                  width={300}
                />
              </Link>
              {/* <div className="blog-content">
                <Link className="blog-category">
                  Shoes
                </Link>
                <h3>
                  <Link className="blog-title">
                    EBT vendors: Claim Your Share of SNAP Online Revenue.
                  </Link>
                </h3>
                <p className="blog-meta">
                  By <cite>Mr Selsa</cite> /{" "}
                  <time dateTime="2022-02-10">Feb 10, 2022</time>
                </p>
              </div> */}
            </div>
            <div className="blog-card">
              <Link>
                <img
                  src="/images/show-yourself.png"
                  alt="show yourself here" 
                  className="blog-banner"
                  width={300}
                />
              </Link>
              {/* <div className="blog-content">
                <Link className="blog-category">
                  Electronics
                </Link>
                <h3>
                  <Link className="blog-title">
                    Curbside fashion Trends: How to Win the Pickup Battle.
                  </Link>
                </h3>
                <p className="blog-meta">
                  By <cite>Mr Pawar</cite> /{" "}
                  <time dateTime="2022-03-15">Mar 15, 2022</time>
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MiddleInformation;