/**
 * This lambda function is responsible for adding a flight into the database
 */

// dependencies
const mysql = require('mysql');
const util = require('util');

// lambda is starting after a while
if (typeof pool === 'undefined') {
  // connect to database
  var pool = mysql.createPool({
    host: process.env.RDS_ENDPOINT,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    database: process.env.RDS_DATABASE,
  });

  // for async await
  pool.query = util.promisify(pool.query);
}

/**
 * Returns the response of the request
 * @param {Object} body
 */
function generateBody(statusCode, body, headers = {}) {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
      ...headers
    }
  }
}

/**
 * Formats the given timestamp in mysql datetime
 * @param {Date} date
 * @returns {timestamp} String
 */
function formatTimestamp(timestamp) {
  return new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');
}

// handle the request
exports.handler = async (event, context) => {
  try {
    // get parameters and escape them
    let body = event.body;

    // body not given
    if (!body) {
      return generateBody(400, {
        error: 'Missing Parameters. Please pass all the required parameters',
      });
    }

    // parse JSON body
    try {
      body = JSON.parse(body);
    } catch (e) {
      return generateBody(400, {
        error: 'Invalid parameters given',
      });
    }

    // get parameters
    let planeModel = body.planeModel;
    let msn = Number(body.msn);
    let harnessLength = Number(body.harnessLength);
    let grossWeight = Number(body.grossWeight);
    let atmosphericPressure = Number(body.atmosphericPressure);
    let roomTemperature = Number(body.roomTemperature);
    let fuelCapacityLeftWing = Number(body.fuelCapacityLeftWing);
    let fuelCapacityRightWing = Number(body.fuelCapacityRightWing);
    let fuelQuantityLeftWing = Number(body.fuelQuantityLeftWing);
    let fuelQuantityRightWing = Number(body.fuelQuantityRightWing);
    let maximumAltitudeReachable = Number(body.maximumAltitudeReachable);

    let flightNo = body.flightNo;
    let sourceAirport = body.sourceAirport;
    let destinationAirport = body.destinationAirport;
    let takeOffTime = new Date(body.takeOffTime);
    let landingTime = new Date(body.landingTime);
    
    let error = '';

    // validate parameters
    if (!planeModel || 
        ['A320', 'A330', 'A350'].indexOf(planeModel) === -1) 
        error += 'Plane Model is must be A320, A330 or A350. ';
    else if (!msn || msn < 10000 || msn > 99999) error += 'MSN must be 5 digits long. ';
    else if (!harnessLength) error += 'Harness length is required. ';
    else if (!grossWeight) error += 'Gross Weight is required. ';
    else if (!Number.isFinite(atmosphericPressure)) 
      error += 'Atmospheric Pressure is required. ';
    else if (!Number.isFinite(roomTemperature)) 
      error += 'Room Temperature is required. ';
    else if (!Number.isFinite(fuelCapacityLeftWing)) 
      error += 'Fuel Capacity of Left Wing is required. ';
    else if (!Number.isFinite(fuelCapacityRightWing)) 
      error += 'Fuel Capacity of Right Wing is required. ';
    else if (!Number.isFinite(fuelQuantityLeftWing)) 
      error += 'Fuel Quantity of Left Wing is required. ';
    else if (!Number.isFinite(fuelQuantityRightWing)) 
      error += 'Fuel Quantity of Right Wing is required. ';
    else if (!Number.isFinite(maximumAltitudeReachable)) 
      error += 'Maximum Altitude to be reached is required. ';
    else if (fuelCapacityLeftWing < fuelQuantityLeftWing ||
      fuelCapacityRightWing < fuelQuantityRightWing)
      error += 'Fuel Capacity must be less than fuel quantity';
    else if (!flightNo) error += 'Flight No is required';
    else if (!sourceAirport) error += 'Source Airport is required. ';
    else if (!destinationAirport) error += 'Destination Airport is required. ';
    else if (sourceAirport === destinationAirport)
      error += 'Source and Destination Airport cannot be same';
    else if (takeOffTime === 'Invalid Date') 
      error += 'Take off time must be a timestamp. ';
    else if (landingTime === 'Invalid Date') 
      error += 'Landing time must be a timestamp. ';
    else if (landingTime < takeOffTime) 
      error += 'Landing time must be greater than the take off time.'
    
    // validation errors
    if (error) {
      return generateBody(400, {
        error
      });
    }

    // format according to database timestamp
    takeOffTime = formatTimestamp(takeOffTime);
    landingTime = formatTimestamp(landingTime);

    // check for conflicting flight timings
    let flight = await pool.query(`SELECT flightId, take_off_time, landing_time from flights WHERE 
      plane_model=? AND msn=? AND flight_no=? AND 
      ((take_off_time <= ? AND ? <= landing_time) OR (take_off_time <= ? AND ? <= landing_time))`,
      [planeModel, msn, flightNo, takeOffTime, landingTime, takeOffTime, landingTime]);

    // a flight at the given time already exist
    if (flight.length) {
      return generateBody(400, {
        error: 'A flight within the given take off and landing time already exist',
      });
    }

    // save to database
    await pool.query(`INSERT INTO flights (plane_model, msn, 
      harness_length, gross_weight, atmospheric_pressure, room_temperature,
      fuel_capacity_left_wing, fuel_capacity_right_wing,
      fuel_quantity_left_wing,fuel_quantity_right_wing, 
      maximum_reachable_altitude, flight_no, source_airport, 
      destination_airport, take_off_time, landing_time) VALUES (
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
      )`, [planeModel, msn, harnessLength, grossWeight, atmosphericPressure,
      roomTemperature, fuelCapacityLeftWing, fuelCapacityRightWing, 
      fuelQuantityLeftWing, fuelQuantityRightWing, maximumAltitudeReachable,
      flightNo, sourceAirport, destinationAirport, takeOffTime, landingTime]);

    return generateBody(200, {
      success: 'Flight added successfully',
    });
  } catch (err) {
    // handle errors
    console.log('ERROR', err);
    return generateBody(500, {
      error: 'Some error occurred. Please try again',
    });
  }
};
