import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import TreeContract from '../abis/TreeContract.json'
import Navbar from './Navbar'
import Trees_ from './Trees_'


class Trees extends Component {

  async componentWillMount() {
    await this.loadWeb3()

    await this.loadAccount()

    await this.loadTreeContractData()
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

  async loadAccount() {
    const myPrivateKeyHex = '0xd1453e337e83037e412bbb0079702092c6786085503224a411528595676e754b';
    const web3 = window.web3
    web3.eth.accounts.wallet.add(myPrivateKeyHex)
    const account = web3.eth.accounts.wallet[0].address
    this.setState({ privateKeyAccount: account })
  }

  async loadTreeContractData() {
    this.setState({ loading: false})
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
      this.setState({ treeCost: treeCost.toString() })
      this.setState({ treeCount: treeCount })

      for (var i = 1; i <= treeCount; i++) {
        const tree = await treeContract.methods.getTreeData(i).call({ from: this.state.privateKeyAccount })
        tree.owner = await treeContract.methods.ownerOf(i).call()
        this.setState({
          trees: [...this.state.trees, tree]
        })
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
      privateKeyAccount: '',
    }

    this.setTreeCost = this.setTreeCost.bind(this)
    this.getTreeData = this.getTreeData.bind(this)
    this.createAuction = this.createAuction.bind(this)
    this.timestampToDate = this.timestampToDate.bind(this)
  }

  setTreeCost(cost) {
    this.state.treeContract.methods.setTreeCost(cost).send({ from: this.state.account })
  }

  getTreeData(tree_id){
    const treeData = this.state.treeContract.methods.getTreeData(tree_id).call()
    this.setState({ treeData: treeData })
  }

  createAuction(tree_id){
    const web3 = window.web3
    this.state.treeContract.methods.createAuction(tree_id, web3.utils.toWei('1', 'Ether'), 10000, 5000).send({ from: this.state.account })
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
                : <Trees_
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
                  account={this.state.account}

                  setTreeCost={this.setTreeCost}
                  getTreeData={this.getTreeData}
                  createAuction={this.createAuction}
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

export default Trees;
