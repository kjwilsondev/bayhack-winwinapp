import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar.js"
import Landing from "./components/layout/Landing"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Landing />
        <h1>BAYHACK WINWIN APP</h1>
      </div>
    );
  }
}
export default App;
