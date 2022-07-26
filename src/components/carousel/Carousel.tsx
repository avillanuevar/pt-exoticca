import {
  useState,
  useEffect,
  useRef,
} from "react";
import CarrouselCard from "../carrouselCard/CarouselCard";
import UseWindowResize from '../../hooks/useWindowResize'

import "./Carousel.css";

interface Card {
  title: string;
  destination: string;
  id: string;
  images: {
    desktop: string;
    tablet: string;
    mobile: string;
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
  const isDevice = UseWindowResize() < 800;
  
  const actionHandler = (mode: string) => {

    if (carouselRef.current && nextButtonRef.current) {
      if (mode === "next") {
        setCount((lastStep) => ++lastStep);

      } else if (mode === "prev") {
        count !== 0 && setCount((lastStep) => --lastStep);
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
    if (carouselObj && buttonNextObj && buttonPrevObj ) {
      //movement management
      if (carouselObj.scrollWidth > count * 600 + carouselObj.clientWidth) {
        buttonNextObj.style.display = "inline";
        buttonNextObj.disabled = false;
        setNextMovement(count * -600);
      } else if(count > 0){
        const calcRemainingSpace = (count - 1) * 600 - carouselObj.scrollWidth + carouselObj.clientWidth;
        const lastStep = translateX + calcRemainingSpace;
        buttonNextObj.disabled = true;
        buttonNextObj.style.display = "none";
        setNextMovement(lastStep);
      }

      //toggle buttons
      if (count > 0) {
        buttonPrevObj.style.display = "inline";
        buttonPrevObj.disabled = false;
      } else {
        buttonPrevObj.style.display = "none";
        buttonPrevObj.disabled = true
      }

      if(carouselObj.clientWidth >= carouselObj.scrollWidth) {
        buttonNextObj.disabled = true;
        buttonNextObj.style.display = "none";
      }
    }
  }, [count]);

  
  useEffect(() => {
    if (carouselRef.current) {
      setTranslateX(nextMovement);
      carouselRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }
  }, [nextMovement, translateX]);

  const displayButtons = () => {
    if(!isDevice) {
      return (
        <>
          <button
            ref={prevButtonRef}
            onClick={() => actionHandler("prev")}
            className={`btn btn-left ${count === 0 && 'none'}`}
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
        </>
      )
    }
  }

  return (
    <div className="carousel-box" role='carousel'>
      <h2>{props.trips.name ? props.trips.name : props.trips.title}</h2>
      <ul className="carousel" ref={carouselRef}>
        {props.trips.cards &&
          props.trips.cards.map((trip: Card) => (
            <li key={trip.id}>
              <CarrouselCard {...trip} />
            </li>
          ))}
      </ul>
      {
        displayButtons()
      }  
    </div>
  );

  
}

export default Carousel;
