import React, { Component } from 'react';

class Withdraw extends Component {

  render() {
    return (
      <div id="content">
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

export default Withdraw;
