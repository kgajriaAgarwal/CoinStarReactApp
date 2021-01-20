import React from 'react';
import header from '../Components/Header';
import AddCoin from '../Components/AddCoin';
import CoinList from '../Components/CoinList';


const CoinSummaryPage = () => {
  return (
    <div className = 'coinsummary-maindiv'>
        
      <div className = "coinsummary shadow border p-2 rounded mt-2 bg-light">
        <div className = "addcoin-div">
        <AddCoin/>
        </div>
        <CoinList/>
      </div>
    </div>
  );
};

export default CoinSummaryPage;