import React from 'react';
import { Link } from 'react-router-dom';

const Coin = ({coin, deleteCoin}) => {  
  return (
    <Link to = {`/coins/${coin.id}`} className = "text-decoration-none my-1 coin">
      {/*ON CLICK OF individual coin element we will be routing to their coinDetailPage */}
      {/*list-group-item list-group-item-action d-flex justify-content-between align-items-center text-dark */}
      <li className = "coinlist-item list-group-item list-group-item-action">
        <img className = 'coinlist-image' src = {coin.image} alt = 'coinList-image'/>
        <span className="text-decoration-none">{coin.current_price}</span>
        <span className = 'priceChange_div'>
          <span className= {coin.price_change_percentage_24h < 0 ? 
            "text-danger mr-2" : 
            "text-success mr-2"}
          >
            {" "}
            {coin.price_change_percentage_24h < 0 ?
              <i className="ic fa fa-angle-down align-middle mr-2" aria-hidden="true"/> :
              <i className="ic fa fa-angle-up align-middle mr-2" aria-hidden="true"/> 
            } 
            {coin.price_change_percentage_24h}
          </span>
          <i onClick = {(e)=> {
            e.preventDefault();
            deleteCoin(coin.id)
          }} className="cross fa fa-times" aria-hidden="true"></i>
        </span>
      </li>
    </Link>
  );
};

export default Coin;