import React, { Component } from 'react';

class Trees extends Component {

  render() {
    return (
      <div id="content">

        <br></br>
        <h2>Установить стоимость создания дерева</h2>
        <h2>tree cost {window.web3.utils.fromWei(this.props.treeCost.toString(), 'Ether')} Eth</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const cost = window.web3.utils.toWei(this.treeCost.value.toString(), 'Ether')
          this.props.setTreeCost(cost)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="treeCost"
              type="text"
              ref={(input) => { this.treeCost = input }}
              className="form-control"
              placeholder="Tree Cost"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Set tree cost</button>
        </form>



        <br></br>
        <h2>Создать дерево</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
//          const cost = window.web3.utils.toWei(this.treeCost.value.toString(), 'Ether')
//          const dna = this.props.treeDNA()
//          const dna = [[1, 10, 2, 3, 5, 8, 13]]
          this.props.createTree(this.props.treeCost)
        }}>
          <button type="submit" className="btn btn-primary">Create tree</button>
        </form>


        <br></br>
        <h2>Установить адрес контракта-аукциона (Auction address {this.props.saleAuctionAddress.toString()})</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
//          const cost = window.web3.utils.toWei(this.treeCost.value.toString(), 'Ether')
//          const dna = this.props.treeDNA()
          console.log(this.auctionAddresseeId.value.toString())
          this.props.setSaleAuctionAddress(this.auctionAddresseeId.value.toString())
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="auctionAddresseeId"
              type="text"
              ref={(input) => { this.auctionAddresseeId = input }}
              className="form-control"
              placeholder="auctionAddresseeId"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Set auction address</button>
        </form>


        <br></br>
        <h2>Создать аукцион</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
//          const cost = window.web3.utils.toWei(this.treeCost.value.toString(), 'Ether')
//          const dna = this.props.treeDNA()
          console.log(this.treeId.value.toString())
          this.props.createAuction(this.treeId.value.toString())
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="treeId"
              type="text"
              ref={(input) => { this.treeId = input }}
              className="form-control"
              placeholder="treeId"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Create auction</button>
        </form>


        <p>&nbsp;</p>
        <h2>TREES (count {this.props.treeCount.toString()})</h2>
        <h2>Auction address {this.props.saleAuctionAddress.toString()}</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">creation date</th>
              <th scope="col">DNA</th>
              <th scope="col">owner</th>
            </tr>
          </thead>
          
          <tbody id="productList">
            
            {
            this.props.trees.map((tree, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{tree[1].toString()}</th>
                  <td>{tree[0].toString()}</td>
                  <td>{tree[2][0].toString()}<br></br>
                      {tree[2][1].toString()}<br></br>

                  </td>
                  <td>{ tree.owner }</td>
                </tr>
              )
            })}
          </tbody>
        </table>


        <br></br>
        <h2>Установить комиссию (текущая комиссия площадки: { this.props.ownerCut } из 10000)</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.setOwnerCut(this.ownerCut.value.toString())
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="ownerCut"
              type="text"
              ref={(input) => { this.ownerCut = input }}
              className="form-control"
              placeholder="ownerCut"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Установить комиссию</button>
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
                  <td>{auction.startedAt.toString()}</td>
                  <td>{window.web3.utils.fromWei(auction.startingPrice.toString(), 'Ether')} Eth</td>
                  <td>{window.web3.utils.fromWei(auction.endingPrice.toString(), 'Ether')} Eth</td>
                  <td>{auction.duration.toString()}</td>
                  <td>{auction.auctionOwnerCut.toString()}</td>
                  <td>{auction.treeId.toString()}</td>
                  <td>{auction.seller.toString()}</td>
                  <td>{window.web3.utils.fromWei(auction.currentPrice.toString(), 'Ether')} Eth</td>
                  <td>
                    {
                      <button
                          name={auction.treeId}
                          value={auction.currentPrice}
                          onClick={(event) => {
                            this.props.purchaseTree(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                    }
                    </td>
                  <td>
                    {
                      <button
                          name={auction.treeId}
                          onClick={(event) => {
                            this.props.cancelAuction(event.target.name)
                          }}
                        >
                          Cancel
                        </button>
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>



        <br></br>
        <h2>Вывести средства из контракта-аукциона (баланс: {window.web3.utils.fromWei(this.props.balanceContractAuction, 'Ether')} Eth )</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.withdrawAuctionBalance()
        }}>
          <button type="submit" className="btn btn-primary">Вывести средства</button>
        </form>


        <br></br>
        <h2>Вывести средства из контракта NFT (баланс: {window.web3.utils.fromWei(this.props.balanceContractNFT, 'Ether')} Eth )</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.withdrawBalance(this.to.value.toString(), this.amount.value.toString())
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="to"
              type="text"
              ref={(input) => { this.to = input }}
              className="form-control"
              placeholder="to"
              required />
            <br></br>
            <input
              id="amount"
              type="text"
              ref={(input) => { this.amount = input }}
              className="form-control"
              placeholder="amount"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Вывести средства</button>
        </form>
        <br></br>
      </div>
    );
  }
}

export default Trees;
