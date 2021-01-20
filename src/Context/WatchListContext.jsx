import React, { createContext, useState, useEffect } from "react";

//Step#1 -->create CONTEXT -- export it --> as this context is going to be imported in several other places
export const WatchListContext = createContext()

//step#2  -->Provider compnent -< will provide the data for the consumption
export const WatchListContextProvider = (props) => {
  //console.log(localStorage.getItem("watchList").split(','));
  //uesState @topmost level of functional componnet
  //watchlist is goimg to be an array of strings
  //here we will hardcode certain popular coins in the watchList for better user experience like bitcopin etc
  const [watchList , setWatchList] = useState(localStorage.getItem("watchList").split(",") || 
  [
      "bitcoin",
      "ethereum",
      "ripple",
      "litecoin",
    ]
  );

   //we need to perform certain task after the variable or state update then we need to add it to the dependency array[ie here we are passing watchlist]
   useEffect(()=>{
     ////add watchlist to the local storage
      localStorage.setItem("watchList",watchList);
      //localStorage.getItem("watchList")
      //output(string not array): "bitcoin,ethereum,ripple,litecoin"
   },[watchList])

   //function to add the coin to the watchlist
   //but before adding we need to check if the specific coin ios already present in trhew watchlist or not
   const addCoin = (coin) =>{
      if(watchList.indexOf(coin) === -1){
        console.log("coin not present in the watchlist so can be added to watchlist");
        setWatchList([...watchList,coin]);
      }
   }

   //for delete coin functionality
   const deleteCoin = (coin) => {
      setWatchList(watchList.filter(ele =>{
        return ele !== coin
      }))
   }

  return (
    <WatchListContext.Provider value = {{watchList, deleteCoin,addCoin}}>
        {/*here we will render child props */} 
        {props.children}
    </WatchListContext.Provider>
  )

}