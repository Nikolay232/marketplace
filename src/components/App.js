import React, { Component } from 'react';
import Web3 from 'web3'
import './App.css';
import TreeContract from '../abis/TreeContract.json'
import AuctionContract from '../abis/SaleClockAuction.json'
import Navbar from './Navbar'
import Main from './Main'

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()

    await this.loadAccount()

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

  async loadAccount() {
    const myPrivateKeyHex = '0xd1453e337e83037e412bbb0079702092c6786085503224a411528595676e754b';
    const web3 = window.web3
    web3.eth.accounts.wallet.add(myPrivateKeyHex)
    const account = web3.eth.accounts.wallet[0].address
    console.log('1111111111111111111111111111111111111111111111111111111111111111111111111111111111')
    console.log(account)
    this.setState({ privateKeyAccount: account })
//    const myPrivateKeyHex = 'd1453e337e83037e412bbb0079702092c6786085503224a411528595676e754b';
////    const myPrivateKeyHex = 'ef6a5c91c3446fba5d8ae6b70ec26e39151d662c878ced505c8e54e9be4fed07';
//
//////    const web3 = window.web3
////    const HDWalletProvider = require("@truffle/hdwallet-provider");
//////    console.log(TreeContract)
////    const provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/fbb2613e0ba841c9b2a50daf0f915355");
//    const ethNetwork = 'https://rinkeby.infura.io/v3/999d83084ba14f789df679dd53e1caca'
//
//
////    const mnemonicPhrase = "sand settle crumble recycle company milk knock scrub attack easy absorb belt";
////
////    const localKeyProvider = new HDWalletProvider({
////      mnemonic: {
////        phrase: mnemonicPhrase
////      },
////      privateKeys: [myPrivateKeyHex],
////      providerOrUrl: provider,
////      numberOfAddresses: 1,
////    });
////
////    const web3 = new Web3(localKeyProvider);
////    const web3 = window.web3
//    const web3 = await new Web3(new Web3.providers.HttpProvider(ethNetwork))
//    const myAccount = web3.eth.accounts.privateKeyToAccount(myPrivateKeyHex);
//
//    console.log('1111111111111111111111111111111111111111111111111111111111111111111111111111111111')
//    console.log(myAccount.address)
//    console.log('222222222222222222222222222222222222222222222222222222222222222222222222222222222222')
//
////    const owner = await this.state.treeContract.methods.setTreeCost(10).send({ from: this.state.account })
//
//    this.setState({ privateKeyAccount: myAccount })
////
////    console.log(owner.toString())
  }

//  async loadMarketplaceData() {
//    const web3 = window.web3
//    web3.eth.getGasPrice().then((result) => {
//        console.log(web3.utils.fromWei(result, 'ether'))
//        })
//    // Load account
//    const accounts = await web3.eth.getAccounts()
////    console.log('44444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444444')
////    console.log(accounts)
//    this.setState({ account: accounts[0] })
//    const networkId = await web3.eth.net.getId()
//    console.log(networkId)
//    const networkData = Marketplace.networks[networkId] // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
////    console.log('=======================================================================================================')
////    var balanceContractNFT = await web3.eth.getBalance('0xc9108e580BfD585112D699216e25200232bA3410')
////    var balanceContractAuction = await web3.eth.getBalance('0x0Aa8458449D65857c351Aa4d1a66093e73b50f61')
////    this.setState({ balanceContractAuction: balanceContractAuction })
////    this.setState({ balanceContractNFT: balanceContractNFT })
//////    var balance = web3.toDecimal(balance)
////    console.log(balanceContractNFT)
////    console.log(balanceContractAuction)
//////    console.log(web3.eth.getBalance('0x2e52CF992683D2Afd10B8845dFc3e22C6F3E1a14'))
////    console.log('=======================================================================================================')
//    if(networkData) {
//      const marketplace = web3.eth.Contract(Marketplace.abi, networkData.address) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//      this.setState({ marketplace })
////      console.log(marketplace.methods)
//      const productCount = await marketplace.methods.productCount().call()
//      this.setState({ productCount })
//      // Load products
//      for (var i = 1; i <= productCount; i++) {
//        const product = await marketplace.methods.products(i).call()
//        this.setState({
//          products: [...this.state.products, product]
//        })
//      }
////      console.log(this.state.products)
//      this.setState({ loading: false})
//    } else {
//      window.alert('Marketplace contract not deployed to detected network.')
//    }
//  }


  async loadTreeContractData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const networkId = await web3.eth.net.getId()

    const networkData = TreeContract.networks[networkId] // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if(networkData) {
      const treeContract = web3.eth.Contract(TreeContract.abi, networkData.address) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.setState({ treeContract })
      console.log(treeContract.address)
      
      const treeCost = await treeContract.methods.treeCost().call()
      const treeCount = await treeContract.methods.treeCount().call()
      const saleAuctionAddress = await treeContract.methods.saleAuction().call()
      this.setState({ treeCost: treeCost.toString() })
      this.setState({ treeCount: treeCount })
      this.setState({ saleAuctionAddress: saleAuctionAddress })
