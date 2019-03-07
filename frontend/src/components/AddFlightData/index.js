import React from "react";
import "./index.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { METHODS } from "http";
import { NOTFOUND } from "dns";
import { Post } from "../../utils/request";

import { DateTimePicker } from "material-ui-pickers";

const requirements = {
  msn: "",
  harnessLength: "",
  grossWeight: "",
  atmosphericPressure: "",
  roomTemperature: "",
  fuelCapacityLeftWing: "",
  fuelCapacityRightWing: "",
  fuelQuantityLeftWing: "",
  fuelQuantityRightWing: "",
  maximumAltitudeReachable: "",
  flightNo: "",
  sourceAirport: "",
  destinationAirport: "",
  takeOffTime: "",
  landingTime: ""
};

export default class AddFlightData extends React.Component {
  state = {
    msn: "",
    harnessLength: "",
    grossWeight: "",
    atmosphericPressure: "",
    roomTemperature: "",
    fuelCapacityLeftWing: "",
    fuelCapacityRightWing: "",
    fuelQuantityLeftWing: "",
    fuelQuantityRightWing: "",
    maximumAltitudeReachable: "",
    flightNo: "",
    sourceAirport: "",
    destinationAirport: "",
    takeOffTime: "",
    landingTime: "",
    errors: {}
  };

  handleChange = type => e => {
    this.setState({ [type]: e.target.value });
  };

  handleDateChange = type => date => {
    console.log(type, date);
    this.setState({ [type]: new Date(date) });
  };

  addFlight = () => {
    let fields = Object.keys(requirements);

    let errors = {};

    fields.forEach((element, key) => {
      console.log(element, key);
      if (!this.state[element]) {
        errors[element] = `its required`;
      }
    });

    if (errors && Object.values(errors).length == 0) {
      console.log("addFlight");
      console.log(this.state);
      this.setState({ errors: new Object() });
      let body = {
        ...this.state,
        planeModel: this.props.planeModel
      };
      Post("prod/add-flight", body)
        .then(respsonse => {
          if (respsonse.error) {
            this.setState({ dbError: respsonse.error });
          } else this.setState({ dbError: "" });
          console.log(respsonse);
        })
        .catch(err => console.log("something went wrong"));
    } else {
      this.setState({ errors });
    }
  };

  render() {
    const { addFlight, planeModel } = this.props;
    console.log(this.state.errors);
    let { errors } = this.state;
    if (!addFlight) return null;

    return (
      <div>
        <div className={"input-rows"}>
          <TextField
            id="standard-name"
            label="MSN"
            value={this.state.msn}
            onChange={this.handleChange("msn")}
            margin="normal"
            type={"number"}
            error={errors["msn"]}
            // inputProps={{ min: "10000", max: "99999", step: "1" }}
          />

          <TextField
            id="standard-name"
            label="Harness Length"
            value={this.state.harnessLength}
            onChange={this.handleChange("harnessLength")}
            margin="normal"
            type={"number"}
            error={errors["harnessLength"]}
          />

          <TextField
            id="standard-name"
            label="Gross Weight"
            value={this.state.grossWeight}
            onChange={this.handleChange("grossWeight")}
            margin="normal"
            type={"number"}
            error={errors["grossWeight"]}
          />
        </div>
        <div className={"input-rows"}>
          <TextField
            id="standard-name"
            label="Atmospheric Pressure"
            value={this.state.atmosphericPressure}
            onChange={this.handleChange("atmosphericPressure")}
            margin="normal"
            type={"number"}
            error={errors["atmosphericPressure"]}
          />

          <TextField
            id="standard-name"
            label="Room Temperature"
            value={this.state.roomTemperature}
            onChange={this.handleChange("roomTemperature")}
            margin="normal"
            type={"number"}
            error={errors["roomTemperature"]}
          />
          <TextField
            id="standard-name"
            label="Fuel Capacity On Left Wing"
            value={this.state.fuelCapacityLeftWing}
            onChange={this.handleChange("fuelCapacityLeftWing")}
            margin="normal"
            type={"number"}
            error={errors["fuelCapacityLeftWing"]}
          />
        </div>
        <div className={"input-rows"}>
          <TextField
            id="standard-name"
            label="Fuel Capacity On Right Wing"
            value={this.state.fuelCapacityRightWing}
            onChange={this.handleChange("fuelCapacityRightWing")}
            margin="normal"
            type={"number"}
            error={errors["fuelCapacityRightWing"]}
          />

          <TextField
            id="standard-name"
            label="Fuel Quantity On Left Wing"
            value={this.state.fuelQuantityLeftWing}
            onChange={this.handleChange("fuelQuantityLeftWing")}
            margin="normal"
            type={"number"}
            error={errors["fuelQuantityLeftWing"]}
          />
          <TextField
            id="standard-name"
            label="Fuel Quantity On Right Wing"
            value={this.state.fuelQuantityRightWing}
            onChange={this.handleChange("fuelQuantityRightWing")}
            margin="normal"
            type={"number"}
            error={errors["fuelQuantityRightWing"]}
          />
        </div>
        <div className={"input-rows"}>
          <TextField
            id="standard-name"
            label="Maxiumum altitude to be reached"
            value={this.state.maximumAltitudeReachable}
            onChange={this.handleChange("maximumAltitudeReachable")}
            margin="normal"
            type={"number"}
            error={errors["maximumAltitudeReachable"]}
          />
          <TextField
            id="standard-name"
            label="Flight Number"
            value={this.state.flightNo}
            onChange={this.handleChange("flightNo")}
            margin="normal"
            error={errors["flightNo"]}
          />
          <TextField
            id="standard-name"
            label="Source Airport"
            //   className={classes.textField}
            value={this.state.sourceAirport}
            onChange={this.handleChange("sourceAirport")}
            margin="normal"
            error={errors["sourceAirport"]}
          />
        </div>
        <div className={"input-rows"}>
          <TextField
            id="standard-name"
            label="Destination Airport"
            //   className={classes.textField}
            value={this.state.destinationAirport}
            onChange={this.handleChange("destinationAirport")}
            margin="normal"
            error={errors["destinationAirport"]}
          />
          <DateTimePicker
            label="Take Off Time"
            //   className={classes.textField}
            value={this.state.takeOffTime}
            onChange={this.handleDateChange("takeOffTime")}
            margin="normal"
            error={errors["takeOffTime"]}
          />
          <DateTimePicker
            margin="normal"
            label="Landing Time"
            value={this.state.landingTime}
            onChange={this.handleDateChange("landingTime")}
            error={errors["landingTime"]}
          />
        </div>
        <div style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={this.addFlight}>
            Save Flight
          </Button>
          <p className={"error"}>{this.state.dbError}</p>
        </div>
      </div>
    );
  }
}
