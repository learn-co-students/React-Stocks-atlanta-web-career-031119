import React from 'react'

const Stock = (props) => (
  <div>

    <div className="card" onClick={()=>{props.purchaseStock(props.stockDetail)}}>
      <div className="card-body">
        <h5 className="card-title">{
          props.stockDetail.name
          }</h5>
        <p className="card-text">${
            props.stockDetail.price
          }</p>
      </div>
    </div>


  </div>
);

export default Stock
