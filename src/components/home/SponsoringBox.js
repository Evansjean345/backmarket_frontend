import React, { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../contexts/ShopContext';

const SponsoringBox = ({ sponsoringType }) => {

  const { shops } = useContext(ShopContext);

  const shopSponsoring = useMemo(() => {

    const sponsoringShop = new Set(shops.map(shop => shop.accountType === sponsoringType));

    return sponsoringShop;
  }, [shops, sponsoringType]);


  return (
    <>
      <div className="blog">
        <div className="container">
          <div className="blog-container has-scrollbar ">
            {shopSponsoring.map((shop) => (
              <div className="blog-card" key={shop._id}>
                <Link to={`/shop/${shop._id}`}>
                  <img
                    src={shop.profilePic || 'default-category-image.webp'}
                    alt={shop.name}
                    className="blog-banner w-[100%] h-[175px] object-cover"
                  />
                </Link>
                <div className="blog-content">
                  <Link to={`/shop/${shop._id}`} className="blog-category">
                    {shop.name}
                  </Link>
                  <h3>
                  <Link className="blog-title line-clamp-1" to={`/shop/${shop._id}`}>
                    {shop.description}
                  </Link>
                </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsoringBox;