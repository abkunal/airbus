/**
 * This lambda function fetches matching flights from the MySQL database
 */

// dependencies
const mysql = require('mysql');
const util = require('util');

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
    let query = ' created < NOW()';
    let parameters = [];

    // search params given
    if (event.queryStringParameters) {
      let params = event.queryStringParameters;

      if (params.msn) {
        query += ' AND msn=?';
        parameters.push(params.msn);
      }
      if (params.flightNo) {
        query += ' AND flight_no=?';
        parameters.push(params.flightNo);
      }
      if (params.planeModel) {
        query += ' AND plane_model=?';
        parameters.push(params.planeModel);
      }
      // flights that have the given airport as source or destination
      if (params.sourceAirport) {
        query += ' AND source_airport=?';
        parameters.push(params.sourceAirport);
      }
      if (params.destinationAirport) {
        query += ' AND destination_airport=?';
        parameters.push(params.destinationAirport);
      }
      // flights with take off time more than or equal to the given time
      if (params.startTakeOffTime && 
          new Date(params.startTakeOffTime) !== 'Invalid Date') {

        let date = formatTimestamp(params.startTakeOffTime);
        query += ` AND take_off_time >= "${date}"`;
      }
      // flights with take off time less than or equal to the given time
      if (params.endTakeOffTime &&
          new Date(params.endTakeOffTime) !== 'Invalid Date') {
      
        let date = formatTimestamp(params.endTakeOffTime);
        query += ` AND take_off_time <= "${date}"`;
      }
      // for pagination
      if (Number.isFinite(Number(params.page))) {
        query += ` LIMIT 10 OFFSET ${10 * Number(params.page)}`;
      }
    }

    // fetch matching flights from the database
    let results = await pool.query(`SELECT * FROM flights WHERE ${query}`, 
    parameters);

    // return flights
    return generateBody(200, {
      results
    });
  } catch (err) {
    // handle errors
    console.log('ERROR', err);
    return generateBody(500, {
      error: 'Some error occurred. Please try again',
    });
  }
};
