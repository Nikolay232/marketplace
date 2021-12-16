import React, { Component } from 'react';

class Settings extends Component {

  render() {
    return (
      <div id="content">
        <h3>Адрес владельца {this.props.owner}</h3>
        <h3>Адрес основного контракта {this.props.treeContract.address}</h3>
        <h3>Адрес контракта-аукциона {this.props.saleAuctionAddress.toString()}</h3>
        <h3>Стоимость создания дерева {window.web3.utils.fromWei(this.props.treeCost.toString(), 'Ether')} Eth</h3>
        <h3>Текущая комиссия площадки: { this.props.ownerCut } из 10000</h3>
        <br></br>

        <h2>Установить стоимость создания дерева</h2>
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
        <h2>Установить адрес контракта-аукциона</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.setSaleAuctionAddress(this.auctionAddress.value.toString())
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="auctionAddress"
              type="text"
              ref={(input) => { this.auctionAddress = input }}
              className="form-control"
              placeholder="auctionAddress"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Set auction address</button>
        </form>

        <br></br>
        <h2>Установить комиссию</h2>
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

        <br></br>
        <h2>Изменить владельца</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.setOwner(this.owner.value.toString())
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="owner"
              type="text"
              ref={(input) => { this.owner = input }}
              className="form-control"
              placeholder="owner"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Установить владельца</button>
        </form>

      </div>
    );
  }
}

export default Settings;
