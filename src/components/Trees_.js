import React, { Component } from 'react';

class Trees_ extends Component {

  render() {
    return (
      <div id="content">

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
                  <td>{this.props.timestampToDate(tree[0].toString())}</td>
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

export default Trees_;
