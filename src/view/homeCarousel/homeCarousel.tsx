import { useState, useEffect }  from 'react'
import { useQuery } from "@tanstack/react-query";
import { fetchTripsES }  from '../../services/FetchTrips';
import Backpack from "../../assets/bagpack.png";
import Carousel from '../../components/carousel/Carousel';
import Filter from '../../components/filter/Filter';

import "./homeCarousel.css"
function HomeCarousel() {
  

  const [ trips, setTrips ] = useState([]);
  const { isLoading, error, data } = useQuery(['trips'], fetchTripsES);
 
  useEffect(()=>{
    
    if(data) {
      const allTrips = data.slides
      allTrips.unshift(data.topSales)
      setTrips(allTrips);
    }
  },[data])
    
  if (isLoading || !trips.length) {
      return <p>Loading...</p>
  }
  if (error) {
    return <p>Error!</p>
  }
  
  return (
    <section>
      <div className="home-carousel">
        <img className="backpack-img" src={Backpack} alt="bagpack icon" />
        <div className="home-text">
          <h1>Multi-country tours</h1>
          <p>Explore our more than 17 nights multi-country tours. Let yourself be surprised by our extended version top sellers.</p>
        </div>
      </div>
      <Filter/>
      {
        trips.map((combo:{}, idx: number) =><Carousel key={idx} trips={combo}></Carousel>)
      }
      
    </section>
  )
}

export default HomeCarousel