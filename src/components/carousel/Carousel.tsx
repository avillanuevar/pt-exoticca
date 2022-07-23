import { useState, useEffect, useLayoutEffect, useRef, useMemo, RefObject} from 'react';
import CarrouselCard from '../carrouselCard/CarouselCard';


import './Carousel.css'

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
};


function Carousel( props: any ) {
  const containerRef = useRef<HTMLUListElement>(null);
  const endLineRef = useRef<HTMLLIElement>(null);
  const startLineRef = useRef<HTMLLIElement>(null);
  const [count, setCount] = useState(0);
  const [translateX, setTranslateX] = useState(0);

  const btnNext = useIsInViewport(endLineRef);
  const btnPrev = useIsInViewport(startLineRef);  

  useLayoutEffect(() => {
    setTranslateX(300);
  }, []);
  
  const actionHandler = (mode: string) => {
    if (containerRef.current) {
      containerRef.current.style.transitionDuration = "400ms";
      if (mode === "next") {
        !btnNext && setCount((lastStep) => --lastStep);
      } else if (mode === "prev") {
        !btnPrev && setCount((lastStep) => ++lastStep);
      }
    }
  };

    function useIsInViewport(ref: RefObject<HTMLLIElement>) {
      const [isIntersecting, setIsIntersecting] = useState(false);
      
      const observer = useMemo(
        () =>
          new IntersectionObserver(([entry]) =>
            setIsIntersecting(entry.isIntersecting),
          ),
        [],
      );

      useEffect(() => {
        ref.current && observer.observe(ref.current);
        return () => {
          observer.disconnect();
        };
      }, [ref, observer]);

      return isIntersecting;
    }

  useEffect(() => {
    setTranslateX( count * 300);
    if(containerRef.current) { 
    containerRef.current.style.transform = `translate3d(${translateX}px, 0, 0)`;
    }   
  }, [count,translateX]);

  return (
    <div className='carousel-box'>
      <h2>{props.trips.name ? props.trips.name : props.trips.title }</h2>
      <ul className='carousel' ref={containerRef}>
        <li ref={startLineRef}></li>
        {
          props.trips.cards && props.trips.cards.map((trip: Card)=> <li key={trip.id}><CarrouselCard  { ...trip }/></li>)
        }
        <li ref={endLineRef}></li>
      </ul>
      <button
        onClick={() => actionHandler("prev")}
        className={btnPrev || count >= 0 ? "none" : "btn btn-left"}
      >
        {"<"}
      </button>
      <button
        onClick={() => actionHandler("next")}
        className={btnNext || count <= -6 ? "none" : "btn btn-right"}
      >
        {">"}
      </button>
    </div>
  )
}

export default Carousel