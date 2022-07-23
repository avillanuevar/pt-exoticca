import axios from "axios";

export const fetchTripsES = () => axios.get('https://api-es.exoticca.com/api/home').then(res => res.data)
export const fetchTripsUK = () => axios.get('https://api-uk.exoticca.com/api/home').then(res => res.data)