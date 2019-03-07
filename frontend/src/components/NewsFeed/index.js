import React from "react";

import "./index.css";
import { Get } from "../../utils/request";

export default class NewsFeed extends React.Component {
  state = {
    feeds: [],
    title: "Title of News Feed",
    description:
      "Flight Scheduled to depart from airport NSW from time 15:23 please report to the baggage team for the delay.",
    date: new Date()
  };

  componentDidMount() {
    Get("prod/newsfeed")
      .then(response => {
        console.log(response);
        this.setState({ feeds: response.newsfeed });
      })
      .catch(error => console.log("somethign went wrong"));
  }

  render() {
    const { selected } = this.props;

    if (selected != "NewsFeed") return null;

    const { title, description, date, feeds } = this.state;
    return (
      <div className={"newsfeed"} id={"newsfeed"}>
        {feeds.map((el, index) => {
          return (
            <EachFeed
              details={{ title: title, description: description, date: date }}
              key={index}
            />
          );
        })}
      </div>
    );
  }
}

const GetFormattedDate = function GetFormattedDate(date = new Date()) {
  var todayTime = new Date(date);
  var month = todayTime.getMonth() + 1;
  var day = todayTime.getDate();
  var year = todayTime.getFullYear();
  return month + "/" + day + "/" + year;
};

const EachFeed = ({ details }) => {
  return (
    <div className={"feed-container"}>
      <div>
        <div className={"title"}>{details.title}</div>
        <p className={"description"}>
          Flisght Scheduled to depart from airport NSW from time 15:23 please
          report to the baggage team for the delay in baggage segregation.
        </p>
        <div className={"date"}>{GetFormattedDate(details.date)}</div>
      </div>
    </div>
  );
};
