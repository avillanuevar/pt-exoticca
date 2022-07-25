import { useState, useEffect, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchTripsUK, fetchTripsES } from "../../services/FetchTrips";
import "./Filter.css";

const Filter = () => {
  const [code, setCode] = useState("es");
  const [filterOpen, setFilterOpen] = useState(false);
  const arrowRef = useRef<HTMLParagraphElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Function in charge of updating the list of trips depending on the server
  const { mutate } = useMutation(code === "es" ? fetchTripsES : fetchTripsUK, {
    onSuccess: (data) => {
      queryClient.setQueryData(["trips"], data);
    },
  });

  const toggleFilter = () => {
    setFilterOpen((prev) => !prev);
  };

  const marketChange = (e: React.MouseEvent) => {
    setCode(e.currentTarget.id);
  };

  useEffect(() => {
    mutate();
  }, [code]);

  //This hook is used to set the animations of openig and closing the filter
  useEffect(() => {
    if (arrowRef.current && filterRef.current) {
      const direction = filterOpen ? "90" : "-90";
      const expand = filterOpen ? "60" : "0";
      arrowRef.current.style.transform = `rotate(${direction}deg)`;
      filterRef.current.style.transform = `translateY(${expand}px)`;
    }
  }, [filterOpen]);
  
  return (
    <div className="filter-box">
      <div className="filter-title">
        <button className="filter-button" onClick={toggleFilter}>
          <p className="filter-box-text">Filter</p>
          <p className="filter-arrow" ref={arrowRef}>
            {">"}
          </p>
        </button>
      </div>
      <div className="filter" ref={filterRef}>
        <p className="filter-text">Market selection</p>
        <div className="filter-button-cluster">
          <button
            className={`filter-option-button ${
              code === "es" && "filter-selected"
            }`}
            onClick={marketChange}
            id="es"
          >
            Es
          </button>
          <button
            className={`filter-option-button ${
              code === "uk" && "filter-selected"
            }`}
            onClick={marketChange}
            id="uk"
          >
            Uk
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filter;