//      console.log(treeCost.toString())
//      console.log(treeCount)

//      const treeLen =

//      const treeD = await treeContract.methods.getTreeData(1).call()
//      console.log(treeD)

      console.log('this.state.privateKeyAccount')
      console.log(this.state.privateKeyAccount)
      console.log(this.state.account)

      for (var i = 1; i <= treeCount; i++) {
        const tree = await treeContract.methods.getTreeData(i).call({ from: this.state.privateKeyAccount })
//        const tree = await treeContract.methods.getTreeData(i).call({ from: this.state.account })

        tree.owner = await treeContract.methods.ownerOf(i).call()
        this.setState({
          trees: [...this.state.trees, tree]
        })
      }
//      console.log('222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222')
//      console.log(this.state.trees[0])
//      console.log(this.state.trees[0][0].toString())
//      console.log(this.state.trees[0][1].toString())
//      console.log(this.state.trees[0][2][0])

//      console.log(this.state.treeData)
      // Load products
      // for (var i = 1; i <= productCount; i++) {
      //   const product = await treeContract.methods.products(i).call()
      //   this.setState({
      //     products: [...this.state.products, product]
      //   })
      // }
      // this.setState({ loading: false})
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

    const networkData = AuctionContract.networks[networkId] // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    if(networkData) {
      const auctionContract = web3.eth.Contract(AuctionContract.abi, networkData.address) // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      this.setState({ auctionContract })
      const ownerCut = await this.state.auctionContract.methods.ownerCut().call()
      this.setState({ ownerCut: ownerCut.toString() })

      var balanceContractNFT = await web3.eth.getBalance(this.state.treeContract.address)
      var balanceContractAuction = await web3.eth.getBalance(this.state.auctionContract.address)
      this.setState({ balanceContractAuction: balanceContractAuction })
      this.setState({ balanceContractNFT: balanceContractNFT })


      console.log(auctionContract.address)

//      const treeCost = await auctionContract.methods.treeCost().call()
//      const treeCount = await auctionContract.methods.treeCount().call()
//      this.setState({ treeCost: treeCost.toString() })
//      this.setState({ treeCount: treeCount })
//      console.log(treeCost.toString())
//      console.log(treeCount)
//
//
//
//      const treeD = await auctionContract.methods.getTreeData(1).call()
//      console.log(treeD)

//        this.state.treeContract
        const treeCount = await this.state.treeContract.methods.treeCount().call()
//        console.log('fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')
//        console.log(treeCount)

        for (var i = 1; i <= treeCount; i++) {
//            const tree = await this.state.treeContract.methods.getTreeData(i).call()
            const owner = await this.state.treeContract.methods.ownerOf(i).call()
            console.log(owner)
            if (owner === auctionContract.address ) {
              const auction = await auctionContract.methods.getAuction(i).call()
              auction.currentPrice = await auctionContract.methods.getCurrentPrice(i).call()
              auction.treeId = i
              this.setState({
                auctions: [...this.state.auctions, auction]
              })
            }
      }
//      console.log(this.state.auctions[0])

