
//https://github.com/kgajriaAgarwal/CoinStarReactApp  

import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import coinDetailPage from './Page/CoinDetailPage';
import coinSummaryPage from './Page/CoinSummaryPage';
import Header from './Components/Header';
import { WatchListContextProvider } from './Context/WatchListContext';

function App() {
  return (
    <div className = "container">
      <WatchListContextProvider>
        <BrowserRouter>
          <div className="App">
            <Header/>
            <Route exact path='/' component = {coinSummaryPage}/>
            {/* <Route path = "/coins/variable" component = {CoinDetailPage}/> */}
            {/*whatever will come after the colon(:) that will be considered as a variable by react router. */}
            <Route path = "/coins/:id" component = {coinDetailPage}/>
              {/* <Route exact path = '/detail' component = {coinDetailPage}/> */}
          </div>
        </BrowserRouter>
      </WatchListContextProvider>
    </div>
  );
}

export default App;
