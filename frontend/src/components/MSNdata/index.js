import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const styles = {
  card: {
    width: "50%",
    backgroundColor: "white",
    marginBottom: "50px"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
};

function EachMsn(props) {
  const { classes, details } = props;
  console.log(details);
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          MSN: {details.msn}
        </Typography>
        <Typography variant="h5" component="h2">
          {details.source_airport} = {details.destination_airport}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          FlightId: {details.flightId}
        </Typography>
        <Typography component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

EachMsn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EachMsn);