//      for (var i = 1; i <= treeCount; i++) {
//        const tree = await treeContract.methods.getTreeData(i).call()
//        tree.owner = await treeContract.methods.ownerOf(i).call()
//        this.setState({
//          trees: [...this.state.trees, tree]
//        })
//      }
    } else {
      window.alert('TreeContract contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      privateKeyAccount: '',
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

    this.createProduct = this.createProduct.bind(this)
    this.purchaseTree = this.purchaseTree.bind(this)
    this.cancelAuction = this.cancelAuction.bind(this)

    this.setTreeCost = this.setTreeCost.bind(this)
    this.treeDNA = this.treeDNA.bind(this)
    this.createTree = this.createTree.bind(this)
    this.getTreeData = this.getTreeData.bind(this)
    this.createAuction = this.createAuction.bind(this)
    this.setSaleAuctionAddress = this.setSaleAuctionAddress.bind(this)
    this.withdrawAuctionBalance = this.withdrawAuctionBalance.bind(this)
    this.withdrawBalance = this.withdrawBalance.bind(this)
    this.setOwnerCut = this.setOwnerCut.bind(this)

//    this.treeContract = this.treeContract.bind(this)
  }

  createProduct(name, price) {
    this.setState({ loading: true })
    this.state.marketplace.methods.createProduct(name, price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }

  purchaseTree(id, price) {
//    this.setState({ loading: true })
    this.state.auctionContract.methods.bid(id).send({ from: this.state.account, value: price })
//    .once('receipt', (receipt) => {
//      this.setState({ loading: false })
//    })
  }

  cancelAuction(id) {
//    this.setState({ loading: true })
    this.state.auctionContract.methods.cancelAuction(id).send({ from: this.state.account })
//    .once('receipt', (receipt) => {
//      this.setState({ loading: false })
//    })
  }


  setOwnerCut(ownerCut) {
//    this.setState({ loading: true })
    this.state.auctionContract.methods.setOwnerCut(ownerCut).send({ from: this.state.account })
//    .once('receipt', (receipt) => {
//      this.setState({ loading: false })
//    })
  }


  
//  createTree(dna, generation, matronId, sireId) {
  createTree(treeCost) {
//    this.setState({ loading: true })
    console.log(this.state.dna_c)
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
    console.log(treeCost)
    this.state.treeContract.methods.createTree(_dna, 1, 1, 1).send({ from: this.state.account, value: treeCost })
//    .once('receipt', (receipt) => {
//      this.setState({ loading: false })
//    })
  }

  setTreeCost(cost) {
    //this.setState({ loading: true })
    this.state.treeContract.methods.setTreeCost(cost).send({ from: this.state.account })
//    .once('receipt', (receipt) => {
//      this.setState({ loading: false })
//    })
  }

  getTreeData(tree_id){
//    const treeData = this.state.treeContract.methods.getTreeData(tree_id).send({ from: this.state.account })
    const treeData = this.state.treeContract.methods.getTreeData(tree_id).call()
    console.log(treeData)
    this.setState({ treeData: treeData })
  }

  setSaleAuctionAddress(auction_address){
    console.log(auction_address)
    console.log(this.state.account)
    this.state.treeContract.methods.setSaleAuctionAddress(auction_address).send({ from: this.state.account })
  }

  createAuction(tree_id){
    const web3 = window.web3
    this.state.treeContract.methods.createAuction(tree_id, web3.utils.toWei('1', 'Ether'), 10000, 5000).send({ from: this.state.account })
  }

  withdrawAuctionBalance(){
    this.state.treeContract.methods.withdrawAuctionBalance().send({ from: this.state.account })
  }

  withdrawBalance(to, amount){
    const web3 = window.web3
    this.state.treeContract.methods.withdrawBalance(to, web3.utils.toWei(amount, 'Ether')).send({ from: this.state.account })
  }

  treeDNA() {
    const sequence = [
        [1, 10, 2, 3, 5, 8, 13],
        [1, 100, 2, 3, 5, 8, 13],
        [1, 1000, 2, 3, 5, 8, 13],
    ]
    return sequence;
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
                : <Main
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

                  createProduct={this.createProduct}
                  purchaseTree={this.purchaseTree}
                  cancelAuction={this.cancelAuction}
                  setTreeCost={this.setTreeCost}
                  createTree={this.createTree}
                  createAuction={this.createAuction}
                  treeDNA={this.treeDNA}
                  getTreeData={this.getTreeData}
                  setSaleAuctionAddress={this.setSaleAuctionAddress}
                  withdrawAuctionBalance={this.withdrawAuctionBalance}
                  withdrawBalance={this.withdrawBalance}
                  setOwnerCut={this.setOwnerCut}
                  />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
