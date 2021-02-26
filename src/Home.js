import React from "react";
import pizzaHero from "./Assets/Pizza.jpg";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const HeroBanner = styled.section`
  width: 99.9%;
  .hero-container {
    position: relative;
    img {
      max-width: 100%;
      max-height: 100%;
    }
    button {
      background-color: red;
      color: white;
      position: absolute;
      width: 12rem;
      height: 3.6rem;
      top: 65%;
      left: 50%;
      margin: -1.8rem 0 0 -6rem;
      font-size: 1.8rem;
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background-color: #f66;
      }
    }
  }
`;

export default function Home(props) {
  const history = useHistory();

  const routeToForm = () => {
    history.push("/pizza");
  };

  return (
    <HeroBanner className="hero-banner">
      <div className="hero-container">
        <img className="hero-image" src={pizzaHero} alt="Pizza" />
        <button className="hero-button" onClick={routeToForm}>
          Pizza?
        </button>
      </div>
    </HeroBanner>
  );
}
