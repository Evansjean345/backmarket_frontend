import React from 'react';
import { Link } from 'react-router-dom';

const CardMinimalist = ({ article }) => {
  return (
    <>
      <div className="showcase">
        <Link className="showcase-img-box" to={`/details/${article._id}`}>
          <img
            src={article?.imageUrls[0]}
            alt={article?.name}
            width={70}
            className="w-[100px] h-[100px] object-cover rounded"
          />
        </Link>
        <div className="showcase-content">
          <Link to={`/details/${article._id}`}>
            <h4 className="showcase-title">
              {article?.subCategory}
            </h4>
          </Link>
          <Link className="showcase-category" to={`/details/${article._id}`}>
            {article?.name}
          </Link>
          {article?.discount.applyDiscount === true ? (
            <div className="price-box">
              <p className="price">{article?.discount?.newPrice} FCFA</p>
              <del>{article?.price} FCFA</del>
            </div>
          ) : (
            <div className="price-box">
              <p className="price">{article?.price} FCFA</p>
            </div>
          )
          }
        </div>
      </div>
    </>
  );
};

export default CardMinimalist;