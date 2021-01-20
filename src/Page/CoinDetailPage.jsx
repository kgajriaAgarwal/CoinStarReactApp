import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import HistoryChart from '../Components/HistoryChart';
import CoinData from '../Components/CoinData';
import coinGecko from '../apis/coinGecko';


const CoinDetailPage = () => {
  {/*useParams — Extract parameters from the URL in one line.*/}
  //destructuring and getting the id
  const { id } = useParams();
  const [coinData, setCoinData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  //function to format the data in the wnated format //as an array of objects
  const formatData = data => {
    return data.map(el=>{
      return {
        //moment(el[0]).format("LTS")
        //<p>1. 20010704T120854 = {moment("20010704T120854").format()} </p>
        //moment(el[0]).format()
          t: el[0],
          y: el[1].toFixed(2)
        };
      });
    };

  ///coins/{id}/market_chart, method type: get
  //useEffectHook
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      //promise.all will be passing an array of (objects)promises
      const [day, week, year, detail] = await Promise.all(
      [
        //promise#1
        coinGecko.get(`/coins/${id}/market_chart/`,{
          params: {
            vs_currency : "usd",
            days : "1",
          },
        }),
        //Promise#2
        coinGecko.get(`/coins/${id}/market_chart/`,{
          params:{
            vs_currency : "usd",
            days : "7",
          },
        }),
        //Promise#3
        coinGecko.get(`/coins/${id}/market_chart/`,{
          params:{
            vs_currency : "usd",
            days : "365",
          },
        }),
        //promise#4
        coinGecko.get("/coins/markets",{
          params:{
            vs_currency : 'usd',
            ids: id,
          },
        }),
      ]);
      setCoinData({
        day: formatData(day.data.prices),
        week: formatData(week.data.prices),
        year: formatData(year.data.prices),
        detail: detail.data[0]
      });
      setIsLoading(false);
    };
    fetchData();
  },[]);


  const renderData = () => {
    if (isLoading){
      return <div style = {{color: 'white'}}>
        Loading....
      </div>
    }
    console.log("coindata is :", coinData);
    console.log("coinData.data is", coinData.detail);
    return (
      <div className = "coindetail_div">
        <HistoryChart data = {coinData}/>
        <CoinData data = {coinData.detail}/>
      </div >
    )
  }

  return renderData();
};

export default CoinDetailPage;