import React, { Component } from 'react';

class Tree_ extends Component {

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
              maxlength="8"
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
          this.props.createTree()
        }}>

          <button type="submit" className="btn btn-primary">Create tree</button>
        </form>

        <p>&nbsp;</p>
        <h2>TREES (count {this.props.treeCount.toString()})</h2>
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

      </div>
    );
  }
}

export default Tree_;
