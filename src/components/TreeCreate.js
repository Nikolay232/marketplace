import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import TreeContract from '../abis/TreeContract.json'
import Navbar from './Navbar'
import TreeCreate_ from './TreeCreate_'


class TreeCreate extends Component {

  async componentWillMount() {
    await this.loadWeb3()

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
      this.setState({ treeCost: treeCost.toString() })
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

    this.createTree = this.createTree.bind(this)
  }

  createTree(treeCost) {
    var _dna = [
         [24, 14, 10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
         [131, 178, 131, 76, 90, 213, 177, 17, 79, 232, 176, 34, 39, 151],
         [145, 40, 192, 119, 67, 23, 98, 212, 143, 69, 84, 222, 109, 135],
         [225, 195, 185, 237, 245, 178, 113, 84, 82, 195, 150, 60, 223, 64],
         [164, 70, 208, 131, 93, 233, 151, 28, 189, 4, 172, 182, 29, 116],
         [81, 231, 102, 171, 246, 79, 38, 197, 114, 246, 26, 176, 153, 85],
         [181, 224, 116, 159, 217, 15, 39, 154, 185, 59, 100, 150, 114, 86],
         [38, 3, 51, 92, 74, 13, 186, 63, 146, 167, 116, 14, 90, 99],
         [57, 217, 154, 162, 121, 127, 100, 200, 145, 60, 241, 116, 69, 11],
         [39, 131, 23, 236, 17, 180, 48, 78, 91, 145, 233, 205, 155, 7],
         [237, 66, 225, 228, 15, 127, 160, 181, 253, 235, 102, 216, 18, 162],
         [237, 152, 87, 27, 241, 98, 214, 25, 179, 207, 235, 61, 43, 17],
         [81, 10, 198, 110, 216, 7, 3, 54, 88, 175, 102, 83, 19, 43],
         [49, 132, 121, 108, 13, 94, 138, 219, 107, 228, 132, 234, 3, 155],
         [187, 242, 173, 147, 82, 17, 125, 69, 22, 42, 198, 101, 236, 222],
         [251, 54, 121, 158, 121, 166, 84, 238, 39, 244, 148, 35, 225, 50],
         [203, 166, 229, 139, 4, 195, 123, 50, 132, 113, 115, 93, 97, 190],
         [44, 120, 133, 117, 119, 77, 212, 233, 204, 151, 142, 143, 139, 253],
         [5, 84, 74, 156, 175, 254, 115, 109, 180, 85, 87, 197, 106, 141],
         [105, 208, 158, 219, 117, 198, 45, 78, 253, 113, 220, 36, 212, 213],
         [21, 69, 17, 77, 82, 96, 218, 54, 4, 119, 221, 76, 68, 217],
         [74, 31, 59, 219, 158, 56, 201, 139, 25, 122, 217, 165, 149, 33],
         [67, 212, 122, 113, 215, 45, 29, 68, 190, 50, 138, 227, 78, 131],
         [88, 154, 167, 92, 233, 92, 41, 108, 126, 207, 255, 84, 4, 196]
    ]
    this.state.treeContract.methods.createTree(_dna, 1, 1, 1).send({ from: this.state.account, value: treeCost })
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
                : <TreeCreate_
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
                  createTree={this.createTree}
                  treeDNA={this.treeDNA}
                  getTreeData={this.getTreeData}
                  createAuction={this.createAuction}
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default TreeCreate;
