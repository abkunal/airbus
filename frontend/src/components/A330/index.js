import React from "react";
import "./index.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { METHODS } from "http";
import { NOTFOUND } from "dns";
import { Post } from "../../utils/request";

import { DateTimePicker } from "material-ui-pickers";

import { AddFlightData } from "../A320";

export default class A330 extends React.Component {
  state = { addFlight: false };

  handleChange = type => e => {
    this.setState({ [type]: e.target.value });
  };

  onSave = () => {
    console.log("Its saved in database");
  };

  search = () => {
    console.log(this.state);
  };

  addFlightActive = () => this.setState({ addFlight: !this.state.addFlight });

  render() {
    let { selected } = this.props;

    const { addFlight } = this.state;

    if (selected != "A330") return null;
    return (
      <div className={"a330-container"}>
        <div>
          <div className={"search"}>
            <TextField
              id="standard-name"
              label="Search by MSN"
              value={this.state.msn}
              onChange={this.handleChange("msn")}
              margin="normal"
              variant={"outlined"}
            />
            <TextField
              id="standard-name"
              label="Search by Number"
              value={this.state.msn}
              onChange={this.handleChange("msn")}
              margin="normal"
              variant={"outlined"}
            />
            <TextField
              id="standard-name"
              label="Search By Airport"
              value={this.state.msn}
              onChange={this.handleChange("msn")}
              margin="normal"
              variant={"outlined"}
            />
          </div>
          <div className={"action-buttons"}>
            <Button variant="contained" color="primary" onClick={this.search}>
              Search
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={this.addFlightActive}
            >
              Add Flight
            </Button>
          </div>
          <AddFlightData
            onSave={this.onSave}
            addFlight={addFlight}
            planeModel={selected}
          />
        </div>
      </div>
    );
  }
}
