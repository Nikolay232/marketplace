import React, { Component } from 'react';

class TreeCreate_ extends Component {

  render() {
    return (
      <div id="content">

        <br></br>
        <h2>Создать дерево</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          this.props.createTree(this.props.treeCost)
        }}>

          <button type="submit" className="btn btn-primary">Create tree</button>
        </form>

      </div>
    );
  }
}

export default TreeCreate_;
