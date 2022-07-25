import {
  useState,
  useEffect,
  useRef,
} from "react";
import CarrouselCard from "../carrouselCard/CarouselCard";

import "./Carousel.css";

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

function Carousel(props: any) {
  const carouselRef = useRef<HTMLUListElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const [count, setCount] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const [nextMovement, setNextMovement] = useState(0);

  const actionHandler = (mode: string) => {
    if (carouselRef.current && nextButtonRef.current) {
      if (mode === "next") {
        setCount((lastStep) => ++lastStep);

      } else if (mode === "prev") {
        setCount((lastStep) => --lastStep);
      }
    }
  };
  
  /**
   * UseEfect hook that activates when the count is changed,
   * in charge of managin the distance the carousel will move
   * when the the next or prev buttons are clic, and controles 
   * the display of the buttons
   */
  useEffect(() => {
    const carouselObj = carouselRef.current;
    const buttonNextObj = nextButtonRef.current;
    const buttonPrevObj = prevButtonRef.current;
    if (carouselObj && buttonNextObj && buttonPrevObj) {
      if (
        carouselObj.scrollWidth > count * 600 + carouselObj.clientWidth
      ) {
        buttonNextObj.style.display = "inline";
        buttonNextObj.disabled = false;
        setNextMovement(count * -600);
      } else {
        const calcRemainingSpace = (count - 1) * 600 - carouselObj.scrollWidth + carouselObj.clientWidth;
        const lastStep = translateX + calcRemainingSpace;
        buttonNextObj.disabled = true;
        buttonNextObj.style.display = "none";
        setNextMovement(lastStep);
      }
      if (count > 0) {
        buttonPrevObj.style.display = "inline";
        buttonPrevObj.disabled = false;
      } else {
        buttonPrevObj.style.display = "none";
        buttonPrevObj.disabled = true
      }
    }
  }, [count]);

  
  useEffect(() => {
    if (carouselRef.current) {
      setTranslateX(nextMovement);
      carouselRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }
  }, [nextMovement, translateX]);

  return (
    <div className="carousel-box">
      <h2>{props.trips.name ? props.trips.name : props.trips.title}</h2>
      <ul className="carousel" ref={carouselRef}>
        {props.trips.cards &&
          props.trips.cards.map((trip: Card) => (
            <li key={trip.id}>
              <CarrouselCard {...trip} />
            </li>
          ))}
      </ul>
      <button
        ref={prevButtonRef}
        onClick={() => actionHandler("prev")}
        className="btn btn-left"
      >
        {"<"}
      </button>
      <button
        ref={nextButtonRef}
        onClick={() => actionHandler("next")}
        className="btn btn-right"
      >
        {">"}
      </button>
    </div>
  );
}

export default Carousel;
