import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {this.props.stocks.filterTerm ? 
          this.props.stocks.allStocks.filter(stock => stock.type === this.props.stocks.filterTerm).map(stock => <Stock stockDetail={stock} purchaseStock={this.props.purchaseStock} />)
        :
          this.props.stocks.allStocks.map(stock => <Stock stockDetail={stock} purchaseStock={this.props.purchaseStock} />)
        }
      </div>
    );
  }

}

export default StockContainer;
