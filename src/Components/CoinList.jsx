import React, {useState, useEffect, useContext} from 'react';
// import axios from 'axios';//not needded now
import coinGecko from '../apis/coinGecko';
import { WatchListContext } from '../Context/WatchListContext';
import Coin from './Coin';

const CoinList = () => {
  //here we need somethying to store the data that is fetched from the API
  //useState hook
  const [coins, setCoins] = useState([]);

  //DESTRUCTURE WATCHLIST PROPERTY & DELETECOIN
  const {watchList, deleteCoin} = useContext(WatchListContext);
  console.log('watchList is :', watchList);

  //FOR Loading functionality
  const [isLoading , setIsLoading] = useState(false);

  //useEffectHook
  useEffect(() => {
    //here we have to define a new function because useEffect doesnt return a promise
    //function definniation
    //AS WE are fetching the data asynchroonusly so async await used
    const fetchData = async () =>{
      //asynchronus fetching of data
      setIsLoading(true);
      const response = await coinGecko.get("/coins/markets",{
        params:{
          vs_currency : 'usd',
          /*'bitcoin,ethereum,ripple' */
          ids: watchList.join(",")
        }
      });
      //console.log("response.data : ", response.data);
       setCoins(response.data);
       setIsLoading(false);

    }
    if(watchList.length>0){
       //function call//we only want to fetch the data when the componnet mount, agar yaha par empty dependency array (ie. [] )nahi pass karenge toh, fetchData call hoga jab harbar component  re-render karega
      fetchData();
    }else{
      setCoins([]);
    }
  },[watchList])

  const renderCoins = () => { 
    if (isLoading){
      <div>loading...</div>
    }else{
      return (
        <ul className = "coinlist list-group">
          {coins.map((coin,index)=> {
            return <Coin key = {coin.id}
                  coin = {coin}
                  deleteCoin = {deleteCoin}/>
          })
          }
        </ul>
      )
    }
  }

  return (
    <div className = "coin-showbox">
      {/*//AFTER FETCHING THE data rendering the coins */}
      {renderCoins()}
    </div>
  );
};

export default CoinList;