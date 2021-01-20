import React, { useState, useContext } from 'react';
import { WatchListContext } from '../Context/WatchListContext';

const AddCoin = () => {

  const [isActive, setisActive] = useState(false);
  const {addCoin} = useContext(WatchListContext);


  const availableCoins = [
    "bitcoin",
    "ethereum",
    "ripple",
    "tether",
    "bitcoin-cash",
    "litecoin",
    "eos",
    "okb",
    "tezos",
    "cardano",
  ];
  
  const handleClick = (coin) => {
    addCoin(coin);
    setisActive(false);
  }

  return (
    <div className = "dropdown">
      <button 
        onClick = {() => setisActive(!isActive)} 
        className ="btn btn-secondary dropdown-toggle" 
        type="button">
        Add Coin
      </button>
      {/* dropdown-menu show */}
      <div className= {isActive ? "dropdown-menu show" : "dropdown-menu"}>
        {availableCoins.map(el=>{
          return(
          <a onClick = {() => handleClick(el)} href= "#" className = "dropdown-item">{el}</a>
          )
        })}
      </div>
    </div>
  );
};

export default AddCoin;