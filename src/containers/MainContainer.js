import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  constructor() {
    super()
    this.state = {
      stocks: [],
      displayStocks: []
    }
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks')
    .then(res => res.json())
    .then(stockInfo => {

      let newStocks = stockInfo.map(stock =>{
        return {...stock, owned: false}
      })
      this.setState({
        stocks: newStocks,
        displayStocks: newStocks
      })
    })
  }

  

  tradeStock = (tradedStock) => {
    let updatedStocks = this.state.stocks.map(stock => {
        if (tradedStock.id == stock.id) {
          stock.owned = !stock.owned
          return stock
        } else 
        return stock
    })
    this.setState({displayStocks:updatedStocks})
  }

  myPortfolio = () => {
    let myList = this.state.stocks.filter(stock => stock.owned == true)
    console.log('mystocks', myList )
    return myList
  }

  sortStocks = (e) => {
    console.log('sort', e.target.value)
    let sortedStocks = this.state.stocks.sort((a, b) => a.name - b.name)
    console.log('aftersort', sortedStocks)
  }

  filterStocks = (e) => {
    let filteredStocks = this.state.stocks.filter(stock => stock.type == e.target.value)
    this.setState({displayStocks: filteredStocks})
  }


  render() {
    return (
      <div>
        <SearchBar sortStocks={this.sortStocks} filterStocks={this.filterStocks}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state.displayStocks} tradeStock={this.tradeStock}/>

            </div>
            <div className="col-4">

            <PortfolioContainer ownedStocks={this.myPortfolio()} tradeStock={this.tradeStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
