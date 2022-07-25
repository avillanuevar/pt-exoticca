import React from "react";

import "./CarouselCard.css";

interface Card {
  title: string;
  destination: string;
  id: string;
  images: {
    desktop: string;
    tablet: string;
    mobil: string;
  }[];
  days: number;
  priceDetail: {
    pricingPercentage: number;
    oldPriceBeautify: string;
    fromPriceBeautify: string;
  };
}

function CarrouselCard({
  title,
  destination,
  id,
  images,
  days,
  priceDetail : {
    pricingPercentage,
    oldPriceBeautify,
    fromPriceBeautify
  },
}: Card) {

  return (
    <div className="carousel-card" id={id}>
      <div className="card-top">
        <img className="card-img" src={images[0].desktop} alt={title} />
        <div className="card-top-content">
          <div className={pricingPercentage !== 0 ? "card-discount" : "none"}>
            <p>-{pricingPercentage}%</p>
          </div>
          <div className="card-title-box">
            <p className="card-title">{title}</p>
            <p className="card-title-days">{days} Days</p>
          </div>
        </div>
      </div>
      <div className="card-bottom">
        <p className="card-destinations">{destination}</p>
        <div className="card-prices">
          <p className="card-prices-text">From</p>
          <p className="card-prices-old">{oldPriceBeautify}</p>
          <p className="card-prices-new">{fromPriceBeautify}</p>
        </div>
      </div>
    </div>
  );
}

export default CarrouselCard;
