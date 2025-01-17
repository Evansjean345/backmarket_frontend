import React from 'react';
import Navigation from '../components/home/Navigation';
import Footer from '../components/home/Footer';
const VisionPage = () => {
  return (
    <>
      <Navigation />
      <section className="">
        <div className="w-full">

          <div
            className="w-full bg-cover bg-center bg-no-repeat lg:pt-44 pt-28 lg:pb-24 pb-14 px-12 xl:px-20"
            style={{
              backgroundImage:
                'url("/images/logo.jpg")',
            }}
          >
            {/* <h1 className="mb-8 text-center text-gray-900 font-bold font-manrope leading-tight lg:text-5xl text-3xl">
              {" "}
              VISION BACK MARKET{" "}
            </h1>
            <p className="text-gray-900 text-lg leading-8 text-center font-normal px-4">
              {" "}
              Nous vous présenterons nos valeurs, notre vision, notre mission et nos objectifs{" "}
            </p> */}
          </div>
          <section className="w-full relative overflow-hidden lg:py-28 py-16">
            <div className="px-12 xl:px-20">
              <div className="flex flex-col md:flex-row w-full gap-8">
                <div className="w-full md:max-w-[176px] md:border-r md:border-gray-200">
                  <ul className="tab-nav flex flex-col md:items-start items-center lg:gap-10 gap-6">
                    <li>
                      <span
                        className="font-medium text-sm leading-7 text-indigo-600"
                      >
                        M.TOMA KEUMINGO REMI
                      </span>
                      <span className='text-xs font-normal leading-7 text-gray-900'>
                      PDG COMPAGNIE DES SERVICES NUMERIQUES
                      </span>
                    </li>
                    
                  </ul>
                </div>
                <div className="w-full tab-pane max-md:px-4">
                  <h2 className="font-manrope font-bold lg:text-4xl text-3xl text-gray-900 mb-5">
                    VISION BACK MARKET
                  </h2>
                  <div className="flex items-center gap-3 lg:mb-10 mb-8">
                    
                    <p className="font-medium text-xl leading-8 text-indigo-600">
                    Nous vous présenterons nos valeurs, notre vision, notre mission et nos objectifs
                    </p>
                  </div>
                  <p className="font-normal text-lg leading-8 text-gray-500 lg:mb-10 mb-8">
                    {" "}
                    Nous envisageons une plateforme e-commerce révolutionnaire dédiée aux entrepreneurs et vendeurs qui,
                    faute de moyens, ne peuvent s’installer dans une boutique physique ou investir dans la création et l’entretien d’un site web.
                    Cette plateforme unique leur permettra de vendre une variété de produits, quel que soit leur domaine d'activité, en toute simplicité.
                  </p>
                  <h5 className="font-manrope font-bold md:text-3xl text-2xl text-gray-900 mb-4">
                  Nos Objectifs clés:
                  </h5>
                  <ul className="ml-8 lg:mb-10 mb-8">
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <span href="#01">Faciliter l’accès à la vente en ligne .</span>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <span href="#02">Optimiser la visibilité </span>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <span href="#03">Réduire les coûts</span>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <span href="#04">Simplifier la gestion des ventes </span>
                    </li>
                    <li className="list-decimal font-normal text-lg text-gray-500">
                      <span href="#05">Promouvoir l’entrepreneuriat </span>
                    </li>
                    
                  </ul>
                  <ul className="flex flex-col ml-8 gap-10 list-outside list-decimal font-manrope font-bold text-3xl">
                    <li  className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl text-gray-900">
                        {" "}Faciliter l’accès à la vente en ligne.{" "}
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        {" "}
                        Offrir à chaque vendeur une page web personnalisée sur la plateforme,
                         où il pourra afficher et vendre ses produits sans avoir besoin de compétences techniques ou de gérer un site web indépendant.{" "}
                      </p>
                    </li>
                    <li className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl text-gray-900">
                        Optimiser la visibilité
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        {" "}
                        Créer un écosystème où les produits des différents vendeurs seront mis en avant,
                        leur offrant ainsi une meilleure visibilité à travers une vitrine numérique partagée{" "}
                       
                      </p>
                    </li>
                    <li  className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl text-gray-900">
                      Réduire les coûts
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        {" "}
                        Éliminer la nécessité pour les petits commerçants et entrepreneurs de faire des investissements initiaux pour la location d’une boutique ou la création d'un site web,
                        en leur permettant de concentrer leurs ressources sur la qualité de leurs produits.{" "}
                      </p>
                    </li>
                    <li  className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl text-gray-900">
                      Simplifier la gestion des ventes
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        {" "}
                        Offrir une interface intuitive pour gérer les stocks,
                         suivre les commandes et interagir avec les clients,
                         le tout depuis un tableau de bord centralisé accessible via ordinateur ou smartphone.{" "}
                      </p>
                    </li>
                    <li  className="list-decimal">
                      <h2 className="font-manrope font-bold lg:text-3xl text-2xl text-gray-900">
                      Promouvoir l’entrepreneuriat 
                      </h2>
                      <p className="mt-5 font-normal text-lg leading-8 text-gray-500">
                        {" "}
                        Donner l’opportunité à toute personne ayant un produit à vendre,
                        quel que soit son emplacement géographique ou ses moyens financiers,
                        de se lancer dans le commerce en ligne et d’accroître sa clientèle.{" "}
                      </p>
                    </li>
                  </ul>
                  <p className="font-normal mt-14 text-lg leading-8 text-gray-500 lg:mb-10 mb-8">
                    {" "}
                    Cette vision permettra aux entrepreneurs émergents de pénétrer le marché digital sans les barrières habituelles.
                    Elle renforcera l'économie locale en ouvrant des portes à ceux qui, autrement,
                    n'auraient pas pu entrer dans le monde du commerce en ligne.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Footer />
    </>


  );
};

export default VisionPage;