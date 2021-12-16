import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import TreeContract from '../abis/TreeContract.json'
import AuctionContract from '../abis/SaleClockAuction.json'
import Navbar from './Navbar'
import Auction_ from './Auction_'

class Auction extends Component {

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

      const saleAuctionAddress = await treeContract.methods.saleAuction().call()
      this.setState({ saleAuctionAddress: saleAuctionAddress })
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
    this.setState({ loading: false})

    if(networkData) {
      const auctionContract = web3.eth.Contract(AuctionContract.abi, networkData.address)
      this.setState({ auctionContract })
      const ownerCut = await this.state.auctionContract.methods.ownerCut().call()
      this.setState({ ownerCut: ownerCut.toString() })

      var balanceContractAuction = await web3.eth.getBalance(this.state.auctionContract.address)
      this.setState({ balanceContractAuction: balanceContractAuction })
      const treeCount = await this.state.treeContract.methods.treeCount().call()

      for (var i = 1; i <= treeCount; i++) {
        const owner = await this.state.treeContract.methods.ownerOf(i).call()

        if (owner === auctionContract.address ) {
          const auction = await auctionContract.methods.getAuction(i).call()
          auction.currentPrice = await auctionContract.methods.getCurrentPrice(i).call()
          auction.treeId = i
          this.setState({
            auctions: [...this.state.auctions, auction]
          })
        }
      }
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
      ownerCut: 0
    }

    this.purchaseTree = this.purchaseTree.bind(this)
    this.cancelAuction = this.cancelAuction.bind(this)

    this.createAuction = this.createAuction.bind(this)
    this.setSaleAuctionAddress = this.setSaleAuctionAddress.bind(this)
    this.timestampToDate = this.timestampToDate.bind(this)
  }


  purchaseTree(id, price) {
    this.state.auctionContract.methods.bid(id).send({ from: this.state.account, value: price })
  }

  cancelAuction(id) {
    this.state.auctionContract.methods.cancelAuction(id).send({ from: this.state.account })
  }

  setSaleAuctionAddress(auction_address){
    this.state.treeContract.methods.setSaleAuctionAddress(auction_address).send({ from: this.state.account })
  }

  createAuction(tree_id, startingPrice, endingPrice, duration){
    this.state.treeContract.methods.createAuction(tree_id, startingPrice, endingPrice, duration).send({ from: this.state.account })
  }

  timestampToDate(timestamp){
    var date = new Date(timestamp * 1000);

    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // Hours part from the timestamp
    var hours = date.getHours();
    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();
    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    var formattedTime = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime
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
                : <Auction_
                  auctions={this.state.auctions}
                  saleAuctionAddress={this.state.saleAuctionAddress}
                  balanceContractAuction={this.state.balanceContractAuction}
                  balanceContractNFT={this.state.balanceContractNFT}
                  account={this.state.account}

                  purchaseTree={this.purchaseTree}
                  cancelAuction={this.cancelAuction}
                  createAuction={this.createAuction}
                  setSaleAuctionAddress={this.setSaleAuctionAddress}
                  timestampToDate={this.timestampToDate}
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default Auction;
