import React from "react";

class ClassComponent extends React.Component {
  state = {
    name: "Cuong",
    age: 23,
  };

  handleEventChange(e) {
    return this.setState({ ...this.state, name: e.target.value });
  }

  render() {
    return (
      <>
        <input type="text" onChange={(e) => this.handleEventChange(e)} value={this.state.name}/>
        <h1>Hello, {this.state.name} {this.state.age}!</h1>
      </>
    );
  }
}

export default ClassComponent;
