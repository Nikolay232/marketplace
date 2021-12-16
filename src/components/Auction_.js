import React, { Component } from 'react';

class Auction extends Component {

  render() {
    return (
      <div id="content">
        <br></br>
        <h2>Создать аукцион</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const startingPrice = window.web3.utils.toWei(this.startingPrice.value.toString(), 'Ether')
          const endingPrice = window.web3.utils.toWei(this.endingPrice.value.toString(), 'Ether')
          this.props.createAuction(this.treeId.value.toString(), startingPrice, endingPrice, this.duration.value.toString())
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="treeId"
              type="text"
              ref={(input) => { this.treeId = input }}
              className="form-control"
              placeholder="treeId"
              required />

            <input
              id="startingPrice"
              type="text"
              ref={(input) => { this.startingPrice = input }}
              className="form-control"
              placeholder="startingPrice"
              required />

            <input
              id="endingPrice"
              type="text"
              ref={(input) => { this.endingPrice = input }}
              className="form-control"
              placeholder="endingPrice"
              required />

            <input
              id="duration"
              type="text"
              ref={(input) => { this.duration = input }}
              className="form-control"
              placeholder="duration"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Create auction</button>
        </form>

        <p>&nbsp;</p>
        <h2>AUCTIONS</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">startedAt</th>
              <th scope="col">startingPrice</th>
              <th scope="col">endingPrice</th>
              <th scope="col">duration</th>
              <th scope="col">auctionOwnerCut</th>
              <th scope="col">treeId</th>
              <th scope="col">seller</th>
              <th scope="col">price</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody id="productList">

            {
            this.props.auctions.map((auction, key) => {
              return(
                <tr key={key}>
                  <td>{this.props.timestampToDate(auction.startedAt.toString())}</td>
                  <td>{window.web3.utils.fromWei(auction.startingPrice.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(auction.endingPrice.toString(), 'Ether')} Eth</td>
                  <td>{auction.duration.toString()}</td>
                  <td>{auction.auctionOwnerCut.toString()}</td>
                  <td>{auction.treeId.toString()}</td>
                  <td>{auction.seller.toString()}</td>
                  <td>{window.web3.utils.fromWei(auction.currentPrice.toString(), 'Ether')} Eth</td>
                  <td>
                    { auction.seller !== this.props.account
                      ? <button
                          name={auction.treeId}
                          value={auction.currentPrice}
                          onClick={(event) => {
                            this.props.purchaseTree(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                  <td>
                    { auction.seller === this.props.account
                      ? <button
                          name={auction.treeId}
                          onClick={(event) => {
                            this.props.cancelAuction(event.target.name)
                          }}
                        >
                          Cancel
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>

      </div>
    );
  }
}

export default Auction;
