import React from "react";
import "./index.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { METHODS } from "http";
import { NOTFOUND } from "dns";
import { Post, Get } from "../../utils/request";
import moment from "moment";
import { DateTimePicker, DatePicker } from "material-ui-pickers";
import queryString from "query-string";

import AddFlightData from "../AddFlightData";
// import EachMsn from "../MSNdata";
import "./index.css";
export default class Aircraft extends React.Component {
  state = { addFlight: false, filter: { page: 0 }, flights: [] };

  componentDidMount() {
    this.search();
  }

  previousFlights = () => {
    let { filter } = this.state;
    filter.page = filter.page + 1;
    let query = queryString.stringify(filter);
    Get("prod/search-flights?" + query)
      .then(response => {
        console.log(response);
        if (response.results && response.results.length > 0) {
          this.setState({
            page: filter.page,
            flights: [...response.results]
          });
        }
      })
      .catch(error => {
        console.log("something went wrong");
      });
  };

  nextFlights = () => {
    let { filter } = this.state;
    filter.page = filter.page + 1;
    let query = queryString.stringify(filter);
    Get("prod/search-flights?" + query)
      .then(response => {
        console.log(response);
        if (response.results && response.results.length > 0) {
          this.setState({
            page: filter.page,
            flights: [...response.results]
          });
        } else console.log("nothing to show");
      })
      .catch(error => {
        console.log("something went wrong");
      });
  };

  componentWillReceiveProps(n) {
    if (n.selected != this.props.selected) {
      //   this.search();
      this.setState(
        { planeModel: n.selected, filter: { page: 0 } },
        this.search
      );
    }
  }

  handleChange = type => e => {
    let { filter } = this.state;

    filter[type] = e.target.value;
    this.setState({ filter });
  };

  onSave = () => {
    console.log("Its saved in database");
  };

  handleDateChange = type => date => {
    console.log(type, date);
    let { filter } = this.state;
    filter[type] = new Date(date);
    this.setState({ filter });
  };

  search = () => {
    console.log(this.state);
    let { filter, planeModel } = this.state;
    filter.planeModel = planeModel;
    let query = queryString.stringify(filter);
    Get("prod/search-flights?" + query)
      .then(response => {
        console.log(response);
        if (response.results && response.results.length > 0) {
          this.setState({
            page: this.state.filter.page + 1,
            flights: [...response.results]
          });
        }
      })
      .catch(error => {
        console.log("something went wrong");
      });
  };

  addFlightActive = () => this.setState({ addFlight: !this.state.addFlight });

  render() {
    let { selected } = this.props;
    console.log(selected);
    const { addFlight, flights } = this.state;

    if (selected == "NewsFeed") return null;

    console.log("Sasa");
    return (
      <div className={"a330-container"}>
        <div>
          <div className={"search"}>
            <TextField
              id="standard-name"
              label="Search by MSN"
              value={this.state.filter.msn}
              onChange={this.handleChange("msn")}
              margin="normal"
              variant={"outlined"}
            />
            <TextField
              id="standard-name"
              label="Search by Flight Number"
              value={this.state.filter.flightNo}
              onChange={this.handleChange("flightNo")}
              margin="normal"
              variant={"outlined"}
            />
            <TextField
              id="standard-name"
              label="Source Airport"
              value={this.state.filter.source}
              onChange={this.handleChange("sourceAirport")}
              margin="normal"
              variant={"outlined"}
            />
          </div>
          <div className={"search"}>
            <TextField
              id="standard-name"
              label="Destination Airport"
              value={this.state.filter.destination}
              onChange={this.handleChange("destinationAirport")}
              margin="normal"
              variant={"outlined"}
            />
            <DateTimePicker
              margin="normal"
              label="Strt Take Off time"
              value={this.state.landingTime}
              onChange={this.handleDateChange("startTakeOffTime")}
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
          {addFlight ? (
            <AddFlightData
              onSave={this.onSave}
              addFlight={addFlight}
              planeModel={selected}
            />
          ) : (
            <div>
              <div style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {flights.map((el, index) => (
                  <EachMsn key={index} details={el} />
                ))}
              </div>
              <div
                style={{ flexDirection: "row", justifyContent: "space-around" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.previousFlights}
                >
                  Previous
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.nextFlights}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const EachMsn = ({ details }) => {
  return (
    <div className={"msn-container"}>
      <div>
        <div className={"title"}>MSN:{details.msn}</div>
        <p className={"description"}>Source :{details.source_airport}</p>
        <p className={"description"}>
          Destination :{details.destination_airport}
        </p>
        <p className={"description"}>
          Take Off Time :{" "}
          {moment(details.take_off_time).format("DD/MM/YYYY hh mm a")}
          <br />
          Landing Time :{" "}
          {moment(details.take_off_time).format("DD/MM/YYYY hh mm a")}
        </p>
        <p className={"description"}>
          fuel capacity left wing : {details.fuel_capacity_right_wing}
          <br />
          fuel capacity right wing Time : {details.fuel_capacity_right_wing}
        </p>
        <p className={"description"}>Plane Model {details.plane_model}</p>
      </div>
    </div>
  );
};
