import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import { Provider } from "react-redux";
import store from "./store/store";

class App extends Component {
  render() {
    return <Provider store={store}><Navbar /></Provider>;
  }
}

export default App;
