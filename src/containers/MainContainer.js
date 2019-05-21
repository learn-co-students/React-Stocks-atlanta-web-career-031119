import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {
  constructor(){
    super()
    this.state ={
      allStocks: [],
      sortByPrice: false,
      sortByAlhpabet: false,
      filterTerm: ""
    }
  }

  componentDidMount(){
    fetch("http://localhost:3000/stocks")
    .then(res => res.json())
    .then(stocks => {
          let newStocks = stocks.map(stock=>{
            return{
              ...stock, purchased: false
            }
          })
          this.setState({allStocks: newStocks})
    })
  }

  purchaseStock = (stockObj) => {
    let purchasedStocks = this.state.allStocks.map(stock =>
      {if(stock.id === stockObj.id){
        stock.purchased = !stock.purchased
        return stock
      }else{
        return stock
      }
    })
    this.setState({allStocks: purchasedStocks})
  }

  filterPurchasedStocks = () => {
    return this.state.allStocks.filter(stock => stock.purchased === true)
  }

  filterByStockType = (e) => {
    this.setState({filterTerm: e.target.value})
  }

  sortByType = (e) => {
    const type = e.target.value
    if(type === "Price"){
      this.setState({
        sortByPrice: true
      })
      let sortedStocks = this.state.allStocks.sort(function(a, b){
        if(a.price > b.price){
          return 1
        }else if(a.price < b.price){
          return -1
        }else{
          return 0
        }
      })
      this.setState({allStocks: sortedStocks})
    }else if(type === "Alphabetically"){
      this.setState({
        sortByAlhpabet: true
      })
      let sortedStocks = this.state.allStocks.sort(function(a, b){
        if(a.name > b.name){
          return 1
        }else if(a.name < b.name){
          return -1
        }else{
          return 0
        }
      })
      this.setState({allStocks: sortedStocks})
    }}

  render() {
    return (
      <div>
        <SearchBar filterByStockType={this.filterByStockType} sortByType={this.sortByType}/>

          <div className="row">
            <div className="col-8">

              <StockContainer stocks={this.state} purchaseStock={this.purchaseStock} filterByStockType={this.filterByStockType}/>

            </div>
            <div className="col-4">

              <PortfolioContainer stocks={this.filterPurchasedStocks()} purchaseStock={this.purchaseStock}/>

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
