import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import NewsFeed from "./components/NewsFeed";

import Aircraft from "./components/Aircraft";

import { MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";

class App extends Component {
  state = {
    selected: "NewsFeed",
    links: ["A320", "A330", "A350"]
  };

  selectedTab = selected => {
    console.log(selected);
    this.setState({ selected });
  };
  render() {
    const { selected, links } = this.state;

    const HeaderLinks = ({ content, selected, selectedTab }) => {
      const active = selected == content ? "active" : "";
      return (
        <div className={active} onClick={() => selectedTab(content)}>
          {content}
        </div>
      );
    };

    console.log(selected, "selected");

    return (
      <div className="App">
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <div className="bg" />
          <div className={"App-content"}>
            <header className="App-header">
              <div onClick={() => this.selectedTab("NewsFeed")}>AIR-BUZZ</div>
              <div>
                {links.map((el, index) => (
                  <HeaderLinks
                    content={el}
                    key={index}
                    selected={selected}
                    selectedTab={this.selectedTab}
                  />
                ))}
              </div>
            </header>
            <NewsFeed selected={selected} />
            <Aircraft selected={selected} />
            {/* <A330 selected={selected} /> */}
          </div>
        </MuiPickersUtilsProvider>
      </div>
    );
  }
}

export default App;
