import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import TreeContract from '../abis/TreeContract.json'
import AuctionContract from '../abis/SaleClockAuction.json'
import Navbar from './Navbar'
import Settings_ from './Settings_'

class Settings extends Component {

  async componentWillMount() {
    await this.loadWeb3()

    await this.loadTreeContractData()
    await this.loadAuctionContractData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadTreeContractData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()

    const networkData = TreeContract.networks[networkId]

    if(networkData) {
      const treeContract = web3.eth.Contract(TreeContract.abi, networkData.address)
      this.setState({ treeContract })

      const treeCost = await treeContract.methods.treeCost().call()
      const treeCount = await treeContract.methods.treeCount().call()
      const saleAuctionAddress = await treeContract.methods.saleAuction().call()
      const owner = await treeContract.methods.owner().call()
      this.setState({ treeCost: treeCost.toString() })
      this.setState({ treeCount: treeCount })
      this.setState({ saleAuctionAddress: saleAuctionAddress })
      this.setState({ owner: owner })

      this.setState({ loading: false})
    } else {
      window.alert('TreeContract contract not deployed to detected network.')
    }
  }

  async loadAuctionContractData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()

    const networkData = AuctionContract.networks[networkId]

    if(networkData) {
      const auctionContract = web3.eth.Contract(AuctionContract.abi, networkData.address)
      this.setState({ auctionContract })
      const ownerCut = await this.state.auctionContract.methods.ownerCut().call()
      this.setState({ ownerCut: ownerCut.toString() })

      var balanceContractNFT = await web3.eth.getBalance(this.state.treeContract.address)
      var balanceContractAuction = await web3.eth.getBalance(this.state.auctionContract.address)
      this.setState({ balanceContractAuction: balanceContractAuction })
      this.setState({ balanceContractNFT: balanceContractNFT })
    } else {
      window.alert('TreeContract contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      productCount: 0,
      products: [],
      loading: true,
      treeCost: '',
      treeCount: 0,
      dna_c: [[1, 10, 2, 3, 5, 8, 13]],
      trees: [],
      owners: {},
      saleAuctionAddress: '',
      auctions: [],
      balanceContractAuction: '',
      balanceContractNFT: '',
      ownerCut: 0,
      owner: ''
  }

    this.setTreeCost = this.setTreeCost.bind(this)
    this.setSaleAuctionAddress = this.setSaleAuctionAddress.bind(this)
    this.setOwnerCut = this.setOwnerCut.bind(this)
    this.setOwner = this.setOwner.bind(this)
  }

  setOwnerCut(ownerCut) {
    this.state.auctionContract.methods.setOwnerCut(ownerCut).send({ from: this.state.account })
  }

  setTreeCost(cost) {
    this.state.treeContract.methods.setTreeCost(cost).send({ from: this.state.account })
  }

  setSaleAuctionAddress(auction_address){
    this.state.treeContract.methods.setSaleAuctionAddress(auction_address).send({ from: this.state.account })
  }

  setOwner(address){
    this.state.treeContract.methods.transferOwnership(address).send({ from: this.state.account })
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex">
              { this.state.loading
                ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                : <Settings_
                  products={this.state.products}
                  treeCost={this.state.treeCost}
                  treeData={this.state.treeData}
                  trees={this.state.trees}
                  auctions={this.state.auctions}
                  treeContract={this.state.treeContract}
                  saleAuctionAddress={this.state.saleAuctionAddress}
                  balanceContractAuction={this.state.balanceContractAuction}
                  balanceContractNFT={this.state.balanceContractNFT}
                  treeCount={this.state.treeCount}
                  ownerCut={this.state.ownerCut}
                  owner={this.state.owner}

                  setTreeCost={this.setTreeCost}
                  setSaleAuctionAddress={this.setSaleAuctionAddress}
                  setOwnerCut={this.setOwnerCut}
                  setOwner={this.setOwner}
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Settings;
